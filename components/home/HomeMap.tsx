"use client";

import { AnimatePresence, inView, motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { CameraCommand } from "@/components/plan/DistrictModel3D";
import { hasWebGL, ModelBoundary } from "@/components/plan/ModelBoundary";
import { FLAT_ZOOM, HOME_TARGET, PLAN_W, pxPerUnit } from "@/components/plan/model3d/geometry";
import { PlanMap2D } from "@/components/plan/PlanMap2D";
import type { PlanDistrict } from "@/components/plan/types";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// The 3D model never renders on the server and is only fetched once the frame nears the viewport.
const DistrictModel3D = dynamic(() => import("@/components/plan/DistrictModel3D"), { ssr: false });

/**
 * "Ten neighborhoods, one plan" (content pack, Home section 3; handoff, Home "Map section").
 * On Home the map is a doorway: choosing a district on the model, a roundel or a chip opens
 * its page. There is no side card here; that lives on The Plan.
 *
 * One motion from flat plan to 3D: the 2D plan shows first, drawn at exactly the scale and
 * position of the model's flat start view. Once the model is ready and the frame is 35% visible,
 * the camera starts swinging into its usual oblique view (1800ms, easing in and out) and the 2D
 * plan fades away over it in the first 450ms, while the camera is still nearly overhead.
 * With reduced motion the model replaces the 2D plan without moving. Without WebGL the 2D plan stays.
 * The chips are the keyboard and screen-reader path; the drawing itself is aria-hidden.
 */
export function HomeMap({ districts, viewBox, imageHref, disclaimer }: { districts: PlanDistrict[]; viewBox: string; imageHref: string; disclaimer: string }) {
  const router = useRouter();
  const reduce = usePrefersReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [command, setCommand] = useState<CameraCommand>({ kind: "none", seq: 0 });
  const [want3D, setWant3D] = useState(false);
  // The model has taken over from the 2D plan.
  const [started, setStarted] = useState(false);
  const [failed3D, setFailed3D] = useState(false);

  // Load the model only when the frame comes near the viewport, and only with WebGL.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
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
  }, []);

  // Decided once, when the model mounts: with reduced motion it starts in its usual view.
  const [startFlat] = useState(() => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

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

  // Start once the model is ready and (unless it starts in its usual view) the frame is 35% visible.
  const ready = useRef(false);
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

  const open = useCallback(
    (key: string) => {
      const d = districts.find((x) => x.key === key);
      if (d) router.push(`/districts/${d.slug}`);
    },
    [districts, router],
  );
  const onReady = useCallback(() => {
    ready.current = true;
    beginIfDue();
  }, [beginIfDue]);

  return (
    <section aria-labelledby="map-title" className="bg-sand px-[clamp(16px,4vw,56px)] pb-[clamp(72px,8vw,112px)] pt-[clamp(64px,8vw,104px)]">
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
              selected=""
              hovered={hovered}
              focused={null}
              topDown={false}
              command={command}
              reducedMotion={reduce}
              onSelect={open}
              onHover={setHovered}
              onReady={onReady}
              interactive={false}
              startFlat={startFlat}
            />
          </ModelBoundary>
        )}
        {/* The 2D plan sits over the model until the motion starts, then fades out. */}
        <AnimatePresence>
          {(!started || failed3D) && (
            <motion.div
              key="plan-2d"
              className="absolute inset-0 z-[1]"
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.45, ease: ease.out } }}
            >
              <PlanMap2D
                districts={districts}
                viewBox={viewBox}
                imageHref={imageHref}
                selected={null}
                hovered={hovered}
                onSelect={open}
                onHover={setHovered}
                fit={fit}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hairline frame drawn over the canvas. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] rounded-card shadow-[inset_0_0_0_1px_#E0D2BC]" />
        <p aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 z-[2] rounded-full bg-label px-3.5 py-1.5 text-[15px]">
          Select a district
        </p>
      </div>

      <ul aria-label="Districts" className="mt-4 flex flex-wrap gap-2">
        {districts.map((d) => (
          <li key={d.key}>
            <Link
              href={`/districts/${d.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(d.key)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(d.key)}
              onBlur={() => setHovered(null)}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-chip bg-linen px-3.5 text-base font-medium text-hearth no-underline shadow-[inset_0_0_0_1px_var(--line)] transition-shadow duration-300 hover:text-hearth hover:shadow-[inset_0_0_0_2px_#E2C88E]"
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
