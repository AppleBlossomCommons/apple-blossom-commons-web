import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WalkRings } from "@/components/plan/WalkRings";
import { ConceptNote, PlaceCard } from "@/components/site/Places";
import { RuleList, type RuleItem } from "@/components/site/RuleList";
import { DistrictLink } from "@/components/transitions/TransitionLinks";
import { getDistrictByKey, type DistrictKey } from "@/lib/districts";
import { getPlaceImage, type PlaceImage } from "@/lib/place-images";

// Copy from docs/11-plan-and-districts-content.md, section 1 (The Plan). Place names and text for
// the village come from data/districts.json.

const sectionPad = "px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]";
const headingClass = "text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]";
const introClass = "max-w-[760px] text-xl leading-normal sm:text-[23px]";
const linkClass =
  "inline-flex min-h-11 items-center self-start font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";

/** A link to a district page that opens it with the circle transition. */
function DistrictPageLink({ districtKey, children }: { districtKey: DistrictKey; children: ReactNode }) {
  const d = getDistrictByKey(districtKey);
  return (
    <DistrictLink district={{ slug: d.slug, color: d.color }} className={linkClass}>
      {children}&nbsp;<span aria-hidden="true">→</span>
    </DistrictLink>
  );
}

const walking: RuleItem[] = [
  {
    title: "Five, ten, fifteen minutes.",
    text: "Homes, shops, care and parks are arranged in rings around the village, so a coffee, a checkup or a trailhead is meant to be a short walk away.",
  },
  {
    title: "Lanes without cars.",
    text: "Car-free lanes are planned to link the neighborhoods to one another. Slow, low-speed shuttles or carts could share them, so getting around stays easy for everyone. (concept)",
  },
  {
    title: "A main street to the hospital campus.",
    text: "A shopping street is planned to run through the middle of the plan, from the northeast corner to the hospital campus.",
  },
  {
    title: "Trails all the way through.",
    text: "Walking and bike trails are planned to connect every neighborhood, the parks and the village, with a hiking trail along the eastern edge.",
  },
];

/** "A neighborhood designed for walking" (#walking): the walk-ring diagram beside four items. */
export function Walking() {
  return (
    <section id="walking" aria-labelledby="walking-title" className={`bg-sand ${sectionPad}`}>
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5">
        <Reveal as="h2" kind="head" id="walking-title" className={headingClass}>
          A neighborhood designed for walking
        </Reveal>
        <Reveal as="p" kind="fade" className={introClass}>
          The plan puts everyday places close together. From the village center, most of the community is planned within about a 15-minute
          walk.
        </Reveal>
      </div>
      <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[7fr_5fr]">
        <Reveal kind="card">
          <WalkRings />
        </Reveal>
        <RuleList items={walking} layout="stack" />
      </div>
      <ConceptNote className="mt-12 sm:mt-16" />
    </section>
  );
}

/** "The village at the center" (#village): the first five Wine Village places, two large then three. */
export function Village() {
  const wine = getDistrictByKey("wine");
  const places = wine.places.slice(0, 5);
  return (
    <section id="village" aria-labelledby="village-title" className={sectionPad}>
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5">
        <Reveal as="h2" kind="head" id="village-title" className={headingClass}>
          The village at the center
        </Reveal>
        <Reveal as="p" kind="fade" className={introClass}>
          Chelan Wine Village is planned as the heart of the community: a small village of tasting rooms, cafés and places to eat, laid out for
          people on foot. It&apos;s sized to add to downtown Chelan, not compete with it.
        </Reveal>
      </div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
        {places.map((place, i) => (
          <PlaceCard
            key={place.name}
            place={place}
            image={getPlaceImage("wine", place.name)}
            index={i < 2 ? i : i - 2}
            className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
          />
        ))}
      </ul>
      <div className="mt-10 flex flex-col gap-6 sm:mt-14">
        <DistrictPageLink districtKey="wine">Explore Chelan Wine Village</DistrictPageLink>
        <ConceptNote />
      </div>
    </section>
  );
}

const outdoorImages: Record<"summit" | "preserve", PlaceImage> = {
  summit: {
    label: "Stock photo: quiet community park in the dry interior Northwest, green field, small pond, hills behind; no crowds",
    fill: "#EAF6CF",
  },
  preserve: {
    label: "Stock photo: wooden bench on a dry hillside over a lake valley at sunset; not an identifiable landmark",
    fill: "#FFE6CC",
  },
};

/** "Parks, trails and open space" (#outdoors): two parks with images and links, then Green edges. */
export function Outdoors() {
  return (
    <section id="outdoors" aria-labelledby="outdoors-title" className={sectionPad}>
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5">
        <Reveal as="h2" kind="head" id="outdoors-title" className={headingClass}>
          Parks, trails and open space
        </Reveal>
        <Reveal as="p" kind="fade" className={introClass}>
          A large share of the land is planned to stay open: orchards, trails, play areas and a lookout at the top of the site.
        </Reveal>
      </div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 min-[760px]:grid-cols-2">
        <PlaceCard
          index={0}
          image={outdoorImages.summit}
          place={{
            name: "Summit Recreation Park",
            text: "Sports fields, a playground, a small pond and a rink that could be roller skating in summer and ice skating in winter. (concept)",
          }}
        >
          <DistrictPageLink districtKey="summit">Visit Summit Recreation Park</DistrictPageLink>
        </PlaceCard>
        <PlaceCard
          index={1}
          image={outdoorImages.preserve}
          place={{
            name: "Orchard Preserve",
            text: "Open hillside with a nature trail and a scenic overlook at the highest point of the site, looking out over the town.",
          }}
        >
          <DistrictPageLink districtKey="preserve">Visit Orchard Preserve</DistrictPageLink>
        </PlaceCard>
        <PlaceCard
          index={2}
          className="min-[760px]:col-span-2"
          place={{
            name: "Green edges",
            text: "Planted buffers are planned along the busier roads, so homes look out on green rather than traffic.",
          }}
        />
      </ul>
      <ConceptNote className="mt-10 sm:mt-14" />
    </section>
  );
}

const guiding: RuleItem[] = [
  {
    title: "Homes for people who live here.",
    text: "The plan is meant first for people who call Chelan home all year, including local workers and families.",
  },
  {
    title: "Built for aging in place.",
    text: "Level paths, shorter blocks, single-level homes and daily needs close by, so you can stay in your neighborhood as your needs change.",
  },
  {
    title: "Designed for walking.",
    text: "Getting around on foot, inside the community and to the places nearby, is planned in from the start.",
  },
  {
    title: "Firewise from the start.",
    text: "Site and building design follow Firewise principles, and emergency access is planned with the hillsides in mind.",
  },
  {
    title: "Sized for year-round life.",
    text: "Roads, water and power are planned around the people who live here all year, not the busiest summer weekend. That work is still being studied.",
  },
  {
    title: "Growing at the right pace.",
    text: "Each neighborhood comes when there's real demand for it. How many homes the land should hold will be settled through the public review process, not decided up front.",
  },
];

/**
 * "What guides the plan" (#guiding-ideas): six ideas, 3 × 2. Presented as Chelan Village, LP's own
 * ideas: no source line, quote or mention of any City plan (CLAUDE.md, public copy rules).
 */
export function GuidingIdeas() {
  return (
    <section id="guiding-ideas" aria-labelledby="guiding-title" className={`bg-sand ${sectionPad}`}>
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5">
        <Reveal as="h2" kind="head" id="guiding-title" className={headingClass}>
          What guides the plan
        </Reveal>
        <Reveal as="p" kind="fade" className={introClass}>
          A few simple ideas shape every part of Apple Blossom Commons.
        </Reveal>
      </div>
      <RuleList items={guiding} layout="three" />
    </section>
  );
}
