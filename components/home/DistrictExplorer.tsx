"use client";

import Link from "next/link";
import { useState } from "react";
import { PlanMap2D } from "@/components/plan/PlanMap2D";
import type { PlanDistrict } from "@/components/plan/types";
import { ChevronRight } from "@/components/site/icons";
import { container } from "@/components/site/layout";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The dark "District explorer" band (approved homepage mockup). Selecting a district in the
 * list or on the plan updates the card. Desktop shows the card beside the list; phones open
 * the card under the tapped row.
 *
 * Interim: the frame shows the 2D plan (fix brief, Fixes 1–2) until the React Three Fiber
 * model (Fix 3) replaces it, at which point the 2D plan becomes its fallback.
 */
export function DistrictExplorer({
  districts,
  viewBox,
  disclaimer,
}: {
  districts: PlanDistrict[];
  viewBox: string;
  disclaimer: string;
}) {
  const [selected, setSelected] = useState(districts[0].key);
  const [hovered, setHovered] = useState<string | null>(null);
  // Phones: which row's card is open (none until the visitor taps a row).
  const [openRow, setOpenRow] = useState<string | null>(null);

  const current = districts.find((d) => d.key === selected) ?? districts[0];

  return (
    <section
      aria-labelledby="explorer-title"
      className="bg-basalt text-on-basalt [&_:focus-visible]:outline-signal-on-dark"
    >
      <h2 id="explorer-title" className="sr-only">
        District explorer
      </h2>
      <div className={`${container} flex flex-wrap gap-3.5 pb-6 pt-4 sm:gap-6 sm:pb-9 sm:pt-7`}>
        <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-3.5 sm:gap-3">
          <div className="relative h-[270px] overflow-hidden rounded-[8px] bg-basalt-2 sm:h-auto sm:aspect-[1.63]">
            <PlanMap2D
              districts={districts}
              viewBox={viewBox}
              imageHref="/plan/districts-sheet-greyscale.webp"
              selected={selected}
              hovered={hovered}
              onSelect={(key) => {
                setSelected(key);
                setOpenRow(key);
              }}
              onHover={setHovered}
            />
            <p className="absolute bottom-3 left-3.5 hidden rounded-[4px] bg-[rgb(15_22_18/0.78)] px-2.5 py-1.5 font-mono text-[0.75rem] text-on-basalt-2 sm:block">
              Select a district
            </p>
          </div>
          <p className="font-mono text-[0.6875rem] leading-[1.5] text-on-basalt-2 sm:text-[0.75rem]">{disclaimer}</p>
        </div>

        <aside aria-label="Districts" className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
          {/* Desktop card: follows the selection. */}
          <div aria-live="polite" className="hidden sm:block">
            <DistrictCard district={current} />
          </div>

          {/* Desktop list: selects a district. */}
          <ul className="hidden flex-col gap-0.5 sm:flex">
            {districts.map((d) => {
              const on = d.key === selected;
              return (
                <li key={d.key}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSelected(d.key)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(d.key)}
                    onPointerLeave={() => setHovered(null)}
                    className={`flex min-h-10 w-full items-center gap-2.5 rounded-[6px] border px-2.5 text-left text-[0.875rem] transition-colors duration-150 ${
                      on ? "border-signal-on-dark bg-signal-on-dark/8" : "border-transparent hover:bg-white/5"
                    }`}
                  >
                    <RowLabel district={d} />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Phone list: a tap selects the district and opens its card under the row. */}
          <ul className="flex flex-col gap-0.5 sm:hidden">
            {districts.map((d) => {
              const open = openRow === d.key;
              return (
                <li key={d.key} className="border-b border-basalt-divider">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`district-card-${d.key}`}
                    onClick={() => {
                      setSelected(d.key);
                      setOpenRow(open ? null : d.key);
                    }}
                    className="flex min-h-11 w-full items-center gap-2.5 px-2 text-left text-[0.9375rem]"
                  >
                    <RowLabel district={d} />
                    <ChevronRight
                      className={`ml-auto size-3.5 shrink-0 text-on-basalt-2 transition-transform duration-200 ease-out ${open ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div id={`district-card-${d.key}`} hidden={!open} className="pb-3">
                    <DistrictCard district={d} compact />
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function RowLabel({ district: d }: { district: PlanDistrict }) {
  return (
    <>
      <span className="w-[22px] shrink-0 font-mono text-[0.75rem] font-medium text-on-basalt-2">{pad(d.n)}</span>
      <span className="size-3 shrink-0 rounded-[2px]" style={{ background: d.color }} />
      <span>{d.name}</span>
    </>
  );
}

function DistrictCard({ district: d, compact = false }: { district: PlanDistrict; compact?: boolean }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[8px] border border-basalt-rule bg-basalt-2 p-5">
      <p className="font-mono text-[0.75rem] font-medium tracking-[0.06em] text-signal-on-dark">DISTRICT {pad(d.n)}</p>
      {!compact && (
        <h3 className="text-[1.75rem] leading-[1.15]">{d.name}</h3>
      )}
      <p className="inline-flex items-center gap-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-basalt-2">
        <span className="size-3 shrink-0 rounded-[2px]" style={{ background: d.color }} />
        {d.familyLabel}
      </p>
      <p className="text-[0.9375rem] leading-[1.55]">{d.summary}</p>
      <ul className="list-disc pl-4 font-mono text-[0.8125rem] leading-[1.6] text-on-basalt-2">
        {d.publicFacts.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <Link
        href={`/districts/${d.slug}`}
        className="mt-1 self-start text-[0.9375rem] font-semibold text-on-basalt underline hover:text-white"
      >
        Open the district page
      </Link>
    </div>
  );
}
