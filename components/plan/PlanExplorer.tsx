"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/site/buttons";
import { DistrictLink } from "@/components/transitions/TransitionLinks";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import type { CameraCommand } from "./DistrictModel3D";
import { hasWebGL, ModelBoundary } from "./ModelBoundary";
import { PlanMap2D } from "./PlanMap2D";
import type { PlanDistrict } from "./types";

// The 3D model never renders on the server and is only fetched once the frame nears the viewport.
const DistrictModel3D = dynamic(() => import("./DistrictModel3D"), { ssr: false });

/** The side card's facts drop their "(planning concept)" notes; one line under the list says it. */
const stripNote = (fact: string) => fact.replace(/\s*\(planning concept\)$/i, "");

// Side card swap (handoff, "Side card swap"): the text fades up and out (180ms, blur 4px); at
// 200ms the new district's text rises in, name first (blur 12px, 800ms), then the other lines
// (650ms, 70ms apart). `k` is each line's place: 0 name, 1 family, 2 summary, 3 facts, 4 note and button.
const line: Variants = {
  enter: ({ k }: { k: number }) => ({ opacity: 0, filter: k === 0 ? "blur(12px)" : "blur(5px)", y: 12 }),
  shown: ({ k, reduce }: { k: number; reduce: boolean }) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: reduce ? { duration: 0 } : { delay: 0.02 + k * 0.07, duration: k === 0 ? 0.8 : 0.65, ease: ease.out },
  }),
  leave: ({ reduce }: { reduce: boolean }) => ({
    opacity: 0,
    filter: "blur(4px)",
    y: -6,
    transition: reduce ? { duration: 0 } : { duration: 0.18, ease: ease.cssIn },
  }),
};

const toolBtn = "h-11 rounded-full px-[18px] text-base text-hearth transition-colors duration-300";

/**
 * The Plan's 3D model section (handoff, "The Plan" and "The Plan map: fly-in + side card").
 * Here the map is a tool: choosing a district on the model or in the list flies the camera to it
 * (1200ms), dims the others, pulses the ring twice and swaps the side card in place. "3D model" /
 * "Top-down plan" switch the camera between oblique and flat; "Reset view" zooms out and keeps
 * the card. Below 1000px the list becomes rows that open to show the card.
 *
 * The 2D plan shows while the model loads, and stays without WebGL. The list is the keyboard and
 * screen-reader path; the drawing itself is aria-hidden.
 */
export function PlanExplorer({
  districts,
  viewBox,
  imageHref,
  disclaimer,
}: {
  districts: PlanDistrict[];
  viewBox: string;
  imageHref: string;
  disclaimer: string;
}) {
  const reduce = usePrefersReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(districts[0].key);
  const [zoomed, setZoomed] = useState(false);
  const [topDown, setTopDown] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pulse, setPulse] = useState<number | undefined>();
  const [command, setCommand] = useState<CameraCommand>({ kind: "none", seq: 0 });
  // Phones: which row's card is open (none until a row is tapped).
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [want3D, setWant3D] = useState(false);
  const [ready3D, setReady3D] = useState(false);
  const [failed3D, setFailed3D] = useState(false);
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

  const select = useCallback((key: string) => {
    setSelected(key);
    setZoomed(true);
    setPulse((p) => (p ?? 0) + 1);
    setCommand((c) => ({ kind: "focus", key, seq: c.seq + 1 }));
  }, []);
  const reset = useCallback(() => {
    setZoomed(false);
    setPulse(undefined);
    setCommand((c) => ({ kind: "home", seq: c.seq + 1 }));
  }, []);
  const setView = (top: boolean) => {
    if (top === topDown) return;
    setTopDown(top);
    issue("view", zoomed ? selected : undefined);
  };
  const onReady = useCallback(() => setReady3D(true), []);

  // Esc zooms back out, as Reset view does (window-wide, since clicking the canvas doesn't move focus).
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || document.querySelector("dialog[open], :popover-open")) return;
      reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, reset]);

  const current = districts.find((d) => d.key === selected) ?? districts[0];

  return (
    <section aria-label="3D district model" className="bg-sand px-[clamp(12px,4vw,56px)] pb-[clamp(40px,6vw,88px)] pt-[clamp(24px,5vw,72px)]">
      <div className="grid items-start gap-6 min-[1000px]:grid-cols-[minmax(0,1fr)_400px]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <div
            ref={frame}
            className="relative isolate h-[290px] w-full overflow-hidden rounded-card bg-linen sm:h-auto sm:aspect-[1.55] sm:min-h-[420px]"
          >
            {want3D && !failed3D && (
              <ModelBoundary onError={() => setFailed3D(true)}>
                <DistrictModel3D
                  districts={districts}
                  textureHref={imageHref}
                  selected={selected}
                  hovered={hovered}
                  focused={zoomed ? selected : null}
                  topDown={topDown}
                  command={command}
                  reducedMotion={reduce}
                  onSelect={select}
                  onHover={setHovered}
                  onReady={onReady}
                  pulse={zoomed ? pulse : undefined}
                />
              </ModelBoundary>
            )}
            {!show3D && (
              <div className="absolute inset-0 z-[1]">
                <PlanMap2D
                  districts={districts}
                  viewBox={viewBox}
                  imageHref={imageHref}
                  selected={selected}
                  hovered={hovered}
                  onSelect={select}
                  onHover={setHovered}
                />
              </div>
            )}

            {show3D && (
              <div
                role="toolbar"
                aria-label="View controls"
                className="absolute left-2.5 top-2.5 z-[3] flex flex-wrap gap-1 rounded-full bg-linen p-1 sm:left-4 sm:top-4"
              >
                <button type="button" aria-pressed={!topDown} onClick={() => setView(false)} className={`${toolBtn} ${!topDown ? "bg-gold font-bold" : "font-medium hover:bg-sand"}`}>
                  <span className="sm:hidden">3D</span>
                  <span className="hidden sm:inline">3D model</span>
                </button>
                <button type="button" aria-pressed={topDown} onClick={() => setView(true)} className={`${toolBtn} ${topDown ? "bg-gold font-bold" : "font-medium hover:bg-sand"}`}>
                  <span className="sm:hidden">Plan</span>
                  <span className="hidden sm:inline">Top-down plan</span>
                </button>
                <button type="button" onClick={reset} className={`${toolBtn} font-medium hover:bg-sand max-sm:hidden`}>
                  Reset view
                </button>
              </div>
            )}
            <p aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 z-[3] hidden rounded-full bg-label px-3.5 py-1.5 text-[15px] sm:block">
              {show3D ? "Drag to rotate · Scroll to zoom · Select a district" : "Select a district"}
            </p>
          </div>
          <p className="mx-2 text-[15px] leading-[1.45] text-muted sm:mx-0 sm:text-base">{disclaimer}</p>
        </div>

        {/* Desktop: the card follows the selection, with the list under it. */}
        <aside aria-label="Districts" className="hidden min-w-0 flex-col gap-4 min-[1000px]:flex">
          <div className="overflow-hidden rounded-card bg-linen">
            <div aria-hidden="true" className="h-2 transition-[background-color] duration-500 ease-in-out" style={{ background: current.color }} />
            <div aria-live="polite" className="p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.key} initial="enter" animate="shown" exit="leave" className="flex flex-col gap-3">
                  <DistrictCardBody district={current} reduce={reduce} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-1 text-base">
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
                    className={`flex min-h-12 w-full items-center gap-2.5 rounded-chip px-3 text-left transition-[background-color,box-shadow] duration-200 ${
                      on ? "bg-linen font-bold shadow-[inset_0_0_0_2px_var(--gold)]" : "hover:bg-linen/60"
                    }`}
                  >
                    <span aria-hidden="true" className="size-2.5 shrink-0 rounded-[3px]" style={{ background: d.color }} />
                    {d.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Phones and tablets: a tap selects the district and opens its card under the row. */}
        <ul aria-label="Districts" className="flex flex-col gap-1 min-[1000px]:hidden">
          {districts.map((d) => {
            const open = openRow === d.key;
            return (
              <li key={d.key} className="rounded-[14px] bg-linen">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`plan-card-${d.key}`}
                  onClick={() => {
                    if (open) {
                      setOpenRow(null);
                      return;
                    }
                    setOpenRow(d.key);
                    select(d.key);
                  }}
                  className={`flex min-h-[52px] w-full items-center gap-3 px-3.5 text-left ${open ? "font-bold" : ""}`}
                >
                  <span aria-hidden="true" className="size-2.5 shrink-0 rounded-[3px]" style={{ background: d.color }} />
                  {d.name}
                  <span aria-hidden="true" className={`ml-auto text-muted transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
                    ›
                  </span>
                </button>
                <div id={`plan-card-${d.key}`} hidden={!open} className="flex flex-col gap-2.5 px-4 pb-[18px]">
                  <p className="text-[15px] text-muted">{d.familyLabel}</p>
                  <p>{d.summary}</p>
                  <ul className="list-disc pl-[18px] text-base text-muted">
                    {d.publicFacts.map((f) => (
                      <li key={f}>{stripNote(f)}</li>
                    ))}
                  </ul>
                  <p className="text-[15px] text-muted">Figures are planning concepts, not commitments.</p>
                  <DistrictLink district={{ slug: d.slug, color: d.color }} className={`w-full ${buttonClass("primary", "md")}`}>
                    Learn more<span className="sr-only"> about {d.name}</span>
                  </DistrictLink>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** The desktop side card's text, each line ready for the swap animation. */
function DistrictCardBody({ district: d, reduce }: { district: PlanDistrict; reduce: boolean }) {
  const part = (k: number) => ({ custom: { k, reduce }, variants: line }) as const;
  return (
    <>
      <motion.p {...part(1)} className="flex items-center gap-2.5 text-[15px] text-muted">
        <span aria-hidden="true" className="inline-flex size-[30px] items-center justify-center rounded-full border-2 border-hearth text-sm font-bold text-hearth">
          {d.n}
        </span>
        {d.familyLabel}
      </motion.p>
      <motion.h3 {...part(0)} className="text-[32px] leading-[1.05] tracking-[-0.02em]">
        {d.name}
      </motion.h3>
      <motion.p {...part(2)} className="text-[17px]">
        {d.summary}
      </motion.p>
      <motion.ul {...part(3)} className="list-disc pl-[18px] text-base leading-[1.6] text-muted">
        {d.publicFacts.map((f) => (
          <li key={f}>{stripNote(f)}</li>
        ))}
      </motion.ul>
      <motion.p {...part(4)} className="text-[15px] text-muted">
        Figures are planning concepts, not commitments.
      </motion.p>
      <motion.div {...part(4)} className="mt-1 self-start">
        <DistrictLink district={{ slug: d.slug, color: d.color }} className={buttonClass("primary", "md")}>
          Learn more<span className="sr-only"> about {d.name}</span>
        </DistrictLink>
      </motion.div>
    </>
  );
}
