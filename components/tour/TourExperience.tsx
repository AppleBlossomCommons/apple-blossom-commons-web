"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { buttonClass } from "@/components/site/buttons";
import { ChevronLeft, ChevronRight, Collapse, Expand, Pause, Play } from "@/components/site/icons";
import { scrollToElement } from "@/lib/smooth-scroll";
import { fmt, type LatLng } from "@/lib/tour-core";
import type { Tour } from "@/lib/tours";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { KindTag, TourList } from "./TourList";
import { TourMap } from "./TourMap";
import { TourProgress } from "./TourProgress";

/*
 * The selected tour lives in the address (/tour#isenhart-edwin), so deep links, the list and
 * Previous/Next always agree. replaceState doesn't fire "hashchange", so writeHash tells the
 * subscribers itself.
 */
const hashListeners = new Set<() => void>();
function subscribeHash(onChange: () => void) {
  hashListeners.add(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    hashListeners.delete(onChange);
    window.removeEventListener("hashchange", onChange);
  };
}
function readHash() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
}
function writeHash(id: string) {
  window.history.replaceState(null, "", `#${id}`);
  hashListeners.forEach((cb) => cb());
}

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}
const noSubscribe = () => () => {};

/** What we know about the clip on screen. It resets whenever a different tour is shown. */
type Clip = { id: string; time: number; duration: number | null; ended: boolean; failed: boolean };
const freshClip = (id: string): Clip => ({ id, time: 0, duration: null, ended: false, failed: false });

/** Landmark chips take the home page tints in turn; the one playing turns gold (selection). */
const chipTints = ["bg-tint-pink", "bg-tint-lime", "bg-tint-sky", "bg-tint-butter"];

/** How a tour was chosen: from the list or Previous/Next (plays unless reduced motion), "Up next" (plays), or just shown. */
type SelectHow = "autoplay" | "play" | "show";

/**
 * The Site Tour stage (docs/13 §5, §7, §8, §10): full-bleed sand, the current clip's heading and
 * Previous/Next, the video with custom controls beside the map, landmark chips, the caption and
 * the list of all clips. Only the selected clip loads, and it plays muted.
 */
export function TourExperience({
  tours,
  videoBase,
  mapStart,
}: {
  tours: Tour[];
  videoBase: string;
  mapStart: { center: LatLng; zoom: number };
}) {
  const reduce = usePrefersReducedMotion();
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const index = Math.max(0, tours.findIndex((t) => t.id === hash));
  const tour = tours[index];

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const stageTopRef = useRef<HTMLDivElement>(null);
  const autoplay = useRef(false);
  const pendingSeek = useRef<number | null>(null);

  // Nothing downloads until the visitor chooses a tour or presses play (preload="none" before that).
  const [activated, setActivated] = useState(false);
  // The id of the clip that is playing, so a newly shown clip never inherits the last one's state.
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [clipState, setClip] = useState<Clip>(() => freshClip(""));
  const clip = clipState.id === tour.id ? clipState : freshClip(tour.id);
  const patchClip = useCallback((id: string, p: Partial<Clip>) => {
    setClip((c) => ({ ...(c.id === id ? c : freshClip(id)), ...p }));
  }, []);

  const playing = playingId === tour.id;
  const duration = clip.duration ?? tour.duration;
  const time = Math.min(clip.time, duration);
  const src = videoBase ? videoBase + encodeURIComponent(tour.video) : undefined;

  const canFullscreen = useSyncExternalStore(
    noSubscribe,
    () => document.fullscreenEnabled || "webkitEnterFullscreen" in HTMLVideoElement.prototype,
    () => false,
  );
  const isFullscreen = useSyncExternalStore(subscribeFullscreen, () => document.fullscreenElement !== null, () => false);

  // A deep link (/tour#id) opens with the stage in view. It doesn't play: that waits for the visitor.
  useEffect(() => {
    if (tours.some((t) => t.id === readHash()) && stageTopRef.current) {
      window.scrollTo({ top: Math.max(0, stageTopRef.current.getBoundingClientRect().top + window.scrollY - 80), behavior: "instant" });
    }
  }, [tours]);

  // After a tour change, play the new clip if that's how it was chosen.
  useEffect(() => {
    if (!autoplay.current) return;
    autoplay.current = false;
    videoRef.current?.play().catch(() => {});
  }, [tour.id]);

  // While playing, follow the video every frame so the bar (and, later, the map marker) move smoothly.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const id = tour.id;
    const loop = () => {
      const v = videoRef.current;
      if (v) patchClip(id, { time: v.currentTime });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, tour.id, patchClip]);

  const select = useCallback(
    (i: number, how: SelectHow) => {
      const next = tours[i];
      if (!next) return;
      setActivated(true);
      const play = how === "play" || (how === "autoplay" && !reduce);
      if (next.id === tour.id) {
        if (play) videoRef.current?.play().catch(() => {});
        return;
      }
      autoplay.current = play;
      pendingSeek.current = null;
      writeHash(next.id);
    },
    [tours, tour.id, reduce],
  );

  const chooseFromList = useCallback(
    (i: number) => {
      select(i, "autoplay");
      // The list sits below the player: bring the player back into view if it has scrolled away.
      const top = stageTopRef.current;
      if (top && top.getBoundingClientRect().top < 0) void scrollToElement(top);
    },
    [select],
  );

  // Another tour's line on the map was clicked: the player is already in view.
  const chooseFromMap = useCallback((i: number) => select(i, "autoplay"), [select]);

  const seek = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    const to = Math.max(0, Math.min(duration, t));
    patchClip(tour.id, { time: to, ended: false });
    if (v.readyState === 0) {
      // Nothing loaded yet: load the clip's details, then jump (see onLoadedMetadata).
      pendingSeek.current = to;
      setActivated(true);
      v.preload = "metadata";
      v.load();
    } else {
      v.currentTime = to;
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    setActivated(true);
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (document.fullscreenEnabled && player) void player.requestFullscreen();
    else v?.webkitEnterFullscreen?.(); // iPhone: the system player is the only full-screen option
  };

  const n = tours.length;
  const prev = index > 0 ? index - 1 : null;
  const next = index < n - 1 ? index + 1 : null;
  const upNext = clip.ended && next !== null ? tours[next] : null;
  // The landmark whose moment is playing: the last one reached.
  const activeLandmark = tour.landmarks.reduce((found, l, i) => (l.t <= time + 0.05 ? i : found), -1);

  const ratio = tour.orientation === "portrait" ? "3 / 4" : "16 / 9";
  const navButton = `${buttonClass("secondary", "sm")} px-4 aria-disabled:pointer-events-none aria-disabled:opacity-40`;
  const iconButton = "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-[background-color,scale] duration-150 ease-out active:scale-[0.97]";

  return (
    <section aria-label="Tour player" className="bg-sand px-5 py-10 sm:px-[clamp(16px,4vw,56px)] sm:py-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Current clip */}
        <div ref={stageTopRef} className="flex flex-col gap-5 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-10">
          <div className="min-w-0">
            <h2 className="text-[28px] leading-[1.08] sm:text-[clamp(30px,2.6vw,40px)]">{tour.title}</h2>
            <p id="tour-clip-description" className="mt-2 max-w-[64ch] text-muted">
              {tour.subtitle}
            </p>
            <p className="mt-3 flex items-center gap-2 text-[0.9375rem] tabular text-muted">
              <KindTag kind={tour.kind} />
              {fmt(tour.duration)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className={navButton}
              aria-disabled={prev === null || undefined}
              onClick={() => prev !== null && select(prev, "autoplay")}
            >
              <ChevronLeft />
              Previous
            </button>
            <span className="min-w-[4.5em] whitespace-nowrap text-center text-[0.9375rem] tabular text-muted">
              {index + 1} of {n}
            </span>
            <button
              type="button"
              className={navButton}
              aria-disabled={next === null || undefined}
              onClick={() => next !== null && select(next, "autoplay")}
            >
              Next
              <ChevronRight />
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {hash ? `Showing clip ${index + 1} of ${n}: ${tour.title}` : ""}
        </p>

        {/* Video and map */}
        <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6">
          <div
            ref={playerRef}
            data-fullscreen={isFullscreen || undefined}
            className="group/player flex min-w-0 flex-col gap-3 data-fullscreen:bg-map-frame data-fullscreen:p-4"
          >
            <div
              // Capped at 70% of the screen height, and low enough that the title and controls still fit.
              className="relative w-full overflow-hidden rounded-card bg-map-frame max-h-[min(70vh,calc(100dvh-18rem))] group-data-fullscreen/player:max-h-none group-data-fullscreen/player:flex-1"
              style={{ aspectRatio: isFullscreen ? undefined : ratio }}
            >
              <video
                ref={videoRef}
                key={tour.id}
                src={src}
                poster={tour.poster}
                muted
                playsInline
                preload={activated ? "metadata" : "none"}
                aria-label={tour.title}
                // The clips are silent: the subtitle (and the landmark list) is their text description.
                aria-describedby="tour-clip-description"
                onClick={togglePlay}
                onPlay={() => {
                  setPlayingId(tour.id);
                  patchClip(tour.id, { ended: false });
                }}
                onPause={() => setPlayingId(null)}
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  if (Number.isFinite(v.duration) && v.duration > 0) patchClip(tour.id, { duration: v.duration });
                  if (pendingSeek.current !== null) {
                    v.currentTime = pendingSeek.current;
                    pendingSeek.current = null;
                  }
                }}
                onSeeked={(e) => patchClip(tour.id, { time: e.currentTarget.currentTime })}
                onTimeUpdate={(e) => !playing && patchClip(tour.id, { time: e.currentTarget.currentTime })}
                onEnded={() => {
                  setPlayingId(null);
                  patchClip(tour.id, { ended: true });
                }}
                onError={() => patchClip(tour.id, { failed: true })}
                className="absolute inset-0 size-full cursor-pointer object-contain"
              />

              {/* A large play mark over the poster: a mouse shortcut; the Play button below is the control. */}
              {!playing && !upNext && !(clip.failed || !src) && (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={togglePlay}
                  className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linen/95 text-hearth transition-[scale] duration-200 ease-out hover:scale-105 sm:size-24"
                >
                  <Play className="ml-1 size-8 sm:size-9" />
                </button>
              )}

              {(clip.failed || !src) && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p className="max-w-[32ch] rounded-card bg-linen px-5 py-4 text-center text-muted">
                    Video unavailable right now. The map and landmarks still work.
                  </p>
                </div>
              )}

              <div role="status" className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                {upNext && (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-card bg-linen px-4 py-3 sm:px-5">
                    <p className="min-w-0">
                      <span className="text-muted">Up next: </span>
                      <span className="font-bold">{upNext.title}</span>
                    </p>
                    <button type="button" className={buttonClass("primary", "sm")} onClick={() => select(index + 1, "play")}>
                      <Play className="size-4" />
                      Play
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className={`${iconButton} bg-orange text-hearth hover:bg-orange-hover`}
              >
                {playing ? <Pause /> : <Play className="ml-0.5 size-5" />}
              </button>
              <TourProgress time={time} duration={duration} landmarks={tour.landmarks} onSeek={seek} />
              <span className="shrink-0 text-[0.875rem] tabular text-muted sm:text-[0.9375rem]">
                {fmt(time)} / {fmt(duration)}
              </span>
              {canFullscreen && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
                  className={`${iconButton} border-[1.5px] border-hearth text-hearth hover:bg-linen`}
                >
                  {isFullscreen ? <Collapse /> : <Expand />}
                </button>
              )}
            </div>
          </div>

          <div className="flex min-h-[320px] min-w-0 flex-col">
            <TourMap
              tours={tours}
              index={index}
              time={time}
              playing={playing}
              reduce={reduce}
              start={mapStart}
              onSeek={seek}
              onSelect={chooseFromMap}
            />
          </div>
        </div>

        {/* Landmarks */}
        {tour.landmarks.length > 0 && (
          <div role="group" aria-label="Landmarks in this clip" className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {tour.landmarks.map((l, i) => (
              <button
                key={`${l.t}-${l.label}`}
                type="button"
                onClick={() => {
                  setActivated(true);
                  seek(l.t);
                }}
                aria-current={i === activeLandmark ? "time" : undefined}
                className={`inline-flex min-h-11 items-center gap-2.5 rounded-chip px-3.5 py-2 text-left text-[0.9375rem] leading-snug transition-[background-color,filter] duration-150 ease-out hover:brightness-[0.96] aria-[current=time]:bg-gold ${chipTints[i % chipTints.length]}`}
              >
                <span className="font-bold tabular">{fmt(l.t)}</span>
                <span className="sr-only">, </span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 max-w-[80ch] text-[0.875rem] leading-relaxed text-muted">
          Filmed September 27, 2026. Routes are matched to the footage by hand; between pinned moments the map marker&apos;s position is
          approximate. Clips play without sound.
        </p>

        {/* All clips */}
        <h2 className="sr-only">All clips</h2>
        <div className="mt-10 sm:mt-14">
          <TourList tours={tours} current={index} onSelect={chooseFromList} />
        </div>
      </div>
    </section>
  );
}
