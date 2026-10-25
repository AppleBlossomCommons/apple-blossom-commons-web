"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useParallax } from "@/components/motion/useParallax";
import { buttonClass } from "@/components/site/buttons";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";
import { CARD, softGradient } from "@/lib/card-color";

/**
 * Site tour teaser (content pack, Home section 5). Sand band: text left, a tour still with a
 * play button right (stacked below 760px, image 320px tall). The still drifts with the scroll.
 */
export function TourTeaser() {
  const { ref, y } = useParallax<HTMLAnchorElement>("center");

  return (
    <section aria-labelledby="tour-title" className="grid min-h-[560px] grid-cols-1 bg-sand min-[760px]:grid-cols-[1fr_1.35fr]">
      <div className="flex flex-col justify-center gap-5 px-[clamp(20px,4.5vw,64px)] py-[clamp(56px,6vw,80px)]">
        <Reveal as="h2" kind="head" id="tour-title" className="text-[clamp(40px,4.2vw,56px)] leading-none">
          See the land for yourself
        </Reveal>
        <Reveal as="p" kind="fade" className="max-w-[440px] text-xl">
          Drive the roads around the site in sixteen short clips, each matched to a map.
        </Reveal>
        <Link href="/tour" className={`mt-2 self-start ${buttonClass("primary", "lg")}`}>
          Start the tour
        </Link>
      </div>

      {/* The still is a mouse shortcut to the tour; keyboard and screen-reader users have the button. */}
      <Link
        ref={ref}
        href="/tour"
        tabIndex={-1}
        aria-hidden="true"
        className="group relative isolate flex min-h-[320px] items-center justify-center overflow-hidden min-[760px]:min-h-0"
      >
        <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[10%] -top-[10%] -z-10">
          <PlaceholderImage
            gradient={softGradient(CARD.orange)}
            className="absolute inset-0"
          />
        </motion.div>
        <PlaceholderLabel inset={20}>Tour video still: empty country road between orchards and dry hills</PlaceholderLabel>
        <span className="flex size-24 items-center justify-center rounded-full bg-linen/95 transition-[scale] duration-300 ease-out group-hover:scale-105">
          <span className="ml-2 size-0 border-y-[16px] border-l-[26px] border-y-transparent border-l-hearth" />
        </span>
      </Link>
    </section>
  );
}
