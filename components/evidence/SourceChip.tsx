import { sources, type SourceId } from "@/lib/districts";

type Part = "label" | "short" | "date" | "tier";

/**
 * Evidence Margin chip (docs/04): a small mono label (source · date · confidence) that
 * opens the source's date, geography, method and confidence tier. Uses the native popover API.
 *
 * - `show` picks which parts appear on the chip, in order. "short" is the abbreviated label.
 * - `note` is appended after the parts (for example "Planning concept").
 * - `variant="pill"` is the bordered chip; `variant="plain"` is bare mono text (phone layouts).
 * - `tone` matches the border to the ground the chip sits on.
 */
export function SourceChip({
  id,
  uid,
  show = ["label", "date", "tier"],
  note,
  variant = "pill",
  tone = "paper",
  className = "",
}: {
  id: SourceId;
  uid: string;
  show?: Part[];
  note?: string;
  variant?: "pill" | "plain";
  tone?: "paper" | "surface-2";
  className?: string;
}) {
  const s = sources[id];
  const popId = `source-${uid}`;
  const text = [
    ...show.map((part) =>
      part === "label" ? s.label : part === "short" ? s.shortLabel : part === "date" ? (s.dateLabel ?? "[SOURCE TO CONFIRM]") : s.tier,
    ),
    ...(note ? [note] : []),
  ].join(" · ");

  const look =
    variant === "pill"
      ? `self-start rounded-full border px-[9px] py-1 text-[0.6875rem] leading-[1.35] ${tone === "surface-2" ? "border-rule-on-surface-2" : "border-rule"} hover:border-ink-3`
      : "self-start text-left text-[0.65625rem] leading-[1.5] hover:underline";

  return (
    <>
      <button
        type="button"
        popoverTarget={popId}
        className={`inline-flex max-w-full items-center font-mono font-medium text-ink-2 transition-colors duration-150 hover:text-ink ${look} ${className}`}
      >
        {text}
        <span className="sr-only"> (source details)</span>
      </button>
      <div
        id={popId}
        popover="auto"
        className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-[6px] border border-rule bg-surface p-5 text-left text-ink shadow-[0_12px_40px_rgb(29_38_33/0.18)] backdrop:bg-[rgb(20_27_23/0.25)]"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-3">Source</p>
        <p className="mt-1 font-serif text-[1.25rem] font-semibold leading-snug">{s.title}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.875rem]">
          <dt className="text-ink-3">Date</dt>
          <dd className="tabular">{s.dateLabel ?? "To be confirmed"}</dd>
          <dt className="text-ink-3">Geography</dt>
          <dd>{s.geography}</dd>
          <dt className="text-ink-3">Confidence</dt>
          <dd>{s.tier}</dd>
        </dl>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-2">{s.method}</p>
        <button
          type="button"
          popoverTarget={popId}
          popoverTargetAction="hide"
          className="mt-4 min-h-9 rounded-[6px] border border-rule px-3 text-[0.875rem] font-medium hover:border-ink-3"
        >
          Close
        </button>
      </div>
    </>
  );
}
