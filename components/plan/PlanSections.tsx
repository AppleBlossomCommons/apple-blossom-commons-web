import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";

// Copy from docs/10-content-v2.md, "The Plan (/plan)". Image notes from the Phase 1 handoff.

/** Hero: an inset image card with the page title (520px tall; 380px on phones). */
export function PlanHero() {
  return (
    <section aria-labelledby="plan-title" className="px-2 sm:px-4">
      <div className="relative isolate flex h-[380px] items-end overflow-hidden rounded-hero-sm px-5 pb-6 sm:h-[520px] sm:rounded-hero sm:px-16 sm:pb-14">
        <PlaceholderImage
          gradient="linear-gradient(175deg, #FFE3B3 0%, #FBC88A 24%, #A8CF55 44%, #4F9FD2 64%, #2A78AB 100%)"
          className="absolute inset-0 -z-10"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(45_32_24/0)_40%,rgb(45_32_24/0.6)_100%)]" />
        <PlaceholderLabel inset={20}>Stock photo: orchard hills sloping down to the lake, soft morning light, no buildings</PlaceholderLabel>
        <Reveal as="h1" kind="head" id="plan-title" className="text-[56px] leading-[0.95] tracking-[-0.03em] text-white sm:text-[clamp(72px,7.8vw,112px)]">
          The plan
        </Reveal>
      </div>
    </section>
  );
}

export function PlanIntro() {
  return (
    <section className="px-5 pb-14 pt-10 sm:px-[clamp(16px,4vw,56px)] sm:pb-[104px] sm:pt-[88px]">
      <Reveal as="p" kind="fade" className="max-w-[960px] text-xl leading-normal sm:text-[28px] sm:leading-[1.45] sm:tracking-[-0.005em]">
        Apple Blossom Commons is a long-range plan for about 160 acres near Lake Chelan. It is meant to grow slowly, one neighborhood at a time,
        over many years. Each part is planned to work with the others: homes near care, a small village within walking distance, and parks and
        open space throughout.
      </Reveal>
    </section>
  );
}

const fits = [
  {
    title: "Homes for every stage of life.",
    text: "Cottages and townhomes for active adults, independent and assisted living, memory care, and family homes and apartments.",
  },
  {
    title: "A small village.",
    text: "Cafés, restaurants, tasting rooms and shops along a walkable lane, sized to add to downtown Chelan, not compete with it.",
  },
  { title: "Parks and open space.", text: "A recreation park, trails and a large orchard preserve." },
  { title: "Built in phases.", text: "Each neighborhood comes when there is real demand for it." },
];

/** "How it fits together": four short items under a 3px Deep Sage rule. */
export function FitsTogether() {
  return (
    <section aria-labelledby="fits-title" className="px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]">
      <Reveal as="h2" kind="head" id="fits-title" className="mb-7 text-[34px] leading-none sm:mb-14 sm:text-[clamp(40px,4.2vw,60px)]">
        How it fits together
      </Reveal>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-7 sm:gap-10">
        {fits.map((item, i) => (
          <Reveal key={item.title} as="li" kind="card" index={i} className="flex flex-col gap-2 border-t-[3px] border-sage-deep pt-4 sm:gap-3 sm:pt-6">
            <h3 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** "Care, close by" (#care-close-by; was Connected Community). Names the hospital campus only. */
export function CareCloseBy() {
  return (
    <section
      id="care-close-by"
      aria-labelledby="care-title"
      className="grid gap-4 bg-sand p-2 pb-0 sm:p-4 min-[900px]:grid-cols-2"
    >
      <Reveal kind="card" className="relative h-[300px] overflow-hidden rounded-card min-[900px]:h-auto min-[900px]:min-h-[680px]">
        <PlaceholderImage gradient="linear-gradient(160deg, #FFF0C8 0%, #B5D66E 48%, #78A635 100%)" className="absolute inset-0" />
        <PlaceholderLabel>Stock photo (people): older couple on a calm walking path lined with trees; no clinical imagery</PlaceholderLabel>
      </Reveal>
      <div className="flex flex-col justify-center gap-3.5 px-3 pb-12 pt-8 sm:gap-5 sm:px-14 sm:py-16">
        <Reveal as="h2" kind="head" id="care-title" className="text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]">
          Care, close by
        </Reveal>
        <Reveal as="p" kind="fade" className="max-w-[560px] sm:text-xl">
          The senior neighborhoods, Orchard Grove and Heritage Grove, are planned within a short walk of the hospital campus. The Wellness District
          nearby is planned for clinics, therapy and medical-assisted living.
        </Reveal>
        <div aria-hidden="true" className="my-2.5 h-px bg-line sm:my-4" />
        <h3 className="text-2xl leading-[1.1] tracking-[-0.02em] sm:text-[30px]">Technology that supports people</h3>
        <p className="max-w-[560px]">
          We&apos;re exploring ideas like virtual visits with specialists, home sensors that can alert a caregiver, and walking paths designed for
          everyday health. These are ideas for supporting independence and caregivers. They will never replace the people who give care, and
          residents will decide how their own information is used.
        </p>
        <Link
          href="/research"
          className="inline-flex min-h-11 items-center self-start font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth"
        >
          Read the full vision&nbsp;<span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

/** "Why Chelan" (#why-chelan; was Chelan & the Region): a large photo tile with the text, and a second photo. */
export function WhyChelan() {
  return (
    <section
      id="why-chelan"
      aria-labelledby="why-title"
      className="grid gap-1.5 px-2 pb-2 pt-14 sm:gap-2 sm:px-4 sm:pb-4 sm:pt-[120px] min-[900px]:grid-cols-[1.6fr_1fr]"
    >
      <Reveal
        kind="card"
        index={0}
        className="relative isolate flex h-[560px] flex-col justify-end gap-3.5 overflow-hidden rounded-card p-[22px] text-white sm:h-[680px] sm:gap-5 sm:p-14"
      >
        <PlaceholderImage gradient="linear-gradient(170deg, #FFE3B3 0%, #F8BE88 38%, #E8893A 68%, #A9581F 100%)" className="absolute inset-0 -z-10" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(45_32_24/0)_30%,rgb(45_32_24/0.66)_100%)]" />
        <PlaceholderLabel>Stock photo: vineyard rows in autumn</PlaceholderLabel>
        <h2 id="why-title" className="text-[44px] leading-[0.98] sm:text-[clamp(56px,5.6vw,80px)]">
          Why Chelan
        </h2>
        <p className="max-w-[640px] sm:text-[21px]">
          Four seasons, the lake, orchards and vineyards, and a small-town pace. People come to Chelan for the same reasons they stay. The plan is
          shaped to protect what makes this place special: the views, the open space and a town that knows its neighbors.
        </p>
      </Reveal>
      <Reveal kind="card" index={1} className="relative h-[240px] overflow-hidden rounded-card sm:h-[680px]">
        <PlaceholderImage gradient="linear-gradient(180deg, #FFFFFF 0%, #DCEEFA 45%, #8CCBEF 100%)" className="absolute inset-0" />
        <PlaceholderLabel>Stock photo: snowy trail in winter</PlaceholderLabel>
      </Reveal>
    </section>
  );
}
