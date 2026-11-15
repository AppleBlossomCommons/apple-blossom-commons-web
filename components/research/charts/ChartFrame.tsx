import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Chart } from "@/lib/research";

export type ChartTable = { head: string[]; rows: string[][]; foot?: string[] };

/**
 * The frame every Research Library chart shares (docs/15, section 6): title (H3), subtitle, the
 * drawing, an optional note, the caption and source, and a "Show the numbers" table.
 * The drawing is one image to screen readers (role="img" with the chart's a11ySummary); the table
 * carries the same numbers as real text.
 */
export function ChartFrame({ chart, table, legend, children }: { chart: Chart; table: ChartTable; legend?: ReactNode; children: ReactNode }) {
  const titleId = `${chart.id}-title`;
  return (
    <Reveal kind="fade">
      <figure aria-labelledby={titleId} className="flex flex-col gap-5 border-t border-line pt-8 sm:gap-6 sm:pt-10">
        <div className="flex max-w-[760px] flex-col gap-2">
          <h3 id={titleId} className="text-[24px] leading-[1.12] tracking-[-0.015em] sm:text-[30px]">
            {chart.title}
          </h3>
          <p className="text-muted">{chart.subtitle}</p>
        </div>
        {legend}
        <div role="img" aria-label={chart.a11ySummary} className="text-[15px] leading-snug text-hearth sm:text-base">
          {children}
        </div>
        {chart.note && <p className="max-w-[760px] text-[15px] text-muted sm:text-base">Note: {chart.note}</p>}
        <figcaption className="flex max-w-[760px] flex-col gap-3">
          <p className="sm:text-lg">{chart.caption}</p>
          <p className="text-[14px] text-muted sm:text-[15px]">Source: {chart.source}</p>
        </figcaption>
        <details className="group max-w-[760px] rounded-chip border border-line bg-linen">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 font-bold [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="inline-block transition-transform duration-150 group-open:rotate-90">
              ›
            </span>
            Show the numbers
          </summary>
          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line">
                  {table.head.map((h, i) => (
                    <th key={i} scope="col" className={`py-2 pr-4 font-bold ${i > 0 ? "text-right" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, r) => (
                  <tr key={r} className="border-b border-line last:border-0">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-2 pr-4 font-normal">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="py-2 pr-4 text-right tabular-nums">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
              {table.foot && (
                <tfoot>
                  <tr className="border-t border-line text-muted">
                    {table.foot.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-2 pr-4 font-normal">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="py-2 pr-4 text-right">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </details>
      </figure>
    </Reveal>
  );
}

/** A small key: a swatch and a name for each series. */
export function Legend({ items }: { items: { name: string; swatch: string }[] }) {
  return (
    <ul aria-hidden="true" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
      {items.map((item) => (
        <li key={item.name} className="flex items-center gap-2">
          <span className={`inline-block size-3.5 rounded-[3px] ${item.swatch}`} />
          {item.name}
        </li>
      ))}
    </ul>
  );
}
