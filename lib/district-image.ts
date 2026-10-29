/**
 * The district hero image, shared by the district page and the transition overlay so the swap
 * between them is invisible. TEMPORARY: one flat pale version of the district's color until the
 * "Illustrative concept" renders exist (docs/10-content-v2.md, Imagery plan).
 *
 * It is half the district color and half white, mixed in oklch so the hue stays clean. Text on it is
 * hearth, so it needs no dark fade.
 */
export function districtImage(color: string) {
  return `color-mix(in oklch, ${color} 50%, white)`;
}

/** The masterplan sheet under the 2D plan and on the 3D board, lightened to warm cream (paper ≈ #EBE5D8). Draw it as is, untinted. */
export const PLAN_SHEET = "/plan/districts-sheet-cream.webp";

/** The color masterplan (the /plan header image and the walk-ring diagram). It has no printed walk rings. */
export const PLAN_COLOR = "/plan/masterplan-color.webp";

/**
 * Where the color masterplan sits in plan-sheet coordinates (SVG orientation, the same units as the
 * district shapes), so the two can be drawn together. It is a tighter crop than the greyscale sheet:
 * wider on both sides, and the top ~59 units of the sheet are cut off.
 *
 * Measured Oct 28, 2026 by matching the roads in the two images: 1 color-image pixel = 1/1.5142
 * sheet units, image pixel (0, 0) at sheet (−560.4, −288.2). Checked by drawing every district
 * outline over the image.
 */
export const PLAN_COLOR_BOUNDS = { x: -560.4, y: -288.2, width: 1091.7, height: 628.7 } as const;
