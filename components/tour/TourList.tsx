"use client";

import { memo } from "react";
import { fmt } from "@/lib/tour-core";
import type { Tour } from "@/lib/tours";

export const kindLabel = (kind: Tour["kind"]) => (kind === "walk" ? "On foot" : "Drive");

/**
 * The ruled list of all clips (docs/13 §7, §10): an <ol> of buttons on the sand stage. The
 * selected row has a gold tint and aria-current. Memoized so it doesn't redraw as the video plays.
 */
export const TourList = memo(function TourList({
  tours,
  current,
  onSelect,
}: {
  tours: Tour[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="border-b border-hearth/15 min-[900px]:columns-2 min-[900px]:gap-x-10 min-[900px]:border-b-0">
      {tours.map((t, i) => (
        <li key={t.id} className="break-inside-avoid border-t border-hearth/15">
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === current ? "true" : undefined}
            className="group flex min-h-16 w-full items-baseline gap-4 px-3 py-3.5 text-left transition-colors duration-150 ease-out hover:bg-linen aria-[current=true]:bg-gold/35"
          >
            <span className="w-6 shrink-0 font-mono text-[0.875rem] tabular text-muted group-aria-[current=true]:text-hearth">
              {String(t.order).padStart(2, "0")}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-bold leading-snug">{t.title}</span>
              <span className="text-[0.9375rem] tabular text-muted group-aria-[current=true]:text-hearth">
                {kindLabel(t.kind)} · {fmt(t.duration)}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
});
