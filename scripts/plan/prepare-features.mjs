// Makes the "features layer" printed on the district colors (docs/04-design-direction.md,
// "District colors").
//
//   npm run prepare:plan-features
//
// Rerun it only if the masterplan base image (reference/districts-sheet-greyscale.jpg) changes.
//
// The maps draw each district in full color and multiply this layer over it, the way printed maps
// lay linework over color: where the layer is white the color shows unchanged, and where the sheet
// has a building, parking row, path or track, that mark darkens the color under it.
//
// The greyscale sheet can't be used as is, for two reasons:
//   1. Its paper is light gray (about 226 of 255), not white, so it would gray every color.
//   2. It has soft terrain shading, which would muddy the large parks.
// So each pixel is a blend of two cleaned-up versions:
//   - "lifted": the sheet brightened so the paper becomes pure white. Keeps large shapes, but also
//     keeps the terrain shading.
//   - "flattened": the sheet divided by a heavily blurred copy of itself. That removes slow changes
//     (terrain shading) and keeps sharp marks (outlines, parking, paths), but fades the middle of
//     large buildings.
// FLAT_WEIGHT sets the mix. 0.7 was chosen on Nov 18, 2026 by comparing 0, 0.5 and 0.75 on the full plan.

import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const source = path.join(root, "reference/districts-sheet-greyscale.jpg");
const output = path.join(root, "public/plan/districts-sheet-features.webp");

const PAPER = 226; // the sheet's paper gray (75th–90th percentile of the image is 225–229)
const BLUR_SIGMA = 20; // px at the sheet's 2046 px width; larger than a parking row, smaller than a park
const FLAT_WEIGHT = 0.7;
const FLAT_WHITE = 0.97; // a pixel within 3% of its surroundings counts as paper

const gray = sharp(source).greyscale();
const { data: sheet, info } = await gray.clone().raw().toBuffer({ resolveWithObject: true });
const { data: blurred } = await gray.clone().blur(BLUR_SIGMA).raw().toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(sheet.length);
for (let i = 0; i < sheet.length; i++) {
  const lifted = Math.min(1, sheet[i] / PAPER);
  const flattened = Math.min(1, sheet[i] / Math.max(blurred[i], 1) / FLAT_WHITE);
  out[i] = Math.round(255 * ((1 - FLAT_WEIGHT) * lifted + FLAT_WEIGHT * flattened));
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } })
  .webp({ quality: 85 })
  .toFile(output);

console.log(`Wrote ${path.relative(root, output)} (${info.width} × ${info.height})`);
