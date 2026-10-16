import { EdgesGeometry, ExtrudeGeometry, Shape, ShapeUtils, Vector2, Vector3 } from "three";

/** Scene constants ported one-for-one from reference/3d-district-model-prototype.html. */
export const PLAN_W = 1023;
export const PLAN_H = 694;
/** Plate thickness, hover lift and selected lift, in scene units. */
export const PLATE = 3;
export const LIFT = 9;
export const SEL = 16;

export const HOME_TARGET = new Vector3(0, 0, 10);
export const HOME_DIR = new Vector3(-0.14, 0.8, 0.58).normalize();
export const TOP_DIR = new Vector3(0, 1, 0.0001).normalize();
/** How far the camera sits from its target along the view direction. */
export const CAMERA_DISTANCE = 1500;

export type DistrictGeometry = {
  parts: { geometry: ExtrudeGeometry; edges: EdgesGeometry }[];
  /** Area-weighted center on the ground plane (x, 0, z). */
  center: Vector3;
  /** Footprint size [x extent, z extent]. */
  size: [number, number];
};

/**
 * Builds one district's plates from its stored polygons (y up, used as stored: no flip in 3D).
 * The −90° X rotation turns shape y into −z, which is what orients the model correctly.
 */
export function buildDistrictGeometry(shapes: [number, number][][]): DistrictGeometry {
  let cx = 0;
  let cz = 0;
  let area = 0;
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  const parts = shapes.map((poly) => {
    const pts = poly.map(([x, y]) => new Vector2(x, y));
    const geometry = new ExtrudeGeometry(new Shape(pts), { depth: PLATE, bevelEnabled: false });
    geometry.rotateX(-Math.PI / 2);
    const edges = new EdgesGeometry(geometry, 30);

    const a = Math.abs(ShapeUtils.area(pts));
    for (const [x, y] of poly) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minZ = Math.min(minZ, -y);
      maxZ = Math.max(maxZ, -y);
    }
    const c = poly.reduce((s, [x, y]) => [s[0] + x, s[1] - y], [0, 0]).map((v) => v / poly.length);
    cx += c[0] * a;
    cz += c[1] * a;
    area += a;
    return { geometry, edges };
  });

  return { parts, center: new Vector3(cx / area, 0, cz / area), size: [maxX - minX, maxZ - minZ] };
}

/** Prototype easing for camera flights: ease-out quartic. */
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
