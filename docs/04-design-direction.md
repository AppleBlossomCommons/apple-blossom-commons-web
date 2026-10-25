# 04 — Design direction: "Orchard Atlas"

*Approved Oct 14–15, 2026. Visual specimen: "Orchard Atlas Specimen" artifact (claude.ai/artifact/TSEz47922NjnkNG4xEYFo8).*

The site should read like a planning atlas edited by a good magazine: warm linen ground, plain sans-serif headlines, precise cartography, and a sourced number behind every figure. The two immersive "stages", the district explorer and the tour, open full-bleed on a sand ground inside that calm frame, then return the visitor to the page. (Colors updated to Warm palette v1, Oct 22, 2026, and brightened with vibrant accents on Oct 25, 2026; there are no dark grounds.)

**Mood:** grounded, unhurried, exact, warm, seasonal. **Not:** glossy, themed (no faux-Tuscan), techno-futurist, salesy.

Rejected for v1: a dark, cinematic, 3D-first landing page. It depends on assets that don't exist, and a City reviewer would discount it as a sales film.

## Color tokens

**Warm palette v1, owner-approved 2026-10-22, brightened with vibrant accents on 2026-10-25.** Feedback was that the site was not vibrant enough, so the owner approved four vibrant colors (sky blue, lime green, warm orange, bright soft pink) plus lavender for senior living. Linen, sand and white stay as the grounds, and all text stays hearth. Tokens live in `app/globals.css`; components use them as Tailwind classes (`bg-linen`, `text-hearth`, `bg-orange` and so on), never as literal hex values. The 3D model is the one exception, because three.js needs literal colors; those literals match the tokens. Image placeholder gradients are also literal, because they stand in for photos.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `linen` | #FBF6EE | Page background, cards, panels on sand | — |
| `sand` | #F3E9DA | Alternate section background (explorer, care section, tour, footer) | — |
| `hearth` | #3B2F2A | All body text and headings; plan outlines | 12.0 on linen, 10.8 on sand |
| `muted` | #73635A | Secondary text, eyebrows, labels | 5.3 on linen, 4.8 on sand |
| `line` | #E6DACA | Borders and dividers | — |
| `orange` | #F4A259 | Primary buttons and action arrows (hearth text on orange) | hearth on orange 6.3 |
| `orange-hover` | #EC9447 | Primary button hover | hearth on it 5.5 |
| `sky` | #69B9E7 | Fills: panels, cards, placeholder imagery; health and civic districts | hearth on sky 6.0 |
| `lime` | #A8CF55 | Fills: success marks, cards, placeholder imagery; parks districts | hearth on lime 7.2 |
| `pink` | #FFB3D1 | Fills: cards, placeholder imagery; commercial and hospitality districts | hearth on pink 7.8 |
| `lavender` | #B9A6EA | Senior living districts | hearth on lavender 6.0 |
| `gold` | #F2B544 | Selection only: the chosen district, pressed map toggles, current page, form focus | hearth on gold 7.1 |
| `lake-deep` | #2F6F88 | Links and focus rings; chart series | 5.2 on linen, 4.7 on sand |
| `sage-deep` | #5E7A4F | Small icons and accents (logo mark, chart series, link underlines); never text | 4.5 on linen (icons need 3:1) |
| `rose` | #B85C66 | Large text accents and form errors only, never body text | 4.1 on linen (large text needs 3:1) |

`muted` is one step darker than the palette's original #7A6A60, which measured 4.31:1 on sand and failed body text (owner-approved Oct 22, 2026). The light `lake`, `sage` and `blossom` tokens were removed on Oct 25, 2026: no component used them, and sky, lime and pink take their place.

### Rules

1. **No dark backgrounds anywhere.** Every section is linen, sand or white with hearth text: header, footer, partnership band, cards, the explorer and the tour. There is no dark theme.
2. **Vibrant fills on a calm ground:** linen and sand stay the main ground of every screen. Sky, lime, orange, pink and lavender are used as fills (buttons, cards, map districts, placeholder imagery), never as text or thin lines.
3. **Text on photos or video is white,** over a soft gradient from transparent at the top to dark brown at the bottom (0.6–0.74). The vibrant placeholder gradients keep a deeper shade at the bottom so white text reads at least as well as it did on the muted placeholders. District heroes deepen to a darker shade of the district's own color at the bottom (`lib/district-image.ts`) for the same reason.
4. **Buttons** are fully rounded. Primary: orange background, hearth text, orange-hover on hover. Secondary: transparent with a 1.5px hearth border and hearth text; on a photo, a white border and white text. (`components/site/buttons.ts`.)
5. **Gold marks selection.** The selected district, the pressed 2D/3D toggle, the current page and form focus use gold. On the 2D plan the selected outline is gold over a hearth keyline (gold alone is 1.1:1 on the orange districts). The 3D model's 1px outline is plain gold; the selected plate also lifts and its roundel turns gold.
6. **Links** are lake-deep and turn hearth on hover. The focus ring is a 2px lake-deep outline at 3px offset on every ground.
7. **Vibrant colors and gold are never text** (all are under 2.1:1 on linen). Charts use lake-deep and sage-deep for series.
8. **Contrast:** all body text meets WCAG AA (4.5:1) on its background. White text on any vibrant color fails (1.7–2.2:1), so text on a vibrant fill is always hearth. Check every new pair.

### District colors: by land-use family, not one hue per district

Owner-approved vibrant colors, Oct 25, 2026. Each family has a main shade and a lighter one. The 2D plan and the 3D model both read these from `data/districts.json`.

| Family | Districts | Colors |
|---|---|---|
| Residential (warm orange) | Apple Blossom Residence, Harvest Crossing | #F8BE88, #F4A259 |
| Senior living (lavender) | Orchard Grove, Heritage Grove | #B9A6EA, #D0C3F1 |
| Commercial & hospitality (soft pink) | Chelan Wine Village, Grand Orchard Hotel | #FFB3D1, #FF95BF |
| Health & civic (sky blue) | Wellness District, Discovery Commons | #69B9E7, #9CD0EF |
| Parks & open space (lime green) | Summit Recreation Park, Orchard Preserve | #C4DE8A, #A8CF55 |

Before Oct 25, 2026 the families were wheat, sage, terracotta, lake blue and green (#D8C27F, #CDB06A; #A9B48A, #BEC69F; #C98B6B, #B8754F; #7FA3BC, #97B3C8; #A1C4A6, #83AF8C).

Districts are told apart by **numbered roundels and names**, not by color alone.

## Typography

| Use | Typeface | Notes |
|---|---|---|
| Headlines | Arial (system font, with Helvetica and sans-serif as fallbacks) | weight 600 |
| Body, long reading, interface, captions, navigation | Atkinson Hyperlegible Next | 400 / 500 / 600 |
| Figures, source chips, map labels, eyebrows | IBM Plex Mono | tabular numerals; uppercase eyebrows with letter-spacing 0.06–0.08em |

(Headlines changed to Arial on Oct 24, 2026. Before that they used Bricolage Grotesque from the design handoff, which had replaced Source Serif 4. Atkinson Hyperlegible Next replaced Inter in the same handoff.)

Scale: body 18px at about a 64-character measure. Headlines step on a 1.25 ratio up to a fluid display size of about 88px. Load the web fonts (Atkinson Hyperlegible Next, IBM Plex Mono) through `next/font` with no layout shift. Arial is a system font and is not downloaded.

## Layout

- 12-column grid, 1,240px reading frame, full-bleed bands for the map, tour and photography.
- Editorial rhythm: a text column on the left and a margin column on the right for sources and notes. Sidenotes on desktop, tap-to-open chips on mobile.
- 8px spacing base. Sections separated by large vertical space (96–160px on desktop), not by boxes.
- Hairline rules and small-caps or mono eyebrows for structure. No drop shadows, and no card grids as the main device.
- Mobile first. On mobile the explorer becomes a list with a mini-map, not a shrunken desktop map.

## Signature 1: the Plan Table (district explorer)

The whole site is drawn as a crisp 2D plan on the linen ground: ten districts in their family colors, numbered roundels, the 5/10/15-minute walk rings from the masterplan, and known anchors (SR 97A, Apple Blossom Drive, Lake Chelan Community Hospital, the existing ball fields). Focusing a district lifts it and dims the rest. Selecting it moves to its district page and keeps it highlighted, using the same SVG path so the move feels continuous. A 3D model toggle is available (`05-3d-district-model.md`). Always labeled: "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."

## Signature 2: the Evidence Margin

Every figure has a source in the registry. **Updated Oct 22, 2026 (public copy rules in `CLAUDE.md`):** public pages show no confidence labels or source tags, and the homepage shows no chips. Sources appear on Research Library pages and in footnotes, as a small mono chip reading source and date (for example `ACS 2020–24`). Opening it shows source, date, geography, method note and a link. The confidence tier (High / Moderate / Low) stays in the registry and is not shown. Build one **source registry** (`data/sources.json`, one ID per source with date, geography, tier and access level) that every chart, statistic and document references.

Optional third element: a Today / Planned swipe on the plan.

## Motion

Use the emil-design-eng skill for technique. These rules set the limits:

- Motion explains space and never decorates. Use it for map focus, the district transition and revealing evidence.
- No looping animations, parallax, count-up statistics or smooth-scroll libraries in v1.
- Timing: 150–250ms for interface states, 500–800ms for spatial moves, one strong ease-out curve everywhere (the prototype uses `cubic-bezier(.22, 1, .36, 1)`).
- Scroll-linked animation is reserved for two story moments: the Today-to-Planned reveal and the migration mirror chart.
- Reduced motion: transitions become crossfades, video never autoplays, maps and cameras jump instead of fly.

## Maps

- **Plan map:** custom SVG, linen ground, hairline roads, land-use fills at reduced opacity, scale bar and north arrow.
- **Context map:** real geography in a muted custom style (lake, Downtown Chelan, the site, feeder markets). Pick the tool in the build phase, and check production tile licensing.
- **Tour map:** keeps satellite imagery but takes the new route colors and marker styling.

## Data visualization

- One finding per chart, written as its title. Direct labels, no legends. Hairline axes. Plex Mono numerals.
- Show uncertainty: ranges as whiskers or bands, and caveats in plain words. No confidence tier labels on public pages.
- Every chart has a "view as table" option.
- Lake-deep and sage-deep for the data series, gold for the one mark that matters (gold is never text).
- First candidate: King County vs Chelan County net migration by five-year age band, as a mirrored bar chart with its caveat in the chart.

## Imagery

- Real place first: lake, orchards, the hills, hospital frontage, existing fields. Renderings only where labeled "Illustrative concept".
- People at human scale, at a distance, in real settings. No staged stock lifestyle photos or wine-glass clichés.
- Four seasons: blossom, summer lake, harvest, snow.
- Until photography exists, use a typographic hero over the plan, and still frames from the tour clips.
