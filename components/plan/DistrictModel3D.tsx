"use client";

import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { memo, Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Group, MathUtils, OrthographicCamera, SRGBColorSpace, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  buildDistrictGeometry,
  CAMERA_DISTANCE,
  easeOutQuart,
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
 * - focus: fly to a district.  home: fly back to the home view.  view: switch 3D ↔ top-down in place.
 */
export type CameraCommand = { kind: "none" | "focus" | "home" | "view"; key?: string; seq: number };

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
};

const AMBER = "#E0AE4F";
const INK = "#1D2621";
const CAMERA_START = HOME_TARGET.clone().addScaledVector(HOME_DIR, CAMERA_DISTANCE).toArray();
const CONTROLS_TARGET = HOME_TARGET.toArray();

/**
 * React Three Fiber port of reference/3d-district-model-prototype.html (fix brief, Fix 3).
 * Renders on demand only. The canvas and its roundels are aria-hidden: the district list
 * beside it is the keyboard and screen-reader path.
 */
export default function DistrictModel3D(props: Props) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        orthographic
        frameloop="demand"
        // three.js 0.186 removed PCFSoftShadowMap (the prototype's r170 setting); PCF is its replacement.
        shadows="percentage"
        flat
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ manual: true, near: -4000, far: 4000, zoom: 1, position: CAMERA_START }}
      >
        <Suspense fallback={null}>
          <Scene {...props} />
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
}: Props) {
  const geometries = useMemo(
    () => Object.fromEntries(districts.map((d) => [d.key, buildDistrictGeometry(d.shapes)])) as Record<string, DistrictGeometry>,
    [districts],
  );
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
      <color attach="background" args={["#2B4436"]} />
      <hemisphereLight args={["#f5f3ed", "#2b4436", 1.25]} />
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
            reducedMotion={reducedMotion}
            onSelect={onSelect}
            onHover={onHover}
          />
        );
      })}
      <OrbitControls
        makeDefault
        target={CONTROLS_TARGET}
        enableDamping
        dampingFactor={0.09}
        minZoom={0.8}
        maxZoom={6}
        minPolarAngle={0}
        maxPolarAngle={topDown ? 0.0001 : 1.18}
        minAzimuthAngle={-1.1}
        maxAzimuthAngle={1.1}
        screenSpacePanning={false}
      />
      <CameraRig geometries={geometries} command={command} topDown={topDown} reducedMotion={reducedMotion} />
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
  reducedMotion: boolean;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
};

/** One district: extruded plates, outlines and numbered roundels, lifted on hover (+9) and select (+16). */
const Plate = memo(function Plate({ district: d, geo, on, hv, dim, reducedMotion, onSelect, onHover }: PlateProps) {
  const group = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const lift = on ? SEL : hv ? LIFT : 0;

  // Kick a frame when the target lift changes; useFrame then eases toward it.
  useEffect(() => invalidate(), [lift, invalidate]);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g || g.position.y === lift) return;
    const next = reducedMotion ? lift : MathUtils.damp(g.position.y, lift, 12, delta);
    g.position.y = Math.abs(lift - next) < 0.05 ? lift : next;
    state.invalidate();
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
            <meshStandardMaterial color={d.color} roughness={0.7} transparent opacity={dim ? 0.32 : 0.82} />
          </mesh>
          <lineSegments geometry={p.edges}>
            <lineBasicMaterial color={on ? AMBER : INK} transparent opacity={on ? 1 : dim ? 0.25 : 0.55} />
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
            className={`grid size-[18px] cursor-pointer place-items-center rounded-full border-[1.5px] border-ink font-mono text-[0.5625rem] font-semibold leading-none text-ink transition-[background-color,opacity,scale] duration-200 ease-out sm:size-7 sm:text-[0.75rem] ${
              on ? "scale-[1.18] bg-signal-on-dark" : "bg-paper"
            } ${dim ? "opacity-45" : ""}`}
          >
            {d.n}
          </button>
        </Html>
      ))}
    </group>
  );
});

type Tween = { from: { t: Vector3; p: Vector3; z: number }; to: { t: Vector3; p: Vector3; z: number }; t0: number };

/** Orthographic frustum sizing and the 700ms camera flights, as in the prototype. */
function CameraRig({
  geometries,
  command,
  topDown,
  reducedMotion,
}: {
  geometries: Record<string, DistrictGeometry>;
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
    const halfH = PLAN_H * 0.62;
    const halfW = halfH * (size.width / size.height);
    const fitW = PLAN_W * (size.width < 600 ? 0.5 : 0.56);
    const k = Math.max(1, fitW / halfW);
    cam.left = -halfW * k;
    cam.right = halfW * k;
    cam.top = halfH * k;
    cam.bottom = -halfH * k;
    cam.updateProjectionMatrix();
    invalidate();
  }, [get, size]);

  // Run each new camera command once.
  const lastSeq = useRef(command.seq);
  useEffect(() => {
    const { camera, controls: c, invalidate } = get();
    const cam = camera as OrthographicCamera;
    const controls = c as OrbitControlsImpl | null;
    if (!controls || command.seq === lastSeq.current) return;
    lastSeq.current = command.seq;

    const currentDir = () => (topDown ? TOP_DIR.clone() : cam.position.clone().sub(controls.target).normalize());
    let target: Vector3;
    let dir: Vector3;
    let zoom: number;

    if (command.kind === "focus" && command.key && geometries[command.key]) {
      const g = geometries[command.key];
      const viewW = cam.right - cam.left;
      const viewH = cam.top - cam.bottom;
      target = g.center.clone();
      dir = currentDir();
      zoom = MathUtils.clamp(Math.min(viewW / (g.size[0] * 1.9), viewH / (g.size[1] * 2.1)), 1.1, 4);
    } else if (command.kind === "view") {
      target = command.key && geometries[command.key] ? geometries[command.key].center.clone() : controls.target.clone();
      dir = topDown ? TOP_DIR.clone() : HOME_DIR.clone();
      zoom = cam.zoom;
    } else {
      target = HOME_TARGET.clone();
      dir = topDown ? TOP_DIR.clone() : HOME_DIR.clone();
      zoom = 1;
    }

    const to = { t: target, p: target.clone().addScaledVector(dir, CAMERA_DISTANCE), z: zoom };
    if (reducedMotion) {
      // Reduced motion: a camera cut instead of a flight.
      controls.target.copy(to.t);
      cam.position.copy(to.p);
      cam.zoom = to.z;
      cam.updateProjectionMatrix();
      controls.update();
      tween.current = null;
    } else {
      tween.current = { from: { t: controls.target.clone(), p: cam.position.clone(), z: cam.zoom }, to, t0: performance.now() };
    }
    invalidate();
  }, [command, get, geometries, topDown, reducedMotion]);

  useFrame((state) => {
    const tw = tween.current;
    const controls = state.controls as OrbitControlsImpl | null;
    if (!tw || !controls) return;
    const cam = state.camera as OrthographicCamera;
    const t = Math.min(1, (performance.now() - tw.t0) / 700);
    const e = easeOutQuart(t);
    controls.target.lerpVectors(tw.from.t, tw.to.t, e);
    cam.position.lerpVectors(tw.from.p, tw.to.p, e);
    cam.zoom = tw.from.z + (tw.to.z - tw.from.z) * e;
    cam.updateProjectionMatrix();
    controls.update();
    if (t >= 1) tween.current = null;
    state.invalidate();
  });

  return null;
}
