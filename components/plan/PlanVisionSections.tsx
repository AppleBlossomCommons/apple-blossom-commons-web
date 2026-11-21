import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ResearchLink } from "@/components/research/ResearchLink";
import { BenefitCluster } from "@/components/plan/BenefitCluster";
import { DistrictPageLink } from "@/components/plan/PlanPlaceSections";
import { FaqItem } from "@/components/site/FaqItem";
import { PlaceCard } from "@/components/site/Places";
import type { RuleItem } from "@/components/site/RuleList";
import { getDistrictByKey, type Place } from "@/lib/districts";
import { visionImages } from "@/lib/place-images";

// Copy from docs/14-plan-vision-content.md (The Plan: the whole vision). General explainer copy
// lives here, like the other Plan sections; district places come from data/districts.json.

const sectionPad = "px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]";
const headingClass = "text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]";
const introClass = "max-w-[760px] text-xl leading-normal sm:text-[23px]";
const subheadingClass = "text-2xl leading-[1.1] tracking-[-0.02em] sm:text-[30px]";
const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:decoration-hearth";

const pillars: { place: Place; image: keyof typeof visionImages; more: { href: string; label: string } }[] = [
  {
    image: "home",
    more: { href: "/plan/living-and-care#life-plan", label: "What is a Life Plan Community?" },
    place: {
      name: "A home for every chapter.",
      text: "Cottages and townhomes for active years, and independent living, assisted living, memory care and nursing care for when more support helps. Moving between them doesn't mean leaving your neighbors.",
    },
  },
  {
    image: "care",
    more: { href: "/plan/living-and-care#care-close-by", label: "Care, close by" },
    place: {
      name: "Care, a short walk away.",
      text: "The senior neighborhoods are planned beside the hospital campus, with clinics, therapy and rehabilitation planned nearby in the Wellness District.",
    },
  },
  {
    image: "technology",
    more: { href: "/plan/living-and-care#technology", label: "Technology that supports people" },
    place: {
      name: "Technology that supports people.",
      text: "Ideas like virtual visits, home sensors that can alert a caregiver, and robots that take on routine tasks, so the people who give care have more time to spend with residents. (concept)",
    },
  },
];

/** "A different kind of retirement" (#vision, docs/14 section 3): three pillars, then a closing line. */
export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className={sectionPad}>
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5">
        <Reveal as="h2" kind="head" id="vision-title" className={headingClass}>
          A different kind of retirement
        </Reveal>
        <Reveal as="p" kind="fade" className={introClass}>
          Most retirement communities offer a place to live. Apple Blossom Commons is planned to offer a whole neighborhood: homes for every
          stage of life, a hospital campus a short walk away, and technology that quietly helps, all within a small village near the lake.
        </Reveal>
      </div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 min-[760px]:grid-cols-3">
        {pillars.map((p, i) => (
          <PlaceCard key={p.place.name} place={p.place} image={visionImages[p.image]} index={i} sizes="(min-width: 760px) 33vw, 100vw">
            <Link href={p.more.href} className={`${inlineLink} mt-1 inline-flex min-h-11 items-center self-start`}>
              {p.more.label}&nbsp;<span aria-hidden="true">→</span>
            </Link>
          </PlaceCard>
        ))}
      </ul>
      <Reveal as="p" kind="fade" className="mt-12 max-w-[860px] text-xl leading-normal sm:mt-16 sm:text-[28px] sm:leading-[1.45] sm:tracking-[-0.005em]">
        Planned as one connected community, for the people who live here and the families who visit them.
      </Reveal>
      <ResearchLink slug="growing-older-by-the-lake" className="mt-8 sm:mt-10">
        Read the research: Growing Older by the Lake
      </ResearchLink>
    </section>
  );
}

const steps: { title: string; text: string }[] = [
  { title: "Independent living.", text: "Your own cottage, townhome or apartment, with the upkeep planned as a shared service." },
  { title: "A little help each day.", text: "Assisted living, for when everyday routines take more effort." },
  { title: "Memory care.", text: "Homes designed for people living with Alzheimer's or dementia, planned with staff trained in their care." },
  { title: "Nursing care.", text: "Around-the-clock care for people who need it." },
];

/**
 * The four-step path (docs/14, 4.2): a line joining four numbered dots, across on desktop and down
 * on phones. It is a real ordered list with the full text, so the list is its own HTML equivalent;
 * the line is decoration and screen readers skip it.
 */
function CarePath() {
  return (
    <ol className="grid grid-cols-1 gap-8 min-[900px]:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal
          key={step.title}
          as="li"
          kind="card"
          index={i}
          className="relative flex gap-4 min-[900px]:flex-col min-[900px]:gap-5"
        >
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[21px] top-11 -bottom-8 w-[3px] bg-sage-deep min-[900px]:bottom-auto min-[900px]:left-11 min-[900px]:-right-8 min-[900px]:top-[21px] min-[900px]:h-[3px] min-[900px]:w-auto"
            />
          )}
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] border-sage-deep bg-linen text-lg font-bold"
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-2 pt-1.5 min-[900px]:pt-0">
            <h4 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">
              {step.title}
            </h4>
            <p className="max-w-[340px]">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

// "Shared meals" (was "Meals worth sharing") drops "and orchards" from docs/14 (Nov 13: no orchards in public copy).
// "Costs you can plan for" is the generic form only: no promise on fees (docs/14, DECISION 2).
// Sales-style titles toned down on Nov 20, 2026 (owner: "keep it warm, cut sales lines"; docs/14 still has the old ones).
// Listed clockwise around the BenefitCluster ring, so related reasons sit side by side: health at the
// top, the home and its costs on the right, family and pets at the bottom, everyday life on the left.
const benefits: RuleItem[] = [
  {
    title: "Designed for aging in place.",
    text: "Level paths, single-level homes, wider doorways and good lighting, so your home keeps working for you as your needs change.",
  },
  { title: "Care, close by.", text: "The hospital campus and nearby clinics are planned within a short walk." },
  { title: "Less upkeep.", text: "Home repairs, yard work and snow clearing are planned as shared services, so more of your time is your own." },
  { title: "Homes at more than one price.", text: "A range of home types and sizes is planned, so more people can find one that fits." },
  {
    title: "Costs you can plan for.",
    text: "Many Life Plan Communities offer contracts that keep monthly costs steadier as care needs grow. How this will work at Apple Blossom Commons hasn't been decided yet.",
  },
  {
    title: "Room for family.",
    text: "Guest suites in the clubhouses, so children and grandchildren can stay close when they visit. (concept)",
  },
  { title: "Room for pets.", text: "Pet-friendly homes are planned, with places to walk a dog close by. (concept)" },
  {
    title: "Neighbors close by.",
    text: "People at a similar stage of life, with clubhouses, courtyards and the village to meet in.",
  },
  {
    title: "Shared meals.",
    text: "Dining rooms and cafés are planned, with food from the valley's own farms and choices for different diets. (concept)",
  },
  {
    title: "An engaged life.",
    text: "Hiking groups, classes, outings, gardening and community events, planned by and for the people who live here.",
  },
];

/** "What is a Life Plan Community?" (#life-plan, docs/14 section 4). */
export function LifePlan() {
  return (
    <section id="life-plan" aria-labelledby="life-plan-title" className={sectionPad}>
      <div className="mb-14 grid gap-x-16 gap-y-6 sm:mb-20 lg:grid-cols-[5fr_6fr]">
        <div className="flex flex-col gap-4 sm:gap-5">
          <Reveal as="h2" kind="head" id="life-plan-title" className={headingClass}>
            What is a Life Plan Community?
          </Reveal>
          <Reveal as="p" kind="fade" className={introClass}>
            A Life Plan Community is a neighborhood designed so you can plan once for the years ahead. You move in while you&apos;re active and
            independent. If your needs change, more support is available in the same community, close to your home, your friends and your
            routines.
          </Reveal>
        </div>
        <Reveal kind="fade" className="flex max-w-[640px] flex-col gap-4 lg:pt-2">
          <p>
            You may know the older name, &ldquo;continuing care retirement community&rdquo;. The idea is the same: independent homes, assisted
            living, memory care and nursing care, planned together in one place, so a change in health doesn&apos;t have to mean a move across
            town.
          </p>
          <p>
            At Apple Blossom Commons, <strong>Orchard Grove</strong> is planned as the Life Plan Community: cottages and townhomes for active
            adults, with a recreation center, gardens and trails close by. <strong>Heritage Grove</strong>, next door, is planned for independent
            living, assisted living, memory care and nursing care, so more support is a short walk away if it&apos;s ever needed. Both are
            planned near the hospital campus.
          </p>
        </Reveal>
      </div>

      <div className="mb-14 flex flex-col gap-8 sm:mb-20 sm:gap-10">
        <h3 className={subheadingClass}>One community, four levels of support</h3>
        <CarePath />
        <p className="max-w-[640px] text-muted">Most people move in at the first step. The others are there if they&apos;re ever needed.</p>
      </div>

      <div className="mb-14 sm:mb-20">
        <BenefitCluster items={benefits} heading="Why people choose a Life Plan Community" />
      </div>

      <Reveal kind="card" className="mb-14 flex flex-col gap-4 rounded-card bg-sand px-6 py-10 sm:mb-20 sm:gap-5 sm:px-14 sm:py-16">
        <h3 className={subheadingClass}>What makes this one different</h3>
        <p className="max-w-[860px] text-xl leading-normal sm:text-[23px]">
          Many Life Plan Communities are a single campus set apart from town. Here, the senior neighborhoods are part of a larger community,
          next to family homes, parks, trails, a small village of cafés and tasting rooms, and a hospital campus. Grandchildren can visit the
          park, and a coffee in the village is a short stroll from home.
        </p>
      </Reveal>

      <div className="grid items-start gap-8 min-[1000px]:grid-cols-[minmax(0,380px)_1fr] min-[1000px]:gap-20">
        <h3 className={subheadingClass}>Three quick questions</h3>
        <div>
          {/* Same answers as the Participate FAQs, so the site says one thing. No 55+ claim, no fee promise. */}
          <FaqItem question="Is it only for people 55 and older? Will there be entrance fees?">
            It&apos;s too early to say.{" "}
            <Link href="/participate#update-list" className={inlineLink}>
              Join the update list
            </Link>{" "}
            to hear as plans firm up.
          </FaqItem>
          <FaqItem question="Can I stay if my care needs change?">
            That&apos;s the goal. Independent homes, assisted living, memory care and nursing care are planned in one connected community.
          </FaqItem>
          <FaqItem question="When could I move in?">
            It&apos;s too early to say. Each neighborhood comes when there&apos;s real demand for it, and we&apos;ll share timing as plans firm up.
          </FaqItem>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-x-10 gap-y-2 sm:mt-14 sm:flex-row sm:flex-wrap">
        <DistrictPageLink districtKey="orchardgrove">Explore Orchard Grove</DistrictPageLink>
        <ResearchLink slug="learning-from-others">What other communities teach us</ResearchLink>
      </div>
    </section>
  );
}

/**
 * "Heritage Grove: support, when it's needed" (#heritage-grove, docs/14 section 5), short form for
 * Living and care (Nov 19, 2026). The full place cards (levels of care and everyday life) live on
 * the Heritage Grove district page, which reads the same `places` from data/districts.json; here
 * the place names are listed so the reader sees what's there before following the link.
 */
export function HeritageGroveSummary() {
  const heritage = getDistrictByKey("heritage");
  return (
    <section id="heritage-grove" aria-labelledby="heritage-title" className="px-2 sm:px-4">
      <Reveal kind="card" className="grid gap-x-16 gap-y-8 rounded-card bg-sand px-5 py-12 sm:px-14 sm:py-16 lg:grid-cols-[6fr_5fr]">
        <div className="flex flex-col gap-4 sm:gap-5">
          <h2 id="heritage-title" className={headingClass}>
            Heritage Grove: support, when it&apos;s needed
          </h2>
          <p className={introClass}>
            Heritage Grove is planned for people who prefer or need support. Each group of homes is planned around a protected garden
            courtyard, with clubhouses for meals, fitness, reading and visits from family.
          </p>
          <DistrictPageLink districtKey="heritage">Explore Heritage Grove</DistrictPageLink>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[1.0625rem] font-bold">Planned here</h3>
          <ul className="flex flex-wrap gap-2">
            {heritage.places.map((place) => (
              <li key={place.name} className="rounded-full bg-linen px-4 py-2 text-[1.0625rem]">
                {place.name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
