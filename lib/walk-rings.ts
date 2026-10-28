import { getDistrictByKey } from "./districts";

type Point = [number, number];

/**
 * The walk-ring diagram on The Plan (docs/11-plan-and-districts-content.md, 1.2).
 *
 * TBC: NOT CONFIRMED WITH THE ARCHITECT (docs/09-open-items.md). Change the rings here only.
 *
 * Units are plan-sheet pixels in SVG orientation (origin at the sheet's center, y pointing down),
 * the same as the district roundels.
 *
 * - Radii are measured from the dashed 5/10/15-minute rings printed on the July 2026 masterplan
 *   sheet (Oct 28, 2026). They are not proportional to walking time; that is how they are drawn.
 * - Center: the content pack asks for Harvest Square, the village center. Its exact spot isn't
 *   mapped, so the Wine Village roundel stands in for it. The masterplan's own rings are centered
 *   on the hospital campus instead, at MASTERPLAN_RING_CENTER.
 */
export const MASTERPLAN_RING_CENTER: Point = [-161, 33];

export const WALK_RINGS = {
  confirmed: false,
  center: getDistrictByKey("wine").labels[0] as Point,
  rings: [
    { minutes: 5, label: "about 5 min", r: 111 },
    { minutes: 10, label: "about 10 min", r: 336 },
    { minutes: 15, label: "about 15 min", r: 565 },
  ],
} as const;

export const WALK_RINGS_CAPTION = "Walking times are approximate. Illustrative interpretation of the July 2026 masterplan.";
