/**
 * The district hero image, shared by the district page and the transition overlay so the swap
 * between them is invisible. TEMPORARY: a very light gradient in the district's color until the
 * "Illustrative concept" renders exist (docs/10-content-v2.md, Imagery plan).
 *
 * It runs from a pale tint (25% color, 75% white) to a soft one (70% color), mixed in oklch so the
 * hue stays clean. Text on it is hearth, so it needs no dark fade.
 */
export function districtImage(color: string) {
  return `linear-gradient(165deg, color-mix(in oklch, ${color} 25%, white) 0%, color-mix(in oklch, ${color} 70%, white) 100%)`;
}

/** The greyscale masterplan sheet under the 2D plan and on the 3D model's board. */
export const PLAN_SHEET = "/plan/districts-sheet-greyscale.webp";
