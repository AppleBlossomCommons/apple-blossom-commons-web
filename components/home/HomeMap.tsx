"use client";

import { AnimatePresence, inView, motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { CameraCommand } from "@/components/plan/DistrictModel3D";
import { hasWebGL, ModelBoundary } from "@/components/plan/ModelBoundary";
import { FLAT_ZOOM, HOME_TARGET, PLAN_W, pxPerUnit } from "@/components/plan/model3d/geometry";
import { PlanMap2D } from "@/components/plan/PlanMap2D";
import type { PlanDistrict } from "@/components/plan/types";
import { HEADER_HEIGHT } from "@/components/site/SiteHeader";
import { useSiteTransition } from "@/components/transitions/SiteTransition";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// The 3D model never renders on the server and is only fetched once the frame nears the viewport.
const DistrictModel3D = dynamic(() => import("@/components/plan/DistrictModel3D"), { ssr: false });

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const isPlainClick = (e: React.MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/** Where the map frame's top should sit so the frame is centered under the header. */
function centeredTop(frameHeight: number) {
  return Math.max(HEADER_HEIGHT + 12, (window.innerHeight - frameHeight) / 2 + HEADER_HEIGHT / 2);
}

/**
 * "Ten neighborhoods, one plan" (content pack, Home section 3; handoff, Home "Map section").
 * On Home the map is a doorway: choosing a district on the model, a roundel or a chip opens
 * its page. There is no side card here; that lives on The Plan.
 *
 * Arriving: one motion from flat plan to 3D. The 2D plan shows first, drawn at exactly the scale
 * and position of the model's flat start view. Once the model is ready and the frame is 35%
 * visible, the camera swings into its usual oblique view (1800ms) while the 2D plan fades.
 *
 * Opening a district (handoff, "Map → district page"): the map centers on screen, the other
 * districts dim, a gold ring pulses on the choice and the camera dives in (1300ms). At 850ms the
 * site transition opens a circle on the district's hero image and changes the page.
 *
 * Returning from a district page ("District page → back to the map"): the map starts centered,
 * zoomed into that district. Once the model is ready the circle closes onto the map, the camera
 * surfaces to its usual view from 650ms, and the districts undim at 1050ms.
 *
 * Next keeps Home alive in the background while another page shows (React <Activity>), so a
 * return can find this component already mounted: it listens for returns as they happen, and it
 * resets its dive state and camera whenever it is hidden (the Next "Preserving UI state" guide).
 *
 * Reduced motion: no tilt or camera moves; transitions cross-fade. Without WebGL the 2D plan
 * stays. The chips are the keyboard and screen-reader path; the drawing itself is aria-hidden.
 */
export function HomeMap({ districts, viewBox, imageHref, disclaimer }: { districts: PlanDistrict[]; viewBox: string; imageHref: string; disclaimer: string }) {
  const router = useRouter();
  const transition = useSiteTransition();
  const reduce = usePrefersReducedMotion();
  const frame = useRef<HTMLDivElement>(null);

  // A return from a district page in progress (null on the server and on a normal visit).
  const subscribe = useCallback((onChange: () => void) => transition?.subscribeReturn(onChange) ?? (() => {}), [transition]);
  const ret = useSyncExternalStore(subscribe, () => transition?.peekReturn() ?? null, () => null);
  const retKey = useMemo(() => (ret ? (districts.find((d) => d.slug === ret.slug)?.key ?? null) : null), [ret, districts]);
  // Decided once, when Home mounts.
  const [motionOk] = useState(() => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const startFlat = motionOk && !retKey;

  const [hovered, setHovered] = useState<string | null>(null);
  // The dive's selection; during a return the returning district shows instead, until it ends.
  const [selected, setSelected] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);
  const [command, setCommand] = useState<CameraCommand>({ kind: "none", seq: 0 });
  const [want3D, setWant3D] = useState(() => Boolean(retKey) && hasWebGL());
  // The model has taken over from the 2D plan.
  const [started, setStarted] = useState(false);
  const [failed3D, setFailed3D] = useState(false);
  const busy = useRef(false);
  const ready = useRef(false);

  // Load the model only when the frame comes near the viewport, and only with WebGL.
  useEffect(() => {
    const el = frame.current;
    if (!el || want3D) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (hasWebGL()) setWant3D(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [want3D]);

  // Frame size, to draw the 2D plan at the 3D camera's scale: the plan's width at the flat
  // start zoom, moved up because the camera looks at HOME_TARGET (z = 10), not the plan's middle.
  const [fit, setFit] = useState<{ width: number; offsetY: number } | undefined>();
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const ppu = pxPerUnit(width, height, FLAT_ZOOM);
      setFit({ width: PLAN_W * ppu, offsetY: -HOME_TARGET.z * ppu });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // --- Leaving and returning --------------------------------------------------------------------

  // When Home is hidden (another page shows), clear the dive and put the camera back, so Home
  // never reappears dimmed or zoomed in. A layout-effect cleanup runs as Activity hides the page.
  useLayoutEffect(
    () => () => {
      setSelected("");
      setFocused(null);
      setPulse(false);
      setCommand((c) => ({ kind: "homeNow", seq: c.seq + 1 }));
      busy.current = false;
    },
    [],
  );

  // Close the circle onto the map and surface from 650ms; the districts undim when the return
  // ends (the transition clears it at 1050ms).
  const closedFor = useRef<object | null>(null);
  const finishReturn = useCallback(() => {
    if (!ret || closedFor.current === ret || !frame.current || !transition) return;
    closedFor.current = ret;
    const r = frame.current.getBoundingClientRect();
    transition.closeOnMap({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    if (motionOk) setTimeout(() => setCommand((c) => ({ kind: "surface", seq: c.seq + 1 })), 650);
  }, [ret, transition, motionOk]);

  // A return starts: center the map before the first paint (and again a frame later, in case the
  // browser's scroll restoration on Back moves the page). If the model is already running, cut
  // the camera into the district and close; otherwise wait for it (onReady), or use the 2D plan.
  const startedFor = useRef<object | null>(null);
  useLayoutEffect(() => {
    if (!ret || startedFor.current === ret) return;
    startedFor.current = ret;
    const center = () => {
      const f = frame.current;
      if (!f) return;
      const r = f.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + r.top - centeredTop(r.height), behavior: "instant" });
    };
    center();
    requestAnimationFrame(() => {
      center();
      if (!hasWebGL() || failed3D) {
        finishReturn();
      } else if (ready.current) {
        if (motionOk && retKey) setCommand((c) => ({ kind: "diveNow", key: retKey, seq: c.seq + 1 }));
        // Two frames: the camera cut renders before the circle starts closing.
        requestAnimationFrame(() => requestAnimationFrame(finishReturn));
      } else {
        setWant3D(true);
      }
    });
  }, [ret, retKey, motionOk, failed3D, finishReturn]);

  // Safety net if the model never reports ready.
  useEffect(() => {
    if (!ret) return;
    const t = setTimeout(finishReturn, 4000);
    return () => clearTimeout(t);
  }, [ret, finishReturn]);

  // --- Arrival: flat plan → 3D -----------------------------------------------------------------

  // Start once the model is ready and (unless it starts in its usual view) the frame is 35% visible.
  const visible = useRef(false);
  const begun = useRef(false);
  const beginIfDue = useCallback(() => {
    if (begun.current || !ready.current || (startFlat && !visible.current)) return;
    begun.current = true;
    setStarted(true);
    if (startFlat) setCommand((c) => ({ kind: "intro", seq: c.seq + 1 }));
  }, [startFlat]);
  useEffect(() => {
    if (!frame.current) return;
    return inView(
      frame.current,
      () => {
        visible.current = true;
        beginIfDue();
      },
      { amount: 0.35 },
    );
  }, [beginIfDue]);

  const onReady = useCallback(() => {
    ready.current = true;
    beginIfDue();
    // A model that mounts during a return already starts in the dive view (startAt).
    if (ret) requestAnimationFrame(() => requestAnimationFrame(finishReturn));
  }, [beginIfDue, finishReturn, ret]);

  // --- Opening a district ----------------------------------------------------------------------

  const open = useCallback(
    async (key: string) => {
      const d = districts.find((x) => x.key === key);
      const f = frame.current;
      if (!d || !f || busy.current) return;
      if (!transition) {
        router.push(`/districts/${d.slug}`);
        return;
      }
      if (transition.isBusy()) return;
      busy.current = true;
      const reduceNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1. Center the map if it isn't already.
      let r = f.getBoundingClientRect();
      const want = centeredTop(r.height);
      if (Math.abs(r.top - want) > 60) {
        window.scrollTo({ top: window.scrollY + r.top - want, behavior: reduceNow ? "instant" : "smooth" });
        if (!reduceNow) await wait(480);
      }

      const modelOn = started && !failed3D;
      if (reduceNow || !modelOn) {
        // Reduced motion cross-fades; the 2D plan has no camera, so the circle opens from its center.
        r = f.getBoundingClientRect();
        transition.toDistrict({ slug: d.slug, color: d.color }, reduceNow ? null : { x: r.left + r.width / 2, y: r.top + r.height / 2 });
        busy.current = false;
        return;
      }

      // 2–3. Dim the others, pulse the ring and dive in.
      setSelected(key);
      setFocused(key);
      setPulse(true);
      setCommand((c) => ({ kind: "dive", key, seq: c.seq + 1 }));

      // 4. At 850ms the circle opens from the map's center, where the district now sits.
      await wait(850);
      r = f.getBoundingClientRect();
      transition.toDistrict({ slug: d.slug, color: d.color }, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      busy.current = false;
    },
    [districts, router, transition, started, failed3D],
  );

  return (
    <section id="map" aria-labelledby="map-title" className="bg-sand px-[clamp(16px,4vw,56px)] pb-[clamp(72px,8vw,112px)] pt-[clamp(64px,8vw,104px)]">
      <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-16 gap-y-4">
        <Reveal as="h2" kind="head" id="map-title" className="text-[clamp(40px,4.5vw,60px)] leading-none">
          Ten neighborhoods, one plan
        </Reveal>
        <Reveal as="p" kind="fade" className="max-w-[520px] text-xl text-muted">
          From cottages and townhomes to a wine village, parks and open space. Tap a neighborhood to look closer.
        </Reveal>
      </div>

      {/* w-full: with aspect-ratio and an auto width, min-height would widen the frame to 682px on phones. */}
      {/* bg-linen matches the model's own background, so nothing changes color as the 2D plan fades. */}
      <div ref={frame} className="relative isolate aspect-[1.55] min-h-[440px] w-full overflow-hidden rounded-card bg-linen">
        {want3D && !failed3D && (
          <ModelBoundary onError={() => setFailed3D(true)}>
            <DistrictModel3D
              districts={districts}
              textureHref={imageHref}
              selected={retKey ?? selected}
              hovered={hovered}
              focused={retKey ?? focused}
              topDown={false}
              command={command}
              reducedMotion={reduce}
              onSelect={open}
              onHover={setHovered}
              onReady={onReady}
              interactive={false}
              startFlat={startFlat}
              startAt={motionOk && retKey ? retKey : undefined}
              pulse={retKey || pulse ? "loop" : undefined}
            />
          </ModelBoundary>
        )}
        {/* The 2D plan sits over the model until the motion starts, then fades out. */}
        <AnimatePresence>
          {(!started || failed3D) && (
            <motion.div
              key="plan-2d"
              className="absolute inset-0 z-[1]"
              exit={{ opacity: 0, transition: { duration: reduce || retKey ? 0 : 0.45, ease: ease.out } }}
            >
              <PlanMap2D
                districts={districts}
                viewBox={viewBox}
                imageHref={imageHref}
                selected={retKey ?? (selected || null)}
                hovered={hovered}
                onSelect={open}
                onHover={setHovered}
                fit={fit}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hairline frame drawn over the canvas. */}
        <p aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 z-[2] rounded-full bg-label px-3.5 py-1.5 text-[15px]">
          Select a district
        </p>
      </div>

      <ul aria-label="Districts" className="mt-4 flex flex-wrap gap-2">
        {districts.map((d) => (
          <li key={d.key}>
            <Link
              href={`/districts/${d.slug}`}
              onClick={(e) => {
                if (!isPlainClick(e)) return;
                e.preventDefault();
                void open(d.key);
              }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(d.key)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(d.key)}
              onBlur={() => setHovered(null)}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-chip bg-linen px-3.5 text-base font-medium text-hearth no-underline transition-shadow duration-300 hover:text-hearth hover:shadow-[inset_0_0_0_2px_#E2C88E]"
            >
              <span aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ background: d.color }} />
              {d.n}. {d.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3.5 text-base text-muted">{disclaimer}</p>
    </section>
  );
}
