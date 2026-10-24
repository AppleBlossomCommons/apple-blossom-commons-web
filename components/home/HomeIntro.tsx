"use client";

import { animate, type AnimationPlaybackControls } from "motion/react";
import { useLayoutEffect, useRef } from "react";
import { Logo } from "@/components/site/Logo";
import { ease } from "@/lib/motion";
import { INTRO_SEEN_KEY, introMode, type IntroMode } from "@/lib/home-intro";

const COLS = 12;
const ROWS = 7;
// Staircase reveal: each cell's step count from the bottom-right corner, so the loader clears
// from bottom-right to top-left.
const cells = Array.from({ length: COLS * ROWS }, (_, k) => COLS - 1 - (k % COLS) + (ROWS - 1 - Math.floor(k / COLS)));

function markSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {}
}

/** When each sequence has finished, in seconds (the last step is the image label). */
const END: Record<Exclude<IntroMode, "none">, number> = { full: 4.25, return: 2.1, reduce: 1 };

/**
 * The Home loading intro and hero entrance (handoff, "Loading intro"). The loader layer renders
 * here; the hero marks its animated parts with data-intro-el. html[data-intro] (set before the
 * first paint, see lib/home-intro.ts) holds everything at its start state until this runs.
 */
export function HomeIntro() {
  const loader = useRef<HTMLDivElement>(null);

  // A layout effect, so on client-side navigation to Home the start state applies before paint.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = localStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {}
    const mode = (html.dataset.intro as IntroMode | undefined) ?? introMode(seen, reduce);
    if (mode === "none") return;
    html.dataset.intro = mode;

    const running: AnimationPlaybackControls[] = [];
    const timers: number[] = [];
    let cancelled = false;
    const done = () => {
      delete html.dataset.intro;
      // Clear what the loader's animations left behind, so it is ready if Home mounts again.
      if (loader.current) {
        loader.current.removeAttribute("style");
        loader.current.querySelectorAll("[style]:not([data-petal])").forEach((el) => el.removeAttribute("style"));
        // Petals keep the transform-origin React set on them; only reset what the animation added.
        loader.current.querySelectorAll<SVGElement>("[data-petal]").forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
      }
      // A finished blur(0px) still costs a compositing layer; drop it.
      document.querySelectorAll<HTMLElement>("[data-intro-el]").forEach((el) => (el.style.filter = ""));
    };

    // Wait for the web fonts, so the headline doesn't blur in on a fallback font.
    document.fonts.ready.then(() => {
      if (cancelled || !loader.current) return;
      running.push(...play(mode, loader.current, timers));
      // The first visit counts once the loader has cleared.
      timers.push(window.setTimeout(markSeen, (mode === "return" ? 0 : END[mode]) * 1000));
      timers.push(window.setTimeout(done, END[mode] * 1000 + 100));
    });

    // Leaving early (or React's development-only test remount) jumps every step to its end state.
    return () => {
      cancelled = true;
      running.forEach((a) => a.complete());
      timers.forEach(clearTimeout);
      done();
    };
  }, []);

  return (
    <div ref={loader} aria-hidden="true" className="home-loader fixed inset-0 z-[60] bg-linen">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-7">
        {cells.map((step, k) => (
          <span key={k} data-step={step} className="bg-linen shadow-[0_0_0_1px_var(--linen)]" />
        ))}
      </div>
      <div data-loader="content" className="absolute inset-0 flex flex-col items-center justify-center gap-[22px]">
        <Logo size={52} strokeWidth={1.3} petalAttr className="overflow-visible" />
        <p
          data-loader="wordmark"
          translate="no"
          className="whitespace-nowrap pl-[0.34em] font-display text-[15px] font-medium uppercase leading-none tracking-[0.34em]"
        >
          Apple Blossom Commons
        </p>
        <span className="relative h-px w-[132px] overflow-hidden bg-line">
          <span data-loader="bar" className="absolute inset-0 origin-left scale-x-0 bg-hearth" />
        </span>
      </div>
    </div>
  );
}

/** Starts every step of the sequence and returns the running animations. Times follow the spec table (ms ÷ 1000). */
function play(mode: Exclude<IntroMode, "none">, loader: HTMLDivElement, timers: number[]) {
  const a: AnimationPlaybackControls[] = [];
  const one = (sel: string) => loader.querySelector<HTMLElement>(`[data-loader="${sel}"]`)!;
  const hero = (name: string) => Array.from(document.querySelectorAll<HTMLElement>(`[data-intro-el="${name}"]`));
  const hideLoaderAt = (s: number) => timers.push(window.setTimeout(() => (loader.style.display = "none"), s * 1000));

  if (mode === "reduce") {
    // Brief loader: the bar fills, the layer fades. No blur, scale or stagger anywhere.
    a.push(animate(one("bar"), { scaleX: [0, 1] }, { duration: 0.5, ease: "linear" }));
    a.push(animate(loader, { opacity: [1, 0] }, { delay: 0.6, duration: 0.4, ease: ease.css }));
    hideLoaderAt(1);
    return a;
  }

  let t = 0;
  if (mode === "full") {
    window.scrollTo({ top: 0, behavior: "instant" });
    loader.querySelectorAll<SVGElement>("[data-petal]").forEach((el, i) =>
      a.push(animate(el, { opacity: [0, 1], scale: [0.3, 1] }, { delay: 0.08 + i * 0.07, duration: 0.65, ease: ease.out })),
    );
    a.push(
      animate(
        one("wordmark"),
        { opacity: [0, 1], letterSpacing: ["0.6em", "0.34em"], filter: ["blur(6px)", "blur(0px)"] },
        { delay: 0.2, duration: 1, ease: ease.out },
      ),
    );
    a.push(animate(one("bar"), { scaleX: [0, 1] }, { delay: 0.3, duration: 0.95, ease: ease.inOut }));
    a.push(animate(one("content"), { opacity: [1, 0], y: [0, -8] }, { delay: 1.3, duration: 0.3, ease: ease.cssIn }));

    // Staircase reveal at 1.5s: the layer turns see-through and its 12 × 7 cells fade out
    // 42ms apart, bottom-right first.
    t = 1.5;
    timers.push(window.setTimeout(() => (loader.style.background = "transparent"), t * 1000));
    loader.querySelectorAll<HTMLElement>("[data-step]").forEach((cell) =>
      a.push(animate(cell, { opacity: [1, 0] }, { delay: t + Number(cell.dataset.step) * 0.042, duration: 0.09, ease: "linear" })),
    );
    hideLoaderAt(t + 1.1);

    a.push(...hero("media").map((el) => animate(el, { scale: [1.14, 1], filter: ["blur(14px)", "blur(0px)"] }, { delay: 1.4, duration: 2.6, ease: ease.out })));
    const header = document.getElementById("site-header");
    if (header) a.push(animate(header, { opacity: [0, 1], y: [-10, 0] }, { delay: 2.05, duration: 0.8, ease: ease.out }));
    t = 2.25;
  } else {
    a.push(...hero("media").map((el) => animate(el, { scale: [1.06, 1], filter: ["blur(6px)", "blur(0px)"] }, { duration: 1.4, ease: ease.out })));
    t = 0.1;
  }

  // Headline word by word, then the subline, the buttons and the image label.
  hero("word").forEach((el, i) => {
    const rise = parseFloat(getComputedStyle(el).fontSize) * 0.3;
    a.push(animate(el, { opacity: [0, 1], filter: ["blur(18px)", "blur(0px)"], y: [rise, 0] }, { delay: t + i * 0.08, duration: 1.1, ease: ease.out }));
  });
  hero("sub").forEach((el) =>
    a.push(animate(el, { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"], y: [14, 0] }, { delay: t + 0.9, duration: 0.9, ease: ease.out })),
  );
  hero("btn").forEach((el, i) => a.push(animate(el, { opacity: [0, 1], y: [14, 0] }, { delay: t + 1.1 + i * 0.1, duration: 0.8, ease: ease.out })));
  hero("tag").forEach((el) => a.push(animate(el, { opacity: [0, 1] }, { delay: t + 1.4, duration: 0.6, ease: ease.css })));
  return a;
}
