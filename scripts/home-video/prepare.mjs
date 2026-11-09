// Prepares the Home hero drone clip for the web.
// Cuts each section in CLIPS out of Andy's original drone videos, joins them in order with a
// crossfade, re-encodes the result as H.264 at 1080p (the DJI originals are 4K HEVC, which many
// browsers can't play), removes any audio, and moves the file index to the front ("faststart") so
// playback can begin before the whole file downloads. It also saves the first frame as the still
// image (poster, and what people see with reduced motion on), which is committed with the site.
//
// Usage (from the repo root):
//   node scripts/home-video/prepare.mjs
// Output:
//   public/local-video/home-hero.mp4   (git-ignored; served by the dev server, uploaded by upload.mjs)
//   public/images/home/hero-still.jpg  (committed)
//
// ffmpeg comes from the ffmpeg-static dev dependency, or set FFMPEG_PATH to use your own.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";

/**
 * The sections of Andy's drone footage shown on Home, in order, in seconds (owner choice,
 * Nov 8, 2026: three sides of the site, less of the hospital campus than the Nov 7 cut).
 */
export const CLIPS = [
  { source: "drone-videos/DJI_0150.MP4", start: 13, end: 18 }, // toward the lake
  { source: "drone-videos/DJI_0155.MP4", start: 3, end: 11 },  // Isenhart Road, open land under the ridge
  { source: "drone-videos/DJI_0153.MP4", start: 48, end: 53 }, // Wellness District, ballfield, mountain
];
/** Length of each crossfade between sections, in seconds. */
const FADE = 1.2;
export const VIDEO_OUT = "public/local-video/home-hero.mp4";
const STILL_OUT = "public/images/home/hero-still.jpg";

for (const c of CLIPS) {
  if (!existsSync(c.source)) {
    console.error(`Missing ${c.source}. Put the original drone video in drone-videos/.`);
    process.exit(1);
  }
}
let ffmpeg = process.env.FFMPEG_PATH;
if (!ffmpeg) {
  try { ffmpeg = createRequire(import.meta.url)("ffmpeg-static"); }
  catch { console.error("ffmpeg not found. Run: npm install --save-dev ffmpeg-static (or set FFMPEG_PATH)."); process.exit(1); }
}
const run = (args) => {
  const r = spawnSync(ffmpeg, ["-v", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) process.exit(1);
};
mkdirSync("public/local-video", { recursive: true });
mkdirSync("public/images/home", { recursive: true });

// One input per section, each cut to its start and length.
const inputs = CLIPS.flatMap((c) => ["-ss", String(c.start), "-t", String(c.end - c.start), "-i", c.source]);
// Bring every section to the same size, frame rate and clock, then chain crossfades.
// Each fade starts FADE seconds before the end of everything joined so far.
const prep = "scale=1920:-2,fps=30000/1001,format=yuv420p,setpts=PTS-STARTPTS";
const parts = CLIPS.map((_, i) => `[${i}:v]${prep}[s${i}]`);
let last = "s0";
let length = CLIPS[0].end - CLIPS[0].start;
for (let i = 1; i < CLIPS.length; i++) {
  const out = i === CLIPS.length - 1 ? "out" : `x${i}`;
  parts.push(`[${last}][s${i}]xfade=transition=fade:duration=${FADE}:offset=${(length - FADE).toFixed(3)}[${out}]`);
  length += CLIPS[i].end - CLIPS[i].start - FADE;
  last = out;
}
if (CLIPS.length === 1) parts.push("[s0]null[out]");

run([...inputs, "-filter_complex", parts.join(";"), "-map", "[out]", "-an",
  "-c:v", "libx264", "-preset", "slow", "-crf", "27",
  "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", VIDEO_OUT]);
run(["-i", VIDEO_OUT, "-frames:v", "1", "-q:v", "4", STILL_OUT]);

for (const f of [VIDEO_OUT, STILL_OUT]) console.log(`ok  ${f.padEnd(36)} ${(statSync(f).size / 1e6).toFixed(1)} MB`);
console.log(`length ${length.toFixed(1)} s`);
