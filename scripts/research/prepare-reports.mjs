// Prepares the Research Library PDFs (docs/15-research-library-content.md, section 5).
//
//   npm run prepare:research
//
// Rerun it whenever the owner puts a new or revised report PDF in incoming/research/.
// For each PDF there it:
//   1. copies the file, byte for byte, to its stable public path (report.pdf.href);
//   2. reads the page count and updates `pages` and `pdf.sourceFile` in data/research.json;
//   3. makes two cover images from page 1: the whole page (cover.thumb, 600 px wide) and
//      the photo band below the linen text block (cover.photo, 1600 px wide), both sRGB JPEG;
//   4. reports file sizes, flagging anything over 10 MB (never compresses);
//   5. checks whether page 1 still says "Draft for review"; if it does, the report stays a draft.
//
// Files are matched to reports by the number after "Report" in the file name ("Report3",
// "Report_4", "report 5"), so later versions (v2, final) still match.

import { copyFile, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const incoming = path.join(root, "incoming/research");
const dataFile = path.join(root, "data/research.json");
const publicDir = path.join(root, "public");

const RENDER_WIDTH = 1600; // page 1 is rendered at this width; the photo band is cut from it
const THUMB_WIDTH = 600;
const MAX_BYTES = 10 * 1024 * 1024;

const data = JSON.parse(await readFile(dataFile, "utf8"));
const files = (await readdir(incoming).catch(() => [])).filter((f) => f.toLowerCase().endsWith(".pdf"));
if (files.length === 0) {
  console.error(`No PDFs found in ${path.relative(root, incoming)}/.`);
  process.exit(1);
}

const seen = new Set();
let problems = 0;

for (const file of files.sort()) {
  const match = file.match(/report[\s_-]*0*(\d+)/i);
  const report = match && data.reports.find((r) => r.number === Number(match[1]));
  if (!report) {
    console.warn(`? ${file}: no report in data/research.json matches this name, skipped.`);
    problems++;
    continue;
  }
  if (seen.has(report.number)) {
    console.warn(`? ${file}: a second PDF for Report ${report.number}, skipped. Keep one file per report in incoming/research/.`);
    problems++;
    continue;
  }
  seen.add(report.number);

  const src = path.join(incoming, file);
  const bytes = await readFile(src);
  const doc = await getDocument({ data: new Uint8Array(bytes), verbosity: 0 }).promise;
  const page = await doc.getPage(1);

  // 1. Copy, unchanged.
  const dest = path.join(publicDir, report.pdf.href);
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);

  // 2. Page count and source name.
  const notes = [];
  if (report.pages !== doc.numPages) notes.push(`pages ${report.pages} → ${doc.numPages}`);
  report.pages = doc.numPages;
  report.pdf.sourceFile = file;

  // 5. Draft label on the cover.
  const text = (await page.getTextContent()).items.map((i) => i.str).join(" ");
  const saysDraft = /draft\s+for\s+review/i.test(text);
  if (saysDraft && report.status !== "draft") {
    notes.push(`status ${report.status} → draft (the cover still says "Draft for review")`);
    report.status = "draft";
  }

  // 3. Cover images.
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: RENDER_WIDTH / base.width });
  const { canvas, context } = doc.canvasFactory.create(Math.round(viewport.width), Math.round(viewport.height));
  await page.render({ canvas, canvasContext: context, viewport }).promise;
  const png = canvas.toBuffer("image/png");
  const { data: pixels, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bandTop = findPhotoBand(pixels, info.width, info.height);

  const thumb = path.join(publicDir, report.cover.thumb);
  const photo = path.join(publicDir, report.cover.photo);
  await mkdir(path.dirname(thumb), { recursive: true });
  await sharp(png).resize({ width: THUMB_WIDTH }).toColorspace("srgb").jpeg({ quality: 82, mozjpeg: true }).toFile(thumb);
  if (bandTop === null) {
    console.warn(`! Report ${report.number}: couldn't find the photo band on page 1, so cover.photo wasn't made. Check the cover.`);
    problems++;
  } else {
    await sharp(png)
      .extract({ left: 0, top: bandTop, width: info.width, height: info.height - bandTop })
      .toColorspace("srgb")
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(photo);
  }

  // 4. Sizes.
  const size = (await stat(dest)).size;
  const big = size > MAX_BYTES ? "  ⚠ over 10 MB: left as is; the owner decides whether to compress it" : "";
  if (big) problems++;

  console.log(
    `✓ Report ${report.number} · ${file}\n` +
      `    → ${report.pdf.href} (${mb(size)}, ${doc.numPages} pages)${big}\n` +
      `    → ${report.cover.thumb}\n` +
      (bandTop === null ? "" : `    → ${report.cover.photo} (photo band from ${Math.round((bandTop / info.height) * 100)}% down the cover)\n`) +
      `    cover says "Draft for review": ${saysDraft ? "yes, stays a draft" : "no"}` +
      (notes.length ? `\n    updated: ${notes.join("; ")}` : ""),
  );
  await doc.cleanup?.();
  await doc.loadingTask?.destroy?.();
}

for (const r of data.reports) {
  if (!seen.has(r.number)) {
    console.warn(`! Report ${r.number} (${r.title}): no PDF in incoming/research/. Its download link won't work until one is added.`);
    problems++;
  }
}

await writeFile(dataFile, JSON.stringify(data, null, 2) + "\n");
console.log(problems ? `\nDone, with ${problems} thing(s) to look at above.` : "\nDone.");

/**
 * The cover is a linen text block above a full-width photo whose top edge is straight. Find the
 * first row, below the top fifth of the page, where most pixels differ from the linen background
 * (sampled at the top-left corner), and the rows over the next 2.5% of the page do too.
 * "Most" is 60%, not nearly all: a photo with pale sky along its top edge (Reports 5 and 6, v2)
 * has rows only 70–85% off-linen. Text rows stay well under that (20% at most), and the long
 * check keeps a line of type from passing for the photo's edge.
 */
function findPhotoBand(px, width, height) {
  const at = (x, y) => (y * width + x) * 3;
  const bg = [px[at(4, 4)], px[at(4, 4) + 1], px[at(4, 4) + 2]];
  const rowIsPhoto = (y) => {
    let off = 0;
    for (let x = 0; x < width; x += 2) {
      const i = at(x, y);
      const d = Math.abs(px[i] - bg[0]) + Math.abs(px[i + 1] - bg[1]) + Math.abs(px[i + 2] - bg[2]);
      if (d > 24) off++;
    }
    return off / Math.ceil(width / 2) > 0.6;
  };
  const span = Math.round(height * 0.025);
  for (let y = Math.floor(height * 0.2); y < height - span; y++) {
    let photo = true;
    for (let k = 0; k <= span && photo; k += 2) photo = rowIsPhoto(y + k);
    if (photo) return y;
  }
  return null;
}

function mb(n) {
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
