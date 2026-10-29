// Prepares the Site Tour videos for the web, without re-encoding.
// For each tour in data/tours.json it copies the original phone clip, removes the audio track
// (phone audio can carry private conversation and road noise), ends the clip early where a tour
// has "trimEnd" (seconds) in data/tours.json, and moves the index to the front
// of the file ("faststart") so playback can begin before the whole file downloads.
//
// Usage (from the repo root):
//   node scripts/tour-videos/prepare.mjs --source "<folder with the original VID_*.mp4 files>"
// Output: .tour-videos/<tour id>.mp4  (git-ignored; uploaded by upload.mjs)
//
// ffmpeg comes from the ffmpeg-static dev dependency, or set FFMPEG_PATH to use your own.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const source = flag("--source") || process.env.TOUR_VIDEO_SOURCE;
const outDir = flag("--out") || ".tour-videos";
if (!source || !existsSync(source)) {
  console.error('Pass the folder that holds the original clips: --source "<folder>"');
  process.exit(1);
}

let ffmpeg = process.env.FFMPEG_PATH;
if (!ffmpeg) {
  try { ffmpeg = createRequire(import.meta.url)("ffmpeg-static"); }
  catch { console.error("ffmpeg not found. Run: npm install --save-dev ffmpeg-static (or set FFMPEG_PATH)."); process.exit(1); }
}

const { tours } = JSON.parse(readFileSync("data/tours.json", "utf8"));
mkdirSync(outDir, { recursive: true });
let total = 0, missing = 0;
for (const t of tours) {
  const src = path.join(source, t.sourceFile);
  const out = path.join(outDir, t.video);
  if (!existsSync(src)) { console.warn(`MISSING  ${t.sourceFile}  (tour ${t.order}: ${t.id})`); missing++; continue; }
  const trim = t.trimEnd ? ["-t", String(t.trimEnd)] : [];
  const r = spawnSync(ffmpeg, ["-v", "error", "-y", "-i", src, ...trim, "-map", "0:v:0", "-c:v", "copy", "-an",
    "-movflags", "+faststart", out], { stdio: "inherit" });
  if (r.status !== 0) { console.error(`FAILED   ${t.id}`); process.exit(1); }
  const mb = statSync(out).size / 1e6; total += mb;
  console.log(`ok  ${String(t.order).padStart(2)}  ${t.video.padEnd(28)} ${mb.toFixed(1)} MB`);
}
console.log(`\n${tours.length - missing} of ${tours.length} clips ready in ${outDir}/ (${total.toFixed(0)} MB).`);
if (missing) process.exit(1);
