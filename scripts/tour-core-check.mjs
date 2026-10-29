// Checks that lib/tour-core.ts (the site's engine) gives the same answers as the prototype's
// reference/virtual-site-tour/tour-core.js, for every tour in data/tours.json (docs/13 §6).
//
// Usage (from the repo root):  npm run check:tour-core
// Node 24 runs the TypeScript file directly, so nothing needs installing or building.
//
// For each tour, at 0%, 25%, 50%, 75% and 100% of the clip, it compares:
//   position  how far apart the two map markers are, in metres (must be within 0.5 m)
//   heading   difference in marker direction, in degrees
//   distance  difference in distance along the route, in metres
//   time      the reverse lookup (route distance -> video time), in seconds
//   slice     the travelled line drawn up to that moment (same points, within 0.5 m)
import { readFileSync } from "node:fs";
import vm from "node:vm";

const TOLERANCE_M = 0.5;
const FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

// The prototype writes window.TourCore, so run it in a sandbox with its own "window".
const sandbox = { window: {} };
vm.runInNewContext(readFileSync("reference/virtual-site-tour/tour-core.js", "utf8"), sandbox);
const Old = sandbox.window.TourCore;
const New = await import(new URL("../lib/tour-core.ts", import.meta.url).href);

const { tours } = JSON.parse(readFileSync("data/tours.json", "utf8"));

const angleDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
const metres = (a, b) => (a && b ? New.dist(a, b) : a === b ? 0 : Infinity);

let failures = 0;
const rows = [];
for (const tour of tours) {
  const o = new Old.Timeline(tour);
  const n = new New.Timeline(tour);
  const worst = { pos: 0, heading: 0, dist: 0, time: 0, slice: 0 };
  const problems = [];

  if (Math.abs(o.duration - n.duration) > 1e-9 || o.keys.length !== n.keys.length) problems.push("timeline pins differ");

  for (const f of FRACTIONS) {
    const t = f * tour.duration;
    const po = o.positionAt(t);
    const pn = n.positionAt(t);
    const pos = metres(po?.ll, pn?.ll);
    worst.pos = Math.max(worst.pos, pos);
    worst.heading = Math.max(worst.heading, angleDiff(po?.heading ?? 0, pn?.heading ?? 0));
    worst.dist = Math.max(worst.dist, Math.abs(o.distanceAt(t) - n.distanceAt(t)));
    const m = n.distanceAt(t);
    worst.time = Math.max(worst.time, Math.abs(o.timeAt(m) - n.timeAt(m)));

    const so = o.path.slice(0, o.distanceAt(t));
    const sn = n.path.slice(0, n.distanceAt(t));
    if (so.length !== sn.length) problems.push(`slice at ${Math.round(f * 100)}% has ${sn.length} points, expected ${so.length}`);
    else for (let i = 0; i < so.length; i++) worst.slice = Math.max(worst.slice, metres(so[i], sn[i]));

    if (pos > TOLERANCE_M) problems.push(`marker ${pos.toFixed(3)} m apart at ${Math.round(f * 100)}%`);
    if (Old.fmt(t) !== New.fmt(t)) problems.push(`time label ${New.fmt(t)}, expected ${Old.fmt(t)}`);
  }
  if (worst.slice > TOLERANCE_M) problems.push(`travelled line ${worst.slice.toFixed(3)} m apart`);
  if (problems.length) failures++;

  rows.push({
    "#": tour.order,
    tour: tour.id,
    length: `${Math.round(n.path.length)} m`,
    clip: New.fmt(tour.duration),
    "position (m)": worst.pos.toExponential(1),
    "heading (°)": worst.heading.toExponential(1),
    "distance (m)": worst.dist.toExponential(1),
    "time (s)": worst.time.toExponential(1),
    "slice (m)": worst.slice.toExponential(1),
    result: problems.length ? `FAIL: ${problems.join("; ")}` : "pass",
  });
}

console.log("Largest difference between the prototype and lib/tour-core.ts (0 = identical):");
console.table(rows);
console.log(
  failures
    ? `\n${failures} of ${tours.length} tours FAILED (tolerance ${TOLERANCE_M} m).`
    : `\nAll ${tours.length} tours pass: positions within ${TOLERANCE_M} m at ${FRACTIONS.map((f) => `${f * 100}%`).join(", ")}.`,
);
process.exit(failures ? 1 : 0);
