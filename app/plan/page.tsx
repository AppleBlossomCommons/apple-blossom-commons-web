import type { Metadata } from "next";
import { MovedSections } from "@/components/plan/MovedSections";
import { PlanExplorer } from "@/components/plan/PlanExplorer";
import { PlanPageNav } from "@/components/plan/PlanPageNav";
import { GuidingIdeas } from "@/components/plan/PlanPlaceSections";
import { Vision } from "@/components/plan/PlanVisionSections";
import { FitsTogether, PlanIntro } from "@/components/plan/PlanSections";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";
import { talkDoorways } from "@/lib/doorways";
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
    href: "/plan/neighborhoods",
    title: "Neighborhoods for a lifetime.",
    text: "Homes for every stage of life, Heritage Grove, and how care and technology are planned close to home.",
    cta: "Neighborhoods for a lifetime",
    fill: "#ECE7FC",
  },
  {
    href: "/plan/village-and-chelan",
    title: "The Village and Chelan.",
    text: "The village at the center, a neighborhood designed for walking, parks and trails, and why Chelan.",
    cta: "The Village and Chelan",
    fill: "#EAF6CF",
  },
];

/**
 * The Plan: overview (split Nov 19, 2026; see docs/02-sitemap.md). It keeps the opening of the
 * docs/14 order (hero, intro, A different kind of retirement, the 3D model, How it fits together)
 * and What guides the plan. Life Plan, Heritage Grove and Care moved to /plan/neighborhoods; the
 * village, walking, parks and Why Chelan moved to /plan/village-and-chelan.
 */
export default function PlanPage() {
  return (
    <>
      <MovedSections />
      {/* The explorer opens the page (owner decision, Nov 20, 2026: option B of the critique mockups). */}
      <PlanExplorer
        districts={planDistricts()}
        viewBox={PLAN_VIEWBOX}
        imageHref={PLAN_SHEET}
        disclaimer={PLAN_DISCLAIMER_3D}
        hero={{
          id: "plan-title",
          title: "The plan",
          lede: "A long-range plan near Lake Chelan, meant to grow slowly, one neighborhood at a time. Choose a district to see what is planned there.",
        }}
      />
      <PlanPageNav
        current="/plan"
        sections={[
          { id: "vision", label: "The idea" },
          { id: "fits", label: "How it fits together" },
          { id: "guiding-ideas", label: "What guides the plan" },
        ]}
      />
      <PlanIntro />
      <Vision />
      <FitsTogether />
      <GuidingIdeas />
      <DoorwayCards doorways={[...morePlan, ...talkDoorways]} heading={{ id: "more-title", title: "Where to go next" }} />
    </>
  );
}
