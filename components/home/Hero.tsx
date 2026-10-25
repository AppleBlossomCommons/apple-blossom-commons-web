"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useParallax } from "@/components/motion/useParallax";
import { buttonClass } from "@/components/site/buttons";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";

// Copy from docs/10-content-v2.md, Home section 1.
const HEADLINE = "A community planned to grow with Chelan, over decades.";
const SUBLINE = "Homes for every stage of life, a short walk from the hospital campus, orchards and a small wine village.";

/**
 * Home hero: an inset image card with hearth text on one flat pale color. HomeIntro animates the
 * parts marked data-intro-el (image, headline words, subline, buttons, label); the image
 * layer also drifts with the scroll (useParallax).
 *
 * TODO when the stock video arrives: add a visible pause/play button (autoplaying motion longer
 * than 5 seconds needs one, WCAG 2.2.2), and show the still image with reduced motion.
 */
export function Hero() {
  const { ref, y } = useParallax("top");

  return (
    <section aria-labelledby="home-title" className="px-[clamp(8px,1.2vw,16px)]">
      <div
        ref={ref}
        className="relative isolate flex h-[clamp(540px,calc(100svh-96px),760px)] flex-col justify-end overflow-hidden rounded-[clamp(24px,2.4vw,32px)] px-[clamp(20px,4.5vw,64px)] pb-[clamp(28px,4.5vw,64px)]"
      >
        <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[10%] -top-[10%] -z-10">
          <PlaceholderImage
            data-intro-el="media"
            fill="#DDF1FC"
            className="absolute inset-0"
          />
        </motion.div>
        <PlaceholderLabel data-intro-el="tag">
          Stock video, 20–30 s loop: early-morning aerial, lake and orchards · still image when reduced motion is on
        </PlaceholderLabel>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-[clamp(20px,4vw,64px)] text-hearth">
          <h1 id="home-title" className="min-w-0 text-[clamp(44px,5.8vw,84px)] leading-[0.98]">
            {/* Screen readers get the sentence whole; the per-word spans are only for the blur-in. */}
            <span className="sr-only">{HEADLINE}</span>
            {HEADLINE.split(" ").map((word, i) => (
              <span key={i} aria-hidden="true">
                {i > 0 && " "}
                <span data-intro-el="word" className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <div className="flex max-w-[520px] flex-col gap-6 pb-2">
            <p data-intro-el="sub" className="text-[clamp(19px,1.5vw,21px)] leading-normal">
              {SUBLINE}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/plan" data-intro-el="btn" className={buttonClass("primary", "lg")}>
                Explore the plan
              </Link>
              <Link href="/tour" data-intro-el="btn" className={buttonClass("secondary", "lg")}>
                Take the site tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
