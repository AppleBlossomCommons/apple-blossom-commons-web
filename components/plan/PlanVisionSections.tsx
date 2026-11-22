import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ResearchLink } from "@/components/research/ResearchLink";
import { DistrictPageLink } from "@/components/plan/PlanPlaceSections";
import { PlaceCard } from "@/components/site/Places";
import { getDistrictByKey, type Place } from "@/lib/districts";
import { visionImages } from "@/lib/place-images";

// Copy from docs/14-plan-vision-content.md (The Plan: the whole vision). General explainer copy
// lives here, like the other Plan sections; district places come from data/districts.json.

const sectionPad = "px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]";
const headingClass = "text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]";
const introClass = "max-w-[760px] text-xl leading-normal sm:text-[23px]";
const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:decoration-hearth";

const pillars: { place: Place; image: keyof typeof visionImages; more: { href: string; label: string } }[] = [
  {
    image: "home",
    more: { href: "/plan/living-and-care#life-plan", label: "Homes for every stage of life" },
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

/**
 * "Heritage Grove: support, when it's needed" (#heritage-grove, docs/14 section 5), short form for
 * Neighborhoods for a lifetime (Nov 19, 2026). The full place cards (levels of care and everyday life) live on
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
