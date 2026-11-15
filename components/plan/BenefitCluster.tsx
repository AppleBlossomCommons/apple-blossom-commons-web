"use client";

import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { flushSync } from "react-dom";
import { ConceptText } from "@/components/site/Places";
import { RuleList, type RuleItem } from "@/components/site/RuleList";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * "Why people choose a Life Plan Community" as a cluster: the subheading sits in a center panel and
 * the ten reasons sit around it as short chips. Choosing a chip shows its full text in the center,
 * so only one reason is read at a time. Previous and Next step around the ring, and "See all ten as
 * a list" opens the plain list for anyone who wants to read them together.
 *
 * Layout: on wide screens (1100px and up) the chips ring the panel on a 4 × 3 grid, clockwise from
 * the top left, with faint spokes joining each chip to the center. Below that, the panel comes first
 * and the chips wrap underneath it.
 *
 * Every chip is the same size on purpose: in a classic word cloud, size means "more important", and
 * these reasons aren't ranked.
 */

// Where each chip sits on the ring (clockwise from the top left), and which way its text grows in from.
// Classes are written out in full so Tailwind can find them.
const ringSpots = [
  "min-[1100px]:col-start-2 min-[1100px]:row-start-1 min-[1100px]:justify-self-center min-[1100px]:self-end",
  "min-[1100px]:col-start-3 min-[1100px]:row-start-1 min-[1100px]:justify-self-center min-[1100px]:self-end",
  "min-[1100px]:col-start-4 min-[1100px]:row-start-1 min-[1100px]:justify-self-start min-[1100px]:self-end",
  "min-[1100px]:col-start-4 min-[1100px]:row-start-2 min-[1100px]:justify-self-start min-[1100px]:self-center min-[1100px]:ml-6",
  "min-[1100px]:col-start-4 min-[1100px]:row-start-3 min-[1100px]:justify-self-start min-[1100px]:self-start",
  "min-[1100px]:col-start-3 min-[1100px]:row-start-3 min-[1100px]:justify-self-center min-[1100px]:self-start",
  "min-[1100px]:col-start-2 min-[1100px]:row-start-3 min-[1100px]:justify-self-center min-[1100px]:self-start",
  "min-[1100px]:col-start-1 min-[1100px]:row-start-3 min-[1100px]:justify-self-end min-[1100px]:self-start",
  "min-[1100px]:col-start-1 min-[1100px]:row-start-2 min-[1100px]:justify-self-end min-[1100px]:self-center min-[1100px]:mr-6",
  "min-[1100px]:col-start-1 min-[1100px]:row-start-1 min-[1100px]:justify-self-end min-[1100px]:self-end",
];
const growFrom = [
  "min-[1100px]:origin-[30%_0%]",
  "min-[1100px]:origin-[70%_0%]",
  "min-[1100px]:origin-[100%_0%]",
  "min-[1100px]:origin-[100%_50%]",
  "min-[1100px]:origin-[100%_100%]",
  "min-[1100px]:origin-[70%_100%]",
  "min-[1100px]:origin-[30%_100%]",
  "min-[1100px]:origin-[0%_100%]",
  "min-[1100px]:origin-[0%_50%]",
  "min-[1100px]:origin-[0%_0%]",
];

/** Chip label: the title without its closing period. */
const label = (title: string) => title.replace(/\.$/, "");

type Spoke = { x1: number; y1: number; x2: number; y2: number };

export function BenefitCluster({ items, heading }: { items: RuleItem[]; heading: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const [spokes, setSpokes] = useState<{ w: number; h: number; lines: Spoke[] } | null>(null);
  const reduce = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextRef = useRef<HTMLButtonElement>(null);

  const count = items.length;
  const ids = items.map((_, i) => `benefit-${i}`);

  const show = useCallback(
    (i: number) => {
      setActive(i);
      setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
      // On phones the panel sits above the chips: bring it into view if it has scrolled off.
      const hub = hubRef.current;
      if (hub) {
        const r = hub.getBoundingClientRect();
        if (r.top < 64 || r.bottom > window.innerHeight) {
          hub.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
        }
      }
    },
    [reduce],
  );

  const close = useCallback(() => {
    if (active === null) return;
    const chip = chipRefs.current[active];
    setActive(null);
    chip?.focus();
  }, [active]);

  const step = (by: number) => {
    if (active === null) return;
    show((active + by + count) % count);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && active !== null) {
      e.preventDefault();
      close();
    }
  };

  // Spokes: measure the panel and each chip, then draw a line between their centers. Measured again
  // whenever the cluster or any chip changes size (fonts loading, window resizing).
  useLayoutEffect(() => {
    const root = rootRef.current;
    const hub = hubRef.current;
    if (!root || !hub) return;
    const measure = () => {
      const box = root.getBoundingClientRect();
      const h = hub.getBoundingClientRect();
      const cx = h.left + h.width / 2 - box.left;
      const cy = h.top + h.height / 2 - box.top;
      const lines = chipRefs.current.map((chip) => {
        const r = chip?.getBoundingClientRect();
        return r
          ? { x1: cx, y1: cy, x2: r.left + r.width / 2 - box.left, y2: r.top + r.height / 2 - box.top }
          : { x1: cx, y1: cy, x2: cx, y2: cy };
      });
      setSpokes({ w: box.width, h: box.height, lines });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    ro.observe(hub);
    chipRefs.current.forEach((chip) => chip && ro.observe(chip));
    return () => ro.disconnect();
  }, []);

  const layer =
    "col-start-1 row-start-1 transition-[opacity,transform,filter,visibility] ease-out motion-reduce:transform-none motion-reduce:filter-none";
  const shown = "visible opacity-100 scale-100 blur-none duration-[240ms]";
  const hidden = "invisible opacity-0 scale-[0.96] blur-[3px] duration-150";

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={rootRef}
        onKeyDown={onKeyDown}
        className="relative flex flex-col gap-6 min-[1100px]:grid min-[1100px]:grid-cols-[1fr_minmax(0,290px)_minmax(0,290px)_1fr] min-[1100px]:grid-rows-[auto_auto_auto] min-[1100px]:gap-x-6 min-[1100px]:gap-y-7"
      >
        {/* Spokes are decoration: the chips and panel carry the meaning. */}
        {spokes && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden min-[1100px]:block"
            width={spokes.w}
            height={spokes.h}
            viewBox={`0 0 ${spokes.w} ${spokes.h}`}
          >
            {spokes.lines.map((l, i) => (
              <line
                key={ids[i]}
                {...l}
                strokeLinecap="round"
                className={`transition-[stroke] duration-200 ease-out ${active === i ? "stroke-sage-deep" : "stroke-line"}`}
                strokeWidth={active === i ? 3 : 1.5}
              />
            ))}
          </svg>
        )}

        {/* The center panel. It stacks every reason in one grid cell, so its size never jumps. */}
        <div
          ref={hubRef}
          className="relative z-10 flex flex-col items-center gap-5 rounded-hero-sm bg-tint-lime px-6 pb-6 pt-9 text-center sm:rounded-hero sm:px-12 sm:pb-8 sm:pt-12 min-[1100px]:col-span-2 min-[1100px]:col-start-2 min-[1100px]:row-start-2"
        >
          <h3 className="max-w-[460px] px-7 text-2xl sm:px-0 leading-[1.1] tracking-[-0.02em] sm:text-[30px]">{heading}</h3>

          <div aria-live="polite" className="grid w-full max-w-[460px] items-center">
            <p className={`${layer} ${active === null ? shown : hidden} text-muted`}>
              Ten reasons, from everyday comfort to peace of mind. Choose one to read more.
            </p>
            {items.map((item, i) => (
              <div
                key={ids[i]}
                id={ids[i]}
                className={`${layer} ${growFrom[i]} origin-bottom ${active === i ? shown : hidden} flex flex-col gap-3`}
              >
                <h4 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">{item.title}</h4>
                <p>
                  <ConceptText text={item.text} />
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex min-h-11 w-full max-w-[460px] items-center justify-center">
            {active === null ? (
              <button
                type="button"
                onClick={() => {
                  // This button is replaced by Previous and Next, so render them now and move focus to Next.
                  flushSync(() => show(0));
                  nextRef.current?.focus();
                }}
                className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 transition-[scale] duration-150 ease-out hover:decoration-hearth active:scale-[0.97]"
              >
                Read them in order <span aria-hidden="true">→</span>
              </button>
            ) : (
              <div className="flex w-full items-center justify-between gap-3">
                <StepButton onClick={() => step(-1)} label={`Previous reason: ${label(items[(active - 1 + count) % count].title)}`}>
                  <span aria-hidden="true">←</span> Previous
                </StepButton>
                <span className="tabular whitespace-nowrap text-base text-muted">
                  {active + 1} of {count}
                </span>
                <StepButton ref={nextRef} onClick={() => step(1)} label={`Next reason: ${label(items[(active + 1) % count].title)}`}>
                  Next <span aria-hidden="true">→</span>
                </StepButton>
              </div>
            )}
          </div>

          {active !== null && (
            <button
              type="button"
              onClick={close}
              aria-label="Close this reason"
              className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full text-2xl leading-none transition-[background-color,scale] duration-150 ease-out hover:bg-linen active:scale-[0.95] sm:right-4 sm:top-4"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>

        {/* The chips. On wide screens this list shares the cluster's grid (subgrid) so each chip takes its spot on the ring. */}
        <ul
          aria-label="Reasons"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 min-[1100px]:col-span-4 min-[1100px]:col-start-1 min-[1100px]:row-span-3 min-[1100px]:row-start-1 min-[1100px]:grid min-[1100px]:grid-cols-subgrid min-[1100px]:grid-rows-subgrid min-[1100px]:gap-0"
        >
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <li key={ids[i]} className={`relative z-[1] ${ringSpots[i]}`}>
                <button
                  ref={(el) => {
                    chipRefs.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={ids[i]}
                  onClick={() => (isActive ? setActive(null) : show(i))}
                  className={`inline-flex min-h-11 max-w-[280px] items-center gap-2.5 rounded-chip border-[1.5px] px-3.5 py-2 text-left text-base font-bold leading-[1.25] transition-[background-color,border-color,scale] duration-150 ease-out active:scale-[0.97] sm:min-h-12 sm:px-5 sm:text-lg ${
                    isActive ? "border-hearth bg-gold" : "border-line bg-linen hover:border-sage-deep hover:bg-sand"
                  }`}
                >
                  {label(item.title)}
                  {/* A small dot marks reasons already read. */}
                  {seen.has(i) && !isActive && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-sage-deep" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <details className="group self-center">
        <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-2 rounded-full px-4 font-bold underline decoration-sage-deep decoration-2 underline-offset-4 hover:decoration-hearth [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">See all ten as a list</span>
          <span className="hidden group-open:inline">Hide the list</span>
        </summary>
        <div className="mt-8">
          <RuleList items={items} layout="five" titleAs="h4" />
        </div>
      </details>
    </div>
  );
}

function StepButton({
  onClick,
  label,
  children,
  ref,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-hearth px-3.5 text-base sm:px-4 font-bold transition-[background-color,scale] duration-150 ease-out hover:bg-linen active:scale-[0.97]"
    >
      {children}
    </button>
  );
}
