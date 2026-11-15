import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { buttonClass } from "@/components/site/buttons";
import { eyebrow } from "@/components/site/layout";
import { downloadLabel, type Report } from "@/lib/research";

/** "Draft for review": shown on previews only, since production never lists a draft. */
export function DraftLabel({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-7 items-center self-start rounded-full bg-tint-butter px-3 text-[0.875rem] font-bold text-hearth ${className}`}>
      Draft for review
    </span>
  );
}

/** The PDF link: opens in a new tab, with the page count in its accessible name (docs/15, 5.4). */
export function DownloadLink({ report, label, className }: { report: Report; label: string; className: string }) {
  return (
    <a href={report.pdf.href} target="_blank" rel="noopener" aria-label={downloadLabel(report)} className={className}>
      {label}
    </a>
  );
}

/**
 * A report on the shelf: the cover like a book, then its number, title, subtitle, card text and
 * the two actions (docs/15, section 3.2). `compact` is the smaller card used on report pages and
 * Partner with Us.
 */
export function ReportCard({
  report,
  index = 0,
  compact = false,
  titleAs: Title = "h3",
}: {
  report: Report;
  index?: number;
  compact?: boolean;
  titleAs?: "h2" | "h3";
}) {
  return (
    <Reveal
      as="li"
      kind="card"
      index={index}
      className={`grid items-start gap-5 rounded-card bg-sand ${compact ? "grid-cols-[88px_minmax(0,1fr)] p-5 sm:grid-cols-[104px_minmax(0,1fr)] sm:p-6" : "grid-cols-[96px_minmax(0,1fr)] p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-7 sm:p-7"}`}
    >
      {/* Decorative: the title beside it names the report (docs/15, section 8). */}
      <Image
        src={report.cover.thumb}
        alt=""
        width={600}
        height={777}
        sizes={compact ? "104px" : "(min-width: 640px) 160px, 96px"}
        className="h-auto w-full rounded-[6px] shadow-[0_1px_2px_rgb(59_47_42/0.12),0_8px_24px_-12px_rgb(59_47_42/0.35)]"
      />
      <div className="flex min-w-0 flex-col gap-2.5">
        {report.status === "draft" && <DraftLabel />}
        <p className={eyebrow}>Report {report.number}</p>
        <Title className={compact ? "text-[24px] leading-[1.1] tracking-[-0.015em]" : "text-[26px] leading-[1.08] tracking-[-0.015em] sm:text-[32px]"}>
          <Link href={`/research/${report.slug}`} className="text-hearth no-underline hover:text-hearth hover:underline hover:decoration-sage-deep hover:decoration-2 hover:underline-offset-4">
            {report.title}
          </Link>
        </Title>
        <p className="text-muted">{report.subtitle}</p>
        {!compact && <p className="mt-1">{report.card}</p>}
        <p className="text-[0.9375rem] text-muted">
          {report.pages}-page PDF · {report.updatedLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-2.5">
          <Link href={`/research/${report.slug}`} className={buttonClass("primary", "md")} aria-label={`Read the summary: ${report.title}`}>
            Read the summary
          </Link>
          <DownloadLink report={report} label="Download PDF" className={buttonClass("secondary", "md")} />
        </div>
      </div>
    </Reveal>
  );
}
