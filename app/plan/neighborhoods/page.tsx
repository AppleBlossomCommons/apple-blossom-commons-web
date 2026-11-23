import type { Metadata } from "next";
import { CareCloseBy, PlanSubHero } from "@/components/plan/PlanSections";
import { DifferentBand, LifePlan, WhyLifePlan } from "@/components/plan/LivingSections";
import porch from "@/public/images/home/porch-every-chapter.jpg";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";
import { talkDoorways } from "@/lib/doorways";

export const metadata: Metadata = {
  title: "Neighborhoods for a lifetime",
  description:
    "How Apple Blossom Commons plans homes for every stage of life: homes you can stay in as your needs change, more support in Heritage Grove, a hospital campus a short walk away, and technology that supports the people who give care.",
};

const keepExploring: Doorway[] = [
  {
    href: "/plan/village-and-chelan",
    title: "The Village and Chelan.",
    text: "The village at the center, a neighborhood designed for walking, parks and trails, and why Chelan.",
    cta: "The Village and Chelan",
    fill: "#EAF6CF",
  },
  {
    href: "/plan#explore",
    title: "See the whole plan.",
    text: "Explore all ten districts on the map and the 3D model.",
    cta: "Back to the map",
    fill: "#FFF2B3",
  },
];

/**
 * The Plan: Neighborhoods for a lifetime (Nov 19, 2026; the split of The Plan, see docs/02-sitemap.md). The
 * sections are the docs/14 ones. Rebuilt image-first on Nov 20, 2026 (see LivingSections.tsx). The
 * Heritage Grove summary was removed on Nov 22, 2026 (owner): the grove cards link to the district
 * page, which has the full version.
 */
export default function NeighborhoodsPage() {
  return (
    <>
      <PlanSubHero
        id="living-title"
        title="Neighborhoods for a lifetime"
        lede="Homes for every stage of life, with more support close by if it's ever needed, a hospital campus a short walk away, and technology that helps the people who give care."
        photo={{
          src: porch,
          alt: "A grandmother reads a picture book with her granddaughter at a table on a cottage porch, with blossoming trees and golden hills beyond.",
          focus: "object-[42%_50%]",
        }}
      />
      <LifePlan />
      <WhyLifePlan />
      <CareCloseBy />
      <div className="h-16 sm:h-[120px]" aria-hidden="true" />
      <DifferentBand />
      <DoorwayCards doorways={[...keepExploring, ...talkDoorways]} heading={{ id: "more-title", title: "Where to go next" }} />
    </>
  );
}
