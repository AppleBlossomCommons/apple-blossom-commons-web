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

/** The greyscale masterplan sheet under the 2D plan and on the 3D model's board. */
export const PLAN_SHEET = "/plan/districts-sheet-greyscale.webp";
