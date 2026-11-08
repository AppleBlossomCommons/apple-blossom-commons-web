// Uploads the prepared Home hero clip to Vercel Blob at a stable address: home/hero.mp4
// (the same store as the Site Tour videos).
//
// Usage (from the repo root, after prepare.mjs):
//   node --env-file=.env.vercel.local scripts/home-video/upload.mjs           (upload)
//   node --env-file=.env.vercel.local scripts/home-video/upload.mjs --dry-run (show what would upload)
//
// Credentials: see the top of scripts/tour-videos/upload.mjs.
// Prints the value to use for NEXT_PUBLIC_HOME_VIDEO_URL.
import { createReadStream, existsSync, statSync } from "node:fs";
import { put } from "@vercel/blob";

const file = "public/local-video/home-hero.mp4";
const dryRun = process.argv.includes("--dry-run");
if (!existsSync(file)) { console.error(`Missing ${file}. Run scripts/home-video/prepare.mjs first.`); process.exit(1); }
const mb = (statSync(file).size / 1e6).toFixed(1);
if (dryRun) { console.log(`would upload home/hero.mp4 (${mb} MB)`); process.exit(0); }
if (!(process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN) && !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("No Blob credentials found. See the top of scripts/tour-videos/upload.mjs.");
  process.exit(1);
}
const blob = await put("home/hero.mp4", createReadStream(file), {
  access: "public",
  addRandomSuffix: false,        // keep a stable, predictable address
  allowOverwrite: true,          // re-running replaces the clip in place
  contentType: "video/mp4",
  cacheControlMaxAge: 60 * 60 * 24 * 30,
  multipart: true,
});
console.log(`uploaded  home/hero.mp4  ${mb} MB`);
console.log(`\nSet this in Vercel (Settings > Environment Variables) and, if you like, .env.local:\nNEXT_PUBLIC_HOME_VIDEO_URL=${blob.url}`);
