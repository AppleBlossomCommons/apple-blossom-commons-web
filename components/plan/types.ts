/**
 * The public, serializable slice of a district that client components receive as props.
 * Client components must never import lib/districts.ts directly, because that would ship
 * the whole districts.json (including internalNotes) to the browser.
 */
export type PlanDistrict = {
  key: string;
  n: number;
  name: string;
  slug: string;
  familyLabel: string;
  color: string;
  summary: string;
  publicFacts: string[];
  /** SVG path strings, one per polygon (y already flipped for SVG). */
  polys: string[];
  /** The same polygons as stored (y up), for the 3D model. */
  shapes: [number, number][][];
  labels: [number, number][];
  /**
   * Painted areas in other colors, drawn over `color` in this order with no outline of their own
   * (lib/districts.ts, Zone). `polys` are SVG paths; `shapes` the stored polygons for 3D.
   */
  zones: { key: string; color: string; polys: string[]; shapes: [number, number][][] }[];
};
