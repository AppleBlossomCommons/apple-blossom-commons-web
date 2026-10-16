import { sources, type SourceId } from "@/lib/districts";

/**
 * Evidence Margin chip (docs/04): a small mono label that opens the source's
 * date, geography, method and confidence tier. Uses the native popover API.
 */
export function SourceChip({ id, uid, note }: { id: SourceId; uid: string; note?: string }) {
  const s = sources[id];
  const popId = `source-${uid}`;
  return (
    <>
      <button
        type="button"
        popoverTarget={popId}
        className="inline-flex min-h-6 items-center rounded-[3px] border border-rule bg-surface px-1.5 align-middle font-mono text-[0.6875rem] leading-none tracking-[0.02em] text-ink-2 transition-colors duration-150 hover:border-ink-3 hover:text-ink"
      >
        {s.label}
        {note ? ` · ${note}` : ""}
        <span className="sr-only"> (source details)</span>
      </button>
      <div
        id={popId}
        popover="auto"
        className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-[4px] border border-rule bg-surface p-5 text-left text-ink shadow-[0_12px_40px_rgb(29_38_33/0.18)] backdrop:bg-[rgb(20_27_23/0.25)]"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-3">Source</p>
        <p className="mt-1 font-serif text-[1.25rem] font-semibold leading-snug">{s.title}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.875rem]">
          <dt className="text-ink-3">Date</dt>
          <dd className="tabular">{s.date ?? "To be confirmed"}</dd>
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
          className="mt-4 min-h-9 rounded-[3px] border border-rule px-3 text-[0.875rem] font-medium hover:border-ink-3"
        >
          Close
        </button>
      </div>
    </>
  );
}
