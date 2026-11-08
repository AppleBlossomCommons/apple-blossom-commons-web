"use client";

import { type MotionValue, motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { homeVideoSrc } from "@/lib/home-video";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Status = "idle" | "playing" | "paused" | "ended";

const noop = () => () => {};

/**
 * The Home hero drone clip, laid over the still image (its first frame). It plays once, muted,
 * and holds on its last frame: no loop (docs/04-design-direction.md, "Motion"). It starts once
 * the Home intro has finished, so it isn't half over by the time the hero is revealed.
 * With reduced motion it never starts on its own; the still stays until someone presses Play.
 * The clip is longer than 5 seconds, so it always has a pause control (WCAG 2.2.2).
 *
 * Renders the hero's whole media layer: `still` and the video drift with the scroll (`y`, from
 * useParallax) and take the intro's blur-in (data-intro-el="media"); the button stays put.
 */
export function HeroVideo({ still, y }: { still: ReactNode; y: MotionValue<number> }) {
  const video = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = usePrefersReducedMotion();
  // The video only renders in the browser, after the reduced-motion setting is known.
  const isClient = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return;
    const html = document.documentElement;
    const start = () => v.play().catch(() => setStatus("paused")); // e.g. iPhone Low Power Mode
    if (!html.dataset.intro) {
      start();
      return;
    }
    // HomeIntro removes html[data-intro] when the entrance has finished.
    const observer = new MutationObserver(() => {
      if (html.dataset.intro) return;
      observer.disconnect();
      start();
    });
    observer.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
    return () => observer.disconnect();
  }, [reduce, isClient]);

  const showVideo = isClient && !!homeVideoSrc && !failed;

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (status === "playing") v.pause();
    else {
      if (status === "ended") v.currentTime = 0;
      v.play().catch(() => setStatus("paused"));
    }
  };
  const label = status === "playing" ? "Pause video" : status === "ended" ? "Replay video" : "Play video";

  return (
    <>
      <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[10%] -top-[10%] -z-10">
        <div data-intro-el="media" className="absolute inset-0 bg-[#DDF1FC]">
          {still}
          {showVideo && (
            <video
              ref={video}
              src={homeVideoSrc}
              muted
              playsInline
              preload={reduce ? "none" : "auto"}
              aria-hidden="true"
              onLoadedData={() => setReady(true)}
              onPlay={() => {
                setReady(true);
                setStatus("playing");
              }}
              onPause={(e) => !e.currentTarget.ended && setStatus("paused")}
              onEnded={() => setStatus("ended")}
              onError={() => setFailed(true)}
              // Hidden until it has a frame to show, so the still never flashes empty.
              className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>
      </motion.div>
      {showVideo && (
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          title={label}
          data-intro-el="tag"
          className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-hearth/65 text-white backdrop-blur-sm transition-[background-color,scale] duration-150 ease-out hover:bg-hearth/80 active:scale-[0.97] focus-visible:outline-white"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="currentColor">
            {status === "playing" ? (
              <path d="M5.5 3.5h3v13h-3zM11.5 3.5h3v13h-3z" />
            ) : status === "ended" ? (
              <path d="M10 3.5a6.5 6.5 0 1 1-6.2 8.5l1.9-.6A4.5 4.5 0 1 0 10 5.5c-1.3 0-2.4.5-3.2 1.3L9 9H3V3l2.3 2.3A6.5 6.5 0 0 1 10 3.5Z" />
            ) : (
              <path d="M6 3.5v13l10.5-6.5z" />
            )}
          </svg>
        </button>
      )}
    </>
  );
}
