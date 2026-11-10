"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";
import { imageHover } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import lakeView from "@/public/images/home/lake-chelan-view.jpg";
import morningMug from "@/public/images/home/morning-mug-lake.jpg";
import porch from "@/public/images/home/porch-every-chapter.jpg";
import coupleBiking from "@/public/images/home/couple-biking-orchard.jpg";
import coupleWalking from "@/public/images/home/couple-walking-path.jpg";

type Tile = {
  area: "L" | "W" | "M" | "S1" | "S2";
  word: string;
  line: string;
  /** Note for the placeholder label, until a photo replaces it. */
  image: string;
  fill: string;
  photo?: StaticImageData;
  /** Which part of the photo stays in view when the card crops it (Tailwind object-position class). */
  focus?: string;
};

// Copy from docs/10-content-v2.md, Home section 2. Image notes and sizes from the handoff.
const tiles: Tile[] = [
  {
    area: "L",
    word: "Once in a Generation",
    line: "Land like this, planned with this much care, comes along rarely.",
    image: "Stock photo: wide view of orchards with the lake beyond, golden hour",
    fill: "#FFF2B3",
    photo: lakeView,
  },
  {
    area: "W",
    word: "A New Way to Retire",
    line: "Paths designed for walking and biking, care close by, and room for the grandkids.",
    image: "Stock photo (people): couple in their late 60s–70s biking a quiet tree-lined path",
    fill: "#FFE1ED",
    // EXPERIMENT: AI image with people, not yet allowed by docs/10-content-v2.md (needs sign-off).
    photo: coupleBiking,
  },
  {
    area: "M",
    word: "Home for Every Chapter",
    line: "Stay in the community you love as your needs change.",
    image: "AI image, no people · Illustrative concept: cottage porch, two empty chairs, a folded blanket, apple blossoms",
    fill: "#EAF6CF",
    // EXPERIMENT: this AI image shows people, which docs/10-content-v2.md doesn't allow yet.
    // Needs owner and Andy sign-off (and a docs update) before it goes public.
    photo: porch,
    // On wide screens the card is tall and narrow; this keeps the grandmother and child both in view.
    focus: "object-[42%_50%]",
    // No "Illustrative concept" label on this card (owner decision, Nov 10, 2026), although
    // docs/10-content-v2.md asks for one on images that show Apple Blossom Commons buildings.
  },
  {
    area: "S1",
    word: "Unhurried",
    line: "Mornings with nowhere you have to be.",
    image: "AI image, no people: mug on a deck rail, morning mist",
    fill: "#DDF1FC",
    photo: morningMug,
  },
  {
    area: "S2",
    word: "Care, Close By",
    line: "The hospital campus is a short walk from home.",
    image: "Stock photo (people): older couple on a calm path",
    fill: "#ECE7FC",
    // EXPERIMENT: AI image with people, not yet allowed by docs/10-content-v2.md (needs sign-off).
    photo: coupleWalking,
  },
];

// Type and spacing per tile size (handoff): the large tile leads, the small ones are quieter.
const look = {
  L: { pad: "p-[clamp(24px,3vw,44px)] gap-2.5", title: "text-[clamp(44px,5vw,72px)] leading-[0.98] max-w-[520px]", text: "text-xl max-w-[440px]" },
  W: { pad: "p-7 gap-1.5", title: "text-[38px] leading-[1.04] tracking-[-0.02em]", text: "text-lg" },
  M: { pad: "p-7 gap-1.5", title: "text-[40px] leading-[1.02] tracking-[-0.02em]", text: "text-lg" },
  S1: { pad: "p-6 gap-1", title: "text-[30px] leading-[1.05] tracking-[-0.02em]", text: "text-[17px] leading-[1.4]" },
  S2: { pad: "p-6 gap-1", title: "text-[30px] leading-[1.05] tracking-[-0.02em]", text: "text-[17px] leading-[1.4]" },
} as const;

/**
 * The five-tile bento collage. Desktop: 2fr 1fr 1fr 1.3fr columns, two 340px rows.
 * Below 760px: one column. Tiles rise in one after another. The tiles touch, with no gaps, and only
 * the outer corners are rounded (seamless style, owner-approved Oct 25, 2026), so they don't lift on
 * hover; the image layer still eases in.
 */
export function Collage() {
  const reduce = usePrefersReducedMotion();

  return (
    <section aria-labelledby="collage-title" className="px-[clamp(8px,1.2vw,16px)] pb-[clamp(72px,8vw,112px)] pt-2">
      <div className="grid grid-cols-1 grid-rows-[440px_300px_320px_260px_260px] overflow-hidden rounded-card [grid-template-areas:'L'_'W'_'M'_'S1'_'S2'] min-[760px]:grid-cols-[2fr_1fr_1fr_1.3fr] min-[760px]:grid-rows-[340px_340px] min-[760px]:[grid-template-areas:'L_W_W_M'_'L_S1_S2_M']">
        {tiles.map((tile, i) => {
          const l = look[tile.area];
          const Title = tile.area === "L" ? "h2" : "h3";
          return (
            <Reveal key={tile.area} kind="card" index={i} style={{ gridArea: tile.area }} className="flex">
              <motion.div
                initial="rest"
                animate="rest"
                whileHover={reduce ? undefined : "hover"}
                className={`relative isolate flex w-full flex-col justify-end overflow-hidden ${tile.photo ? "text-white" : "text-hearth"} ${l.pad}`}
              >
                <motion.div variants={imageHover} className="absolute inset-0 -z-10">
                  {tile.photo ? (
                    // Decorative: the heading carries the message, so the photo has empty alt text.
                    <Image
                      src={tile.photo}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 760px) 40vw, 100vw"
                      className={`object-cover ${tile.focus ?? "object-[50%_45%]"}`}
                    />
                  ) : (
                    <PlaceholderImage fill={tile.fill} className="absolute inset-0" />
                  )}
                </motion.div>
                {tile.photo ? (
                  // On a real photo, white text sits on a soft dark-brown fade (docs/04-design-direction.md, rule 3).
                  // Phone cards are short, so the text fills more of them and the fade reaches higher there.
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(59_47_42/0.8)_0%,rgb(59_47_42/0.72)_40%,rgb(59_47_42/0.62)_65%,rgb(59_47_42/0)_95%)] min-[760px]:bg-[linear-gradient(to_top,rgb(59_47_42/0.8)_0%,rgb(59_47_42/0.68)_30%,rgb(59_47_42/0.5)_48%,rgb(59_47_42/0)_72%)]"
                  />
                ) : (
                  <PlaceholderLabel inset={tile.area.startsWith("S") ? 14 : 16}>
                    {tile.image}
                  </PlaceholderLabel>
                )}
                <Title id={tile.area === "L" ? "collage-title" : undefined} className={l.title}>
                  {tile.word}
                </Title>
                <p className={l.text}>{tile.line}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
