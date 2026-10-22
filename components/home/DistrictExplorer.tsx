"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { CameraCommand } from "@/components/plan/DistrictModel3D";
import { PlanMap2D } from "@/components/plan/PlanMap2D";
import type { PlanDistrict } from "@/components/plan/types";
import { buttonClass } from "@/components/site/buttons";
import { ChevronRight } from "@/components/site/icons";
import { container } from "@/components/site/layout";

// The 3D model never renders on the server and is only fetched once the frame nears the viewport.
const DistrictModel3D = dynamic(() => import("@/components/plan/DistrictModel3D"), { ssr: false });

const pad = (n: number) => String(n).padStart(2, "0");

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(motionQuery);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

/** If the 3D model throws (for example a lost WebGL context), fall back to the 2D plan. */
class ModelBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const toolButton =
  "h-[34px] whitespace-nowrap rounded-[6px] border bg-[rgb(15_22_18/0.8)] px-3 text-[0.8125rem] font-medium transition-colors duration-150 sm:h-9 sm:px-3.5 sm:text-[0.875rem]";
const toolOn = "border-signal-on-dark text-signal-on-dark";
const toolOff = "border-basalt-rule text-on-basalt hover:border-on-basalt-2";

/**
 * The dark "District explorer" band (approved homepage mockup). Selecting a district in the
 * list, on the model or on a roundel updates the card and flies the camera to it; selecting it
 * again, Reset view or Esc returns to the home view. Desktop shows the card beside the list;
 * phones open the card under the tapped row.
 *
 * The frame holds the React Three Fiber model (fix brief, Fix 3). The 2D plan (Fixes 1–2) shows
 * while the model loads, and stays if WebGL is unavailable or the model fails.
 */
export function DistrictExplorer({
  districts,
  viewBox,
  disclaimer,
  disclaimer3D,
  imageHref,
}: {
  districts: PlanDistrict[];
  viewBox: string;
  disclaimer: string;
  disclaimer3D: string;
  imageHref: string;
}) {
  const [selected, setSelected] = useState(districts[0].key);
  const [hovered, setHovered] = useState<string | null>(null);
  // Phones: which row's card is open (none until the visitor taps a row).
  const [openRow, setOpenRow] = useState<string | null>(null);

  // 3D state: the district the camera is flown to, the view mode, and the latest camera command.
  const [focused, setFocused] = useState<string | null>(null);
  const [topDown, setTopDown] = useState(false);
  const [command, setCommand] = useState<CameraCommand>({ kind: "none", seq: 0 });
  const [want3D, setWant3D] = useState(false);
  const [ready3D, setReady3D] = useState(false);
  const [failed3D, setFailed3D] = useState(false);
  const reducedMotion = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const show3D = ready3D && !failed3D;

  // Load the model only when the frame comes near the viewport, and only with WebGL.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (hasWebGL()) setWant3D(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const issue = (kind: CameraCommand["kind"], key?: string) => setCommand((c) => ({ kind, key, seq: c.seq + 1 }));

  const select = useCallback(
    (key: string) => {
      setSelected(key);
      if (key === focused) {
        setFocused(null);
        setCommand((c) => ({ kind: "home", seq: c.seq + 1 }));
      } else {
        setFocused(key);
        setCommand((c) => ({ kind: "focus", key, seq: c.seq + 1 }));
      }
    },
    [focused],
  );
  const resetView = () => {
    setFocused(null);
    issue("home");
  };
  const setView = (top: boolean) => {
    if (top === topDown) return;
    setTopDown(top);
    issue("view", focused ?? undefined);
  };
  const onReady = useCallback(() => setReady3D(true), []);

  // Esc returns the model to its home view, as in the prototype (window-wide, since clicking the
  // canvas doesn't move focus). Skipped while a dialog or popover owns Esc.
  useEffect(() => {
    if (!show3D || !focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      if (document.querySelector("dialog[open], :popover-open")) return;
      setFocused(null);
      setCommand((c) => ({ kind: "home", seq: c.seq + 1 }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show3D, focused]);

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
          <div ref={frame} className="relative h-[270px] overflow-hidden rounded-[8px] bg-basalt-2 sm:h-auto sm:aspect-[1.63]">
            {!show3D && (
              <PlanMap2D
                districts={districts}
                viewBox={viewBox}
                imageHref={imageHref}
                selected={selected}
                hovered={hovered}
                onSelect={(key) => {
                  setSelected(key);
                  setOpenRow(key);
                }}
                onHover={setHovered}
              />
            )}
            {want3D && !failed3D && (
              <ModelBoundary onError={() => setFailed3D(true)}>
                <DistrictModel3D
                  districts={districts}
                  textureHref={imageHref}
                  selected={selected}
                  hovered={hovered}
                  focused={focused}
                  topDown={topDown}
                  command={command}
                  reducedMotion={reducedMotion}
                  onSelect={select}
                  onHover={setHovered}
                  onReady={onReady}
                />
              </ModelBoundary>
            )}
            {show3D && (
              <div
                role="toolbar"
                aria-label="View controls"
                className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5 sm:left-3.5 sm:top-3.5 sm:gap-2"
              >
                <button
                  type="button"
                  aria-pressed={!topDown}
                  onClick={() => setView(false)}
                  className={`${toolButton} ${!topDown ? toolOn : toolOff}`}
                >
                  <span className="sm:hidden">3D</span>
                  <span className="hidden sm:inline">3D model</span>
                </button>
                <button
                  type="button"
                  aria-pressed={topDown}
                  onClick={() => setView(true)}
                  className={`${toolButton} ${topDown ? toolOn : toolOff}`}
                >
                  <span className="sm:hidden">Plan</span>
                  <span className="hidden sm:inline">Top-down plan</span>
                </button>
                <button type="button" onClick={resetView} className={`${toolButton} ${toolOff} max-sm:hidden`}>
                  Reset view
                </button>
              </div>
            )}
            <p className="pointer-events-none absolute bottom-3 left-3.5 hidden rounded-[4px] bg-[rgb(15_22_18/0.78)] px-2.5 py-1.5 font-mono text-[0.75rem] text-on-basalt-2 sm:block">
              {show3D ? "Drag to rotate · Scroll to zoom · Select a district" : "Select a district"}
            </p>
          </div>
          <p className="font-mono text-[0.6875rem] leading-[1.5] text-on-basalt-2 sm:text-[0.75rem]">
            {show3D ? disclaimer3D : disclaimer}
          </p>
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
                    onClick={() => select(d.key)}
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
                      select(d.key);
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
          <li key={f}>{f.replace(/\s*\(planning concept\)$/i, "")}</li>
        ))}
      </ul>
      {/* One line in place of a "(planning concept)" note on each fact (owner decision, Oct 22, 2026). */}
      <p className="text-[0.8125rem] text-on-basalt-2">Figures are planning concepts, not commitments.</p>
      <Link href={`/districts/${d.slug}`} className={`mt-1 self-start ${buttonClass("primary", "sm")}`}>
        Learn more<span className="sr-only"> about {d.name}</span>
      </Link>
    </div>
  );
}
