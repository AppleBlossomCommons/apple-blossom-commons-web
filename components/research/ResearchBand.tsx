import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ReportCard } from "@/components/research/ReportCard";
import { visibleReports } from "@/lib/research";

/** "The research" band on Partner with Us (docs/15, section 7): text, compact report cards, a link. */
export function ResearchBand() {
  const reports = visibleReports();
  return (
    <section id="research" aria-labelledby="partner-research-title" className="bg-sand px-5 py-14 sm:px-[clamp(16px,4vw,56px)] sm:py-[104px]">
      <div className="mb-10 flex max-w-[760px] flex-col gap-5 sm:mb-14">
        <Reveal as="h2" kind="head" id="partner-research-title" className="text-4xl leading-none sm:text-[clamp(40px,4.2vw,60px)]">
          The research
        </Reveal>
        <Reveal as="p" kind="fade" className="sm:text-xl">
          Our public reports set out the evidence behind the plan, from the valley&apos;s growing older population to the visitors and neighbors
          a village would serve. Partners can ask about more detailed materials through the inquiry form.
        </Reveal>
      </div>
      {reports.length > 0 && (
        <ul className="mb-8 grid gap-4 md:grid-cols-2 md:gap-5 [&>li]:bg-linen">
          {reports.map((r, i) => (
            <ReportCard key={r.slug} report={r} index={i} compact />
          ))}
        </ul>
      )}
      <Link
        href="/research"
        className="inline-flex min-h-11 items-center font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth"
      >
        See the Research Library&nbsp;<span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
