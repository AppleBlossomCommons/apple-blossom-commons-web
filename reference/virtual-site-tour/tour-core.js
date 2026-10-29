/* Shared geometry + timing engine for the ABC virtual site tour. No dependencies. */
(function (global) {
  "use strict";
  var R = 6371008.8;
  var toRad = Math.PI / 180;

  function dist(a, b) {
    var dLat = (b[0] - a[0]) * toRad, dLng = (b[1] - a[1]) * toRad;
    var x = Math.sin(dLat / 2), y = Math.sin(dLng / 2);
    var h = x * x + Math.cos(a[0] * toRad) * Math.cos(b[0] * toRad) * y * y;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function bearing(a, b) {
    var p1 = a[0] * toRad, p2 = b[0] * toRad, dl = (b[1] - a[1]) * toRad;
    var y = Math.sin(dl) * Math.cos(p2);
    var x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
    return (Math.atan2(y, x) / toRad + 360) % 360;
  }

  /* Local equirectangular projection (metres) — accurate at site scale. */
  function proj(ll, ref) {
    return [(ll[1] - ref[1]) * toRad * R * Math.cos(ref[0] * toRad), (ll[0] - ref[0]) * toRad * R];
  }

  function Path(route) {
    this.pts = route || [];
    this.cum = [0];
    for (var i = 1; i < this.pts.length; i++) this.cum.push(this.cum[i - 1] + dist(this.pts[i - 1], this.pts[i]));
    this.length = this.cum[this.cum.length - 1] || 0;
  }

  /* Point + heading at distance m along the path. */
  Path.prototype.at = function (m) {
    var p = this.pts, c = this.cum;
    if (!p.length) return null;
    if (p.length === 1) return { ll: p[0], heading: 0 };
    m = Math.max(0, Math.min(this.length, m));
    var lo = 0, hi = c.length - 1;
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (c[mid] <= m) lo = mid; else hi = mid; }
    var seg = c[hi] - c[lo], f = seg > 0 ? (m - c[lo]) / seg : 0;
    var a = p[lo], b = p[hi];
    return { ll: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], heading: bearing(a, b) };
  };

  /* Nearest point on the path to ll: {m, ll, offset (metres from path)}. */
  Path.prototype.project = function (ll) {
    var p = this.pts, best = null;
    if (!p.length) return null;
    if (p.length === 1) return { m: 0, ll: p[0], offset: dist(p[0], ll) };
    var q = proj(ll, ll);
    for (var i = 1; i < p.length; i++) {
      var a = proj(p[i - 1], ll), b = proj(p[i], ll);
      var dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
      var t = L2 ? Math.max(0, Math.min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / L2)) : 0;
      var x = a[0] + dx * t, y = a[1] + dy * t;
      var d = Math.sqrt((x - q[0]) * (x - q[0]) + (y - q[1]) * (y - q[1]));
      if (!best || d < best.offset) {
        best = { offset: d, m: this.cum[i - 1] + (this.cum[i] - this.cum[i - 1]) * t,
                 ll: [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * t, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * t] };
      }
    }
    return best;
  };

  /* Sub-path between two distances (for "travelled so far" styling). */
  Path.prototype.slice = function (m0, m1) {
    var out = [], a = this.at(m0), b = this.at(m1);
    if (!a || !b) return out;
    out.push(a.ll);
    for (var i = 0; i < this.pts.length; i++) if (this.cum[i] > m0 && this.cum[i] < m1) out.push(this.pts[i]);
    out.push(b.ll);
    return out;
  };

  /*
   * Timeline: maps video time <-> distance along the route using anchors.
   * Anchors are {t, ll}; each is projected onto the route. If none cover the ends,
   * the start of the route is pinned to t=0 and the end to the clip duration.
   */
  function Timeline(tour) {
    this.path = new Path(tour.route || (tour.point ? [tour.point] : []));
    var dur = tour.duration || 0, path = this.path, keys = [];
    (tour.anchors || []).forEach(function (a) {
      var pr = path.project(a.ll);
      if (pr) keys.push({ t: +a.t, m: pr.m });
    });
    keys.sort(function (x, y) { return x.t - y.t; });
    if (!keys.length || keys[0].t > 0.01) keys.unshift({ t: 0, m: keys.length ? Math.min(0, keys[0].m) : 0 });
    if (keys[keys.length - 1].t < dur - 0.01) keys.push({ t: dur, m: Math.max(path.length, keys[keys.length - 1].m) });
    for (var i = 1; i < keys.length; i++) if (keys[i].m < keys[i - 1].m) keys[i].m = keys[i - 1].m; // keep monotonic
    this.keys = keys;
    this.duration = dur;
  }

  Timeline.prototype.distanceAt = function (t) {
    var k = this.keys;
    if (!k.length) return 0;
    if (t <= k[0].t) return k[0].m;
    for (var i = 1; i < k.length; i++) {
      if (t <= k[i].t) {
        var span = k[i].t - k[i - 1].t;
        return span > 0 ? k[i - 1].m + (k[i].m - k[i - 1].m) * (t - k[i - 1].t) / span : k[i].m;
      }
    }
    return k[k.length - 1].m;
  };

  Timeline.prototype.positionAt = function (t) {
    var m = this.distanceAt(t), pos = this.path.at(m);
    if (!pos) return null;
    // Heading: look slightly ahead so the arrow stays stable while stopped.
    var ahead = this.path.at(Math.min(this.path.length, m + 3));
    if (ahead && this.path.length > 0 && m < this.path.length - 1) pos.heading = bearing(pos.ll, ahead.ll) || pos.heading;
    pos.m = m;
    return pos;
  };

  /* Earliest video time at which the traveller reaches distance m. */
  Timeline.prototype.timeAt = function (m) {
    var k = this.keys;
    for (var i = 1; i < k.length; i++) {
      if (m <= k[i].m) {
        var span = k[i].m - k[i - 1].m;
        return span > 0 ? k[i - 1].t + (k[i].t - k[i - 1].t) * (m - k[i - 1].m) / span : k[i - 1].t;
      }
    }
    return k.length ? k[k.length - 1].t : 0;
  };

  function fmt(s) {
    s = Math.max(0, Math.floor(s || 0));
    return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
  }

  function videoUrl(base, file) {
    return (base || "") + file.split("/").map(encodeURIComponent).join("/");
  }

  global.TourCore = { dist: dist, bearing: bearing, Path: Path, Timeline: Timeline, fmt: fmt, videoUrl: videoUrl };
})(window);
