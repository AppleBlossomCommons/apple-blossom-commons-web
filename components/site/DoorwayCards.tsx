"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { imageHover, reveal, revealViewport } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage, PlaceholderLabel } from "./ImagePlaceholder";

export type Doorway = {
  href: string;
  /** Small line above the title. Optional: the About Us cards have none. */
  audience?: string;
  title: string;
  text: string;
  cta: string;
  /** Placeholder label naming the planned image. Leave out when no image is planned. */
  image?: string;
  /** Pale placeholder fill. Neighboring cards use different ones. */
  fill: string;
};

// Copy from docs/10-content-v2.md, Home section 6 "Doorways". Image notes from the Phase 1 handoff.
const homeDoorways: Doorway[] = [
  {
    href: "/participate",
    audience: "For neighbors",
    title: "Have a say.",
    text: "Learn how the plan is reviewed and share your views.",
    cta: "How Can I Participate?",
    image: "Stock photo (people): two neighbors talking over a garden fence",
    fill: "#DDF1FC",
  },
  {
    href: "/participate#update-list",
    audience: "For future residents",
    title: "Be the first to know.",
    text: "Join the update list for news as homes and care options take shape.",
    cta: "How Can I Participate?",
    image: "AI image, no people · Illustrative concept: cottage front door with a wreath and blossoms",
    fill: "#FFE1ED",
  },
  {
    href: "/partners",
    audience: "For investors and land buyers",
    title: "Build with us.",
    text: "Explore investment and development opportunities.",
    cta: "Partner with Us",
    image: "Stock photo: open orchard rows on a gentle slope, golden hour",
    fill: "#EAF6CF",
  },
];

const MotionLink = motion.create(Link);

type Props = {
  /** Section id for jump links (About Us: "say-hello"). */
  id?: string;
  doorways?: Doorway[];
  /** A visible heading and intro above the cards (About Us, "Come say hello"). Without one, the heading is for screen readers only. */
  heading?: { id: string; title: string; text: string };
};

/**
 * Three audience doorways. They end Home and every district page (content pack, Districts).
 * About Us passes its own cards and a visible heading.
 */
export function DoorwayCards({ id, doorways = homeDoorways, heading }: Props) {
  const reduce = usePrefersReducedMotion();
  const titleId = heading?.id ?? "doorways-title";

  return (
    <section id={id} aria-labelledby={titleId} className="px-[clamp(8px,1.2vw,16px)] pb-4 pt-[clamp(72px,8vw,112px)]">
      {heading ? (
        <div className="mb-[clamp(32px,4vw,56px)] flex max-w-[760px] flex-col gap-4 px-[clamp(8px,2.8vw,40px)] sm:gap-6">
          <Reveal as="h2" kind="head" id={titleId} className="text-4xl leading-none sm:text-[clamp(40px,4.2vw,60px)]">
            {heading.title}
          </Reveal>
          <Reveal as="p" kind="fade" className="sm:text-xl">
            {heading.text}
          </Reveal>
        </div>
      ) : (
        <h2 id={titleId} className="sr-only">
          Find your way in
        </h2>
      )}
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] overflow-hidden rounded-card">
        {doorways.map((d, i) => (
          <motion.li
            key={d.href}
            custom={{ i, reduce }}
            variants={reveal.door}
            initial="hidden"
            whileInView="shown"
            viewport={revealViewport}
            className="flex"
          >
            <MotionLink
              href={d.href}
              initial="rest"
              animate="rest"
              whileHover={reduce ? undefined : "hover"}
              className={`group relative isolate flex ${d.image ? "h-[clamp(440px,38vw,520px)]" : "h-[clamp(300px,26vw,360px)]"} w-full flex-col justify-end gap-2.5 overflow-hidden p-[clamp(24px,2.6vw,36px)] text-hearth no-underline outline-offset-[-6px] hover:text-hearth`}
            >
              {/* Cards with no planned image are shorter, so they don't read as empty picture frames. */}
              <motion.div variants={imageHover} className="absolute inset-0 -z-10">
                <PlaceholderImage fill={d.fill} className="absolute inset-0" />
              </motion.div>
              {d.image && <PlaceholderLabel>{d.image}</PlaceholderLabel>}

              {d.audience && <span className="text-[1.0625rem] font-bold">{d.audience}</span>}
              <h3 className="text-[clamp(36px,3.1vw,44px)] leading-none tracking-[-0.02em]">{d.title}</h3>
              <p className="text-lg">{d.text}</p>
              <span className="mt-2 inline-flex h-12 items-center gap-2 self-start rounded-full bg-white px-[22px] font-bold text-hearth transition-colors duration-150 group-hover:bg-orange">
                {d.cta} <span aria-hidden="true">→</span>
              </span>
            </MotionLink>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
