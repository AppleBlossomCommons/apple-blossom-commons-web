"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/home/HeroVideo";
import { useParallax } from "@/components/motion/useParallax";
import { buttonClass } from "@/components/site/buttons";
import heroStill from "@/public/images/home/hero-still.jpg";

// Copy from docs/10-content-v2.md, Home section 1.
const HEADLINE = "A community planned to grow with Chelan, over decades.";
const SUBLINE = "Homes for every stage of life, a short walk from the hospital campus, orchards and a small wine village.";

/**
 * Home hero: an inset card with Andy's drone clip of the site (scripts/home-video), white text on
 * a soft dark-brown fade (docs/04-design-direction.md, rule 3). HomeIntro animates the parts
 * marked data-intro-el (image, headline words, subline, buttons, video button); the image layer
 * also drifts with the scroll (useParallax). HeroVideo plays the clip once and holds.
 */
export function Hero() {
  const { ref, y } = useParallax("top");

  return (
    // The card fills the screen below the sticky 64px header, leaving the same small gap at the
    // bottom as on the sides, so the next section starts below the fold. The 540px floor keeps
    // the text from crowding on short screens (landscape phones), where the card simply scrolls.
    <section aria-labelledby="home-title" className="px-[clamp(8px,1.2vw,16px)] pb-[clamp(8px,1.2vw,16px)]">
      <div
        ref={ref}
        className="relative isolate flex h-[max(540px,calc(100svh-64px-clamp(8px,1.2vw,16px)))] flex-col justify-end overflow-hidden rounded-[clamp(24px,2.4vw,32px)] px-[clamp(20px,4.5vw,64px)] pb-[clamp(28px,4.5vw,64px)]"
      >
        <HeroVideo
          y={y}
          // Decorative: the headline carries the message, so the image has empty alt text.
          still={
            <Image src={heroStill} alt="" fill preload sizes="100vw" placeholder="blur" className="object-cover" />
          }
        />
        {/* The dark fade keeps the white text at 4.5:1 or better (3:1 for the headline), even over the
            white rooftops. Narrow screens stack the text higher, so the fade there is taller and darker. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(59_47_42/0.8)_0%,rgb(59_47_42/0.74)_40%,rgb(59_47_42/0.62)_65%,rgb(59_47_42/0)_95%)] lg:bg-[linear-gradient(to_top,rgb(59_47_42/0.74)_0%,rgb(59_47_42/0.66)_30%,rgb(59_47_42/0.5)_55%,rgb(59_47_42/0)_85%)]"
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-end gap-[clamp(20px,4vw,64px)] text-white">
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
              <Link href="/tour" data-intro-el="btn" className={buttonClass("onPhoto", "lg")}>
                Take the site tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
