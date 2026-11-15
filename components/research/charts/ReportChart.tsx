import { Fragment, type CSSProperties } from "react";
import type {
  BarsChart,
  BarsWithReferenceChart,
  Chart,
  ColumnsChart,
  GroupedBarsChart,
  RangeBarsChart,
  StackedShareChart,
  StatTilesChart,
  TimelineChart,
} from "@/lib/research";
import { ChartFrame, Legend } from "./ChartFrame";

// The eight Research Library charts (docs/15, section 6). Marks are drawn with plain HTML boxes
// rather than a scaled SVG, so the labels keep their real size on phones (never below 13px) and can
// move above the bars at narrow widths. One accent (lake-deep) for highlighted marks, a warm neutral
// for the rest, hearth text, no gridlines, values written on or beside the marks.

const ACCENT = "bg-lake-deep";
const NEUTRAL = "bg-chart-neutral";
/** Neutral marks too small to see on linen get a darker edge. */
const NEUTRAL_SMALL = "bg-chart-neutral ring-[1.5px] ring-inset ring-chart-neutral-edge";
/**
 * The longest bar fills this share of its track, leaving room for its value label: less on phones,
 * where the track is narrow. Set on a chart's wrapper; bar widths are calc(fraction × --fill).
 */
const FILL = "[--fill:0.6] sm:[--fill:0.78]";
/** A width or offset along a bar track: `share` of the longest bar's length. */
const along = (share: number) => `calc(${share} * var(--fill) * 100%)`;

/** Label left of the track on desktop, above it on phones. */
const ROW = "grid gap-1.5 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:items-center sm:gap-5";

const usd = (v: number) => `$${v.toLocaleString("en-US")}`;
const usdM = (v: number) => `$${v}M`;
const pct = (fraction: number) => `${fraction * 100}%`;

export function ReportChart({ chart }: { chart: Chart }) {
  switch (chart.type) {
    case "columns":
      return <Columns chart={chart} />;
    case "barsWithReference":
      return <BarsWithReference chart={chart} />;
    case "rangeBars":
      return <RangeBars chart={chart} />;
    case "statTiles":
      return <StatTiles chart={chart} />;
    case "timeline":
      return <Timeline chart={chart} />;
    case "stackedShare":
      return <StackedShare chart={chart} />;
    case "groupedBars":
      return <GroupedBars chart={chart} />;
    case "bars":
      return <Bars chart={chart} />;
  }
}

/** R3: residents 65+ by year, with a "Projected →" divider. */
function Columns({ chart }: { chart: ColumnsChart }) {
  const max = Math.max(...chart.data.map((d) => d.value));
  return (
    <ChartFrame
      chart={chart}
      table={{
        head: ["Year", chart.valueLabel, "Basis"],
        rows: chart.data.map((d) => [String(d.x), d.value.toLocaleString("en-US"), d.basis]),
      }}
    >
      <div className="flex h-[250px] items-end gap-1.5 pt-8 sm:h-[320px] sm:gap-4">
        {chart.data.map((d) => (
          <Fragment key={d.x}>
            {d.x === chart.projectedFrom && (
              <div className="relative w-0 self-stretch border-l-[1.5px] border-dashed border-muted">
                <span className="absolute -top-7 left-1.5 whitespace-nowrap text-[13px] text-muted sm:left-2.5 sm:text-[15px]">
                  Projected →
                </span>
              </div>
            )}
            <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[13px] font-bold tabular-nums sm:text-[15px]">{d.value.toLocaleString("en-US")}</span>
              <div
                className={`w-full max-w-[76px] rounded-t-[4px] ${chart.highlight.includes(d.x) ? ACCENT : NEUTRAL}`}
                style={{ height: `calc((100% - 56px) * ${d.value / max})` }}
              />
              <span className="text-[13px] tabular-nums sm:text-[15px]">{d.x}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </ChartFrame>
  );
}

/** R3: monthly cost of care against a typical household's monthly income. */
function BarsWithReference({ chart }: { chart: BarsWithReferenceChart }) {
  const max = Math.max(...chart.data.map((d) => d.value));
  const at = (v: number) => v / max;
  const ref = at(chart.reference.value);
  return (
    <ChartFrame
      chart={chart}
      table={{
        head: ["Type of care", "Monthly cost"],
        rows: chart.data.map((d) => [d.label, usd(d.value)]),
        foot: [chart.reference.label, chart.reference.display],
      }}
    >
      <div className={`flex flex-col gap-3 ${FILL}`}>
        <div className={ROW}>
          <span className="hidden sm:block" />
          <p className="border-l-[1.5px] border-dashed border-hearth pb-2 pl-2.5" style={{ marginLeft: along(ref) }}>
            <span className="font-bold">{chart.reference.label}</span>
            <br />
            {chart.reference.display}
          </p>
        </div>
        {chart.data.map((d) => {
          const end = at(d.value);
          const split = Math.min(end, ref);
          return (
            <div key={d.label} className={ROW}>
              <span>{d.label}</span>
              <div className="relative h-8">
                <div className={`absolute inset-y-0 left-0 ${NEUTRAL} ${end <= ref ? "rounded-r-[4px]" : ""}`} style={{ width: along(split) }} />
                {end > ref && (
                  <div className={`absolute inset-y-0 rounded-r-[4px] ${ACCENT}`} style={{ left: along(ref), width: along(end - ref) }} />
                )}
                <div className="absolute -inset-y-2.5 border-l-[1.5px] border-dashed border-hearth" style={{ left: along(ref) }} />
                <span className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2 font-bold tabular-nums" style={{ left: along(end) }}>
                  {usd(d.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

/** R4: miles to care. A dot for one distance, a short bar for a range. */
function RangeBars({ chart }: { chart: RangeBarsChart }) {
  const top = Math.max(...chart.data.map((d) => d.max));
  const axisMax = Math.ceil(top / 50) * 50;
  const ticks = Array.from({ length: axisMax / 50 + 1 }, (_, i) => i * 50);
  const at = (v: number) => v / axisMax;
  return (
    <ChartFrame chart={chart} table={{ head: ["Place", "Distance"], rows: chart.data.map((d) => [d.label, d.display]) }}>
      <div className="flex flex-col gap-4 sm:gap-3">
        {chart.data.map((d) => {
          const lo = at(d.min);
          const hi = at(d.max);
          // Labels sit right of the mark, or left of it when the mark is near the far end.
          const labelLeft = hi > 0.6;
          const color = d.max === 0 ? ACCENT : NEUTRAL_SMALL;
          return (
            <div key={d.label} className={ROW}>
              <span>{d.label}</span>
              <div className="relative h-8">
                <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
                {d.min === d.max ? (
                  <div className={`absolute top-1/2 size-4 -translate-y-1/2 rounded-full ${color}`} style={{ left: `calc(${pct(lo)} - ${lo === 0 ? 0 : 8}px)` }} />
                ) : (
                  <div className={`absolute top-1/2 h-4 -translate-y-1/2 rounded-full ${color}`} style={{ left: `calc(${pct(lo)} - 8px)`, width: `calc(${pct(hi - lo)} + 16px)` }} />
                )}
                <span
                  className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-bold"
                  style={labelLeft ? { right: `calc(${pct(1 - lo)} + 16px)` } : { left: `calc(${pct(hi)} + 24px)` }}
                >
                  {d.display}
                </span>
              </div>
            </div>
          );
        })}
        <div className={ROW} aria-hidden="true">
          <span className="hidden sm:block" />
          <div className="relative h-6 text-[13px] text-muted sm:text-[14px]">
            {ticks.map((t) => (
              <span key={t} className={`absolute top-0 whitespace-nowrap ${t === 0 ? "" : t === axisMax ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: pct(at(t)) }}>
                {t === axisMax ? `${t} ${chart.unit}` : t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChartFrame>
  );
}

/** R4: three big numbers. Not a chart, but framed like one. */
function StatTiles({ chart }: { chart: StatTilesChart }) {
  return (
    <ChartFrame chart={chart} table={{ head: ["Workers", "Number"], rows: chart.data.map((d) => [d.label, d.value]) }}>
      <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        {chart.data.map((d) => (
          <li key={d.label} className="flex flex-col gap-1.5 rounded-card bg-tint-sky px-6 py-6 sm:px-7 sm:py-8">
            <span className="font-display text-[48px] font-bold leading-none tracking-[-0.02em] tabular-nums sm:text-[60px]">{d.value}</span>
            <span className="text-lg">{d.label}</span>
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}

/** R5: when each community opened and its latest size. Sizes are labels only (mixed units). */
function Timeline({ chart }: { chart: TimelineChart }) {
  const { from, to } = chart.axis;
  const kinds = [...new Set(chart.data.map((d) => d.kind))];
  const tone = (kind: string) => (kind === kinds[0] ? ACCENT : "bg-chart-neutral-edge");
  const at = (year: number) => (year - from) / (to - from);
  const ticks = [];
  for (let y = Math.ceil(from / 20) * 20; y <= to; y += 20) ticks.push(y);
  // On desktop the axis uses 66% of the track so each end label fits after its line; on phones the
  // axis uses the full width and the labels move to a line of text under it.
  const pos = (f: number) => ({ "--p": f }) as CSSProperties;
  const POS = "left-[calc(var(--p)*100%)] sm:left-[calc(var(--p)*66%)]";
  return (
    <ChartFrame
      chart={chart}
      legend={<Legend items={kinds.map((k) => ({ name: k, swatch: tone(k) }))} />}
      table={{
        head: ["Community", "Type", "Opened", "Latest"],
        rows: chart.data.map((d) => [d.label, d.kind, `${d.start} (${d.startLabel})`, `${d.endLabel} (${d.end})`]),
      }}
    >
      <div className="flex flex-col gap-6 sm:gap-4">
        {chart.data.map((d) => {
          const style = { "--p": at(d.start), "--w": at(d.end) - at(d.start) } as CSSProperties;
          return (
            <div key={d.label} className={`${ROW} sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)]`}>
              <span className="font-bold sm:font-normal">{d.label}</span>
              <div className="flex flex-col gap-1.5">
                <div className="relative h-5 sm:h-14" style={style}>
                  <span className={`absolute top-0 hidden whitespace-nowrap text-[15px] sm:block ${POS}`}>
                    {d.start} · {d.startLabel}
                  </span>
                  <div
                    className={`absolute bottom-1.5 h-2 w-[calc(var(--w)*100%)] rounded-full sm:w-[calc(var(--w)*66%)] ${POS} ${tone(d.kind)}`}
                  />
                  <span
                    className={`absolute bottom-0 size-5 -translate-x-1/2 rounded-full border-[3px] border-linen ${tone(d.kind)} ${POS}`}
                  />
                  <span
                    className="absolute bottom-0 hidden whitespace-nowrap pl-3 font-bold sm:block sm:left-[calc((var(--p)+var(--w))*66%)]"
                  >
                    {d.endLabel}
                  </span>
                </div>
                <span className="text-[15px] sm:hidden">
                  {d.start} · {d.startLabel} → <span className="font-bold">{d.endLabel}</span>
                </span>
              </div>
            </div>
          );
        })}
        <div className={`${ROW} sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)]`} aria-hidden="true">
          <span className="hidden sm:block" />
          <div className="relative h-6 border-t border-line text-[13px] text-muted sm:text-[14px]">
            {ticks.map((t) => (
              <span key={t} className={`absolute top-1.5 -translate-x-1/2 ${POS}`} style={pos(at(t))}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChartFrame>
  );
}

/** R5: cottages and apartments as shares of one 100% bar per community. */
function StackedShare({ chart }: { chart: StackedShareChart }) {
  const names = chart.data[0]?.parts.map((p) => p.name) ?? [];
  const tones = [ACCENT, NEUTRAL];
  return (
    <ChartFrame
      chart={chart}
      legend={<Legend items={names.map((n, i) => ({ name: n, swatch: tones[i] ?? NEUTRAL }))} />}
      table={{
        head: ["Community", ...names],
        rows: chart.data.map((d) => [d.label, ...d.parts.map((p) => `${p.value} (${p.share}%)`)]),
      }}
    >
      <div className="flex flex-col gap-5 sm:gap-4">
        {chart.data.map((d) => (
          <div key={d.label} className={ROW}>
            <span>{d.label}</span>
            <div className="flex h-11 gap-[2px]">
              {d.parts.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex min-w-0 items-center px-3 font-bold tabular-nums first:rounded-l-[4px] last:rounded-r-[4px] ${tones[i] ?? NEUTRAL} ${i === 0 ? "text-white" : "text-hearth"}`}
                  style={{ width: `${p.share}%` }}
                >
                  <span className="truncate">
                    {p.value} ({p.share}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

/** R6: two series per category, side by side. */
function GroupedBars({ chart }: { chart: GroupedBarsChart }) {
  const max = Math.max(...chart.data.flatMap((d) => d.values));
  const tones = [NEUTRAL, ACCENT];
  return (
    <ChartFrame
      chart={chart}
      legend={<Legend items={chart.series.map((s, i) => ({ name: s, swatch: tones[i] ?? NEUTRAL }))} />}
      table={{ head: ["Category", ...chart.series], rows: chart.data.map((d) => [d.label, ...d.values.map(usdM)]) }}
    >
      <div className={`flex flex-col gap-5 ${FILL}`}>
        {chart.data.map((d) => (
          <div key={d.label} className={ROW}>
            <span>{d.label}</span>
            <div className="flex flex-col gap-[3px]">
              {d.values.map((v, i) => (
                <div key={i} className="relative h-6">
                  <div className={`absolute inset-y-0 left-0 rounded-r-[4px] ${tones[i] ?? NEUTRAL}`} style={{ width: along(v / max) }} />
                  <span className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2 text-[15px] font-bold tabular-nums" style={{ left: along(v / max) }}>
                    {usdM(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

/** R6: one value per category, the highlighted rows in the accent. */
function Bars({ chart }: { chart: BarsChart }) {
  const max = Math.max(...chart.data.map((d) => d.value));
  const label = (d: BarsChart["data"][number]) => `${usdM(d.value)} (${d.share}%)`;
  return (
    <ChartFrame chart={chart} table={{ head: ["Category", "Spending"], rows: chart.data.map((d) => [d.label, label(d)]) }}>
      <div className={`flex flex-col gap-4 sm:gap-3 ${FILL}`}>
        {chart.data.map((d) => (
          <div key={d.label} className={ROW}>
            <span>{d.label}</span>
            <div className="relative h-8">
              <div
                className={`absolute inset-y-0 left-0 rounded-r-[4px] ${chart.highlight.includes(d.label) ? ACCENT : NEUTRAL}`}
                style={{ width: along(d.value / max) }}
              />
              <span className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2 font-bold tabular-nums" style={{ left: along(d.value / max) }}>
                {label(d)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}
