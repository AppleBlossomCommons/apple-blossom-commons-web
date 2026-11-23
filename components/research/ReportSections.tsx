import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ReportChart } from "@/components/research/charts/ReportChart";
import { DownloadLink, DraftLabel, ReportCard } from "@/components/research/ReportCard";
import { buttonClass } from "@/components/site/buttons";
import { eyebrow } from "@/components/site/layout";
import { ConceptNote } from "@/components/site/Places";
import { RuleList } from "@/components/site/RuleList";
import { getDistrict } from "@/lib/districts";
import { getReport, type Report } from "@/lib/research";

// The ten sections of a report page (docs/15, section 4). Section headings are fixed copy from the
// content pack; everything else comes from data/research.json.

const sectionPad = "px-5 py-14 sm:px-[clamp(16px,4vw,56px)] lg:px-(--frame-gutter) sm:py-[84px]";
const sectionTitle = "text-4xl leading-none sm:text-section";
const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";

function Section({ id, title, className = "", children }: { id: string; title: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${sectionPad} ${className}`}>
      <Reveal as="h2" kind="head" id={`${id}-title`} className={`mb-8 sm:mb-12 ${sectionTitle}`}>
        {title}
      </Reveal>
      {children}
    </section>
  );
}

/** 1 · Header: soft photo band beside the title, no dark background or fades. */
export function ReportHeader({ report }: { report: Report }) {
  return (
    <section aria-labelledby="report-title" className="px-2 sm:px-4 lg:px-(--frame-gutter)">
      <div className="grid items-stretch overflow-hidden rounded-hero-sm bg-sand sm:rounded-hero min-[1000px]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="flex flex-col justify-end gap-4 px-5 pb-8 pt-10 sm:gap-5 sm:px-12 sm:pb-14 sm:pt-16 min-[1000px]:px-16">
          {report.status === "draft" && <DraftLabel />}
          <p className={eyebrow}>
            <Link href="/research" className="text-muted underline decoration-line decoration-2 underline-offset-4 hover:text-hearth">
              Research Library
            </Link>{" "}
            · Report {report.number}
          </p>
          <Reveal as="h1" kind="head" id="report-title" className="text-[44px] leading-[0.98] sm:text-page sm:tracking-[-0.03em]">
            {report.title}
          </Reveal>
          <Reveal as="p" kind="fade" className="text-xl text-muted sm:text-2xl">
            {report.subtitle}
          </Reveal>
          <p className="text-[0.9375rem] text-muted">
            {report.updatedLabel} · {report.pages}-page PDF
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <DownloadLink report={report} label="Download the full report (PDF)" className={buttonClass("primary", "lg")} />
            <Link href="/research" className={buttonClass("secondary", "lg")}>
              All reports
            </Link>
          </div>
        </div>
        <div className="relative aspect-[3/2] min-[1000px]:aspect-auto min-[1000px]:min-h-[520px]">
          <Image src={report.cover.photo} alt={report.cover.alt} fill priority sizes="(min-width: 1000px) 45vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/** 2 · Lead. */
export function ReportLead({ report }: { report: Report }) {
  return (
    <div className={`${sectionPad} pb-0 sm:pb-0`}>
      <Reveal as="p" kind="fade" className="max-w-[900px] text-[22px] leading-[1.4] sm:text-[clamp(24px,2.2vw,30px)]">
        {report.lead}
      </Reveal>
    </div>
  );
}

/** 3 · Key findings: numbered cards; the closing finding spans the row in a soft panel. */
export function KeyFindings({ report }: { report: Report }) {
  return (
    <Section id="key-findings" title="Key findings">
      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {report.findings.map((f, i) => (
          <Reveal
            key={f.title}
            as="li"
            kind="card"
            index={i}
            className={`flex flex-col gap-3 rounded-card p-6 sm:p-8 ${f.highlight ? "bg-tint-lime sm:col-span-2 lg:col-span-3" : "bg-sand"}`}
          >
            <span className="text-[0.9375rem] font-bold text-muted">{i + 1}</span>
            {f.stat && (
              <p className="flex flex-col gap-1">
                <span className="font-display text-[48px] font-bold leading-none tracking-[-0.02em] sm:text-[56px]">{f.stat}</span>
                <span className="text-muted">{f.statLabel}</span>
              </p>
            )}
            <h3 className={`font-sans font-bold leading-snug ${f.highlight ? "text-[22px] sm:text-[26px]" : "text-[19px]"} ${f.stat ? "mt-2" : ""}`}>
              {f.title}
            </h3>
            <p className={f.highlight ? "max-w-[760px] sm:text-lg" : ""}>{f.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/** 4 · A closer look: the report's charts. */
export function CloserLook({ report }: { report: Report }) {
  if (report.charts.length === 0) return null;
  return (
    <Section id="closer-look" title="A closer look" className="pt-0 sm:pt-0">
      <div className="flex flex-col gap-16 sm:gap-24">
        {report.charts.map((c) => (
          <ReportChart key={c.id} chart={c} />
        ))}
      </div>
    </Section>
  );
}

/** 5 · Extra sections (Reports 4 and 6). */
export function ExtraSections({ report }: { report: Report }) {
  return report.extraSections.map((s) => (
    <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={`bg-sand ${sectionPad}`}>
      <div className="mb-10 flex max-w-[760px] flex-col gap-5 sm:mb-14">
        <Reveal as="h2" kind="head" id={`${s.id}-title`} className={sectionTitle}>
          {s.heading}
        </Reveal>
        <Reveal as="p" kind="fade" className="sm:text-xl">
          {s.intro}
        </Reveal>
      </div>
      <RuleList items={s.items} layout={s.items.length > 3 ? "three" : "auto"} />
      {s.concept && <ConceptNote className="mt-10 sm:mt-12" />}
    </section>
  ));
}

/** 6 · How Apple Blossom Commons responds: what we found → what's planned. */
export function Responds({ report }: { report: Report }) {
  const { intro, rows, note } = report.responds;
  return (
    <Section id="responds" title="How Apple Blossom Commons responds">
      <Reveal as="p" kind="fade" className="mb-10 max-w-[760px] sm:mb-14 sm:text-xl">
        {intro}
      </Reveal>
      <div className="hidden grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 border-b-[3px] border-sage-deep pb-3 font-bold md:grid">
        <span>What we found</span>
        <span>What&apos;s planned</span>
      </div>
      <ul>
        {rows.map((row, i) => {
          const district = row.district ? getDistrict(row.district) : undefined;
          return (
            <Reveal
              key={row.found}
              as="li"
              kind="card"
              index={i}
              className="grid gap-1.5 border-b border-line py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:py-6"
            >
              <p className="text-[0.9375rem] text-muted md:text-lg md:text-hearth">
                <span className="sr-only">What we found: </span>
                {row.found}
              </p>
              <div className="flex flex-col gap-2">
                <p className="sm:text-lg">
                  <span className="sr-only">What&apos;s planned: </span>
                  <span aria-hidden="true" className="mr-1.5 text-muted md:hidden">
                    →
                  </span>
                  {row.planned}
                  {row.concept && (
                    <>
                      {" "}
                      <em className="text-muted">(concept)</em>
                    </>
                  )}
                </p>
                {district && (
                  <Link href={`/districts/${district.slug}`} className={`self-start text-[0.9375rem] ${inlineLink}`}>
                    Learn about {district.name} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </Reveal>
          );
        })}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10">
        <p className="max-w-[760px]">{note}</p>
        <ConceptNote />
      </div>
    </Section>
  );
}

const forYouFills = ["bg-tint-sky", "bg-tint-pink", "bg-tint-lime", "bg-tint-butter"];

/** 7 · What this means for you: one card per reader. */
export function ForYou({ report }: { report: Report }) {
  return (
    <Section id="for-you" title="What this means for you" className="pt-0 sm:pt-0">
      <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
        {report.forYou.map((card, i) => (
          <Reveal key={card.audience} as="li" kind="card" index={i} className={`flex flex-col gap-3 rounded-card p-6 sm:p-9 ${forYouFills[i % forYouFills.length]}`}>
            <h3 className="text-[24px] leading-[1.1] tracking-[-0.015em] sm:text-[28px]">{card.audience}</h3>
            <p className="sm:text-lg">{card.text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** 8 · What comes next. */
export function WhatsNext({ report }: { report: Report }) {
  return (
    <Section id="whats-next" title="What comes next" className="bg-sand">
      <Reveal kind="fade" className="flex max-w-[760px] flex-col gap-5 sm:text-xl">
        <p>As plans firm up, we&apos;ll share more about:</p>
        <ul className="flex flex-col gap-3 pl-1">
          {report.next.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-sage-deep" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
      <Link href="/participate#update-list" className={`mt-10 ${buttonClass("primary", "lg")}`}>
        Join the update list
      </Link>
    </Section>
  );
}

/** 9 · About the data: the note, the sources and the download again. */
export function AboutTheData({ report }: { report: Report }) {
  return (
    <Section id="about-the-data" title="About the data">
      <Reveal as="p" kind="fade" className="mb-10 max-w-[760px] sm:text-lg">
        {report.aboutTheData}
      </Reveal>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[0.9375rem]">
          <caption className="sr-only">Sources for {report.title}</caption>
          <thead>
            <tr className="border-b-[3px] border-sage-deep">
              <th scope="col" className="py-3 pr-6 font-bold">Source</th>
              <th scope="col" className="py-3 pr-6 font-bold">What we used it for</th>
              <th scope="col" className="py-3 font-bold">Date</th>
            </tr>
          </thead>
          <tbody>
            {report.sources.map((s) => (
              <tr key={s.name} className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-6 font-normal">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener" className={inlineLink.replace("font-bold ", "")}>
                      {s.name}
                    </a>
                  ) : (
                    s.name
                  )}
                </th>
                <td className="py-3 pr-6">{s.use}</td>
                <td className="py-3 text-muted">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DownloadLink report={report} label="Download the full report (PDF)" className={`mt-10 ${buttonClass("primary", "lg")}`} />
    </Section>
  );
}

/** 10 · More from the library: the related reports this deployment may show. */
export function MoreFromLibrary({ report }: { report: Report }) {
  const related = report.related.map(getReport).filter((r): r is Report => Boolean(r)).slice(0, 2);
  return (
    <Section id="more" title="More from the library" className="bg-sand">
      {related.length > 0 && (
        <ul className="mb-8 grid gap-4 md:grid-cols-2 md:gap-5 [&>li]:bg-linen">
          {related.map((r, i) => (
            <ReportCard key={r.slug} report={r} index={i} compact />
          ))}
        </ul>
      )}
      <Link href="/research" className={inlineLink}>
        See all reports <span aria-hidden="true">→</span>
      </Link>
    </Section>
  );
}
