"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cardHover, imageHover, reveal, revealViewport } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { PlaceholderImage, PlaceholderLabel } from "./ImagePlaceholder";

// Copy from docs/10-content-v2.md, Home section 6 "Doorways". Image notes from the Phase 1 handoff.
const doorways = [
  {
    href: "/participate",
    audience: "For neighbors",
    title: "Have a say.",
    text: "Learn how the plan is reviewed and share your views.",
    cta: "How Can I Participate?",
    image: "Stock photo (people): two neighbors talking over a garden fence",
    gradient: "linear-gradient(165deg, #F3FAFE 0%, #DDF1FC 100%)",
  },
  {
    href: "/participate#update-list",
    audience: "For future residents",
    title: "Be the first to know.",
    text: "Join the update list for news as homes and care options take shape.",
    cta: "How Can I Participate?",
    image: "AI image, no people · Illustrative concept: cottage front door with a wreath and blossoms",
    gradient: "linear-gradient(170deg, #FFF5F9 0%, #FFE1ED 100%)",
  },
  {
    href: "/partners",
    audience: "For investors and land buyers",
    title: "Build with us.",
    text: "Explore investment and development opportunities.",
    cta: "Partner with Us",
    image: "Stock photo: open orchard rows on a gentle slope, golden hour",
    gradient: "linear-gradient(175deg, #F8FCEE 0%, #EAF6CF 100%)",
  },
];

const MotionLink = motion.create(Link);

/** Three audience doorways. They end Home and every district page (content pack, Districts). */
export function DoorwayCards() {
  const reduce = usePrefersReducedMotion();

  return (
    <section aria-labelledby="doorways-title" className="px-[clamp(8px,1.2vw,16px)] pb-4 pt-[clamp(72px,8vw,112px)]">
      <h2 id="doorways-title" className="sr-only">
        Find your way in
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-2">
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
              variants={cardHover}
              className="relative isolate flex h-[clamp(440px,38vw,520px)] w-full flex-col justify-end gap-2.5 overflow-hidden rounded-card p-[clamp(24px,2.6vw,36px)] text-hearth no-underline hover:text-hearth"
            >
              <motion.div variants={imageHover} className="absolute inset-0 -z-10">
                <PlaceholderImage gradient={d.gradient} className="absolute inset-0" />
              </motion.div>
              <PlaceholderLabel>{d.image}</PlaceholderLabel>

              <span className="text-[1.0625rem] font-bold">{d.audience}</span>
              <h3 className="text-[clamp(36px,3.1vw,44px)] leading-none tracking-[-0.02em]">{d.title}</h3>
              <p className="text-lg">{d.text}</p>
              <span className="mt-2 inline-flex h-12 items-center gap-2 self-start rounded-full bg-white px-[22px] font-bold text-hearth">
                {d.cta} <span aria-hidden="true">→</span>
              </span>
            </MotionLink>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
