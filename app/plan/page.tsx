import type { Metadata } from "next";
import { MovedSections } from "@/components/plan/MovedSections";
import { PlanExplorer } from "@/components/plan/PlanExplorer";
import { PlanPageNav } from "@/components/plan/PlanPageNav";
import { GuidingIdeas } from "@/components/plan/PlanPlaceSections";
import { Vision } from "@/components/plan/PlanVisionSections";
import { FitsTogether, PlanHero, PlanIntro } from "@/components/plan/PlanSections";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER_3D, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

export const metadata: Metadata = {
  title: "The Plan",
  description:
    "A long-range plan near Lake Chelan for a different kind of retirement: homes for every stage of life, care a short walk away, technology that supports people, and a small village at the center.",
};

const morePlan: Doorway[] = [
  {
    href: "/plan/living-and-care",
    title: "Living and care.",
    text: "What a Life Plan Community is, Heritage Grove, and how care and technology are planned close to home.",
    cta: "Living and care",
    fill: "#ECE7FC",
  },
  {
    href: "/plan/village-and-outdoors",
    title: "Village and outdoors.",
    text: "The village at the center, a neighborhood designed for walking, parks and trails, and why Chelan.",
    cta: "Village and outdoors",
    fill: "#EAF6CF",
  },
];

/**
 * The Plan: overview (split Nov 19, 2026; see docs/02-sitemap.md). It keeps the opening of the
 * docs/14 order (hero, intro, A different kind of retirement, the 3D model, How it fits together)
 * and What guides the plan. Life Plan, Heritage Grove and Care moved to /plan/living-and-care; the
 * village, walking, parks and Why Chelan moved to /plan/village-and-outdoors.
 */
export default function PlanPage() {
  return (
    <>
      <MovedSections />
      <PlanHero />
      <PlanPageNav
        current="/plan"
        sections={[
          { id: "vision", label: "The idea" },
          { id: "explore", label: "The map" },
          { id: "fits", label: "How it fits together" },
          { id: "guiding-ideas", label: "What guides the plan" },
        ]}
      />
      <PlanIntro />
      <Vision />
      <PlanExplorer districts={planDistricts()} viewBox={PLAN_VIEWBOX} imageHref={PLAN_SHEET} disclaimer={PLAN_DISCLAIMER_3D} />
      <FitsTogether />
      <GuidingIdeas />
      <DoorwayCards doorways={morePlan} heading={{ id: "more-title", title: "More of the plan" }} />
    </>
  );
}
