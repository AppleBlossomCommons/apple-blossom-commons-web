"use client";

import { animate } from "motion/react";
import { ease } from "./motion";

/** Matches `scroll-padding-top` on <html> (app/globals.css): clears the sticky header. */
const HEADER_CLEARANCE = 80;

/**
 * The element's top in the page, ignoring transforms. Sections that rise in on scroll are still
 * shifted down before they reveal, and getBoundingClientRect would count that shift.
 */
function layoutTop(el: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return top;
}

/**
 * Glide the page to an element (in-page links). The duration grows with the distance, from 0.5s
 * to 1.2s, on the handoff's in-out curve. A wheel, touch or key press stops it at once, so it
 * never fights the visitor. With reduced motion it jumps. Resolves when it lands or is stopped.
 */
export function scrollToElement(el: HTMLElement): Promise<void> {
  const target = Math.max(0, layoutTop(el) - HEADER_CLEARANCE);
  const distance = Math.abs(target - window.scrollY);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || distance < 2) {
    window.scrollTo({ top: target, behavior: "instant" });
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const controls = animate(window.scrollY, target, {
      duration: Math.min(1.2, Math.max(0.5, distance / 2400)),
      ease: ease.inOut,
      onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
      onComplete: finish,
    });
    function stop() {
      controls.stop();
      finish();
    }
    function finish() {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      resolve();
    }
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
  });
}

/**
 * Follow an in-page link (#id) with a glide, then update the address bar and move keyboard and
 * screen-reader focus to the target, as a normal jump would.
 */
export async function jumpTo(hash: string, focusTarget?: () => HTMLElement | null) {
  const el = document.getElementById(hash.replace(/^#/, ""));
  if (!el) return;
  history.pushState(null, "", hash);
  await scrollToElement(el);
  const focusEl = focusTarget?.() ?? el;
  if (focusEl === el && !el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  focusEl.focus({ preventScroll: true });
}
