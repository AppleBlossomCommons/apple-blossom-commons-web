"use client";

import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HEADER_HEIGHT } from "@/components/site/SiteHeader";

/**
 * Parallax drift for large images (handoff, "Parallax drift"). Put `ref` on the image's frame
 * (overflow hidden) and `y` on an image layer 120% tall (top and bottom −10%).
 * - "top": heroes at the top of a page drift down as the page scrolls: (64 − top) × 0.2.
 * - "center": other images drift against the scroll around the viewport center: −offset × 0.1.
 * Clamped to ±9% of the frame height. Off with reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(kind: "top" | "center") {
  const ref = useRef<T>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, () => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
    const r = el.getBoundingClientRect();
    const ty = kind === "top" ? Math.max(0, HEADER_HEIGHT - r.top) * 0.2 : -(r.top + r.height / 2 - window.innerHeight / 2) * 0.1;
    const limit = r.height * 0.09;
    return Math.max(-limit, Math.min(limit, ty));
  });

  return { ref, y };
}
