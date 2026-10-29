"use client";

import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { cubicBezier } from "motion";
import { motion } from "motion/react";
import { memo, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Group, LineBasicMaterial, MathUtils, MeshStandardMaterial, OrthographicCamera, Spherical, SRGBColorSpace, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  buildDistrictGeometry,
  CAMERA_DISTANCE,
  divePose,
  easeOutQuart,
  FOCUS_ZOOM,
  focusDir,
  FLAT_ZOOM,
  frustum,
  HOME_DIR,
  HOME_TARGET,
  LIFT,
  PLAN_H,
  PLAN_W,
  PLATE,
  SEL,
  TOP_DIR,
  type DistrictGeometry,
} from "./model3d/geometry";
import type { PlanDistrict } from "./types";

/**
 * A camera instruction from the explorer. `seq` increases on every command so the same
 * command (for example "home" twice) still runs.
 * - focus: fly to a district (The Plan).  home: back to the home view.  view: switch 3D ↔ top-down in place.
 *   These three take 1200ms (handoff, "The Plan map").
 * - intro: the Home "tilt into view", from the flat start view to the home view (1800ms).
 * - dive: the Home map → district fly-in, closer and steeper over the district (1300ms).
 * - surface: back out from a dive to the home view (1300ms).
 * intro, dive and surface swing the camera around its target and ease in and out.
 * - homeNow / diveNow: the home or dive view at once, with no flight (resets while Home is hidden).
 */
export type CameraCommand = {
  kind: "none" | "focus" | "home" | "view" | "intro" | "dive" | "surface" | "homeNow" | "diveNow";
  key?: string;
  seq: number;
};

type Props = {
  districts: PlanDistrict[];
  textureHref: string;
  selected: string;
  hovered: string | null;
  focused: string | null;
  topDown: boolean;
  command: CameraCommand;
  reducedMotion: boolean;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
  onReady: () => void;
  /** False turns off drag, zoom and pan (Home, where the map is a doorway and the page must scroll). */
  interactive?: boolean;
  /** Start top-down and slightly zoomed out, ready for an "intro" command. */
  startFlat?: boolean;
  /** Start in the dive view of this district (the return from a district page), ready for "surface". */
  startAt?: string;
  /**
   * A gold ring pulse on the selected district's roundel: "loop" pulses until turned off (Home);
   * a number pulses twice from 500ms, and a new number starts it again (The Plan).
   */
  pulse?: Pulse;
};

type Pulse = "loop" | number;

/** Where each district's camera anchor sits: its (first) label point, on the ground. */
function anchorsOf(districts: PlanDistrict[]) {
  return Object.fromEntries(districts.map((d) => [d.key, new Vector3(d.labels[0][0], 0, d.labels[0][1])])) as Record<string, Vector3>;
}

// Warm palette v1 (docs/04): gold selection, hearth outlines. Three.js needs literal colors.
const GOLD = "#F2B544";
const HEARTH = "#3B2F2A";
const CAMERA_START = HOME_TARGET.clone().addScaledVector(HOME_DIR, CAMERA_DISTANCE).toArray();
const CAMERA_FLAT = HOME_TARGET.clone().addScaledVector(TOP_DIR, CAMERA_DISTANCE).toArray();
// The handoff's "inOut" curve. The Home tilt-in uses it too, so it starts softly while the 2D plan
// fades away above it.
const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
/** A slow frame (shader warm-up, texture upload) slows a flight down instead of making it skip. */
const MAX_STEP_MS = 1000 / 30;
const CONTROLS_TARGET = HOME_TARGET.toArray();

/**
 * React Three Fiber port of reference/3d-district-model-prototype.html (fix brief, Fix 3).
 * Renders on demand only. The canvas and its roundels are aria-hidden: the district list
 * beside it is the keyboard and screen-reader path.
 */
export default function DistrictModel3D(props: Props) {
  // The starting camera, fixed when the canvas mounts.
  const [start] = useState(() => {
    if (props.startAt) {
      const anchor = anchorsOf(props.districts)[props.startAt];
      if (anchor) {
        const pose = divePose(anchor);
        return { position: pose.position.toArray(), zoom: pose.zoom, target: pose.target.toArray() };
      }
    }
    return props.startFlat
      ? { position: CAMERA_FLAT, zoom: FLAT_ZOOM, target: CONTROLS_TARGET }
      : { position: CAMERA_START, zoom: 1, target: CONTROLS_TARGET };
  });
  return (
    // isolate: keeps the roundels' z-indexes inside the model, under anything drawn over it.
    <div aria-hidden="true" className="absolute inset-0 isolate">
      <Canvas
        orthographic
        frameloop="demand"
        // three.js 0.186 removed PCFSoftShadowMap (the prototype's r170 setting); PCF is its replacement.
        shadows="percentage"
        flat
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{
          manual: true,
          near: -4000,
          far: 4000,
          zoom: start.zoom,
          position: start.position,
        }}
      >
        <Suspense fallback={null}>
          <Scene {...props} controlsTarget={start.target} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  districts,
  textureHref,
  selected,
  hovered,
  focused,
  topDown,
  command,
  reducedMotion,
  onSelect,
  onHover,
  onReady,
  interactive = true,
  pulse,
  controlsTarget,
}: Props & { controlsTarget: [number, number, number] }) {
  const geometries = useMemo(
    () => Object.fromEntries(districts.map((d) => [d.key, buildDistrictGeometry(d.shapes)])) as Record<string, DistrictGeometry>,
    [districts],
  );
  const anchors = useMemo(() => anchorsOf(districts), [districts]);
  // Free GPU buffers when the model unmounts (geometries made outside JSX are not auto-disposed).
  useEffect(
    () => () => {
      for (const g of Object.values(geometries)) {
        for (const p of g.parts) {
          p.geometry.dispose();
          p.edges.dispose();
        }
      }
    },
    [geometries],
  );

  // three.js objects are mutable by design; read them from R3F's store where they change.
  const get = useThree((s) => s.get);
  useEffect(() => {
    get().gl.domElement.style.cursor = hovered ? "pointer" : "";
  }, [get, hovered]);

  // Suspense has resolved (the board texture is loaded), so the model can replace the 2D plan.
  useEffect(() => onReady(), [onReady]);

  return (
    <>
      <color attach="background" args={["#FBF6EE"]} />
      <hemisphereLight args={["#FBF6EE", "#73635A", 1.25]} />
      <directionalLight
        color="#fff4e0"
        intensity={1.6}
        position={[-500, 900, -350]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-700}
        shadow-camera-right={700}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
        shadow-camera-near={10}
        shadow-camera-far={2500}
        shadow-bias={-0.0008}
      />
      <Board href={textureHref} />
      {districts.map((d) => {
        const on = d.key === selected;
        const hv = d.key === hovered;
        const dim = (hovered !== null || focused !== null) && !on && !hv;
        return (
          <Plate
            key={d.key}
            district={d}
            geo={geometries[d.key]}
            on={on}
            hv={hv}
            dim={dim}
            pulse={on ? pulse : undefined}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
            onHover={onHover}
          />
        );
      })}
      <OrbitControls
        makeDefault
        enabled={interactive}
        target={controlsTarget}
        enableDamping
        dampingFactor={0.09}
        minZoom={0.8}
        maxZoom={6}
        minPolarAngle={0}
        // Top-down mode turns rotation off rather than clamping the angle, so the switch can animate.
        enableRotate={!topDown}
        maxPolarAngle={1.18}
        minAzimuthAngle={-1.1}
        maxAzimuthAngle={1.1}
        screenSpacePanning={false}
      />
      <CameraRig geometries={geometries} anchors={anchors} command={command} topDown={topDown} reducedMotion={reducedMotion} />
    </>
  );
}

/** The plan as a model base: a 1023 × 16 × 694 box with the greyscale sheet on its top face only. */
function Board({ href }: { href: string }) {
  const get = useThree((s) => s.get);
  // sRGB color space and maximum anisotropy, set once when the texture loads.
  const tex = useTexture(href, (t) => {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = get().gl.capabilities.getMaxAnisotropy();
    t.needsUpdate = true;
  });

  return (
    <mesh position={[0, -8, 0]} receiveShadow>
      <boxGeometry args={[PLAN_W, 16, PLAN_H]} />
      <meshStandardMaterial attach="material-0" color="#d9d4c6" roughness={1} />
      <meshStandardMaterial attach="material-1" color="#d9d4c6" roughness={1} />
      <meshStandardMaterial attach="material-2" map={tex} roughness={0.95} />
      <meshStandardMaterial attach="material-3" color="#bdb7a8" />
      <meshStandardMaterial attach="material-4" color="#d9d4c6" roughness={1} />
      <meshStandardMaterial attach="material-5" color="#d9d4c6" roughness={1} />
    </mesh>
  );
}

type PlateProps = {
  district: PlanDistrict;
  geo: DistrictGeometry;
  on: boolean;
  hv: boolean;
  dim: boolean;
  pulse?: Pulse;
  reducedMotion: boolean;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
};

/** Plate and outline opacity: normal, and dimmed (about 30%) while another district is in focus. */
const FILL = { normal: 0.94, dim: 0.32 };
const EDGE = { normal: 0.55, dim: 0.25 };

/**
 * One district: extruded plates, outlines and numbered roundels, lifted on hover (+9) and select
 * (+16). Dimming fades over about 600ms (handoff: "dim to 30%, 600 ease"); reduced motion jumps.
 */
const Plate = memo(function Plate({ district: d, geo, on, hv, dim, pulse, reducedMotion, onSelect, onHover }: PlateProps) {
  const group = useRef<Group>(null);
  const fills = useRef<MeshStandardMaterial[]>([]);
  const edges = useRef<LineBasicMaterial[]>([]);
  const invalidate = useThree((s) => s.invalidate);
  const lift = on ? SEL : hv ? LIFT : 0;
  const fillTo = dim ? FILL.dim : FILL.normal;
  const edgeTo = on ? 1 : dim ? EDGE.dim : EDGE.normal;

  // Kick a frame when a target changes; useFrame then eases toward it.
  useEffect(() => invalidate(), [lift, fillTo, edgeTo, invalidate]);
  useFrame((state, delta) => {
    let moving = false;
    const ease = (from: number, to: number, lambda: number, snap: number) => {
      if (from === to) return to;
      const next = reducedMotion ? to : MathUtils.damp(from, to, lambda, delta);
      if (Math.abs(to - next) < snap) return to;
      moving = true;
      return next;
    };
    const g = group.current;
    if (g) g.position.y = ease(g.position.y, lift, 12, 0.05);
    for (const m of fills.current) m.opacity = ease(m.opacity, fillTo, 7, 0.003);
    for (const m of edges.current) m.opacity = ease(m.opacity, edgeTo, 7, 0.003);
    if (moving) state.invalidate();
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.pointerType === "mouse") onHover(d.key);
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    // Ignore clicks that end a drag-to-rotate.
    if (e.delta > 6) return;
    e.stopPropagation();
    onSelect(d.key);
  };

  return (
    <group ref={group}>
      {geo.parts.map((p, i) => (
        <group key={i}>
          <mesh geometry={p.geometry} castShadow receiveShadow onPointerOver={over} onPointerOut={() => onHover(null)} onClick={click}>
            {/* Opacity is eased in useFrame, so it is set once when the material is created. */}
            <meshStandardMaterial
              ref={(m: MeshStandardMaterial | null) => {
                if (m && fills.current[i] !== m) {
                  m.opacity = fillTo;
                  fills.current[i] = m;
                }
              }}
              color={d.color}
              // A soft glow in the district's own color, so the light vibrant fills read close to
              // their true color instead of being darkened by the lighting and the grey board.
              emissive={d.color}
              emissiveIntensity={0.3}
              roughness={0.7}
              transparent
            />
          </mesh>
          <lineSegments geometry={p.edges}>
            <lineBasicMaterial
              ref={(m: LineBasicMaterial | null) => {
                if (m && edges.current[i] !== m) {
                  m.opacity = edgeTo;
                  edges.current[i] = m;
                }
              }}
              color={on ? GOLD : HEARTH}
              transparent
            />
          </lineSegments>
        </group>
      ))}
      {d.labels.map(([x, z], i) => (
        <Html key={i} position={[x, PLATE, z]} center zIndexRange={[20, 0]}>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => onSelect(d.key)}
            onPointerEnter={(e) => e.pointerType === "mouse" && onHover(d.key)}
            onPointerLeave={() => onHover(null)}
            className={`relative grid size-[18px] cursor-pointer place-items-center rounded-full border-[1.5px] border-hearth font-sans text-[0.5625rem] font-semibold leading-none text-hearth ease-out [transition:background-color_200ms,scale_200ms,opacity_600ms] sm:size-7 sm:text-[0.75rem] ${
              on ? "scale-[1.18] bg-gold" : "bg-linen"
            } ${dim ? "opacity-45" : ""}`}
          >
            {d.n}
            {/* Gold ring pulse on the chosen district (handoff: scale 1 → 2.8, fading, 1100ms). */}
            {pulse !== undefined && !reducedMotion && i === 0 && (
              <motion.span
                key={pulse}
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[3px] rounded-full border-4 border-gold"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 2.8], opacity: [0.95, 0] }}
                transition={
                  pulse === "loop"
                    ? { duration: 1.1, ease: "easeOut", repeat: Infinity }
                    : { duration: 1.1, ease: "easeOut", repeat: 1, delay: 0.5 }
                }
              />
            )}
          </button>
        </Html>
      ))}
    </group>
  );
});

type Tween = {
  from: { t: Vector3; p: Vector3; z: number };
  to: { t: Vector3; p: Vector3; z: number };
  /** Milliseconds of flight so far, counted in frame steps of at most MAX_STEP_MS. */
  elapsed: number;
  /** Milliseconds. */
  duration: number;
  ease: (t: number) => number;
  /**
   * Swing the camera around its target (tilt and turn together) instead of moving it in a straight
   * line. Needed from straight overhead, where a straight line would spin the view in one frame.
   */
  orbit?: { from: Spherical; to: Spherical };
};

/** The camera's position around a target as tilt (phi), turn (theta) and distance. */
const toSpherical = (p: Vector3, t: Vector3) => new Spherical().setFromVector3(p.clone().sub(t));

/** Orthographic frustum sizing and the camera flights: 700ms as in the prototype, 1800ms for the Home tilt-in. */
function CameraRig({
  geometries,
  anchors,
  command,
  topDown,
  reducedMotion,
}: {
  geometries: Record<string, DistrictGeometry>;
  anchors: Record<string, Vector3>;
  command: CameraCommand;
  topDown: boolean;
  reducedMotion: boolean;
}) {
  // Read the camera and controls from R3F's store where they change (three.js objects are mutable).
  const get = useThree((s) => s.get);
  const size = useThree((s) => s.size);
  const tween = useRef<Tween | null>(null);

  // Frustum: half-height = 694 × 0.62, half-width from the aspect, widened on narrow frames.
  useLayoutEffect(() => {
    const { camera, invalidate } = get();
    const cam = camera as OrthographicCamera;
    const { halfW, halfH } = frustum(size.width, size.height);
    cam.left = -halfW;
    cam.right = halfW;
    cam.top = halfH;
    cam.bottom = -halfH;
    cam.updateProjectionMatrix();
    invalidate();
  }, [get, size]);

  // Aim the camera at the controls' target as soon as the controls exist. OrbitControls only
  // re-aims it each frame while enabled, so with interactive={false} (Home) the camera would keep
  // R3F's default aim at the origin, 10 units off, until the first flight.
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  useEffect(() => {
    if (!controls) return;
    controls.update();
    get().invalidate();
  }, [controls, get]);

  // Run each new camera command once.
  const lastSeq = useRef(command.seq);
  useEffect(() => {
    const { camera, controls: c, invalidate } = get();
    const cam = camera as OrthographicCamera;
    const controls = c as OrbitControlsImpl | null;
    if (!controls || command.seq === lastSeq.current) return;
    lastSeq.current = command.seq;

    let target: Vector3;
    let dir: Vector3;
    let zoom: number;

    if (command.kind === "focus" && command.key && anchors[command.key]) {
      target = anchors[command.key].clone();
      dir = focusDir(topDown);
      zoom = FOCUS_ZOOM;
    } else if ((command.kind === "dive" || command.kind === "diveNow") && command.key && anchors[command.key]) {
      const pose = divePose(anchors[command.key]);
      target = pose.target;
      dir = pose.position.clone().sub(pose.target).normalize();
      zoom = pose.zoom;
    } else if (command.kind === "intro" || command.kind === "surface" || command.kind === "homeNow") {
      target = HOME_TARGET.clone();
      dir = HOME_DIR.clone();
      zoom = 1;
    } else if (command.kind === "view") {
      // Switch 3D ↔ top-down where the camera is, keeping the zoom.
      target = command.key && anchors[command.key] ? anchors[command.key].clone() : controls.target.clone();
      dir = command.key ? focusDir(topDown) : topDown ? TOP_DIR.clone() : HOME_DIR.clone();
      zoom = cam.zoom;
    } else {
      target = HOME_TARGET.clone();
      dir = topDown ? TOP_DIR.clone() : HOME_DIR.clone();
      zoom = 1;
    }

    const to = { t: target, p: target.clone().addScaledVector(dir, CAMERA_DISTANCE), z: zoom };
    if (reducedMotion || command.kind === "homeNow" || command.kind === "diveNow") {
      // A camera cut instead of a flight (reduced motion, or an instant command).
      controls.target.copy(to.t);
      cam.position.copy(to.p);
      cam.zoom = to.z;
      cam.updateProjectionMatrix();
      controls.update();
      tween.current = null;
    } else {
      // Every flight swings around its target and eases in and out; only the durations differ.
      const swing = command.kind !== "none";
      const from = { t: controls.target.clone(), p: cam.position.clone(), z: cam.zoom };
      tween.current = {
        from,
        to,
        elapsed: 0,
        duration: command.kind === "intro" ? 1800 : command.kind === "dive" || command.kind === "surface" ? 1300 : 1200,
        ease: swing ? easeInOut : easeOutQuart,
        orbit: swing ? { from: toSpherical(from.p, from.t), to: toSpherical(to.p, to.t) } : undefined,
      };
    }
    invalidate();
  }, [command, get, geometries, anchors, topDown, reducedMotion]);

  const orbitPos = useRef(new Spherical());
  useFrame((state, delta) => {
    const tw = tween.current;
    const controls = state.controls as OrbitControlsImpl | null;
    if (!tw || !controls) return;
    const cam = state.camera as OrthographicCamera;
    tw.elapsed += Math.min(delta * 1000, MAX_STEP_MS);
    const t = Math.min(1, tw.elapsed / tw.duration);
    const e = tw.ease(t);
    controls.target.lerpVectors(tw.from.t, tw.to.t, e);
    if (tw.orbit) {
      const { from, to } = tw.orbit;
      const s = orbitPos.current;
      s.radius = MathUtils.lerp(from.radius, to.radius, e);
      s.phi = MathUtils.lerp(from.phi, to.phi, e);
      s.theta = MathUtils.lerp(from.theta, to.theta, e);
      cam.position.setFromSpherical(s).add(controls.target);
    } else {
      cam.position.lerpVectors(tw.from.p, tw.to.p, e);
    }
    cam.zoom = tw.from.z + (tw.to.z - tw.from.z) * e;
    cam.updateProjectionMatrix();
    controls.update();
    if (t >= 1) tween.current = null;
    state.invalidate();
  });

  return null;
}
