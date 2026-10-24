import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

// Copy from docs/10-content-v2.md, Home section 4.
const items = [
  {
    title: "Care, close by.",
    text: "Senior homes are planned within a short walk of the hospital campus and clinics.",
  },
  {
    title: "A home for every chapter.",
    text: "Independent homes, assisted living and memory care are planned in one connected community, so moving between them doesn't mean leaving your neighbors.",
  },
  {
    title: "Everything within a stroll.",
    text: "Coffee, dinner, a glass of wine and the trailhead, all planned within about a 15-minute walk of the village center.",
  },
];

/** "What makes it different": three short items under a 3px Deep Sage rule. */
export function Differences() {
  return (
    <section aria-labelledby="different-title" className="px-[clamp(16px,4vw,56px)] py-[clamp(80px,9vw,120px)]">
      <Reveal as="h2" kind="head" id="different-title" className="mb-14 max-w-[640px] text-[clamp(40px,4.5vw,60px)] leading-none">
        What makes it different
      </Reveal>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-12 gap-y-10">
        {items.map((item, i) => (
          <Reveal key={item.title} as="li" kind="card" index={i} className="flex flex-col gap-3 border-t-[3px] border-sage-deep pt-6">
            <h3 className="text-[28px] leading-[1.1] tracking-[-0.015em]">{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </ul>
      <Link
        href="/plan"
        className="mt-10 inline-flex min-h-11 items-center text-lg font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-[0.2em] hover:text-hearth"
      >
        See the whole plan&nbsp;<span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
