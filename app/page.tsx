import Link from "next/link";
import { SourceChip } from "@/components/evidence/SourceChip";
import { DistrictLegend } from "@/components/plan/DistrictLegend";
import { TodayPlanned } from "@/components/plan/TodayPlanned";
import { ArrowRight } from "@/components/site/icons";
import { PLAN_DISCLAIMER, PLAN_SIZE, PLAN_VIEWBOX, sitePerimeterPath } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

// Districts that hold existing uses today (docs/03): the hospital campus and clinics
// sit in the Wellness District; Summit Recreation Park includes the existing sports fields.
const existingToday = [
  { key: "wellness", label: "Hospital campus and clinics (existing)", short: "Hospital (existing)" },
  { key: "summit", label: "Sports fields (existing)", short: "Fields (existing)" },
];

const doorways = [
  {
    href: "/planning",
    title: "Planning with Chelan",
    text: "How the plan aligns with the City's Comprehensive Plan and supports historic Downtown Chelan.",
  },
  {
    href: "/plan",
    title: "Investment perspective",
    text: "The demand thesis, the evidence behind it, and a path to the full reports for approved partners.",
  },
  {
    href: "/districts",
    title: "Development opportunities",
    text: "Which districts fit your product, with their frontage, neighbors and planning concepts.",
  },
];

export default function Home() {
  const districts = planDistricts();
  const sourceChips = Object.fromEntries(
    districts.map((d) => [d.key, <SourceChip key={d.key} id="masterplan-2026-07" uid={`district-${d.key}`} note="Planning concept" />]),
  );

  return (
    <>
      <section aria-labelledby="home-title" className="mx-auto grid max-w-[1360px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pb-28 lg:pt-14">
        <div className="lg:col-span-4 lg:pt-6">
          <h1 id="home-title" className="text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.04] tracking-[-0.015em]">
            What is here today, and what is planned.
          </h1>
          <p className="mt-6 max-w-[38ch] text-ink-2">
            Apple Blossom Commons is a generational, mixed-use community in Chelan, Washington, planned around the
            Lake Chelan Community Hospital campus. It is designed to evolve over decades, in phases.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.9375rem] text-ink-2">
            <span className="tabular">About 160 acres</span>
            <SourceChip id="acreage-tbc" uid="home-acreage" />
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/plan"
              className="inline-flex min-h-12 items-center gap-2 rounded-[3px] bg-green px-5 font-medium text-on-green no-underline transition-[filter] duration-150 hover:brightness-110"
            >
              Explore the plan
              <ArrowRight />
            </Link>
            <Link href="/partners" className="font-medium text-green underline decoration-1 underline-offset-[0.3em] hover:decoration-2">
              Become a Partner
            </Link>
          </div>
        </div>
        <div className="lg:col-span-8">
          <TodayPlanned
            districts={districts}
            existing={existingToday}
            perimeter={sitePerimeterPath()}
            viewBox={PLAN_VIEWBOX}
            size={PLAN_SIZE}
            disclaimer={PLAN_DISCLAIMER}
          />
        </div>
      </section>

      <section aria-labelledby="doorways-title" className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <h2 id="doorways-title" className="max-w-[20ch] text-[clamp(1.875rem,3vw,2.5rem)] leading-tight">
          Find your way into the plan
        </h2>
        <ul className="mt-10 border-t border-ink">
          {doorways.map((d) => (
            <li key={d.href} className="border-b border-rule">
              <Link
                href={d.href}
                className="group grid gap-2 py-7 text-ink no-underline sm:grid-cols-12 sm:items-baseline sm:gap-8"
              >
                <span className="font-serif text-[1.625rem] font-semibold leading-tight group-hover:underline sm:col-span-5">{d.title}</span>
                <span className="text-ink-2 sm:col-span-6">{d.text}</span>
                <ArrowRight className="hidden size-6 justify-self-end text-ink-3 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green sm:col-span-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="districts-title" className="mx-auto max-w-[1360px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:gap-16">
          <h2 id="districts-title" className="text-[clamp(1.875rem,3vw,2.5rem)] leading-tight lg:col-span-6">
            Ten districts, one community
          </h2>
          <p className="max-w-[58ch] text-ink-2 lg:col-span-6">
            Housing for every stage of life, a wine and culinary village, health care, hospitality, parks and
            four-season recreation, planned as one whole on the Apple Blossom Center platform. Figures are planning
            concepts, not commitments.
          </p>
        </div>
        <DistrictLegend districts={districts} viewBox={PLAN_VIEWBOX} sourceChips={sourceChips} />
      </section>

      <section aria-labelledby="stewardship-title" className="border-t border-rule">
        <div className="mx-auto grid max-w-[1360px] gap-8 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
          <h2 id="stewardship-title" className="text-[clamp(1.875rem,3vw,2.5rem)] leading-tight lg:col-span-5">
            Planned and stewarded for the long term
          </h2>
          <div className="lg:col-span-7">
            <p className="max-w-[60ch] text-ink-2">
              Chelan Village, LP is the master planner and long-term steward. It sets the framework that builders,
              operators, healthcare providers and investors work within, so the community grows in coordinated phases
              and strengthens historic Downtown Chelan rather than competing with it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/partners"
                className="inline-flex min-h-12 items-center gap-2 rounded-[3px] bg-green px-5 font-medium text-on-green no-underline transition-[filter] duration-150 hover:brightness-110"
              >
                Become a Partner
                <ArrowRight />
              </Link>
              <Link href="/about" className="font-medium text-green underline decoration-1 underline-offset-[0.3em] hover:decoration-2">
                How we plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
