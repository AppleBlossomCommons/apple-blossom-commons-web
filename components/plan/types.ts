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
  /** SVG path strings, one per polygon. */
  polys: string[];
  labels: [number, number][];
};
