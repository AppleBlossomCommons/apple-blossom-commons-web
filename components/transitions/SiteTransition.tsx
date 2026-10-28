"use client";

import { animate, type AnimationPlaybackControls } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { districtImage } from "@/lib/district-image";
import { ease } from "@/lib/motion";

export type DistrictRef = { slug: string; color: string };
type Point = { x: number; y: number };

type TransitionApi = {
  /**
   * Open the circle on a district's hero image from `origin` (null: cross-fade), then go to its
   * page. Resolves once the route change has started.
   */
  toDistrict(district: DistrictRef, origin: Point | null): Promise<void>;
  /** From the district page on screen back to the Home map. */
  toMap(): void;
  /** The district page on screen; its mount also tells an opening circle the page is ready. */
  registerDistrict(district: DistrictRef): () => void;
  /** The district Home should open zoomed into, while a return to the map is under way. */
  peekReturn(): DistrictRef | null;
  /** Listen for a return starting or ending (for useSyncExternalStore). */
  subscribeReturn(onChange: () => void): () => void;
  /** Home's map is ready: close the circle onto `origin` and finish the return. */
  closeOnMap(origin: Point): void;
  isBusy(): boolean;
  /** The district hero text is fading out for a return to the map. */
  leaving: boolean;
};

const TransitionContext = createContext<TransitionApi | null>(null);

/** The site transitions, or null outside the provider (then links behave as plain links). */
export function useSiteTransition() {
  return useContext(TransitionContext);
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Map ↔ district transitions (Phase 1 handoff, "Map → district page", "District page → back to
 * the map", "Next district"). Lives in the root layout so its overlay survives route changes.
 *
 * The overlay sits under the header, exactly where a district page's hero sits, and shows the
 * same image. A circle clip opens it over the Home map (or from a click point) before the route
 * changes, and closes it onto the Home map on the way back, so each page change is hidden.
 */
export function SiteTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const running = useRef<AnimationPlaybackControls[]>([]);
  const busy = useRef(false);
  const current = useRef<DistrictRef | null>(null);
  // The return in progress, as a small store: Home may be a page Next kept alive in the
  // background, so it listens for changes instead of reading this once.
  const returning = useRef<DistrictRef | null>(null);
  const returnListeners = useRef(new Set<() => void>());
  const setReturning = useCallback((value: DistrictRef | null) => {
    returning.current = value;
    returnListeners.current.forEach((l) => l());
  }, []);
  const awaitingHero = useRef<string | null>(null);

  // The hero text fades out while leaving a district page; reset whenever the route changes.
  const [leavingPath, setLeavingPath] = useState<string | null>(null);
  const leaving = leavingPath === pathname;

  const stop = () => {
    running.current.forEach((a) => a.stop());
    running.current = [];
  };
  const run = (a: AnimationPlaybackControls) => running.current.push(a);

  /** Circle maths in the overlay's own coordinates; R reaches the farthest corner. */
  const geom = (p: Point) => {
    const r = overlay.current!.getBoundingClientRect();
    const ox = p.x - r.left;
    const oy = p.y - r.top;
    return { ox, oy, R: Math.hypot(Math.max(ox, r.width - ox), Math.max(oy, r.height - oy)) + 4 };
  };
  const fullCircle = () => {
    const r = overlay.current!.getBoundingClientRect();
    return `circle(${Math.hypot(r.width, r.height)}px at 50% 50%)`;
  };

  const show = (color: string) => {
    stop();
    const ov = overlay.current!;
    media.current!.style.background = districtImage(color);
    media.current!.style.transform = "";
    ov.style.opacity = "1";
    ov.style.visibility = "visible";
    // Block clicks on the page underneath while a transition runs.
    ov.style.pointerEvents = "auto";
  };
  const hide = useCallback(() => {
    stop();
    const ov = overlay.current;
    if (!ov) return;
    ov.style.visibility = "hidden";
    ov.style.pointerEvents = "none";
    ov.style.clipPath = "";
    ov.style.opacity = "";
    if (media.current) media.current.style.transform = "";
  }, []);
  const done = useCallback(() => {
    hide();
    setReturning(null);
    busy.current = false;
  }, [hide, setReturning]);

  const api = useMemo<TransitionApi>(
    () => ({
      async toDistrict(district, origin) {
        if (busy.current || !overlay.current) return;
        busy.current = true;
        show(district.color);
        const ov = overlay.current;
        if (!origin || reducedMotion()) {
          // Reduced motion: no circle, a quick cross-fade.
          ov.style.clipPath = fullCircle();
          run(animate(ov, { opacity: [0, 1] }, { duration: 0.25, ease: ease.css }));
          await wait(260);
        } else {
          // The circle opens from the origin to cover the screen (1000ms) as the image settles.
          const g = geom(origin);
          run(animate(ov, { clipPath: [`circle(0px at ${g.ox}px ${g.oy}px)`, `circle(${g.R}px at ${g.ox}px ${g.oy}px)`] }, { duration: 1, ease: ease.open }));
          run(animate(media.current!, { scale: [1.25, 1] }, { duration: 1, ease: ease.open }));
          await wait(1040);
        }
        awaitingHero.current = district.slug;
        router.push(`/districts/${district.slug}`);
        // If the page never reports in, don't leave the overlay up.
        setTimeout(() => {
          if (awaitingHero.current === district.slug) {
            awaitingHero.current = null;
            done();
          }
        }, 3000);
      },

      async toMap() {
        const district = current.current;
        if (busy.current || !district || !overlay.current) return;
        busy.current = true;
        const reduce = reducedMotion();
        // The hero text fades (220ms), then the hero image covers the screen.
        if (!reduce) {
          setLeavingPath(window.location.pathname);
          await wait(200);
        }
        const atTop = window.scrollY < 40;
        show(district.color);
        overlay.current.style.clipPath = fullCircle();
        if (!atTop || reduce) {
          run(animate(overlay.current, { opacity: [0, 1] }, { duration: 0.26, ease: ease.css }));
          await wait(270);
        }
        setReturning(district);
        router.push("/", { scroll: false });
        // Home closes the circle once its map is ready; this is only a safety net.
        setTimeout(() => {
          if (returning.current === district) done();
        }, 5000);
      },

      registerDistrict(district) {
        current.current = district;
        if (awaitingHero.current === district.slug) {
          awaitingHero.current = null;
          // Two frames, so the district hero has painted under the overlay before it goes.
          requestAnimationFrame(() => requestAnimationFrame(done));
        }
        return () => {
          if (current.current?.slug === district.slug) current.current = null;
        };
      },

      peekReturn: () => returning.current,
      subscribeReturn(onChange) {
        returnListeners.current.add(onChange);
        return () => returnListeners.current.delete(onChange);
      },

      closeOnMap(origin) {
        if (!returning.current || !overlay.current) return;
        const ov = overlay.current;
        if (reducedMotion()) {
          run(animate(ov, { opacity: [1, 0] }, { duration: 0.25, ease: ease.css }));
          setTimeout(done, 260);
          return;
        }
        // The circle closes toward the map's center (850ms from 60ms) as the image drifts in.
        const g = geom(origin);
        run(animate(ov, { clipPath: [`circle(${g.R}px at ${g.ox}px ${g.oy}px)`, `circle(0px at ${g.ox}px ${g.oy}px)`] }, { delay: 0.06, duration: 0.85, ease: ease.shut }));
        run(animate(media.current!, { scale: [1, 1.2] }, { delay: 0.06, duration: 0.85, ease: ease.shut }));
        setTimeout(done, 1050);
      },

      isBusy: () => busy.current,
      leaving,
    }),
    // show/geom/run read refs only; `leaving` is the one value that changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, done, leaving, setReturning],
  );

  // Browser Back from a district page to Home: cover the screen with the hero image at once, so
  // Home can open zoomed into the district and close the circle like the "Back to the map" link.
  useEffect(() => {
    const onPop = () => {
      const district = current.current;
      if (!district || busy.current || window.location.pathname !== "/" || !overlay.current) return;
      busy.current = true;
      show(district.color);
      overlay.current.style.clipPath = fullCircle();
      setReturning(district);
      setTimeout(() => {
        if (returning.current === district) done();
      }, 5000);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, setReturning]);

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-x-0 top-16 z-[25] h-[calc(100svh-64px)] min-h-[520px] overflow-hidden"
      >
        <div ref={media} className="absolute inset-x-0 -bottom-[10%] -top-[10%]" />
      </div>
    </TransitionContext.Provider>
  );
}
