import Image from "next/image";
import Link from "next/link";
import { eyebrow } from "@/components/site/layout";
import { getReport } from "@/lib/research";

const sizes = {
  /** For a card inside another card or a narrow column (Neighborhoods). */
  compact: {
    card: "max-w-[640px] grid-cols-[72px_minmax(0,1fr)] gap-5 p-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-6 sm:p-5",
    imageSizes: "(min-width: 640px) 96px, 72px",
    title: "text-[21px] sm:text-[24px]",
    subtitle: "text-[0.9375rem] sm:text-base",
  },
  /** For a card that sits on its own in a full-width section (The Plan, The Village and Chelan). */
  large: {
    card: "max-w-[880px] grid-cols-[104px_minmax(0,1fr)] gap-5 p-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-9 sm:p-7 lg:grid-cols-[220px_minmax(0,1fr)]",
    imageSizes: "(min-width: 1024px) 220px, (min-width: 640px) 200px, 104px",
    title: "text-[24px] sm:text-[34px]",
    subtitle: "text-base sm:text-lg",
  },
} as const;

/**
 * A "From the research" card for Plan pages: the report's PDF cover beside its number, title and
 * subtitle. The whole card is one link (a stretched link on the title), so it is one tab stop.
 * Like ResearchLink, it renders nothing when the report can't be shown on this deployment.
 */
export function ResearchCallout({
  slug,
  size = "compact",
  surface = "sand",
  className = "",
}: {
  slug: string;
  size?: keyof typeof sizes;
  /** Card color: "linen" for cards that sit on a sand section, so the card still reads as a card. */
  surface?: "sand" | "linen";
  className?: string;
}) {
  const report = getReport(slug);
  if (!report) return null;
  const s = sizes[size];
  return (
    <div
      className={`group relative grid w-full items-center self-start rounded-card ${s.card} ${surface === "linen" ? "bg-linen" : "bg-sand"} transition-[background-color,box-shadow] duration-200 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-hearth hover:shadow-[0_1px_2px_rgb(59_47_42/0.10),0_10px_28px_-16px_rgb(59_47_42/0.40)] ${className}`}
    >
      {/* Decorative: the title beside it names the report. */}
      <Image
        src={report.cover.thumb}
        alt=""
        width={600}
        height={777}
        sizes={s.imageSizes}
        className="h-auto w-full rounded-[4px] shadow-[0_1px_2px_rgb(59_47_42/0.12),0_8px_20px_-12px_rgb(59_47_42/0.35)]"
      />
      <div className={`flex min-w-0 flex-col ${size === "large" ? "gap-2 sm:gap-3" : "gap-1.5"}`}>
        <p className={eyebrow}>From the research · Report {report.number}</p>
        <p className={`font-display font-semibold leading-[1.1] tracking-[-0.015em] text-hearth ${s.title}`}>
          <Link
            href={`/research/${report.slug}`}
            className="text-hearth no-underline outline-none after:absolute after:inset-0 after:rounded-card after:content-[''] group-hover:underline group-hover:decoration-sage-deep group-hover:decoration-2 group-hover:underline-offset-4"
          >
            {report.title}
          </Link>
        </p>
        <p className={`leading-snug text-muted ${s.subtitle}`}>{report.subtitle}</p>
        {size === "large" && <p className="hidden max-w-[52ch] sm:block">{report.card}</p>}
        <p aria-hidden="true" className={`font-bold text-hearth ${size === "large" ? "mt-1 text-[0.9375rem] sm:mt-2 sm:text-base" :"mt-1 text-[0.9375rem]"}`}>
          Read the summary&nbsp;→
        </p>
      </div>
    </div>
  );
}
