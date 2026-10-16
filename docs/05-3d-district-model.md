# 05 — The 3D district model

*Prototype built Oct 15, 2026 (v2, corrected by the owner the same day). Live prototype: "ABC District Model" artifact (claude.ai/artifact/SFUypnguYxeh5LkEvnEk7n). Full source: `reference/3d-district-model-prototype.html`.*

## What exists

A standalone page using plain three.js 0.170 (loaded from a CDN, no build step). It shows the ten districts as low colored plates extruded from traced outlines, sitting on a greyscale copy of the masterplan's Districts sheet. It was built to test three things: whether 3D reads more clearly than a flat plan for the City and land buyers, whether it runs smoothly on a phone, and whether the tracing is accurate enough.

Features to carry over:

- **Planning-model camera:** orthographic, three-quarter view, limited rotation (polar max 1.18 rad, azimuth ±1.1 rad), zoom 0.8–6.
- **Interaction:** hover lifts a plate (+9 units). Selecting lifts it more (+16), flies the camera to it (700ms ease-out quartic) and fills a detail card. Esc or "Reset view" clears the selection.
- **Toolbar:** Top-down plan toggle, Reset view, District colors toggle.
- **Numbered roundels:** HTML buttons positioned over the canvas each frame.
- **Accessibility:** an HTML district list mirrors the model. The canvas is `aria-hidden`. A fallback shows the plan image when WebGL is unavailable. Reduced motion makes camera moves instant.
- **Performance:** renders on demand only (no constant render loop), shadows from one directional light, device pixel ratio capped at 2.

## The data

- `data/district-geometry-v1.json` is the **single geometry source** for the 2D plan, the 3D model and the district pages.
  - `size: [1023, 694]`: scene units are pixels of the source image, cropped to x 345–1368, y 0–694 of the Districts sheet, with the origin at the center of the crop.
  - `polys[key]`: an array of polygons per district (some districts have several parts), each an array of `[x, y]` points.
  - `labels[key]`: where each roundel sits (Summit has two).
  - In 3D, shape y becomes −z: the prototype builds a `THREE.Shape` in x/y, extrudes it 3 units, then rotates it −90° around X.
- `data/districts.json` holds names, numbers, families, colors, descriptions and facts. The keys match the geometry keys (`wine`, `wellness`, `orchardgrove`, `heritage`, `abr`, `harvest`, `summit`, `discovery`, `preserve`, `hotel`).
- `reference/districts-sheet-greyscale.jpg` (2046×1388) is the ground texture, the same image embedded in the prototype.

## How to port it to React Three Fiber

Use the `r3f-best-practices` skill. Proposed structure (get approval before building):

```
components/plan/
  PlanTable.tsx          # 2D SVG plan (default; always available)
  DistrictModel3D.tsx    # dynamic(() => import(...), { ssr: false })
  DistrictPlate.tsx      # one district: extruded shapes + edges
  Roundels.tsx           # Drei <Html> or a projected overlay
  useDistrictSelection.ts# shared selection state (URL-synced: ?d=wine)
lib/geometry.ts          # loads + normalises district-geometry-v1.json
```

Rules for the port:

1. **2D first, 3D optional.** The SVG Plan Table is the default and the mobile, keyboard and no-WebGL version. 3D loads only when the visitor opens it on a capable device, through `next/dynamic` with `ssr: false`, showing a still image first.
2. **One selection state** shared by the 2D plan, the 3D model, the list and the district pages (put it in the URL so links work).
3. **Render on demand:** `<Canvas frameloop="demand">` and `invalidate()` on change. Never call `setState` inside `useFrame`.
4. **Orthographic camera**, using Drei `<OrthographicCamera>` and `<OrbitControls>` with the same limits as the prototype.
5. **Memoize geometry:** build `ExtrudeGeometry` once per district with `useMemo`.
6. **Label it honestly:** "Illustrative 3D interpretation of the July 2026 masterplan. Not a survey or final design. Plate thickness is not building height."

## Known limits (don't paper over them)

- Outlines were traced from a screenshot of the Districts sheet, not from vector files. They are illustrative.
- No terrain, no georeferencing and no building massing yet.
- Improvements that need new inputs: the architect's vector or 3D export (jeffrey mak: architect ltd), a georeferenced boundary, USGS 3DEP elevation for terrain, and drone imagery. Ask the owner before pursuing any of them.

## Owner corrections already applied (v2), for reference

1. The strip east of the hatched parcel, with two 12,000 sf buildings, belongs to the Wellness District, not Wine Village.
2. Discovery Commons extends to the roads and includes its ponds and east tip.
3. Wine Village includes the pink strip next to the hotel. Wine Village = top block near Discovery + main village + diagonal Retail High Street spine.
4. Grand Orchard Hotel follows the grey cottage and apartment buildings west of the village along the road arc.
