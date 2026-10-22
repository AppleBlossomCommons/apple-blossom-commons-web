import { sources, type SourceId } from "@/lib/districts";

type Part = "label" | "short" | "date";

/**
 * Evidence Margin chip (docs/04): a small mono label (source · date) that opens the source's
 * date, geography and method. Uses the native popover API. Not used on the homepage: public
 * pages show no confidence labels, source tags or placeholders (public copy rules, CLAUDE.md).
 * Meant for Research Library pages and footnotes. The confidence tier stays in
 * data/sources.json for internal use and is never rendered.
 *
 * - `show` picks which parts appear on the chip, in order. "short" is the abbreviated label.
 * - `note` is appended after the parts (for example "Planning concept").
 * - `variant="pill"` is the bordered chip; `variant="plain"` is bare mono text (phone layouts).
 */
export function SourceChip({
  id,
  uid,
  show = ["label", "date"],
  note,
  variant = "pill",
  className = "",
}: {
  id: SourceId;
  uid: string;
  show?: Part[];
  note?: string;
  variant?: "pill" | "plain";
  className?: string;
}) {
  const s = sources[id];
  const popId = `source-${uid}`;
  const text = [
    ...show.map((part) => (part === "label" ? s.label : part === "short" ? s.shortLabel : s.dateLabel)),
    ...(note ? [note] : []),
  ]
    .filter(Boolean)
    .join(" · ");

  const look =
    variant === "pill"
      ? `inline-flex items-center self-start rounded-full border px-[9px] py-1 text-[0.6875rem] leading-[1.35] border-line hover:border-muted`
      : // Plain chips are inline text so they can wrap inside a sentence.
        "inline self-start text-left text-[0.65625rem] leading-[1.5] hover:underline";

  return (
    <>
      <button
        type="button"
        popoverTarget={popId}
        className={`max-w-full font-mono font-medium text-muted transition-colors duration-150 hover:text-hearth ${look} ${className}`}
      >
        {text}
        <span className="sr-only"> (source details)</span>
      </button>
      <div
        id={popId}
        popover="auto"
        className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-[6px] border border-line bg-linen p-5 text-left text-hearth shadow-[0_12px_40px_rgb(59_47_42/0.18)] backdrop:bg-[rgb(59_47_42/0.2)]"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">Source</p>
        <p className="mt-1 font-serif text-[1.25rem] font-semibold leading-snug">{s.title}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.875rem]">
          {s.dateLabel && (
            <>
              <dt className="text-muted">Date</dt>
              <dd className="tabular">{s.dateLabel}</dd>
            </>
          )}
          <dt className="text-muted">Geography</dt>
          <dd>{s.geography}</dd>
        </dl>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{s.method}</p>
        <button
          type="button"
          popoverTarget={popId}
          popoverTargetAction="hide"
          className="mt-4 min-h-9 rounded-[6px] border border-line px-3 text-[0.875rem] font-medium hover:border-muted"
        >
          Close
        </button>
      </div>
    </>
  );
}
