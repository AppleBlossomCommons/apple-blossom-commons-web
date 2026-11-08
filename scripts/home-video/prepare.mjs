// Prepares the Home hero drone clip for the web.
// Cuts CLIP.start–CLIP.end out of the original drone video, re-encodes it as H.264 at 1080p
// (the DJI original is 4K HEVC, which many browsers can't play), removes any audio, and moves the
// file index to the front ("faststart") so playback can begin before the whole file downloads.
// It also saves the clip's first frame as the still image (poster, and what people see with
// reduced motion on), which is committed with the site.
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

/** The part of Andy's drone footage shown on Home (owner choice, Nov 7, 2026). */
export const CLIP = { source: "drone-videos/DJI_0150.MP4", start: 13, end: 28 };
export const VIDEO_OUT = "public/local-video/home-hero.mp4";
const STILL_OUT = "public/images/home/hero-still.jpg";

if (!existsSync(CLIP.source)) {
  console.error(`Missing ${CLIP.source}. Put the original drone video in drone-videos/.`);
  process.exit(1);
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

const seek = ["-ss", String(CLIP.start), "-i", CLIP.source];
run([...seek, "-t", String(CLIP.end - CLIP.start), "-map", "0:v:0", "-an",
  "-vf", "scale=1920:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "27",
  "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", VIDEO_OUT]);
run([...seek, "-frames:v", "1", "-vf", "scale=1920:-2", "-q:v", "4", STILL_OUT]);

for (const f of [VIDEO_OUT, STILL_OUT]) console.log(`ok  ${f.padEnd(36)} ${(statSync(f).size / 1e6).toFixed(1)} MB`);
