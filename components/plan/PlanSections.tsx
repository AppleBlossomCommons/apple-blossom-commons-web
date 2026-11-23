import Image from "next/image";
import lakeView from "@/public/images/home/lake-chelan-view.jpg";
import { Reveal } from "@/components/motion/Reveal";
import { ResearchCallout } from "@/components/research/ResearchCallout";
import { JumpLink } from "@/components/site/JumpLink";
import { ConceptText } from "@/components/site/Places";
import { eyebrow } from "@/components/site/layout";
import { RuleList, type RuleItem } from "@/components/site/RuleList";
import { PLAN_DISCLAIMER } from "@/lib/districts";
import { PhotoFrame, visionPhoto, type Photo } from "@/components/plan/LivingSections";

// Copy from docs/10-content-v2.md, "The Plan (/plan)", with the changes in
// docs/11-plan-and-districts-content.md, section 1, and docs/14-plan-vision-content.md (which wins
// where they differ). Image notes from the Phase 1 handoff and docs/11.

/**
 * Hero for the two story pages of The Plan (Neighborhoods for a lifetime, The Village and Chelan): text on a sand
 * panel, with "The Plan" as a small label above the title. An optional photo sits beside the text on
 * wide screens and under it on phones.
 */
export function PlanSubHero({ id, title, lede, photo }: { id: string; title: string; lede: string; photo?: Photo }) {
  return (
    <section aria-labelledby={id} className="px-2 sm:px-4">
      <div
        className={`grid items-center gap-8 rounded-hero-sm bg-sand px-5 pb-10 pt-14 sm:rounded-hero sm:px-16 sm:pb-16 ${
          photo ? "sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16 lg:py-16" : "sm:pt-28"
        }`}
      >
        <div className="flex flex-col gap-4 sm:gap-6">
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
        {photo && (
          <PhotoFrame photo={photo} priority sizes="(min-width: 1024px) 440px, 100vw" className="aspect-[3/2] lg:aspect-[4/5]" />
        )}
      </div>
    </section>
  );
}

/**
 * Intro: one sentence on a wide card with the Lake Chelan photo from the Home "Once in a
 * Generation" step behind it (owner request, Nov 22, 2026). The sentence is the docs/14 first
 * sentence alone: the rest of the docs/10 text repeated the hero lede and the sections below.
 * White text sits on a dark-brown fade over the bright sky, so it keeps 4.5:1 contrast.
 */
export function PlanIntro() {
  return (
    // No bottom padding: the next section's own top padding sets the gap, as between other sections.
    <section aria-labelledby="plan-overview" className="px-2 pt-10 sm:px-4 sm:pt-16">
      <div className="relative isolate flex min-h-[210px] flex-col justify-center gap-3 overflow-hidden rounded-hero-sm px-6 py-8 text-white sm:min-h-[240px] sm:gap-4 sm:rounded-hero sm:px-12 sm:py-10 lg:px-16">
        {/* Decorative: the sentence carries the message. */}
        <Image src={lakeView} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover object-[50%_44%]" />
        {/* Phones: an even dark-brown wash, since the text fills the band. Wider screens: a horizontal
            fade, dark behind the text on the left and fully clear on the right, so the photo's own
            color shows there. The text is kept narrow so it never reaches the clear part. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[rgb(59_47_42/0.62)] sm:bg-[linear-gradient(to_right,rgb(59_47_42/0.85)_0%,rgb(59_47_42/0.78)_50%,rgb(59_47_42/0)_85%)]"
        />
        <h2 id="plan-overview" className={`${eyebrow} self-start border-t-[3px] border-white pt-3 !text-white`}>
          Overview
        </h2>
        <Reveal as="p" kind="fade" className="text-xl sm:max-w-[min(560px,50vw)] leading-normal sm:text-[28px] sm:leading-[1.35] sm:tracking-[-0.005em]">
          Apple Blossom Commons is planned around a simple idea: the years after work are better when a good home, good care and good neighbors
          are close together.
        </Reveal>
      </div>
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
 * "Care, close by" (#care-close-by; was Connected Community): the care text beside the walk-to-campus
 * picture, then "Technology that supports people" beside the helper-robot picture, with the six
 * ideas underneath. Names the hospital campus only. Photos added Nov 20, 2026 (owner: more imagery).
 */
export function CareCloseBy() {
  return (
    <section id="care-close-by" aria-labelledby="care-title" className="bg-sand px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-3.5 sm:gap-5">
          <Reveal as="h2" kind="head" id="care-title" className="text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]">
            Care, close by
          </Reveal>
          <Reveal as="p" kind="fade" className="max-w-[560px] text-xl leading-normal sm:text-[23px]">
            The senior neighborhoods, Orchard Grove and Heritage Grove, are planned within a short walk of the hospital campus. The Wellness
            District nearby is planned for clinics, therapy and medical-assisted living.
          </Reveal>
          <p className="max-w-[560px]">
            <ConceptText text="Senior homes are planned around quiet courtyards, so residents have a protected garden for a short walk or a seat in the sun, right outside their door. (concept)" />
          </p>
          <ResearchCallout slug="care-close-by" surface="linen" className="mt-2 sm:mt-3" />
        </div>
        <PhotoFrame photo={visionPhoto("care")} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2]" />
      </div>

      <div className="mt-16 grid items-center gap-8 sm:mt-[120px] lg:grid-cols-2 lg:gap-16">
        <PhotoFrame photo={visionPhoto("technology")} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2] lg:order-first" />
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 id="technology" className="text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]">
            Technology that supports people
          </h3>
          <p className="max-w-[560px] text-xl leading-normal sm:text-[23px]">
            Technology is planned to take on the routine work, so the people who give care have more time for the people they care for. It will
            never replace them.
          </p>
          <p className="max-w-[560px]">The plan is for residents to decide how their own information is used.</p>
        </div>
      </div>
      <div className="mt-12 sm:mt-16">
        <RuleList items={technology} layout="three" titleAs="h4" />
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
