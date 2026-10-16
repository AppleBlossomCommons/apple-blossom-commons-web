# Fix brief for Claude Code: district map, navigation, design pass

Paste everything below the line into Claude Code, in the website repo. It refers only to files already in the repo from the handoff pack.

---

Before changing anything, read `docs/04-design-direction.md`, `docs/05-3d-district-model.md` and `reference/3d-district-model-prototype.html`. Then propose your plan for the four fixes below and wait for my approval. Work in that order, keep the site running after each fix, and show me a screenshot of each result at 1440 px and 390 px wide.

## Fix 1. The district map is upside down (homepage hero and "Ten districts" section)

Cause: `data/district-geometry-v1.json` stores shapes with **y pointing up** (`y = 347 − pixel_y`, as in a math graph). SVG's y points down. The current SVG uses the y values directly, so every district is mirrored top-to-bottom.

Fix: when drawing in SVG, negate y. Every point `[x, y]` becomes SVG point `(x, −y)`. Keep `viewBox="-511.5 -347 1023 694"`. Do not "fix" it by rotating or scaling the whole group. Also negate y for the label positions.

Check: Orchard Preserve (9) is the large green shape at the **right and upper right**. Summit Recreation Park north (7) is the blue area at the **upper left**. Apple Blossom Residence (5) is on the **left, middle**. The result should match `reference/districts-sheet-greyscale.jpg` exactly.

## Fix 2. Show the real plan under the districts

The 2D map has no base drawing. Add `reference/districts-sheet-greyscale.jpg` (2046 × 1388) as the bottom layer of the SVG. Copy it into `public/` and optimize it as WebP; the original stays the source. Place it at:

`<image href="…" x="-511.5" y="-347" width="1023" height="694" preserveAspectRatio="none" />`

It lines up with the geometry exactly, because the geometry was traced from this image. Draw the district shapes over it at about 0.75 opacity so the plan shows through. Remove the graph-paper grid background.

Also remove the "Today / Compare / Planned" slider from the hero. Its "today" side labels district outlines as existing conditions ("Sports fields (existing)", "Hospital campus and clinics (existing)"). That isn't accurate: those outlines are planned districts, and the Wellness District outline includes new buildings. We will bring back a today/planned comparison only once we have real aerial imagery of current conditions. Until then, the hero shows the 2D plan from Fix 1–2, or a still of the 3D model (Fix 3), linking to /plan.

## Fix 3. Build the 3D district model on /plan by porting the prototype

`reference/3d-district-model-prototype.html` is the approved, working behavior. Port it to React Three Fiber + Drei, matching its behavior one-for-one. Don't redesign it. Read its `<script type="module">` section closely; the values below come from it.

- Geometry: build each district with `THREE.Shape` from the JSON points **as stored (no y flip in 3D)**, `ExtrudeGeometry` with depth 3 and no bevel, then `geometry.rotateX(-Math.PI / 2)`. This rotation is what makes the 3D orientation correct, so do not also negate y.
- Base board: a box 1023 × 16 × 694 at y = −8, with the greyscale sheet as the texture of its top face only (sRGB color space, max anisotropy).
- Camera: `OrthographicCamera`, home direction (−0.14, 0.8, 0.58) from target (0, 0, 10), zoom 1. Frustum: half-height = 694 × 0.62, half-width = half-height × aspect, then widened so the visible width is at least 1023 × 0.56 (× 0.5 on screens under 600 px).
- Controls: OrbitControls with damping 0.09, zoom 0.8–6, maxPolarAngle 1.18, azimuth ±1.1, no screen-space panning.
- Lights: hemisphere (#f5f3ed / #2b4436, 1.25) plus a directional sun at (−500, 900, −350), 1.6, with PCF soft shadows (2048 map).
- Plates: district colors from `data/districts.json`, opacity 0.82. Dim to 0.32 when another district is focused. Hover lifts 9 units, selected lifts 16. Edges outlined, with the selected outline in Harvest Amber #E0AE4F.
- Select (click a plate, a numbered roundel or the list): the camera flies to the district center in 700 ms with ease-out-quart. Zoom = clamp(1.1, 4, min(viewW / (width × 1.9), viewH / (depth × 2.1))). The side card shows number, name, family, description and facts, with a link to `/districts/[slug]`. Selecting the same district again, the Reset button or Esc returns to the home view.
- Toolbar: "Top-down plan" (fly to straight-down view, rotation locked), "Reset view", "District colors" toggle.
- Roundels: numbered labels from `labels` in the JSON (Summit has two), drawn with Drei `<Html>`, clickable.
- Performance: `frameloop="demand"`. Load the canvas with `next/dynamic` and `ssr: false`, only when it scrolls into view. Show the 2D map from Fix 1–2 while it loads and if WebGL is unavailable.
- Accessibility: the canvas is `aria-hidden`; the district list beside it is the keyboard and screen-reader path. With reduced motion, use camera cuts instead of flights and no plate easing.
- Label on the model: "Illustrative 3D interpretation of the July 2026 masterplan. Not a survey or final design."

Done when the /plan model and the prototype, at the same window size, look and behave the same: same orientation, same base drawing, same hover, select, fly-to, top-down and reset behavior.

## Fix 4. Navigation is too crowded

The header currently holds two utility links, six main links and a button, and wraps onto two lines below about 1,100 px.

- Main navigation: **The Plan · Districts · Site Tour · Connected Community**, plus the **Partner with Us** button.
- Move **Chelan & the Region, Stewardship, Planning Framework, Research Library** to an "About" dropdown, or to the footer (they are already there). Remove the utility row above the header.
- Below 1,100 px, collapse everything into a menu button with a full-screen panel. No link text may wrap to two lines at any width.
- Header height: 64 px on desktop. The wordmark stays on one line.

## Fix 5. Design pass, after Fixes 1–4

Use the design skills in `.claude/skills/` explicitly; don't wait for them to trigger on their own. Run a review with the web-design-guidelines and emil-design-eng skills on the homepage and the header, list what they flag, and fix what fits `docs/04-design-direction.md`. If the Impeccable and UI UX Pro Max plugins are installed, use them for a critique as well. If they are not installed, tell me instead of skipping them.

Keep to the agreed direction: light paper ground, Orchard Green, Harvest Amber only as the single signal color, Source Serif 4 headlines, Inter UI, IBM Plex Mono for sources. Content must be visible without scroll-triggered fade-ins; nothing may start at opacity 0.
