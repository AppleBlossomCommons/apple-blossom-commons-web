# 04 — Design direction: "Orchard Atlas"

*Approved Oct 14–15, 2026. Visual specimen: "Orchard Atlas Specimen" artifact (claude.ai/artifact/TSEz47922NjnkNG4xEYFo8).*

The site should read like a planning atlas edited by a good magazine: warm linen ground, plain sans-serif headlines, precise cartography, and a sourced number behind every figure. The two immersive "stages", the district explorer and the tour, open full-bleed on a sand ground inside that calm frame, then return the visitor to the page. (Colors updated to Warm palette v1, Oct 22, 2026, and brightened with vibrant accents on Oct 25, 2026; there are no dark grounds.)

**Mood:** grounded, unhurried, exact, warm, seasonal. **Not:** glossy, themed (no faux-Tuscan), techno-futurist, salesy.

Rejected for v1: a dark, cinematic, 3D-first landing page. It depends on assets that don't exist, and a City reviewer would discount it as a sales film.

## Color tokens

**Warm palette v1, owner-approved 2026-10-22, brightened with vibrant accents on 2026-10-25, then lightened the same day (experiment on the `vibrant-palette-light` branch).** Feedback was that the site was not vibrant enough, so the owner approved four vibrant colors (sky blue, lime green, warm orange, bright soft pink) plus lavender for senior living. A second round of feedback asked for lighter, brighter colors (like the baby blue in the masterplan drawing), very light image placeholders, and no outlines around boxes. Linen, sand and white stay as the grounds, and all text stays hearth. Tokens live in `app/globals.css`; components use them as Tailwind classes (`bg-linen`, `text-hearth`, `bg-orange` and so on), never as literal hex values. The 3D model is the one exception, because three.js needs literal colors; those literals match the tokens. Image placeholder gradients are also literal, because they stand in for photos.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `linen` | #FBF6EE | Page background, cards, panels on sand | — |
| `sand` | #F3E9DA | Alternate section background (explorer, care section, tour, footer) | — |
| `hearth` | #3B2F2A | All body text and headings; plan outlines | 12.0 on linen, 10.8 on sand |
| `muted` | #73635A | Secondary text, eyebrows, labels | 5.3 on linen, 4.8 on sand |
| `line` | #E6DACA | Borders and dividers | — |
| `orange` | #FFC88F | Primary buttons and action arrows (hearth text on orange) | hearth on orange 8.6 |
| `orange-hover` | #FFB877 | Primary button hover | hearth on it 7.6 |
| `sky` | #9ED8F5 | Fills: panels, cards, placeholder imagery | hearth on sky 8.4 |
| `lime` | #CDEB8B | Fills: success marks, cards, placeholder imagery | hearth on lime 9.8 |
| `pink` | #FFC4DC | Fills: cards, placeholder imagery | hearth on pink 8.7 |
| `lavender` | #D6CBF7 | Fills (district colors now live in `data/districts.json`) | hearth on lavender 8.5 |
| `gold` | #F2B544 | Selection only: the chosen district, pressed map toggles, current page, form focus | hearth on gold 7.1 |
| `lake-deep` | #2F6F88 | Links and focus rings; chart series | 5.2 on linen, 4.7 on sand |
| `sage-deep` | #5E7A4F | Small icons and accents (logo mark, chart series, link underlines); never text | 4.5 on linen (icons need 3:1) |
| `rose` | #B85C66 | Large text accents and form errors only, never body text | 4.1 on linen (large text needs 3:1) |

`muted` is one step darker than the palette's original #7A6A60, which measured 4.31:1 on sand and failed body text (owner-approved Oct 22, 2026). The light `lake`, `sage` and `blossom` tokens were removed on Oct 25, 2026: no component used them, and sky, lime and pink take their place.

### Rules

1. **No dark backgrounds anywhere.** Every section is linen, sand or white with hearth text: header, footer, partnership band, cards, the explorer and the tour. There is no dark theme.
2. **Vibrant fills on a calm ground:** linen and sand stay the main ground of every screen. Sky, lime, orange, pink and lavender are used as fills (buttons, cards, map districts, placeholder imagery), never as text or thin lines.
3. **Image placeholders are one flat, very light color** (no gradient, no stripe texture), with hearth text and no dark fade (owner decision, Oct 25, 2026). The pale fills are sky #DDF1FC, lime #EAF6CF, pink #FFE1ED, peach #FFE6CC, yellow #FFF2B3 (added Oct 25, 2026), lavender #ECE7FC and winter #EAF6FD; neighboring cards use different ones. District heroes are the district color mixed half and half with white (`lib/district-image.ts`). A lighter-to-deeper gradient with white text was tried and set aside (commit 2c09857, reverted). When real photos or video replace a placeholder, text on them goes back to white over a soft dark-brown gradient at the bottom (60–65% behind body-size text).
4. **Buttons** are fully rounded. Primary: orange background, hearth text, orange-hover on hover. Secondary: transparent with a 1.5px hearth border and hearth text (also on the light home hero); on a real photo, a white border and white text. (`components/site/buttons.ts`.)
5. **Gold marks selection.** The selected district, the pressed 2D/3D toggle, the current page and form focus use gold. On the 2D plan the selected outline is gold over a hearth keyline (gold alone is about 1.1:1 on the orange districts). The 3D model's 1px outline is plain gold; the selected plate also lifts and its roundel turns gold.
6. **Links** are lake-deep and turn hearth on hover. The focus ring is a 2px lake-deep outline at 3px offset on every ground.
7. **Vibrant colors and gold are never text** (all are 1.7:1 or less on linen). Charts use lake-deep and sage-deep for series.
8. **Contrast:** all body text meets WCAG AA (4.5:1) on its background. White text on any vibrant color fails, and so does muted text (3.4–4.4:1), so text on a vibrant fill is always hearth. Check every new pair.
9. **No outlines around boxes.** Cards, map frames, chart boxes and fact lists have no border or hairline; space and fill color separate them. Three kinds of line stay: form field borders (people need to see where to type), the dividers between FAQ questions, and the 3px sage-deep bars that head text columns.
10. **Seamless card groups** (style D, owner-approved Oct 25, 2026; branch `seamless-cards`; the home collage left this group on Nov 20, 2026, when it became the photo steps). The doorway cards and the Participate "I'm a…" cards touch with no gaps, so no page-colored lines run between them. Only the group's outer corners are rounded. Neighboring cards must use different pale colors. The cards don't lift on hover (they would overlap): the doorway cards' button turns orange instead. Because the group clips its edges, the focus ring on these cards is drawn inside the card (`outline-offset: -6px`).

### District colors: the July 2026 masterplan's own colors

Changed Nov 16, 2026: Andy asked that the maps use strictly the masterplan's district colors. Each value below was sampled from the July 2026 masterplan sheet as it appears on screen, then made 15% more saturated (OKLCH chroma × 1.15, same lightness and hue) at the owner's request on Nov 16, 2026; the sampled originals were #ECB0D4, #F0BCBC, #F0CC94, #F0ECB0, #F0DCC0, #B4E0EC, #BCBCD4 and #84CCA8. The masterplan gives Grand Orchard Hotel no color (it is drawn in plain gray), so its color was chosen to sit in the masterplan's soft, chalky range (OKLCH chroma 0.09 or less before the 15% boost) in the widest open gap of its color wheel:

- **Grand Orchard Hotel, leaf green #B4E19B.** It sits between the Wellness District's salmon and the Wine Village's rose, and green is the complement of both, so the hotel stands apart from its neighbors. It is yellower than the Orchard Preserve's mint, so it doesn't read as a park, and it nods to the orchard.
- **Apple Blossom Residence, taupe #CABFB5, with a green edge (Nov 18, 2026, owner request: "1:1 with the masterplan").** The masterplan draws the Residence as a taupe core (sampled #C9BFB7, boosted 15%) wrapped in the park green along its roads and creek, with small green lawns in its southern piece by Gala Ave. From Nov 16 to Nov 18 the site used a chosen lilac (#BBA2E9) instead, because the taupe alone read as surrounding land; the features layer and the green edge now set it apart. Taupe is the color closest to Discovery Commons' periwinkle (5.4 OKLab ΔE), the closest pair on the map.

Every pair in the ten is at least 5 OKLab ΔE apart (Apple Blossom Residence and Discovery Commons are the closest at 5.4, then Heritage Grove and Harvest Crossing at 5.8, as on the masterplan), and hearth text measures 6.9:1 or more on every fill. The 2D plan and the 3D model both read these from `data/districts.json`. **Features printed on the color (Nov 18, 2026, branch `map-feature-overlay`).** Each district is drawn in solid color, and the masterplan's buildings, parking, paths and tracks are printed over it with a multiply blend, the way printed maps lay linework over color: blank paper leaves the color unchanged, and each mark darkens the color under it. This keeps the colors at full strength while the features stay legible. Making the color see-through was tried and set aside: it washed every color toward the beige sheet and brought back the yellow-gray cast. The printed layer is `public/plan/districts-sheet-features.webp`, made from `reference/districts-sheet-greyscale.jpg` by `npm run prepare:plan-features` (`scripts/plan/prepare-features.mjs`), which turns the paper pure white and removes most of the terrain shading so the parks don't go muddy. On the 2D plan the layer is cut to each district's outline; on the 3D model it is the texture of each plate's top face, so the features rise with a plate on hover and selection. Plates and 2D fills are fully opaque; dimmed districts fade to 32% with their features. The 3D plates have a soft glow in their own color (with the features in the glow too) so the lighting doesn't darken them, and the 3D lights are neutral white. Before Nov 16, 2026 the lights were tinted warm cream and the 2D fills were 75% opaque, which let the warm sheet show through; together they pulled the colors toward yellow-gray. The district page's small "at a glance" map still uses plain fills. Districts still carry a land-use family (used for labels), but colors no longer follow it.

| # | District | Color | Hearth on it |
|---|---|---|---|
| 1 | Chelan Wine Village | #F1ACD6 rose pink | 7.1 |
| 2 | Wellness District | #F5BABA salmon | 7.8 |
| 3 | Orchard Grove | #F4CB89 apricot | 8.5 |
| 4 | Heritage Grove | #F1ECA7 yellow | 10.6 |
| 5 | Apple Blossom Residence | #CABFB5 taupe, green edge #7ACFA5 | 7.2 |
| 6 | Harvest Crossing | #F2DBBB sand | 9.6 |
| 7 | Summit Recreation Park | #AEE1EF sky blue | 9.1 |
| 8 | Discovery Commons | #BCBCD7 periwinkle | 7.0 |
| 9 | Orchard Preserve | #7ACFA5 mint | 6.9 |
| 10 | Grand Orchard Hotel | #B4E19B leaf green (chosen) | 8.7 |

**Painted areas (Nov 18, 2026).** Where the masterplan paints part of a district in another color, the site does too. A district keeps one main color (`color` in `data/districts.json`), used for the menus, the district page and the transitions; its `zones` list adds painted areas drawn over it in order, with no outline of their own and the features layer printed over them. Their shapes are under `zones` in `data/district-geometry-v1.json`, matched by `key`. Four districts have them:

- Apple Blossom Residence: `green` (#7ACFA5), its green edge and the lawns in its southern piece.
- Summit Recreation Park: `green` (#7ACFA5), the whole southern park, and `water` (#AEE1EF, Summit's own sky blue), the pond in it.
- Heritage Grove (Nov 18, 2026): `lawn` (#BADA81), its two lawns. On the masterplan they are the park green painted over Heritage's yellow, so they read yellow-green (sampled #BCD88C, boosted 15%). This is close to Grand Orchard Hotel's leaf green (2.9 OKLab ΔE); the two never touch.
- Orchard Preserve (Nov 18, 2026): `meadow` (#A7D6BF, sampled #ACD4C0, boosted), the pale open space between Discovery Commons and Heritage Grove with the parking loop, and `green` (#7ACFA5, the Preserve's own color), the wooded patch in it.

The green is the Orchard Preserve's color: on the masterplan, the Preserve, Summit's southern park and the Residence's edge are the same green, so they are told apart by their numbered markers and names. On the 3D model each painted area is a 0.4-unit layer on the plate, so it rises with the plate on hover and selection, and the plate's outline sits above the layers.

Heritage Grove's outline, the Preserve's piece by Discovery Commons, the Residence's main outline and all of these shapes were traced from `public/plan/masterplan-color.webp` on Nov 18, 2026: pixels were sorted by color (taupe, yellow including its shadowed parts, park and lawn greens, pale meadow, pond blue), roads and buildings inside the district were filled in, anything inside a neighboring district was left out, and each edge was traced about one pixel inside the area and simplified to under one pixel, so neighboring outlines never overlap (overlapping plates would flicker in 3D). Replaced: the Residence's old, tighter outline (taupe core only), Heritage Grove's outline (it left out its lawns and the strip along Harvest Crossing), and the Preserve's small piece (it covered only the wooded patch, not the open space around it). The Residence's southern piece and the Preserve's main shape kept their outlines.

From Oct 25 to Nov 16, 2026 the colors followed land-use families: residential #E4DCFA, #FFC88F; senior #D6CBF7, #FFE380; commercial #FFC4DC, #FFAED0; civic #9ED8F5, #BDE5F8; parks #DDF2AE, #CDEB8B.

The first vibrant round (commit 5b0f738, branch `vibrant-palette`) used deeper shades: #F8BE88, #F4A259; #B9A6EA, #D0C3F1; #FFB3D1, #FF95BF; #69B9E7, #9CD0EF; #C4DE8A, #A8CF55.

Before Oct 25, 2026 the families were wheat, sage, terracotta, lake blue and green (#D8C27F, #CDB06A; #A9B48A, #BEC69F; #C98B6B, #B8754F; #7FA3BC, #97B3C8; #A1C4A6, #83AF8C).

Districts are told apart by **numbered roundels and names**, not by color alone.

## Typography

| Use | Typeface | Notes |
|---|---|---|
| Headlines | Arial (system font, with Helvetica and sans-serif as fallbacks) | weight 600 |
| Body, long reading, interface, captions, navigation | Atkinson Hyperlegible Next | 400 / 500 / 600 |
| Figures, source chips, map labels, eyebrows | IBM Plex Mono | tabular numerals; uppercase eyebrows with letter-spacing 0.06–0.08em |

(Headlines changed to Arial on Oct 24, 2026. Before that they used Bricolage Grotesque from the design handoff, which had replaced Source Serif 4. Atkinson Hyperlegible Next replaced Inter in the same handoff.)

Scale: body 18px at about a 64-character measure. Headings use four named sizes from `app/globals.css` instead of one-off values (owner decision, Nov 22, 2026: headings felt too big on desktop). At 1440px wide: `text-hero` 72px (home and district heroes), `text-page` 56px (each page's title; lowered from 68px the same day), `text-section` 44px (section titles), `text-card` 32px (titles inside cards). They take over from the `sm:` breakpoint; phone sizes stay on each heading's base class. Load the web font (Atkinson Hyperlegible Next) through `next/font` with no layout shift. Arial is a system font and is not downloaded.

## Layout

- 12-column grid, 1,240px reading frame. On desktop (1024px and up) every section's content sits inside this frame, with at least 56–96px of side margin (`--frame-gutter` in `app/globals.css`, applied as `lg:px-(--frame-gutter)`). Section background colors still run edge to edge; the map, photo steps and page-top cards sit inside the frame. The home hero, the district heroes and the home tour photo ("See the land for yourself", full screen on desktop, its text card aligned to the frame) are the only full-bleed views. Section top and bottom padding on desktop is 96px at most (thinned from 120px on Nov 22, 2026). Phones and tablets keep their tighter padding. (Owner decision, Nov 22, 2026: content felt "in your face" on desktop. This replaces the earlier full-bleed bands for the map, tour and photography.)
- Editorial rhythm: a text column on the left and a margin column on the right for sources and notes. Sidenotes on desktop, tap-to-open chips on mobile.
- 8px spacing base. Sections separated by large vertical space (96–160px on desktop), not by boxes.
- Hairline rules and small-caps or mono eyebrows for structure. No drop shadows, and no card grids as the main device.
- Mobile first. On mobile the explorer becomes a list with a mini-map, not a shrunken desktop map.

## Signature 1: the Plan Table (district explorer)

The whole site is drawn as a crisp 2D plan on the linen ground: ten districts in their family colors, numbered roundels, the 5/10/15-minute walk rings from the masterplan, and known anchors (SR 97A, Apple Blossom Drive, Lake Chelan Community Hospital, the existing ball fields). Focusing a district lifts it and dims the rest. Selecting it moves to its district page and keeps it highlighted, using the same SVG path so the move feels continuous. A 3D model toggle is available (`05-3d-district-model.md`). On The Plan the explorer opens on the "Top-down plan" view, straight overhead, with the whole plan in frame; "3D model" tilts it into the oblique view (owner decision, Nov 18, 2026). The Home map still tilts into 3D as before. Always labeled: "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."

## Signature 2: the Evidence Margin

Every figure has a source in the registry. **Updated Oct 22, 2026 (public copy rules in `CLAUDE.md`):** public pages show no confidence labels or source tags, and the homepage shows no chips. Sources appear on Research Library pages and in footnotes, as a small mono chip reading source and date (for example `ACS 2020–24`). Opening it shows source, date, geography, method note and a link. The confidence tier (High / Moderate / Low) stays in the registry and is not shown. Build one **source registry** (`data/sources.json`, one ID per source with date, geography, tier and access level) that every chart, statistic and document references.

Optional third element: a Today / Planned swipe on the plan.

## Motion

Use the emil-design-eng skill for technique. These rules set the limits:

- Motion explains space and never decorates. Use it for map focus, the district transition and revealing evidence.
- No looping animations, count-up statistics or smooth-scroll libraries in v1. No parallax either; note that `useParallax` (`components/motion/useParallax.ts`) still drifts a few images on other pages, which this rule never caught up with. Home dropped its parallax on Nov 20, 2026.
- **Home stacked sheets** (owner request, Nov 20, 2026, modeled on villiers.ai; branch `home-scroll-stack`). Home sections hold still once fully in view and the next section slides up over them, like a stack of sheets. It is plain CSS `position: sticky` (`components/motion/StackSection.tsx`), so scrolling stays native and nothing takes over the wheel. Pinned: the hero and the photo steps. Not pinned: the map (the district dive measures it on screen, and the 3D model shouldn't keep drawing under other sections), the tour band and the doorway cards. From the map on, Home scrolls normally to avoid visual fatigue (owner decision, Nov 21, 2026), and What makes it different was removed because it repeated the hero and photo steps. The hero holds for one screen at most, because it is covered as soon as the visitor scrolls (many visitors are older; don't make them scroll through a long video hero). A keyboard visitor tabbing back into a covered section is scrolled to where it shows (focus not obscured). With reduced motion nothing sticks.
- **Home photo steps** (`components/home/PhotoSteps.tsx`, replacing the five-tile collage; reworked Nov 21, 2026). Not a numbered list (owner decision). Each step is a text row (title, plus its line on wide screens) followed by its photo. Each row sticks one row below the one before (52px rows on phones, 72px on wide screens), so the earlier titles stay in view as a running list, and the next row and photo slide up over the current photo. The step in view is marked with a short sage-deep bar and hearth text; the others are muted. On phones the line sits on the photo instead, so the stacked rows leave room for the picture. A photo fades out once it is fully covered, or its edges show as hairlines around the rows. A heading, "Life at Apple Blossom Commons", sits in a sticky column on the left (new copy, to be read by the owner and Andy). This, the stacked sheets and the two story moments below are the only scroll-linked effects.
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
