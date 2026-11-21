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

/**
 * "What makes it different" (Nov 20, 2026 layout, after villiers.ai's "Why" list): the heading and
 * link on the left, a numbered list on the right, each item under a 3px Deep Sage rule.
 * One column below 1024px.
 */
export function Differences() {
  return (
    <section
      aria-labelledby="different-title"
      className="grid grid-cols-1 gap-x-[clamp(24px,4vw,64px)] gap-y-12 bg-linen px-[clamp(16px,4vw,56px)] py-[clamp(80px,9vw,120px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
    >
      <div className="flex flex-col items-start gap-8">
        <Reveal as="h2" kind="head" id="different-title" className="max-w-[440px] text-[clamp(40px,4.5vw,60px)] leading-none">
          What makes it different
        </Reveal>
        <Link
          href="/plan"
          className="inline-flex min-h-11 items-center text-lg font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-[0.2em] hover:text-hearth"
        >
          See the whole plan&nbsp;<span aria-hidden="true">→</span>
        </Link>
      </div>
      <ol className="flex flex-col gap-10">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            as="li"
            kind="card"
            index={i}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3 border-t-[3px] border-sage-deep pt-6 md:grid-cols-[auto_minmax(0,5fr)_minmax(0,7fr)] md:gap-x-10"
          >
            <span aria-hidden="true" className="font-display text-[28px] font-semibold leading-[1.1] text-muted">
              {i + 1}.
            </span>
            <h3 className="text-[28px] leading-[1.1] tracking-[-0.015em]">{item.title}</h3>
            <p className="col-start-2 md:col-start-3">{item.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
