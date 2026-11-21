import { Reveal } from "@/components/motion/Reveal";
import { ResearchLink } from "@/components/research/ResearchLink";
import { JumpLink } from "@/components/site/JumpLink";
import { ConceptText } from "@/components/site/Places";
import { eyebrow } from "@/components/site/layout";
import { RuleList, type RuleItem } from "@/components/site/RuleList";
import { PLAN_DISCLAIMER } from "@/lib/districts";

// Copy from docs/10-content-v2.md, "The Plan (/plan)", with the changes in
// docs/11-plan-and-districts-content.md, section 1, and docs/14-plan-vision-content.md (which wins
// where they differ). Image notes from the Phase 1 handoff and docs/11.

/**
 * Hero for the two story pages of The Plan (Living and care, Village and outdoors): text on a sand
 * panel, with "The Plan" as a small label above the title. No image, so no placeholder.
 */
export function PlanSubHero({ id, title, lede }: { id: string; title: string; lede: string }) {
  return (
    <section aria-labelledby={id} className="px-2 sm:px-4">
      <div className="flex flex-col gap-4 rounded-hero-sm bg-sand px-5 pb-10 pt-14 sm:gap-6 sm:rounded-hero sm:px-16 sm:pb-16 sm:pt-28">
        <Reveal as="p" kind="fade" className={eyebrow}>
          The Plan
        </Reveal>
        <Reveal as="h1" kind="head" id={id} className="text-[46px] leading-[0.98] tracking-[-0.03em] sm:text-[clamp(64px,6.6vw,96px)] sm:leading-[0.95]">
          {title}
        </Reveal>
        <Reveal as="p" kind="fade" className="max-w-[760px] text-xl leading-normal sm:text-[23px]">
          {lede}
        </Reveal>
        <p className="text-[0.9375rem] text-muted">{PLAN_DISCLAIMER}</p>
      </div>
    </section>
  );
}

/** Intro: a small "Overview" label under a 3px Deep Sage rule on the left, the paragraph on the right (stacked on phones). */
export function PlanIntro() {
  return (
    <section
      aria-labelledby="plan-overview"
      className="grid gap-5 px-5 pb-14 pt-10 sm:px-[clamp(16px,4vw,56px)] sm:pb-[104px] sm:pt-[88px] lg:grid-cols-[minmax(180px,1fr)_3fr] lg:gap-10"
    >
      <h2 id="plan-overview" className={`${eyebrow} self-start border-t-[3px] border-sage-deep pt-3 lg:mt-3`}>
        Overview
      </h2>
      <Reveal as="p" kind="fade" className="max-w-[860px] text-xl leading-normal sm:text-[28px] sm:leading-[1.45] sm:tracking-[-0.005em]">
        Apple Blossom Commons is planned around a simple idea: the years after work are better when a good home, good care and good neighbors
        are close together. Apple Blossom Commons is a long-range plan for about 160 acres near Lake Chelan. It is meant to grow slowly, one neighborhood at a time,
        over many years. Each part is planned to work with the others: homes near care, a small village within walking distance, and parks and
        open space throughout.
      </Reveal>
    </section>
  );
}

const jumpClass =
  "inline-flex min-h-11 items-center self-start font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";

const fits: RuleItem[] = [
  {
    title: "Homes for every stage of life.",
    text: "Cottages and townhomes for active adults, independent and assisted living, memory care, and family homes and apartments.",
  },
  {
    // "a lane designed for walking", not "a walkable lane" (CLAUDE.md, rule 3).
    title: "A small village.",
    text: "Cafés, restaurants, tasting rooms and shops along a lane designed for walking, sized to add to downtown Chelan, not compete with it.",
  },
  { title: "Parks and open space.", text: "A recreation park, trails and a large open-space preserve with a scenic overlook." },
  {
    title: "Built in phases.",
    text: "Each neighborhood comes when there is real demand for it.",
    extra: (
      <JumpLink href="#guiding-ideas" className={jumpClass}>
        How the plan grows&nbsp;<span aria-hidden="true">→</span>
      </JumpLink>
    ),
  },
];

/** "How it fits together": four short items under a 3px Deep Sage rule. */
export function FitsTogether() {
  return (
    <section id="fits" aria-labelledby="fits-title" className="px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]">
      <Reveal as="h2" kind="head" id="fits-title" className="mb-7 text-[34px] leading-none sm:mb-14 sm:text-[clamp(40px,4.2vw,60px)]">
        How it fits together
      </Reveal>
      <RuleList items={fits} />
    </section>
  );
}

// "Technology that supports people" (docs/14 section 6). Every item is a concept, shown muted.
const technology: RuleItem[] = [
  { title: "Virtual visits.", text: "Seeing a specialist by video from home, without a long drive. (concept)" },
  {
    title: "A home that notices.",
    text: "Sensors that can notice a fall or a change in routine and alert a caregiver or family member. (concept)",
  },
  {
    title: "Robots for routine tasks.",
    text: "Robots that carry meals, linens and supplies, so staff can spend that time with residents. (concept)",
  },
  { title: "Shuttles on car-free lanes.", text: "Slow, self-driving shuttles linking homes, clinics and the village. (concept)" },
  {
    title: "A helpful assistant.",
    text: "A simple AI assistant for reminders, appointments and questions, for residents who want one. (concept)",
  },
  {
    title: "Homes that help.",
    text: "Lighting that guides the way at night, voice controls, and doors and appliances that are easy to use. (concept)",
  },
];

/**
 * "Care, close by" (#care-close-by; was Connected Community): the care text, then "Technology that
 * supports people" across the full width. Names the hospital campus only.
 *
 * Text only until the courtyard image exists (planned: AI image, no people, a sheltered garden
 * courtyard between single-storey homes). Critique of Nov 20, 2026: no placeholder tiles on public pages.
 */
export function CareCloseBy() {
  return (
    <section id="care-close-by" aria-labelledby="care-title" className="bg-sand p-2 sm:p-4">
      <div>
        <div className="flex flex-col gap-3.5 px-3 pb-4 pt-12 sm:gap-5 sm:px-[clamp(16px,4vw,56px)] sm:pt-[104px]">
          <Reveal as="h2" kind="head" id="care-title" className="text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]">
            Care, close by
          </Reveal>
          <Reveal as="p" kind="fade" className="max-w-[560px] sm:text-xl">
            The senior neighborhoods, Orchard Grove and Heritage Grove, are planned within a short walk of the hospital campus. The Wellness
            District nearby is planned for clinics, therapy and medical-assisted living.
          </Reveal>
          <p className="max-w-[560px]">
            <ConceptText text="Senior homes are planned around quiet courtyards, so residents have a protected garden for a short walk or a seat in the sun, right outside their door. Shared clubhouses are planned for the things that make a day good: a fitness room, a library, a place to have a meal or host family overnight. (concept)" />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-3 pb-12 pt-10 sm:gap-5 sm:px-[clamp(16px,4vw,56px)] sm:pb-[104px] sm:pt-20">
        <h3 id="technology" className="text-2xl leading-[1.1] tracking-[-0.02em] sm:text-[30px]">
          Technology that supports people
        </h3>
        <p className="mb-4 max-w-[760px] text-xl leading-normal sm:mb-8 sm:text-[23px]">
          Technology is planned to take on the routine work, so the people who give care have more time for the people they care for. It will
          never replace them.
        </p>
        <RuleList items={technology} layout="three" titleAs="h4" />
        <p className="mt-6 max-w-[760px] sm:mt-10 sm:text-xl">The plan is for residents to decide how their own information is used.</p>
        <ResearchLink slug="care-close-by">Read the research: Care Close By</ResearchLink>
      </div>
    </section>
  );
}

/**
 * "Why Chelan" (#why-chelan; was Chelan & the Region). Text only until its photos exist (planned:
 * vineyard rows in autumn, a snowy trail in winter). Critique of Nov 20, 2026: no placeholder tiles on public pages.
 */
export function WhyChelan() {
  return (
    <section id="why-chelan" aria-labelledby="why-title" className="px-2 pt-14 sm:px-4 sm:pt-[120px]">
      <div className="flex flex-col gap-3.5 rounded-card bg-sand px-[22px] py-12 text-hearth sm:gap-5 sm:px-14 sm:py-20">
        <Reveal as="h2" kind="head" id="why-title" className="text-[44px] leading-[0.98] sm:text-[clamp(56px,5.6vw,80px)]">
          Why Chelan
        </Reveal>
        <p className="max-w-[640px] sm:text-[21px]">
          Four seasons, the lake, the vineyards and a small-town pace. People come to Chelan for the same reasons they stay. The plan is
          shaped to protect what makes this place special: the views, the open space and a town that knows its neighbors.
        </p>
      </div>
    </section>
  );
}
