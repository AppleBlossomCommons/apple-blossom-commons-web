import type { Metadata } from "next";
import { PlanExplorer } from "@/components/plan/PlanExplorer";
import { GuidingIdeas, Outdoors, Village, Walking } from "@/components/plan/PlanPlaceSections";
import { CareCloseBy, FitsTogether, PlanHero, PlanIntro, WhyChelan } from "@/components/plan/PlanSections";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER_3D, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

export const metadata: Metadata = {
  title: "The Plan",
  description:
    "A long-range plan near Lake Chelan: homes for every stage of life, a small village at the center, care close by, and parks and trails throughout, growing one neighborhood at a time.",
};

/**
 * The Plan (docs/10-content-v2.md, "The Plan (/plan)", and docs/11-plan-and-districts-content.md,
 * section 1): hero, intro, the 3D model with its side card and list, How it fits together, walking,
 * the village, Care, close by, parks and trails, What guides the plan and Why Chelan.
 */
export default function PlanPage() {
  return (
    <>
      <PlanHero />
      <PlanIntro />
      <PlanExplorer districts={planDistricts()} viewBox={PLAN_VIEWBOX} imageHref={PLAN_SHEET} disclaimer={PLAN_DISCLAIMER_3D} />
      <FitsTogether />
      <Walking />
      <Village />
      <CareCloseBy />
      <Outdoors />
      <GuidingIdeas />
      <WhyChelan />
    </>
  );
}
