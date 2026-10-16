import type { PlanDistrict } from "@/components/plan/types";
import { districts, polyToPath } from "./districts";

/** Public district fields for client components (no internalNotes). */
export function planDistricts(): PlanDistrict[] {
  return districts.map((d) => ({
    key: d.key,
    n: d.n,
    name: d.name,
    slug: d.slug,
    familyLabel: d.familyLabel,
    color: d.color,
    summary: d.summary,
    publicFacts: d.publicFacts,
    polys: d.polys.map(polyToPath),
    shapes: d.polys,
    labels: d.labels,
  }));
}
