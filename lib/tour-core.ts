/**
 * Geometry and timing engine for the Site Tour (docs/13 §6).
 *
 * A typed port of reference/virtual-site-tour/tour-core.js. The math is unchanged on purpose:
 * scripts/tour-core-check.mjs runs both versions on data/tours.json and fails if they disagree.
 * No dependencies and no globals, so it runs in the browser, on the server and in plain Node.
 */

/** [latitude, longitude] in degrees, the order used in data/tours.json and by Leaflet. */
export type LatLng = [number, number];

/** A point on a route and the direction of travel there, in degrees clockwise from north. */
export type PathPoint = { ll: LatLng; heading: number };

/** The nearest point on a route to some other point. */
export type Projection = {
  /** Distance along the route, in metres. */
  m: number;
  ll: LatLng;
  /** How far the other point is from the route, in metres. */
  offset: number;
};

/** Where the traveller is at a moment in the video. */
export type Position = PathPoint & { m: number };

/** A pinned moment: at video time t (seconds) the traveller is at ll. */
export type Anchor = { t: number; ll: LatLng };

/** The parts of a tour the timeline needs. */
export type TimelineSource = {
  duration?: number;
  route?: LatLng[];
  point?: LatLng;
  anchors?: Anchor[];
};

type Key = { t: number; m: number };

const R = 6371008.8; // mean Earth radius, metres
const toRad = Math.PI / 180;

/** Great-circle distance between two points, in metres. */
export function dist(a: LatLng, b: LatLng): number {
  const dLat = (b[0] - a[0]) * toRad;
  const dLng = (b[1] - a[1]) * toRad;
  const x = Math.sin(dLat / 2);
  const y = Math.sin(dLng / 2);
  const h = x * x + Math.cos(a[0] * toRad) * Math.cos(b[0] * toRad) * y * y;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Compass bearing from a to b, 0–360 degrees. */
export function bearing(a: LatLng, b: LatLng): number {
  const p1 = a[0] * toRad;
  const p2 = b[0] * toRad;
  const dl = (b[1] - a[1]) * toRad;
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return (Math.atan2(y, x) / toRad + 360) % 360;
}

/** Flat x/y in metres around ref. Accurate at site scale. */
function proj(ll: LatLng, ref: LatLng): [number, number] {
  return [(ll[1] - ref[1]) * toRad * R * Math.cos(ref[0] * toRad), (ll[0] - ref[0]) * toRad * R];
}

/** A route as a line of points, measured in metres from its start. */
export class Path {
  readonly pts: readonly LatLng[];
  /** Distance from the start to each point. */
  readonly cum: readonly number[];
  readonly length: number;

  constructor(route: readonly LatLng[] = []) {
    this.pts = route;
    const cum = [0];
    for (let i = 1; i < route.length; i++) cum.push(cum[i - 1] + dist(route[i - 1], route[i]));
    this.cum = cum;
    this.length = cum[cum.length - 1] || 0;
  }

  /** The point and heading at distance m along the route. */
  at(m: number): PathPoint | null {
    const p = this.pts;
    const c = this.cum;
    if (!p.length) return null;
    if (p.length === 1) return { ll: p[0], heading: 0 };
    m = Math.max(0, Math.min(this.length, m));
    let lo = 0;
    let hi = c.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (c[mid] <= m) lo = mid;
      else hi = mid;
    }
    const seg = c[hi] - c[lo];
    const f = seg > 0 ? (m - c[lo]) / seg : 0;
    const a = p[lo];
    const b = p[hi];
    return { ll: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], heading: bearing(a, b) };
  }

  /** The nearest point on the route to ll. */
  project(ll: LatLng): Projection | null {
    const p = this.pts;
    if (!p.length) return null;
    if (p.length === 1) return { m: 0, ll: p[0], offset: dist(p[0], ll) };
    let best: Projection | null = null;
    const q = proj(ll, ll);
    for (let i = 1; i < p.length; i++) {
      const a = proj(p[i - 1], ll);
      const b = proj(p[i], ll);
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const L2 = dx * dx + dy * dy;
      const t = L2 ? Math.max(0, Math.min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / L2)) : 0;
      const x = a[0] + dx * t;
      const y = a[1] + dy * t;
      const d = Math.sqrt((x - q[0]) * (x - q[0]) + (y - q[1]) * (y - q[1]));
      if (!best || d < best.offset) {
        best = {
          offset: d,
          m: this.cum[i - 1] + (this.cum[i] - this.cum[i - 1]) * t,
          ll: [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * t, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * t],
        };
      }
    }
    return best;
  }

  /** The part of the route between two distances (used to draw the travelled line). */
  slice(m0: number, m1: number): LatLng[] {
    const out: LatLng[] = [];
    const a = this.at(m0);
    const b = this.at(m1);
    if (!a || !b) return out;
    out.push(a.ll);
    for (let i = 0; i < this.pts.length; i++) if (this.cum[i] > m0 && this.cum[i] < m1) out.push(this.pts[i]);
    out.push(b.ll);
    return out;
  }
}

/**
 * Maps video time to distance along the route, and back, using the anchors.
 * Each anchor is projected onto the route. If no anchor covers an end, the start of the route
 * is pinned to t = 0 and the end to the clip's duration. Speed is constant between pins.
 */
export class Timeline {
  readonly path: Path;
  readonly keys: readonly Key[];
  readonly duration: number;

  constructor(tour: TimelineSource) {
    this.path = new Path(tour.route || (tour.point ? [tour.point] : []));
    const dur = tour.duration || 0;
    const path = this.path;
    const keys: Key[] = [];
    for (const a of tour.anchors || []) {
      const pr = path.project(a.ll);
      if (pr) keys.push({ t: +a.t, m: pr.m });
    }
    keys.sort((x, y) => x.t - y.t);
    if (!keys.length || keys[0].t > 0.01) keys.unshift({ t: 0, m: keys.length ? Math.min(0, keys[0].m) : 0 });
    if (keys[keys.length - 1].t < dur - 0.01) keys.push({ t: dur, m: Math.max(path.length, keys[keys.length - 1].m) });
    for (let i = 1; i < keys.length; i++) if (keys[i].m < keys[i - 1].m) keys[i].m = keys[i - 1].m; // keep it moving forward
    this.keys = keys;
    this.duration = dur;
  }

  /** Distance along the route at video time t. */
  distanceAt(t: number): number {
    const k = this.keys;
    if (!k.length) return 0;
    if (t <= k[0].t) return k[0].m;
    for (let i = 1; i < k.length; i++) {
      if (t <= k[i].t) {
        const span = k[i].t - k[i - 1].t;
        return span > 0 ? k[i - 1].m + ((k[i].m - k[i - 1].m) * (t - k[i - 1].t)) / span : k[i].m;
      }
    }
    return k[k.length - 1].m;
  }

  /** Where the traveller is at video time t, and which way they face. */
  positionAt(t: number): Position | null {
    const m = this.distanceAt(t);
    const pos = this.path.at(m);
    if (!pos) return null;
    let heading = pos.heading;
    // Look a few metres ahead so the arrow stays steady while stopped.
    const ahead = this.path.at(Math.min(this.path.length, m + 3));
    if (ahead && this.path.length > 0 && m < this.path.length - 1) heading = bearing(pos.ll, ahead.ll) || heading;
    return { ll: pos.ll, heading, m };
  }

  /** The earliest video time at which the traveller reaches distance m. */
  timeAt(m: number): number {
    const k = this.keys;
    for (let i = 1; i < k.length; i++) {
      if (m <= k[i].m) {
        const span = k[i].m - k[i - 1].m;
        return span > 0 ? k[i - 1].t + ((k[i].t - k[i - 1].t) * (m - k[i - 1].m)) / span : k[i - 1].t;
      }
    }
    return k.length ? k[k.length - 1].t : 0;
  }
}

/** Seconds as m:ss, e.g. 113.2 → "1:53". */
export function fmt(s: number): string {
  s = Math.max(0, Math.floor(s || 0));
  return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
}
