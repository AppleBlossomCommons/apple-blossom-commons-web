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
  /** CSS "ease" and "ease-in", for the few steps the spec times with them. */
  css: [0.25, 0.1, 0.25, 1],
  cssIn: [0.42, 0, 1, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** Scroll reveals play once, when 15% of the element is visible, 6% above the bottom edge. */
export const revealViewport = { once: true, amount: 0.15, margin: "0px 0px -6% 0px" } as const;

export type RevealKind = "head" | "fade" | "card" | "door";

/** What a reveal's `custom` prop carries: its place in a staggered group and the motion setting. */
export type RevealCustom = { i?: number; reduce?: boolean };

const revealFrom: Record<RevealKind, Record<string, string | number>> = {
  head: { opacity: 0, filter: "blur(14px)", y: "0.25em" },
  fade: { opacity: 0, filter: "blur(0px)", y: 12 },
  card: { opacity: 0, filter: "blur(0px)", y: 48 },
  door: { opacity: 0, filter: "blur(0px)", y: 96 },
};

/** Duration, stagger per item and base delay, in seconds. */
const revealTiming: Record<RevealKind, { duration: number; stagger: number; delay: number }> = {
  head: { duration: 1, stagger: 0, delay: 0 },
  fade: { duration: 0.8, stagger: 0, delay: 0.22 },
  card: { duration: 0.9, stagger: 0.11, delay: 0 },
  door: { duration: 1.1, stagger: 0.13, delay: 0 },
};

function makeReveal(kind: RevealKind): Variants {
  const t = revealTiming[kind];
  return {
    hidden: revealFrom[kind],
    // With reduced motion the element simply appears when it scrolls into view.
    shown: ({ i = 0, reduce = false }: RevealCustom = {}) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: t.duration, delay: t.delay + t.stagger * i, ease: ease.out },
    }),
  };
}

/**
 * Variants for each scroll reveal. Pass { i, reduce } as `custom` and use
 * initial="hidden" whileInView="shown" viewport={revealViewport} (or the <Reveal> component).
 */
export const reveal: Record<RevealKind, Variants> = {
  head: makeReveal("head"),
  fade: makeReveal("fade"),
  card: makeReveal("card"),
  door: makeReveal("door"),
};

/** Photo card hover (collage tiles and doorway cards): the card lifts 6px and gains a shadow. */
export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 28px 50px -28px rgb(59 47 42 / 0)", transition: { duration: 0.5, ease: ease.out } },
  hover: { y: -6, boxShadow: "0 28px 50px -28px rgb(59 47 42 / 0.55)", transition: { duration: 0.5, ease: ease.out } },
};

/** The card's image layer eases in to 106% while the card is hovered. */
export const imageHover: Variants = {
  rest: { scale: 1, transition: { duration: 1.1, ease: ease.out } },
  hover: { scale: 1.06, transition: { duration: 1.1, ease: ease.out } },
};
