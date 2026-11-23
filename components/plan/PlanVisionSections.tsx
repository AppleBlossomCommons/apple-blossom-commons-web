import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ResearchCallout } from "@/components/research/ResearchCallout";
import { PlaceCard } from "@/components/site/Places";
import type { Place } from "@/lib/districts";
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
    more: { href: "/plan/neighborhoods#life-plan", label: "Homes for every stage of life" },
    place: {
      name: "A home for every chapter.",
      text: "Cottages and townhomes for active years, and independent living, assisted living, memory care and nursing care for when more support helps. Moving between them doesn't mean leaving your neighbors.",
    },
  },
  {
    image: "care",
    more: { href: "/plan/neighborhoods#care-close-by", label: "Care, close by" },
    place: {
      name: "Care, a short walk away.",
      text: "The senior neighborhoods are planned beside the hospital campus, with clinics, therapy and rehabilitation planned nearby in the Wellness District.",
    },
  },
  {
    image: "technology",
    more: { href: "/plan/neighborhoods#technology", label: "Technology that supports people" },
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
      <ResearchCallout slug="growing-older-by-the-lake" size="large" className="mt-8 sm:mt-10" />
    </section>
  );
}
