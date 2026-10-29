// Uploads the prepared Site Tour videos to Vercel Blob at stable addresses: tour/<tour id>.mp4
//
// Usage (from the repo root, after prepare.mjs):
//   node --env-file=.env.vercel.local scripts/tour-videos/upload.mjs           (upload)
//   node --env-file=.env.vercel.local scripts/tour-videos/upload.mjs --dry-run (list what would upload)
//
// Credentials. New Vercel Blob stores connect to the project with OIDC (BLOB_STORE_ID +
// VERCEL_OIDC_TOKEN) and may not create BLOB_READ_WRITE_TOKEN at all. To get the OIDC values
// locally, run once from the repo root:
//   npx vercel login
//   npx vercel link                              (pick the apple-blossom-commons-web project)
//   npx vercel env pull .env.vercel.local        (a separate file, so .env.local is never overwritten)
// The SDK refreshes the 12-hour OIDC token itself using the Vercel CLI login.
// A BLOB_READ_WRITE_TOKEN, if you have one, also works.
// Prints the value to use for NEXT_PUBLIC_TOUR_VIDEO_BASE.
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const dir = ".tour-videos";
const dryRun = process.argv.includes("--dry-run");
const { tours } = JSON.parse(readFileSync("data/tours.json", "utf8"));
const hasOidc = process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN;
if (!dryRun && !hasOidc && !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("No Blob credentials found. Run `npx vercel env pull .env.vercel.local` (see the top of this file),\n" +
    "then run this script with --env-file=.env.vercel.local. If BLOB_STORE_ID is missing from that file, add the\n" +
    "Development environment to the store's project connection in Vercel (Storage > store > Projects > ... > Update Project Connection).");
  process.exit(1);
}

let base = "";
for (const t of tours) {
  const file = path.join(dir, t.video);
  if (!existsSync(file)) { console.error(`Missing ${file}. Run prepare.mjs first.`); process.exit(1); }
  const mb = (statSync(file).size / 1e6).toFixed(1);
  if (dryRun) { console.log(`would upload tour/${t.video} (${mb} MB)`); continue; }
  const blob = await put(`tour/${t.video}`, createReadStream(file), {
    access: "public",
    addRandomSuffix: false,        // keep a stable, predictable address
    allowOverwrite: true,          // re-running replaces the clip in place
    contentType: "video/mp4",
    cacheControlMaxAge: 60 * 60 * 24 * 30,
    multipart: true,               // large files upload in parts with retries
  });
  base = blob.url.slice(0, blob.url.lastIndexOf("/") + 1);
  console.log(`uploaded  ${t.video.padEnd(28)} ${mb} MB`);
}
if (base) console.log(`\nSet this in .env.local and in Vercel (Settings > Environment Variables):\nNEXT_PUBLIC_TOUR_VIDEO_BASE=${base}`);
