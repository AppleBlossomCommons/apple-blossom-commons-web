"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { HEADER_HEIGHT } from "@/components/site/SiteHeader";

type Props = {
  children: ReactNode;
  /**
   * Hold this section in place once it has scrolled fully into view, so the next section slides
   * up over it. Without `pin`, the section scrolls normally but still paints over pinned ones.
   */
  pin?: boolean;
  /** Round the top corners, so the section reads as a sheet sliding over the one before. */
  sheet?: boolean;
  className?: string;
};

/**
 * One section of the Home "stacked sheets" scroll (owner request, Nov 20, 2026, after villiers.ai).
 *
 * Pinning is plain CSS `position: sticky`: scrolling stays native, nothing takes over the wheel.
 * A pinned section sticks where its bottom meets the bottom of the screen (or just below the header
 * when it is shorter than the screen), so every part of it is seen before the next one covers it.
 * With reduced motion nothing pins (`motion-safe:`), and the sections simply follow one another.
 *
 * Every Home section goes through this wrapper, pinned or not: a positioned element paints over
 * earlier positioned ones, so a later section always covers a pinned one.
 */
export function StackSection({ children, pin = false, sheet = false, className = "" }: Props) {
  const marker = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  // Where the section sticks: below the header, or higher when it's taller than the screen.
  useEffect(() => {
    const el = box.current;
    if (!pin || !el) return;
    const measure = () => setTop(Math.min(HEADER_HEIGHT, window.innerHeight - el.offsetHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pin]);

  // A pinned section can sit under a later one while a keyboard user tabs back into it. The
  // browser sees the focused element as on screen and won't scroll, so scroll the page back to
  // where the section sits in the normal flow (WCAG 2.4.11, focus not obscured).
  useEffect(() => {
    const el = box.current;
    if (!pin || !el) return;
    const onFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // After the browser's own scroll-into-view; a timer, not a frame, so it also runs in a
      // background tab.
      setTimeout(() => {
        const r = target.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        if (y < 0 || y > window.innerHeight) return; // off screen: the browser handles it
        const hit = document.elementFromPoint(x, y);
        if (hit && el.contains(hit)) return;
        // The section is fully uncovered at the moment it first sticks (scroll = flowTop − stick).
        // Scroll there, or a little earlier when the element sits high in a tall section.
        const flowTop = marker.current!.getBoundingClientRect().top + window.scrollY;
        const stick = parseFloat(getComputedStyle(el).top) || 0;
        const offsetInSection = r.top - el.getBoundingClientRect().top;
        const want = Math.min(flowTop - stick, flowTop + offsetInSection - window.innerHeight / 3);
        window.scrollTo({ top: Math.max(0, want), behavior: "instant" });
      }, 0);
    };
    el.addEventListener("focusin", onFocus);
    return () => el.removeEventListener("focusin", onFocus);
  }, [pin]);

  return (
    <>
      {/* Marks where the section sits in the normal flow (a sticky box reports where it is stuck). */}
      {pin && <div ref={marker} aria-hidden="true" />}
      <div
        ref={box}
        // A variable, not `top`: `top` would shift the box when reduced motion leaves it relative.
        style={top === null ? undefined : ({ "--stack-top": `${top}px` } as CSSProperties)}
        // overflow-clip, not overflow-hidden: hidden would make this box a scroll container and
        // stop sticky elements inside it (the Home photo steps) from sticking.
        className={`relative ${pin && top !== null ? "motion-safe:sticky motion-safe:top-(--stack-top)" : ""} ${sheet ? "overflow-clip rounded-t-[clamp(24px,2.4vw,32px)]" : ""} ${className}`}
      >
        {children}
      </div>
    </>
  );
}
