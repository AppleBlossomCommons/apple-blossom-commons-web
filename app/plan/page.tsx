import type { Metadata } from "next";
import { PlanExplorer } from "@/components/plan/PlanExplorer";
import { CareCloseBy, FitsTogether, PlanHero, PlanIntro, WhyChelan } from "@/components/plan/PlanSections";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER_3D, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

export const metadata: Metadata = {
  title: "The Plan",
  description:
    "A long-range plan near Lake Chelan, growing one neighborhood at a time: homes near care, a small village and parks and open space.",
};

/**
 * The Plan (docs/10-content-v2.md, "The Plan (/plan)"; Phase 1 handoff, "The Plan"): hero, intro,
 * the 3D model with its side card and list, How it fits together, Care, close by and Why Chelan.
 */
export default function PlanPage() {
  return (
    <>
      <PlanHero />
      <PlanIntro />
      <PlanExplorer districts={planDistricts()} viewBox={PLAN_VIEWBOX} imageHref={PLAN_SHEET} disclaimer={PLAN_DISCLAIMER_3D} />
      <FitsTogether />
      <CareCloseBy />
      <WhyChelan />
    </>
  );
}
