"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { useParallax } from "@/components/motion/useParallax";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/** Delay before the hero text starts, in seconds (handoff: the sequence begins at 150ms). */
const START = 0.15;

// Hero text entrance (handoff, "Map → district page", step 6): headline, eyebrow, summary, then
// the pills at the top, 120ms apart. Each rises 16px and un-blurs. Reduced motion: no movement.
const enter: Variants = {
  hidden: (c: { k: number }) => ({ opacity: 0, filter: c.k === 0 ? "blur(16px)" : "blur(6px)", y: 16 }),
  shown: ({ k, reduce }: { k: number; reduce: boolean }) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: reduce ? { duration: 0 } : { delay: START + k * 0.12, duration: k === 0 ? 1 : 0.8, ease: ease.out },
  }),
};

export type DistrictHeroProps = {
  n: number;
  name: string;
  familyLabel: string;
  color: string;
  summary: string;
};

/**
 * District page hero: full width under the header, image layer = the district's "Illustrative
 * concept" render (a placeholder for now), with eyebrow, name and summary over a soft fade.
 * The same image fills the Home map's circle transition (step 4), so the swap is invisible.
 */
export function DistrictHero({ n, name, familyLabel, color, summary }: DistrictHeroProps) {
  const { ref, y } = useParallax<HTMLElement>("top");
  const reduce = usePrefersReducedMotion();
  const part = (k: number) => ({ "data-enter": "", custom: { k, reduce }, variants: enter, initial: "hidden", animate: "shown" }) as const;

  return (
    <section
      ref={ref}
      aria-labelledby="district-title"
      className="relative isolate flex h-[calc(100svh-64px)] min-h-[520px] flex-col justify-end overflow-hidden px-[clamp(20px,4.5vw,64px)] pb-[clamp(28px,4.5vw,64px)] text-white"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[10%] -top-[10%] -z-10">
        <PlaceholderImage gradient={`linear-gradient(165deg, #F7E2B8 0%, ${color} 78%)`} className="absolute inset-0" />
      </motion.div>
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(45_32_24/0.1)_0%,rgb(45_32_24/0)_30%,rgb(45_32_24/0.66)_100%)]"
      />

      <motion.div {...part(3)} className="absolute left-4 top-4">
        <Link
          href="/#map"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-linen px-5 text-base font-bold text-hearth no-underline transition-colors duration-150 hover:bg-white hover:text-hearth"
        >
          <span aria-hidden="true">←</span> Back to the map
        </Link>
      </motion.div>
      {/* Fills the hero: the wrapper's transform makes it the label's positioning box. */}
      <motion.div {...part(3)} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <PlaceholderLabel style={{ top: 76 }}>Image slot · Illustrative concept: {name}, eye-level render from the 3D model</PlaceholderLabel>
      </motion.div>

      <div className="flex max-w-[760px] flex-col gap-4">
        <motion.p {...part(1)} className="flex items-center gap-2.5 text-[17px] font-bold">
          <span aria-hidden="true" className="size-3 rounded-[3px] shadow-[0_0_0_2px_var(--linen)]" style={{ background: color }} />
          District {n} · {familyLabel}
        </motion.p>
        <motion.h1 {...part(0)} id="district-title" className="text-[clamp(48px,7vw,104px)] leading-[0.95] tracking-[-0.03em]">
          {name}
        </motion.h1>
        <motion.p {...part(2)} className="max-w-[600px] text-[clamp(19px,1.6vw,22px)] leading-normal">
          {summary}
        </motion.p>
      </div>
    </section>
  );
}
