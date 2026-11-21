import type { Metadata } from "next";
import { PlanPageNav } from "@/components/plan/PlanPageNav";
import { CareCloseBy, PlanSubHero } from "@/components/plan/PlanSections";
import { HeritageGroveSummary, LifePlan } from "@/components/plan/PlanVisionSections";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";

export const metadata: Metadata = {
  title: "Living and care",
  description:
    "How Apple Blossom Commons plans homes for every stage of life: a Life Plan Community, more support in Heritage Grove, a hospital campus a short walk away, and technology that supports the people who give care.",
};

const keepExploring: Doorway[] = [
  {
    href: "/plan/village-and-outdoors",
    title: "Village and outdoors.",
    text: "The village at the center, a neighborhood designed for walking, parks and trails, and why Chelan.",
    cta: "Village and outdoors",
    fill: "#EAF6CF",
  },
  {
    href: "/plan#explore",
    title: "See the whole plan.",
    text: "Explore all ten districts on the map and the 3D model.",
    cta: "Back to the map",
    fill: "#DDF1FC",
  },
];

/**
 * The Plan: Living and care (Nov 19, 2026; the split of The Plan, see docs/02-sitemap.md). The
 * sections are the docs/14 ones, unchanged except Heritage Grove, which is a short summary here
 * because the full version is the Heritage Grove district page.
 */
export default function LivingAndCarePage() {
  return (
    <>
      <PlanSubHero
        id="living-title"
        title="Living and care"
        lede="Homes for every stage of life, with more support close by if it's ever needed, a hospital campus a short walk away, and technology that helps the people who give care."
      />
      <PlanPageNav
        current="/plan/living-and-care"
        sections={[
          { id: "life-plan", label: "Life Plan Community" },
          { id: "heritage-grove", label: "Heritage Grove" },
          { id: "care-close-by", label: "Care, close by" },
          { id: "technology", label: "Technology" },
        ]}
      />
      <LifePlan />
      <HeritageGroveSummary />
      <div className="h-16 sm:h-[120px]" aria-hidden="true" />
      <CareCloseBy />
      <DoorwayCards doorways={keepExploring} heading={{ id: "more-title", title: "Keep exploring the plan" }} />
    </>
  );
}
