"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";
import { reveal, revealViewport, type RevealKind } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const tags = { div: motion.div, h1: motion.h1, h2: motion.h2, p: motion.p, li: motion.li } as const;

type Props = {
  kind: RevealKind;
  as?: keyof typeof tags;
  /** Position in a staggered group (collage tiles, list items). */
  index?: number;
} & Omit<ComponentProps<"div">, "ref" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">;

/**
 * A scroll reveal from the handoff spec: head (section headings), fade (the paragraph after a
 * heading), card (tiles and items, staggered) and door (doorway cards). Plays once.
 */
export function Reveal({ kind, as = "div", index = 0, children, ...rest }: Props) {
  const reduce = usePrefersReducedMotion();
  const Tag = tags[as] as typeof motion.div;
  return (
    <Tag
      custom={{ i: index, reduce }}
      variants={reveal[kind]}
      initial="hidden"
      whileInView="shown"
      viewport={revealViewport}
      {...rest}
    >
      {children}
    </Tag>
  );
}
