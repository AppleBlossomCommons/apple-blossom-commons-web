import districtData from "@/data/districts.json";
import geometryData from "@/data/district-geometry-v1.json";
import sourceData from "@/data/sources.json";

export type DistrictFamily = "residential" | "senior" | "commercial" | "civic" | "parks";
export type DistrictKey =
  | "wine"
  | "wellness"
  | "orchardgrove"
  | "heritage"
  | "abr"
  | "harvest"
  | "summit"
  | "discovery"
  | "preserve"
  | "hotel";

type Point = [number, number];

/**
 * A named place or idea from the July 2026 masterplan, shown under "What's planned here"
 * (docs/11-plan-and-districts-content.md). A text ending in "(concept)" shows that word muted.
 */
export type Place = { name: string; text: string };

/** Public fields only. `internalNotes` in districts.json must never reach a page. */
export type District = {
  key: DistrictKey;
  n: number;
  slug: string;
  code: string;
  name: string;
  family: DistrictFamily;
  familyLabel: string;
  color: string;
  summary: string;
  publicFacts: string[];
  places: Place[];
  status: string;
  /**
   * Polygons as stored in the geometry file: pixels of the source sheet, origin at the
   * center, y pointing UP (y = 347 − pixel_y). The 3D model uses them as stored; SVG must
   * negate y (see polyToPath).
   */
  polys: Point[][];
  /**
   * Roundel positions (Summit has two), stored as [x, z] for the 3D model. z points DOWN
   * the sheet, so these are already SVG coordinates and are used as stored in both views.
   */
  labels: Point[];
};

const families = districtData._meta.families as Record<DistrictFamily, { label: string }>;
const geometry = geometryData as unknown as {
  size: [number, number];
  polys: Record<DistrictKey, Point[][]>;
  labels: Record<DistrictKey, Point[]>;
};

export const PLAN_SIZE = geometry.size;
export const PLAN_VIEWBOX = `${-PLAN_SIZE[0] / 2} ${-PLAN_SIZE[1] / 2} ${PLAN_SIZE[0]} ${PLAN_SIZE[1]}`;

export const districts: District[] = districtData.districts.map((d) => {
  const key = d.key as DistrictKey;
  const family = d.family as DistrictFamily;
  return {
    key,
    n: d.n,
    slug: d.slug,
    code: d.code,
    name: d.name,
    family,
    familyLabel: families[family].label,
    color: d.color,
    summary: d.summary,
    publicFacts: d.publicFacts,
    places: d.places,
    status: d.status,
    polys: geometry.polys[key],
    labels: geometry.labels[key],
  };
});

export function getDistrict(slug: string) {
  return districts.find((d) => d.slug === slug);
}

export function getDistrictByKey(key: DistrictKey) {
  const district = districts.find((d) => d.key === key);
  if (!district) throw new Error(`No district with key "${key}" in data/districts.json`);
  return district;
}

/**
 * Splits a trailing "(concept)" off a place's text, so it can be shown in the muted style
 * instead of in brackets (docs/11, section 2.1).
 */
export function splitConcept(text: string): { text: string; concept: boolean } {
  const match = text.match(/^([\s\S]*?)\s*\(concept\)\s*$/);
  return match ? { text: match[1], concept: true } : { text, concept: false };
}

/** Note under every section that names masterplan places (docs/11, section 1.9). */
export const CONCEPT_NOTE =
  "Names and places are ideas from the July 2026 masterplan. They're planning concepts and will change as the plan is refined.";

export const familyOrder: DistrictFamily[] = ["residential", "senior", "commercial", "civic", "parks"];

/**
 * SVG path for one stored polygon. The geometry's y points up and SVG's y points down,
 * so every point [x, y] is drawn at (x, −y) (fix brief, Fix 1). Never flip the group instead.
 */
export function polyToPath(poly: Point[]) {
  return "M" + poly.map(([x, y]) => `${x},${-y}`).join("L") + "Z";
}

export type Source = {
  label: string;
  shortLabel: string;
  /** Date as written on the chip; null means the date is not confirmed and the chip leaves it out. */
  dateLabel: string | null;
  title: string;
  date: string | null;
  geography: string;
  method: string;
  tier: string;
  access: string;
  url: string | null;
};

export const sources = sourceData.sources as Record<string, Source>;
export type SourceId = keyof typeof sourceData.sources;

export const PLAN_DISCLAIMER =
  "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design.";

/** Label for the 3D model (approved homepage mockup; fix brief, Fix 3). */
export const PLAN_DISCLAIMER_3D =
  "Illustrative 3D interpretation of the July 2026 masterplan. Not a survey or final design.";
