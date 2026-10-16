"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DragHandle } from "@/components/site/icons";
import type { PlanDistrict } from "./types";
import "./TodayPlanned.css";

const REST = 42; // where the intro sweep stops: % from the left edge
const SWEEP_DELAY = 0.9; // s, after the outline has drawn
const SWEEP_DURATION = 1.6; // s

/** Inverse of the shared ease-out curve cubic-bezier(.22, 1, .36, 1): time fraction at which progress reaches p. */
function timeAtProgress(p: number) {
  const bez = (s: number, a: number, b: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, 1, 1) < p) lo = mid;
    else hi = mid;
  }
  return bez((lo + hi) / 2, 0.22, 0.36);
}

type Props = {
  districts: PlanDistrict[];
  /** Districts that hold existing uses today, with a short label. */
  existing: { key: string; label: string }[];
  viewBox: string;
  size: [number, number];
  disclaimer: string;
};

export function TodayPlanned({ districts, existing, viewBox, size, disclaimer }: Props) {
  const [split, setSplit] = useState(REST);
  const [interacted, setInteracted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [w, h] = size;
  const xPct = (x: number) => ((x + w / 2) / w) * 100;
  const yPct = (y: number) => ((y + h / 2) / h) * 100;

  // The intro runs in CSS from first paint. When the stage starts below the fold
  // (phones), replay it once it scrolls into view so the reveal is actually seen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.75) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.getAnimations({ subtree: true }).forEach((a) => {
          a.currentTime = 0;
          a.play();
        });
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moveTo = useCallback((value: number) => {
    setInteracted(true);
    setSplit(Math.min(100, Math.max(0, value)));
  }, []);

  const fromPointer = (clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    moveTo(((clientX - rect.left) / rect.width) * 100);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5;
    const keys: Record<string, number> = {
      ArrowLeft: split - step,
      ArrowDown: split - step,
      ArrowRight: split + step,
      ArrowUp: split + step,
      Home: 0,
      End: 100,
      PageDown: split - 20,
      PageUp: split + 20,
    };
    if (e.key in keys) {
      e.preventDefault();
      moveTo(keys[e.key]);
    }
  };

  const plannedShare = Math.round(100 - split);
  const stageClass = [
    "tp-stage",
    interacted ? "" : "tp-intro",
    interacted && !dragging ? "tp-settled" : "",
  ].join(" ");

  const activeDistrict = districts.find((d) => d.key === active);
  const activeLabel = activeDistrict?.labels[0];
  const showTag = activeDistrict && activeLabel && xPct(activeLabel[0]) > split;

  const grid = [];
  for (let x = -w / 2 + 51; x < w / 2; x += 51.15) grid.push(<line key={`x${x}`} x1={x} x2={x} y1={-h / 2} y2={h / 2} />);
  for (let y = -h / 2 + 49.5; y < h / 2; y += 49.6) grid.push(<line key={`y${y}`} x1={-w / 2} x2={w / 2} y1={y} y2={y} />);

  return (
    <figure className="m-0">
      <div
        ref={stageRef}
        className={stageClass}
        style={{ "--split": split } as React.CSSProperties}
      >
        {/* TODAY: planning-area outlines and the uses that already exist */}
        <svg viewBox={viewBox} className="tp-layer" aria-hidden="true">
          <g className="tp-grid">{grid}</g>
          {districts.map((d, i) =>
            d.polys.map((poly, j) => {
              const isExisting = existing.some((e) => e.key === d.key);
              return (
                <path
                  key={`${d.key}-${j}`}
                  d={poly}
                  pathLength={1}
                  className="tp-outline"
                  style={{
                    animationDelay: `${i * 45}ms`,
                    fill: isExisting ? d.color : "none",
                    fillOpacity: isExisting ? 0.3 : 0,
                  }}
                />
              );
            }),
          )}
        </svg>
        {existing.map((e) => {
          const d = districts.find((x) => x.key === e.key);
          const p = d?.labels[0];
          if (!p) return null;
          return (
            <span
              key={e.key}
              className={`tp-existingLabel hidden rounded-[3px] border border-rule bg-paper px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-2 sm:block`}
              style={{ left: `${xPct(p[0])}%`, top: `${yPct(p[1])}%` }}
            >
              {e.label}
            </span>
          );
        })}

        {/* PLANNED: the ten districts, revealed to the right of the divider */}
        <svg viewBox={viewBox} className={`tp-layer tp-planned ${active ? "tp-dimmed" : ""}`} aria-hidden="true">
          <g className="tp-grid">{grid}</g>
          {districts.map((d) =>
            d.polys.map((poly, j) => (
              <path
                key={`${d.key}-${j}`}
                d={poly}
                fill={d.color}
                className="tp-district"
                data-active={active === d.key}
                onPointerEnter={() => setActive(d.key)}
                onPointerLeave={() => setActive((k) => (k === d.key ? null : k))}
              />
            )),
          )}
          {districts.map((d) =>
            d.labels.map(([x, y], j) => {
              const pct = xPct(x);
              const delay = SWEEP_DELAY + SWEEP_DURATION * timeAtProgress((100 - pct) / (100 - REST));
              return (
                <g
                  key={`${d.key}-r${j}`}
                  className={`tp-roundel ${pct > REST ? "tp-pop" : ""}`}
                  data-active={active === d.key}
                  style={pct > REST ? { animationDelay: `${delay.toFixed(2)}s` } : undefined}
                >
                  <circle cx={x} cy={y} r={15} />
                  <text x={x} y={y + 4.5} textAnchor="middle">
                    {d.n}
                  </text>
                </g>
              );
            }),
          )}
        </svg>

        <span className={`tp-cornerLabel left-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-2`}>Today</span>
        <span className={`tp-cornerLabel right-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-signal-text`}>Planned</span>

        {showTag && (
          <span
            className={`tp-tag text-[0.875rem] text-ink`}
            style={{ left: `${xPct(activeLabel[0])}%`, top: `${yPct(activeLabel[1])}%` }}
          >
            <span className="mr-1.5 font-mono text-ink-3">{String(activeDistrict.n).padStart(2, "0")}</span>
            {activeDistrict.name}
          </span>
        )}

        <div className="tp-divider">
          <span className="tp-line" />
          <button
            type="button"
            role="slider"
            className="tp-handle"
            aria-label="Compare today with the planned districts"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={plannedShare}
            aria-valuetext={`${plannedShare}% of the plan shows the planned districts`}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging(true);
              fromPointer(e.clientX);
            }}
            onPointerMove={(e) => dragging && fromPointer(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            <DragHandle />
          </button>
        </div>
      </div>

      <figcaption className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 self-start rounded-[3px] border border-rule p-1" role="group" aria-label="Plan view">
          {[
            { label: "Today", value: 100 },
            { label: "Compare", value: 50 },
            { label: "Planned", value: 0 },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-pressed={interacted ? Math.round(split) === b.value : b.label === "Compare"}
              onClick={() => moveTo(b.value)}
              className="min-h-9 rounded-[2px] px-3.5 text-[0.875rem] font-medium text-ink-2 transition-colors duration-150 hover:text-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {b.label}
            </button>
          ))}
        </div>
        <p className="max-w-[52ch] font-mono text-[0.75rem] leading-snug text-ink-3">{disclaimer}</p>
      </figcaption>
    </figure>
  );
}
