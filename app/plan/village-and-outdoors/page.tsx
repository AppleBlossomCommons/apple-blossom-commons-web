import type { Metadata } from "next";
import { PlanPageNav } from "@/components/plan/PlanPageNav";
import { Outdoors, Village, Walking } from "@/components/plan/PlanPlaceSections";
import { PlanSubHero, WhyChelan } from "@/components/plan/PlanSections";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";
import { talkDoorways } from "@/lib/doorways";

export const metadata: Metadata = {
  title: "Village and outdoors",
  description:
    "The small village at the center of Apple Blossom Commons, a neighborhood designed for walking, parks, trails and open space, and why Chelan.",
};

const keepExploring: Doorway[] = [
  {
    href: "/plan/living-and-care",
    title: "Living and care.",
    text: "Homes for every stage of life, Heritage Grove, and how care and technology are planned close to home.",
    cta: "Living and care",
    fill: "#ECE7FC",
  },
  {
    href: "/plan#explore",
    title: "See the whole plan.",
    text: "Explore all ten districts on the map and the 3D model.",
    cta: "Back to the map",
    fill: "#FFF2B3",
  },
];

/** The Plan: Village and outdoors (Nov 19, 2026; the split of The Plan, see docs/02-sitemap.md). Sections unchanged from docs/11 and docs/14. */
export default function VillageAndOutdoorsPage() {
  return (
    <>
      <PlanSubHero
        id="village-outdoors-title"
        title="Village and outdoors"
        lede="A small village at the center, lanes and trails designed for walking, and a large share of the land kept open, in a valley people come to for its four seasons."
      />
      <PlanPageNav
        current="/plan/village-and-outdoors"
        sections={[
          { id: "village", label: "The village" },
          { id: "walking", label: "Walking" },
          { id: "outdoors", label: "Parks and trails" },
          { id: "why-chelan", label: "Why Chelan" },
        ]}
      />
      <Village />
      <Walking />
      <Outdoors />
      <WhyChelan />
      <DoorwayCards doorways={[...keepExploring, ...talkDoorways]} heading={{ id: "more-title", title: "Where to go next" }} />
    </>
  );
}
