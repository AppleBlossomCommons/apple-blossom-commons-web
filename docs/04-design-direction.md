# 04 — Design direction: "Orchard Atlas"

*Approved Oct 14–15, 2026. Visual specimen: "Orchard Atlas Specimen" artifact (claude.ai/artifact/TSEz47922NjnkNG4xEYFo8).*

The site should read like a planning atlas edited by a good magazine: warm paper, orchard green, serif headlines, precise cartography, and a source chip on every number. The two immersive "stages", the district explorer and the tour, open full-bleed on a dark ground inside that calm frame, then return the visitor to the page.

**Mood:** grounded, unhurried, exact, warm, seasonal. **Not:** glossy, themed (no faux-Tuscan), techno-futurist, salesy.

Rejected for v1: a dark, cinematic, 3D-first landing page. It depends on assets that don't exist, and a City reviewer would discount it as a sales film.

## Color tokens

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `paper` | #F5F3ED | Page background | — |
| `surface` | #FBFAF6 | Raised surfaces | — |
| `ink` | #1D2621 | Body text, headlines | 14.0 on paper |
| `ink-2` | #4A5650 | Secondary text | 6.9 |
| `ink-3` | #626C66 | Tertiary text, eyebrows | 4.9 (4.6 on surface-2) |
| `orchard-green` | #2F5D46 | Primary brand, links, selected states | 6.8 |
| `basalt` | #22372C | Dark stage background (explorer, tour, footer) | paper on basalt 11.5 |
| `basalt-2` | #2B4436 | Panels on the dark stage | — |
| `signal` (Harvest Amber) | #B5791C | One signal per screen: selection, "you are here" (marks only) | 3.3 (marks only) |
| `signal-text` | #8F5E12 | Signal used as text on paper | 5.0 |
| `signal-on-dark` | #E0AE4F | Signal on basalt | — |
| `harvest-gold` | #C9A24B | Routes, highlights on dark; never text on paper | 5.3 on basalt |
| `lake` | #3E6E8E | Water, second data series, health/civic | 5.0 |
| `rule` | #DCD8CD | Hairlines, grid | — |

Blossom pink (#D9466F) is **retired**. The old tour still uses it and must be restyled.

Dark mode (from the 3D prototype): paper #141B17, surface #1A231E, ink #E9EDE6, ink-2 #B9C4BC, ink-3 #8E9A92, rule #2E3A33, green #7FB898, basalt #0F1612, basalt-2 #18221C.

**Decision, Oct 16, 2026 (owner), superseded the same day:** an earlier call for full dark mode following the visitor's system setting was replaced when the homepage mockup was approved (`reference/homepage-mockup/README.md`, rule 10). **v1 is light theme only.** The operating system's dark mode does not switch the site. The dark values above are kept for a later, separately approved dark theme (opt-in through `data-theme="dark"` only); in that theme, text on green buttons is dark (#141B17) and `signal-text` becomes #E0AE4F.

### District colors: by land-use family, not one hue per district

| Family | Districts | Prototype colors |
|---|---|---|
| Residential (warm wheat) | Apple Blossom Residence, Harvest Crossing | #D8C27F, #CDB06A |
| Senior living (sage) | Orchard Grove, Heritage Grove | #A9B48A, #BEC69F |
| Commercial & hospitality (terracotta) | Chelan Wine Village, Grand Orchard Hotel | #C98B6B, #B8754F |
| Health & civic (lake blue) | Wellness District, Discovery Commons | #7FA3BC, #97B3C8 |
| Parks & open space (orchard green) | Summit Recreation Park, Orchard Preserve | #7FAE86, #6A9E74 |

Districts are told apart by **numbered roundels and names**, not by color alone.

## Typography

| Use | Typeface | Notes |
|---|---|---|
| Headlines, long reading | Source Serif 4 (variable, optical sizes) | weight 600 for headlines |
| Interface, captions, navigation | Inter | 400 / 500 / 600 |
| Figures, source chips, map labels, eyebrows | IBM Plex Mono | tabular numerals; uppercase eyebrows with letter-spacing 0.06–0.08em |

Scale: body 18px at about a 64-character measure. Headlines step on a 1.25 ratio up to a fluid display size of about 88px. Load everything through `next/font` with no layout shift.

## Layout

- 12-column grid, 1,240px reading frame, full-bleed bands for the map, tour and photography.
- Editorial rhythm: a text column on the left and a margin column on the right for sources and notes. Sidenotes on desktop, tap-to-open chips on mobile.
- 8px spacing base. Sections separated by large vertical space (96–160px on desktop), not by boxes.
- Hairline rules and small-caps or mono eyebrows for structure. No drop shadows, and no card grids as the main device.
- Mobile first. On mobile the explorer becomes a list with a mini-map, not a shrunken desktop map.

## Signature 1: the Plan Table (district explorer)

The whole site is drawn as a crisp 2D plan on the paper ground: ten districts in their family colors, numbered roundels, the 5/10/15-minute walk rings from the masterplan, and known anchors (SR 97A, Apple Blossom Drive, Lake Chelan Community Hospital, the existing ball fields). Focusing a district lifts it and dims the rest. Selecting it moves to its district page and keeps it highlighted, using the same SVG path so the move feels continuous. A 3D model toggle is available (`05-3d-district-model.md`). Always labeled: "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."

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

- **Plan map:** custom SVG, paper ground, hairline roads, land-use fills at reduced opacity, scale bar and north arrow.
- **Context map:** real geography in a muted custom style (lake, Downtown Chelan, the site, feeder markets). Pick the tool in the build phase, and check production tile licensing.
- **Tour map:** keeps satellite imagery but takes the new route colors and marker styling.

## Data visualization

- One finding per chart, written as its title. Direct labels, no legends. Hairline axes. Plex Mono numerals.
- Show uncertainty: ranges as whiskers or bands, and caveats in plain words. No confidence tier labels on public pages.
- Every chart has a "view as table" option.
- Orchard Green for the main series, Lake for comparison, the signal color for the one mark that matters.
- First candidate: King County vs Chelan County net migration by five-year age band, as a mirrored bar chart with its caveat in the chart.

## Imagery

- Real place first: lake, orchards, the hills, hospital frontage, existing fields. Renderings only where labeled "Illustrative concept".
- People at human scale, at a distance, in real settings. No staged stock lifestyle photos or wine-glass clichés.
- Four seasons: blossom, summer lake, harvest, snow.
- Until photography exists, use a typographic hero over the plan, and still frames from the tour clips.
