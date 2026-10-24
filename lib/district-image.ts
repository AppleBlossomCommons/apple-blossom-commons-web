/**
 * The district hero image, shared by the district page and the transition overlay so the swap
 * between them is invisible. TEMPORARY: a shaded gradient in the district's color until the
 * "Illustrative concept" renders exist (docs/10-content-v2.md, Imagery plan).
 */
export function districtImage(color: string) {
  return `repeating-linear-gradient(135deg, rgb(255 255 255 / 0.07) 0 2px, rgb(255 255 255 / 0) 2px 16px), linear-gradient(165deg, #F7E2B8 0%, ${color} 78%)`;
}

/** The soft fade under the hero text: a touch darker at the top, darkest at the bottom. */
export const DISTRICT_HERO_FADE = "linear-gradient(180deg, rgb(45 32 24 / 0.1) 0%, rgb(45 32 24 / 0) 30%, rgb(45 32 24 / 0.66) 100%)";

/** The greyscale masterplan sheet under the 2D plan and on the 3D model's board. */
export const PLAN_SHEET = "/plan/districts-sheet-greyscale.webp";
