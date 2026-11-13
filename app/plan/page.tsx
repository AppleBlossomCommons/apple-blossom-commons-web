import type { Metadata } from "next";
import { PlanExplorer } from "@/components/plan/PlanExplorer";
import { GuidingIdeas, Outdoors, Village, Walking } from "@/components/plan/PlanPlaceSections";
import { HeritageGrove, LifePlan, Vision } from "@/components/plan/PlanVisionSections";
import { CareCloseBy, FitsTogether, PlanHero, PlanIntro, WhyChelan } from "@/components/plan/PlanSections";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER_3D, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

export const metadata: Metadata = {
  title: "The Plan",
  description:
    "A long-range plan near Lake Chelan for a different kind of retirement: homes for every stage of life, care a short walk away, technology that supports people, and a small village at the center.",
};

/**
 * The Plan, in the order from docs/14-plan-vision-content.md, section 1 (which wins over docs/10
 * and docs/11 for this page): hero, intro, A different kind of retirement, the 3D model, How it fits
 * together, What is a Life Plan Community?, Heritage Grove, Care, close by, the village, walking,
 * parks and trails, What guides the plan and Why Chelan.
 */
export default function PlanPage() {
  return (
    <>
      <PlanHero />
      <PlanIntro />
      <Vision />
      <PlanExplorer districts={planDistricts()} viewBox={PLAN_VIEWBOX} imageHref={PLAN_SHEET} disclaimer={PLAN_DISCLAIMER_3D} />
      <FitsTogether />
      <LifePlan />
      <HeritageGrove />
      <CareCloseBy />
      <Village />
      <Walking />
      <Outdoors />
      <GuidingIdeas />
      <WhyChelan />
    </>
  );
}
