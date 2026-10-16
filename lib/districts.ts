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
  status: string;
  /** Polygons in scene units (pixels of the source sheet, origin at center). */
  polys: Point[][];
  /** Roundel positions (Summit has two). */
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
    status: d.status,
    polys: geometry.polys[key],
    // Labels in the geometry file are stored as [x, z] for the 3D prototype, where z = -y.
    labels: geometry.labels[key].map(([x, z]) => [x, -z] as Point),
  };
});

export function getDistrict(slug: string) {
  return districts.find((d) => d.slug === slug);
}

export const familyOrder: DistrictFamily[] = ["residential", "senior", "commercial", "civic", "parks"];

export function polyToPath(poly: Point[]) {
  return "M" + poly.map(([x, y]) => `${x},${y}`).join("L") + "Z";
}

/**
 * Stand-in site perimeter: the convex hull of every traced parcel point.
 * No georeferenced site boundary exists yet (docs/09-open-items.md).
 */
export function sitePerimeterPath() {
  const pts = districts.flatMap((d) => d.polys.flat()).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Point, a: Point, b: Point) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list: Point[]) => {
    const out: Point[] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return polyToPath([...half(pts), ...half([...pts].reverse())]);
}

/** Horizontal position of a point as a percentage of the plan width. */
export function xPercent(x: number) {
  return ((x + PLAN_SIZE[0] / 2) / PLAN_SIZE[0]) * 100;
}

export type Source = {
  label: string;
  shortLabel: string;
  /** Date as written on the chip; null shows [SOURCE TO CONFIRM]. */
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
