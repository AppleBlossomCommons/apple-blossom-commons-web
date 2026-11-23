import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ReportCard } from "@/components/research/ReportCard";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";
import { eyebrow } from "@/components/site/layout";
import { RuleList } from "@/components/site/RuleList";
import { plannedReports, visibleReports } from "@/lib/research";

// Copy from docs/15-research-library-content.md, section 3. Report cards come from
// data/research.json; on production only published reports are listed (lib/research.ts).
export const metadata: Metadata = {
  title: "Research Library",
  description:
    "Short, plain-language reports on the Lake Chelan Valley and the plan for Apple Blossom Commons: growing older, care close by, lessons from other communities and the village economy.",
};

const approach = [
  {
    title: "Public sources.",
    text: "Figures come from public sources such as the U.S. Census Bureau and Washington State agencies, each listed with its date.",
  },
  { title: "Plain language.", text: "Numbers are rounded, terms are explained, and charts carry most of the figures." },
  { title: "Kept up to date.", text: "We'll update each report as plans firm up and better information becomes available." },
];

const stayInTouch: Doorway[] = [
  {
    href: "/participate#update-list",
    title: "Get updates.",
    text: "We'll let you know when new reports are published.",
    cta: "Join the update list",
    fill: "#DDF1FC",
  },
  {
    href: "/partners",
    title: "Working with us?",
    text: "Investors, operators and land buyers can ask about more detailed materials.",
    cta: "Partner with Us",
    fill: "#EAF6CF",
  },
];

const sectionPad = "px-5 py-14 sm:px-[clamp(16px,4vw,56px)] lg:px-(--frame-gutter) sm:py-[88px]";
const sectionTitle = "text-4xl leading-none sm:text-section";

export default function ResearchPage() {
  const reports = visibleReports();
  const planned = plannedReports();

  return (
    <>
      {/* Intro: text on a linen panel beside the Lake Chelan photo (no fades over the photo) */}
      <section aria-labelledby="research-title" className="px-2 sm:px-4 lg:px-(--frame-gutter)">
        <div className="grid items-stretch overflow-hidden rounded-hero-sm bg-sand sm:rounded-hero min-[1000px]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="flex flex-col justify-end gap-4 px-5 pb-8 pt-10 sm:gap-6 sm:px-12 sm:pb-14 sm:pt-16 min-[1000px]:px-16">
            <Reveal as="p" kind="fade" className={eyebrow}>
              Research Library
            </Reveal>
            <Reveal as="h1" kind="head" id="research-title" className="text-[46px] leading-[0.98] sm:text-page sm:leading-[0.96] sm:tracking-[-0.03em]">
              The research behind the plan
            </Reveal>
            <Reveal as="p" kind="fade" className="max-w-[640px] sm:text-[21px] sm:leading-normal">
              Good planning starts with learning. These reports share what we&apos;ve found about the Lake Chelan Valley: who lives here, what
              people need as they grow older, how care is reached today, and what a small village could add. Each one is short, written in plain
              language, and lists its sources so you can check our work.
            </Reveal>
            {reports.length > 0 && (
              <Reveal as="div" kind="fade" className="mt-2 border-t border-line pt-5 sm:mt-4 sm:pt-6">
                <h2 className={`mb-2 ${eyebrow}`}>In this library</h2>
                <ol className="flex flex-col">
                  {reports.map((r) => (
                    <li key={r.slug} className="border-b border-line last:border-b-0">
                      <a
                        href={`#report-${r.slug}`}
                        className="group flex min-h-11 items-baseline gap-4 py-2.5 text-hearth no-underline hover:text-hearth"
                      >
                        <span className="w-6 shrink-0 text-[0.9375rem] font-bold tabular-nums text-muted">
                          {String(r.number).padStart(2, "0")}
                        </span>
                        <span className="shrink-0 font-bold group-hover:underline group-hover:decoration-sage-deep group-hover:decoration-2 group-hover:underline-offset-4">
                          {r.title}
                        </span>
                        <span className="hidden min-w-0 truncate text-muted sm:inline">{r.subtitle}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>
          <div className="relative aspect-[3/2] min-[1000px]:aspect-auto min-[1000px]:min-h-[560px]">
            {/* Decorative landscape: the heading beside it carries the page's message. Its own file, so
                rerunning prepare:research (which rewrites the report-NN-photo images) never changes it. */}
            <Image src="/images/research/library-hero-lake.jpg" alt="" fill priority sizes="(min-width: 1000px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Reports */}
      {reports.length > 0 && (
        <section id="reports" aria-labelledby="reports-title" className={sectionPad}>
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 min-[1000px]:flex-row min-[1000px]:items-end min-[1000px]:justify-between min-[1000px]:gap-10">
            <Reveal as="h2" kind="head" id="reports-title" className={sectionTitle}>
              Read the reports
            </Reveal>
            <Reveal as="p" kind="fade" className="max-w-[460px] text-muted sm:text-lg">
              Each report has a short summary on this site and a full PDF to download, with every source listed.
            </Reveal>
          </div>
          <ul className="grid gap-4 min-[1000px]:grid-cols-2 sm:gap-5">
            {reports.map((r, i) => (
              <ReportCard key={r.slug} id={`report-${r.slug}`} report={r} index={i} />
            ))}
          </ul>
        </section>
      )}

      {/* How we put these together */}
      <section id="our-approach" aria-labelledby="approach-title" className={`bg-sand ${sectionPad}`}>
        <Reveal as="h2" kind="head" id="approach-title" className={`mb-10 sm:mb-14 ${sectionTitle}`}>
          How we put these together
        </Reveal>
        <RuleList items={approach} layout="three" />
        <Reveal as="p" kind="fade" className="mt-12 max-w-[640px] text-muted sm:mt-16">
          These reports are prepared by the Apple Blossom Commons team to explain our thinking. Plans described in them are illustrative
          concepts and may change.
        </Reveal>
      </section>

      {/* More reports on the way: outlined cards on the same shelf as the published ones */}
      {planned.length > 0 && (
        <section id="coming-next" aria-labelledby="coming-next-title" className={sectionPad}>
          <Reveal as="h2" kind="head" id="coming-next-title" className={`mb-4 ${sectionTitle}`}>
            More reports on the way
          </Reveal>
          <Reveal as="p" kind="fade" className="mb-10 max-w-[640px] sm:mb-14 sm:text-xl">
            We&apos;re working on more reports, including:
          </Reveal>
          <ul className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {planned.map((p, i) => (
              <Reveal
                as="li"
                kind="card"
                index={i}
                key={p.number}
                className="flex flex-col gap-2.5 rounded-card border-2 border-dashed border-line p-5 sm:p-7"
              >
                <p className={eyebrow}>Report {p.number}</p>
                <h3 className="text-[24px] leading-[1.1] tracking-[-0.015em] sm:text-[28px]">{p.title}</h3>
                <p className="text-muted">{p.subtitle}</p>
                <span className="mt-1 inline-flex h-7 items-center self-start rounded-full bg-sand px-3 text-[0.875rem] font-bold text-hearth">
                  In preparation
                </span>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Stay in touch */}
      <DoorwayCards id="stay-in-touch" doorways={stayInTouch} heading={{ id: "stay-in-touch-title", title: "Stay in touch" }} />
    </>
  );
}
