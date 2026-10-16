"use client";

import type { PlanDistrict } from "./types";

/**
 * The 2D district plan: the greyscale masterplan sheet with the ten districts drawn over it
 * (fix brief, Fixes 1 and 2) and numbered roundels. Used inside the district explorer until
 * the 3D model is ready, and afterwards as its loading and no-WebGL fallback.
 *
 * Decorative for assistive tech: the district list beside it is the keyboard and
 * screen-reader path, so the drawing and its roundels are aria-hidden and not focusable.
 */
export function PlanMap2D({
  districts,
  viewBox,
  imageHref,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  districts: PlanDistrict[];
  viewBox: string;
  imageHref: string;
  selected: string | null;
  hovered: string | null;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
}) {
  const [minX, minY, w, h] = viewBox.split(" ").map(Number);

  return (
    // Fit a box of the plan's aspect ratio inside whatever frame holds it (like object-fit: contain).
    <div className="absolute inset-0 grid place-items-center [container-type:size]">
      <div className="relative" style={{ width: `min(100cqw, calc(100cqh * ${w / h}))`, aspectRatio: `${w} / ${h}` }}>
        <svg viewBox={viewBox} aria-hidden="true" className="absolute inset-0 size-full" onPointerLeave={() => onHover(null)}>
          <image href={imageHref} x={minX} y={minY} width={w} height={h} preserveAspectRatio="none" />
          {/* Warm the greyscale sheet to the board color the 3D model uses (#D9D4C6). */}
          <rect x={minX} y={minY} width={w} height={h} fill="#D9D4C6" style={{ mixBlendMode: "multiply" }} />
          {districts.map((d) => {
            const on = d.key === selected;
            const hv = d.key === hovered;
            const dim = hovered !== null && !hv && !on;
            return (
              <g
                key={d.key}
                className="cursor-pointer"
                onClick={() => onSelect(d.key)}
                onPointerEnter={(e) => e.pointerType === "mouse" && onHover(d.key)}
              >
                {d.polys.map((p, i) => (
                  <path
                    key={i}
                    d={p}
                    fill={d.color}
                    fillOpacity={on || hv ? 0.9 : dim ? 0.32 : 0.75}
                    stroke="#1D2621"
                    strokeOpacity={dim ? 0.25 : 0.55}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    className="transition-[fill-opacity,stroke-opacity] duration-150 ease-out"
                  />
                ))}
              </g>
            );
          })}
          {/* Draw the selected outline last so neighbours can't cover it. */}
          {districts
            .filter((d) => d.key === selected)
            .map((d) =>
              d.polys.map((p, i) => (
                <path key={`sel-${i}`} d={p} fill="none" stroke="#E0AE4F" strokeWidth={2.5} vectorEffect="non-scaling-stroke" pointerEvents="none" />
              )),
            )}
        </svg>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {districts.map((d) =>
            d.labels.map(([x, y], i) => {
              const on = d.key === selected;
              const dim = hovered !== null && d.key !== hovered && !on;
              return (
                <button
                  key={`${d.key}-${i}`}
                  type="button"
                  tabIndex={-1}
                  onClick={() => onSelect(d.key)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && onHover(d.key)}
                  onPointerLeave={() => onHover(null)}
                  className={`pointer-events-auto absolute grid size-[18px] -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-[1.5px] border-ink font-mono text-[0.5625rem] font-semibold leading-none text-ink transition-[background-color,opacity,scale] duration-200 ease-out sm:size-7 sm:text-[0.75rem] ${
                    on ? "scale-[1.18] bg-signal-on-dark" : "bg-paper"
                  } ${dim ? "opacity-45" : ""}`}
                  style={{ left: `${((x - minX) / w) * 100}%`, top: `${((y - minY) / h) * 100}%` }}
                >
                  {d.n}
                </button>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
