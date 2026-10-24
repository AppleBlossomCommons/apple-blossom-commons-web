/**
 * Shared motion values for motion/react, from the Phase 1 handoff motion spec
 * (design_handoff_abc_web_phase1/README.md, "Motion spec"). Durations are in seconds.
 * The same curves are CSS variables in app/globals.css.
 */
import type { Variants } from "motion/react";

export const ease = {
  /** cubic-bezier(.22,1,.36,1): reveals, hovers, header. */
  out: [0.22, 1, 0.36, 1],
  /** cubic-bezier(.65,0,.35,1): menu sheet, camera moves. */
  inOut: [0.65, 0, 0.35, 1],
  /** cubic-bezier(.7,0,.2,1): circle opening. */
  open: [0.7, 0, 0.2, 1],
  /** cubic-bezier(.7,0,.3,1): circle closing. */
  shut: [0.7, 0, 0.3, 1],
  /** cubic-bezier(.7,0,.84,0): menu sheet closing. */
  sheetClose: [0.7, 0, 0.84, 0],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** Scroll reveals play once, when 15% of the element is visible, 6% above the bottom edge. */
export const revealViewport = { once: true, amount: 0.15, margin: "0px 0px -6% 0px" } as const;

type RevealKind = "head" | "fade" | "card" | "door";

const revealFrom: Record<RevealKind, Record<string, string | number>> = {
  head: { opacity: 0, filter: "blur(14px)", y: "0.25em" },
  fade: { opacity: 0, y: 12 },
  card: { opacity: 0, y: 48 },
  door: { opacity: 0, y: 96 },
};

/** Duration, stagger per item and base delay, in seconds. */
const revealTiming: Record<RevealKind, { duration: number; stagger: number; delay: number }> = {
  head: { duration: 1, stagger: 0, delay: 0 },
  fade: { duration: 0.8, stagger: 0, delay: 0.22 },
  card: { duration: 0.9, stagger: 0.11, delay: 0 },
  door: { duration: 1.1, stagger: 0.13, delay: 0 },
};

/**
 * Variants for a scroll reveal. Pass the item's index as `custom` to stagger it.
 * Use with initial="hidden" whileInView="shown" viewport={revealViewport}.
 */
export function revealVariants(kind: RevealKind): Variants {
  const t = revealTiming[kind];
  return {
    hidden: revealFrom[kind],
    shown: (i: number = 0) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: t.duration, delay: t.delay + t.stagger * i, ease: ease.out },
    }),
  };
}
