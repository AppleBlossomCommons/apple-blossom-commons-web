"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import type { PlanDistrict } from "./types";

type Props = {
  districts: PlanDistrict[];
  viewBox: string;
  /** Server-rendered source chip per district key, shown beside its figures. */
  sourceChips: Record<string, React.ReactNode>;
};

/**
 * The HTML equivalent of the plan (CLAUDE.md rule 6): every district as a link,
 * with a small plan that lifts whichever district is hovered or focused.
 */
export function DistrictLegend({ districts, viewBox, sourceChips }: Props) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-10">
          <svg viewBox={viewBox} className="w-full" aria-hidden="true">
            {districts.map((d) =>
              d.polys.map((poly, j) => (
                <path
                  key={`${d.key}-${j}`}
                  d={poly}
                  fill={d.color}
                  stroke="var(--ink)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    fillOpacity: !active || active === d.key ? "var(--plan-fill-opacity)" : 0.22,
                    strokeOpacity: active === d.key ? 0.9 : 0.3,
                    transition: "fill-opacity 200ms var(--ease-out), stroke-opacity 200ms var(--ease-out)",
                  }}
                />
              )),
            )}
            {districts.map((d) =>
              d.labels.map(([x, y], j) => (
                <g key={`${d.key}-r${j}`} style={{ opacity: !active || active === d.key ? 1 : 0.35, transition: "opacity 200ms var(--ease-out)" }}>
                  <circle cx={x} cy={y} r={15} fill={active === d.key ? "var(--signal)" : "var(--paper)"} stroke={active === d.key ? "var(--signal)" : "var(--ink)"} strokeWidth={1.2} />
                  <text x={x} y={y + 4.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fontWeight={500} fill={active === d.key ? "#fff" : "var(--ink)"}>
                    {d.n}
                  </text>
                </g>
              )),
            )}
          </svg>
        </div>
      </div>

      <ol className="border-t border-rule lg:col-span-6">
        {districts.map((d) => (
          <li key={d.key} className="border-b border-rule">
            <div
              className="group relative grid grid-cols-[2.25rem_1fr] gap-x-4 py-5 transition-colors duration-150 data-[active=true]:bg-surface sm:grid-cols-[2.5rem_1fr_auto]"
              data-active={active === d.key}
              onPointerEnter={() => setActive(d.key)}
              onPointerLeave={() => setActive((k) => (k === d.key ? null : k))}
              onFocus={() => setActive(d.key)}
              onBlur={() => setActive((k) => (k === d.key ? null : k))}
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-flex size-8 items-center justify-center rounded-full border font-mono text-[0.8125rem] font-medium"
                style={{ borderColor: d.color, boxShadow: `inset 0 0 0 3px ${d.color}` }}
              >
                {d.n}
              </span>
              <div>
                <h3 className="text-[1.375rem] leading-tight">
                  <Link href={`/districts/${d.slug}`} className="text-ink no-underline after:absolute after:inset-0 group-hover:underline">
                    {d.name}
                  </Link>
                </h3>
                <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.07em] text-ink-3">{d.familyLabel}</p>
                <p className="mt-2 max-w-[56ch] text-base text-ink-2">{d.summary}</p>
                <p className="mt-2 text-[0.9375rem] text-ink">
                  {d.publicFacts.join(" · ")}
                </p>
                <div className="relative z-10 mt-2">{sourceChips[d.key]}</div>
              </div>
              <ArrowRight className="mt-2 hidden size-5 text-ink-3 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green sm:block" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
