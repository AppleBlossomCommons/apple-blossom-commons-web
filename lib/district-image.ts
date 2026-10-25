import { nearestFamily, whiteTextGradient } from "./card-color";

/**
 * The district hero image, shared by the district page and the transition overlay so the swap
 * between them is invisible. TEMPORARY: a gradient in the district's color until the
 * "Illustrative concept" renders exist (docs/10-content-v2.md, Imagery plan).
 *
 * It starts as a light tint of the district color and deepens to its family's white-text shades
 * (lib/card-color.ts) behind the title and summary, so the white text stays readable.
 */
export function districtImage(color: string) {
  const family = nearestFamily(color);
  // Stops measured with the hero's scroll drift (parallax) included, from phone to desktop sizes.
  return whiteTextGradient({ color, deep: family.deep }, { large: 44, body: 68 });
}

/** The greyscale masterplan sheet under the 2D plan and on the 3D model's board. */
export const PLAN_SHEET = "/plan/districts-sheet-greyscale.webp";
