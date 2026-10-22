---
name: Apple Blossom Commons
description: Orchard Atlas. A planning atlas edited by a good magazine, on warm paper.
colors:
  paper: "#f5f3ed"
  surface: "#fbfaf6"
  ink: "#1d2621"
  ink-2: "#4a5650"
  ink-3: "#646e68"
  orchard-green: "#2f5d46"
  on-green: "#f5f3ed"
  basalt: "#22372c"
  basalt-2: "#2b4436"
  harvest-amber: "#b5791c"
  signal-text: "#8f5e12"
  signal-on-dark: "#e0ae4f"
  harvest-gold: "#c9a24b"
  lake: "#3e6e8e"
  rule: "#dcd8cd"
  paper-dark: "#141b17"
  surface-dark: "#1a231e"
  ink-dark: "#e9ede6"
  ink-2-dark: "#b9c4bc"
  ink-3-dark: "#8e9a92"
  orchard-green-dark: "#7fb898"
  on-green-dark: "#141b17"
  basalt-dark: "#0f1612"
  basalt-2-dark: "#18221c"
  signal-text-dark: "#e0ae4f"
  rule-dark: "#2e3a33"
  footer-text: "#c9d2cb"
  footer-link: "#dfe5df"
  plan-residential: "#d8c27f"
  plan-residential-2: "#cdb06a"
  plan-senior: "#a9b48a"
  plan-senior-2: "#bec69f"
  plan-commercial: "#c98b6b"
  plan-commercial-2: "#b8754f"
  plan-civic: "#7fa3bc"
  plan-civic-2: "#97b3c8"
  plan-parks: "#7fae86"
  plan-parks-2: "#6a9e74"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.4vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.25
  title-sm:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label-mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
  chip-mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  caption-mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.375
  numeral-mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "tnum"
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  section: "96px"
  section-lg: "144px"
  gutter: "24px"
  gutter-lg: "40px"
  container: "1360px"
components:
  button-primary:
    backgroundColor: "{colors.orchard-green}"
    textColor: "{colors.on-green}"
    typography: "{typography.ui}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-primary-compact:
    backgroundColor: "{colors.orchard-green}"
    textColor: "{colors.on-green}"
    typography: "{typography.ui}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  link-secondary:
    textColor: "{colors.orchard-green}"
    typography: "{typography.body}"
  segment:
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "0 14px"
    height: "36px"
  segment-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xs}"
  source-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    typography: "{typography.chip-mono}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
    height: "24px"
  source-chip-hover:
    textColor: "{colors.ink}"
  source-popover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px"
    width: "min(26rem, calc(100vw - 2rem))"
  plan-roundel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.numeral-mono}"
    rounded: "{rounded.full}"
    size: "30px"
  divider-handle:
    backgroundColor: "{colors.harvest-amber}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    size: "44px"
  map-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "4px 9px"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.ui}"
  nav-link-active:
    textColor: "{colors.ink}"
  site-footer:
    backgroundColor: "{colors.basalt}"
    textColor: "{colors.footer-text}"
    padding: "64px 24px 40px"
---

# Design System: Apple Blossom Commons

The approved direction is **Orchard Atlas**, pinned in `docs/04-design-direction.md` (approved Oct 14–15, 2026; full dark mode approved by the owner Oct 16, 2026). This file records how that direction landed in the shipped build (`app/globals.css`, `app/page.tsx`, `components/plan/*`, `components/evidence/SourceChip.tsx`, `components/site/*`). Where the two differ, the build values are recorded here and the difference is named.

## Overview

**Creative North Star: "The Orchard Atlas"**

The site reads like a planning atlas edited by a good magazine. Warm paper ground, ink hairlines, Source Serif headlines, and a crisp 2D plan drawn in land-use family colors carry the whole world. Every figure is anchored to its source with a small mono chip. Structure comes from rules and vertical space, never from boxes, cards or shadows. The mood is grounded, unhurried, exact, warm and seasonal; it is not glossy, themed, techno-futurist or salesy.

Density is editorial: generous section spacing, a serif headline column beside a large plan, and ruled lists in place of card grids. The plan is the hero material. It sits on the raised surface tone inside a 1px rule, with a faint survey grid, numbered mono roundels, a north arrow, and a mandatory disclaimer beneath it.

Motion explains space and never decorates. One ease-out curve, short interface timings, longer spatial moves, and one scroll/story reveal (Today to Planned). Under reduced motion everything jumps or rests instead of moving.

**Key Characteristics:**
- Warm paper and raised surface, ink text, orchard green as the only interactive brand color.
- One Harvest Amber signal, used as marks only.
- Hairline rules (1px) for all structure; no card grids and no shadows on page surfaces.
- Source Serif 4 headlines at weight 600, Inter interface and body, IBM Plex Mono for figures, chips, roundels and map labels.
- District colors grouped by land-use family, always paired with a number and a name.
- Full dark mode that follows the visitor's system setting, with a manual `data-theme` override.

## Colors

A warm, low-chroma paper-and-ink palette with one green voice, one amber signal, and muted land-use fills for the plan.

### Primary
- **Orchard Green** (`orchard-green`): primary buttons, secondary links, hover tint on list arrows, text selection (28% mix). Text on green buttons is `on-green`. In dark mode it lightens to `orchard-green-dark` and button text turns dark (`on-green-dark`).

### Secondary
- **Harvest Amber** (`harvest-amber`, the `signal` token): the one signal. On the built surfaces it appears only as the Today/Planned divider line and handle, the stroke of the active plan roundel, the underline under the current page in the main nav, and the global focus ring. It is never body text on paper. It does not change in dark mode.
- **Signal Text** (`signal-text`): the amber for text on paper (5.0:1). Becomes `signal-text-dark` in dark mode. Defined, not yet used on built surfaces.
- **Signal on Dark** (`signal-on-dark`): amber on basalt. Defined, not yet used on built surfaces.

### Tertiary
- **Lake** (`lake`): water, the second data series, health and civic. Defined, reserved for maps and charts; not yet used on built surfaces.
- **Harvest Gold** (`harvest-gold`): routes and highlights on dark stages; never text on paper. Defined in `globals.css`, not mapped to a utility, not yet used.

### Neutral
- **Paper** (`paper`): page background, header, roundel fill, inactive map labels.
- **Surface** (`surface`): raised tone for the plan stage, source chips, the source popover, map tags, the hovered district row.
- **Ink** (`ink`): headlines, body, plan outlines (at 45–55% stroke opacity), the strong top rule of the doorway list, the active segment fill.
- **Ink 2** (`ink-2`): supporting paragraphs, nav links at rest, chip text, map corner labels.
- **Ink 3** (`ink-3`): tertiary text, the disclaimer, district family labels, list arrows at rest (4.8:1 on paper).
- **Rule** (`rule`): every hairline: header bottom, list dividers, stage border, chip and tag borders, the survey grid.
- **Basalt** (`basalt`): the footer ground; also the future dark stage for the explorer and tour. `basalt-2` is for panels on that stage. The footer keeps light text in both modes: wordmark and legal line in paper (`#f5f3ed`, written as a literal), body in `footer-text`, links in `footer-link`, legal in `ink-2-dark`, divider white at 15%.

### Plan family fills
Districts are colored by land-use family, two shades per family, from `data/districts.json`: residential wheat (`plan-residential`, `plan-residential-2`), senior-living sage (`plan-senior`, `plan-senior-2`), commercial and hospitality terracotta (`plan-commercial`, `plan-commercial-2`), health and civic lake blue (`plan-civic`, `plan-civic-2`), parks and open space orchard green (`plan-parks`, `plan-parks-2`). Fills sit at `--plan-fill-opacity` 0.86 in light mode and 0.74 in dark. When one district is focused the rest dim to 0.32 on the stage and 0.22 on the legend plan; the focused one goes to full fill with a 2px stroke. Existing uses on the Today side are drawn at 0.32 fill with an ink-2 stroke.

### Dark mode
Every neutral, the green, `on-green`, basalt pair, `signal-text` and `rule` swap to their `-dark` tokens under `prefers-color-scheme: dark` (unless `data-theme="light"`), or under `data-theme="dark"`. Harvest Amber, Lake, Harvest Gold and the plan family colors do not change.

### Named Rules
**The One Signal Rule.** Harvest Amber marks the single thing that matters on a screen: the divider, the active roundel, the current page, the focused control. It is a mark, never a fill area or body text on paper; text in amber uses `signal-text`.

**The Number-and-Name Rule.** A district is never identified by color alone. Every fill is paired with a numbered roundel and its name in the HTML legend.

## Typography

**Display Font:** Source Serif 4 (variable with optical sizes, fallback Georgia, serif)
**Body Font:** Inter (fallback system-ui, sans-serif)
**Label/Mono Font:** IBM Plex Mono, weights 400 and 500 (fallback ui-monospace, monospace)

**Character:** A bookish serif for statements and names, a neutral grotesque for everything the visitor reads or operates, and a plain mono for anything that is a figure, a source, or a mark on the map. Headlines use `text-wrap: balance`, paragraphs `text-wrap: pretty`. All three load through `next/font`.

### Hierarchy
- **Display** (600, clamp 40–64px, line-height 1.04, tracking -0.015em): the Home headline only. Placeholder page titles use a smaller clamp (36–56px, line-height 1.06). The direction allows up to about 88px; the build caps at 64px so the plan keeps the first viewport.
- **Headline** (600, clamp 30–40px, line-height 1.25): section headings (h2).
- **Title** (600, 26px): doorway titles in the ruled doorway list. **Title small** (22px) for district names and mobile menu items.
- **Body** (400, 18px, line-height 1.6): all running text, measured at 38–60ch (supporting paragraphs mostly 56–60ch). Body small (16px) for district summaries and the footer blurb.
- **UI** (500 for actions, 15px): buttons, main nav, fact lines. Utility nav at 13px. Caption (14px) for segmented control, map tags, popover details.
- **Mono label** (400, 11px, uppercase, tracking 0.07–0.08em): map corner labels (Today / Planned), district family labels set beneath the district name.
- **Mono chip** (400, 11px, tracking 0.02em): source chips.
- **Mono caption** (400, 12px): the plan disclaimer, footer legal line, placeholder notes.
- **Mono numeral** (500, 13px): district numbers in roundels and legend markers. Figures use tabular numerals (`.tabular`).

### Named Rules
**The Mono-Means-Evidence Rule.** IBM Plex Mono is reserved for figures, sources, district numbers, map labels and disclaimers. Prose and headings never set in mono.

**The No-Kicker Rule.** Headlines stand on their own. Mono uppercase labels name map regions and metadata that follow a title; they are not set as eyebrows above headlines.

## Layout

- **Container:** 1360px max width with 24px gutters, 40px from `lg` (1024px). The direction names a 1,240px reading frame; the build's frame is 1280px of content inside the 1360px container.
- **Grid:** 12 columns from `lg`. Home hero: headline column spans 4, plan spans 8. Two-column sections split 6/6 or 5/7. Ruled lists use a 12-column inner grid from `sm` (640px): title 5, text 6, arrow 1.
- **Rhythm:** 8px base. Section padding 96px mobile, 128–144px desktop; hero 40/56px top, 80/112px bottom. Column gaps 40px (mobile), 48–64px (desktop). Heading-to-body 24px; body-to-actions 36px.
- **Separation:** sections are separated by vertical space and, at most, a single `rule` top border. Never boxes.
- **Responsive:** mobile first. Below `sm`, plan roundels are hidden and the district list carries the numbers; existing-use labels switch to short forms. Below `lg`, the legend's sticky mini-plan is hidden and the list stands alone; the header collapses to a menu button and a full-width ruled menu.

## Elevation & Depth

The world is flat. Depth comes from tone (paper under surface), hairline rules, and fill opacity on the plan, where focusing a district lifts it by dimming everything else. Page surfaces, buttons, chips, the plan stage and lists carry no shadows.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 12px 40px rgb(29 38 33 / 0.18)`, backdrop `rgb(20 27 23 / 0.25)`): the source popover only, which sits in the top layer above a dimmed page. This is the single recorded exception.

### Named Rules
**The Flat Page Rule.** Nothing on the page plane casts a shadow. Lift is expressed by dimming the rest (plan), by surface tone (hovered row), or by a stronger stroke, never by elevation.

## Shapes

Nearly square. Rectangular elements use 2–4px corners: 3px for buttons, chips, tags and the segmented control frame, 2px for segments inside it and the focus ring, 4px for the popover. Circles are reserved for plan marks: roundels (r 15 in plan units, ink 1.2 stroke; active is a 3px amber stroke), the 32px legend markers (family-color border with a 3px inset ring), and the 44px divider handle (2px surface border). Lines are hairlines: 1px rules everywhere, non-scaling 1px strokes on the plan, 2px for the divider line and focused district.

## Components

### Buttons
Quiet, rectangular, confident.
- **Shape:** near-square corners (3px).
- **Primary:** orchard green with `on-green` text, 500 weight, 20px horizontal padding, 48px minimum height, trailing arrow icon. Compact header variant: 16px by 10px.
- **Hover / Focus:** brightness 110% over 150ms. Focus is the global ring: 2px Harvest Amber outline, 3px offset.
- **Secondary:** a green text link, 500 weight, 1px underline at 0.3em offset, thickening to 2px on hover. Primary and secondary always appear as a pair: one button, one link.

### Segmented control (Today / Compare / Planned)
- **Style:** 1px rule frame, 3px corners, 4px inner padding; segments 36px tall, 14px padding, ink-2 text.
- **State:** pressed segment fills ink with paper text; hover darkens text to ink over 150ms.

### Chips (Source chip)
- **Style:** surface fill, 1px rule border, 3px corners, 24px minimum height, mono 11px ink-2 text reading `Source label · note`.
- **State:** hover darkens the border to ink-3 and the text to ink. Opens a native popover: surface, 1px rule border, 4px corners, 20px padding, serif 20px source title, a date / geography definition list (no confidence tier on public pages), method note, and a ruled Close button. The popover carries the Overlay shadow.

### Lists (in place of cards)
- **Doorway list:** a strong ink top rule, rule hairlines between rows, 28px row padding; serif title, ink-2 description, arrow that turns green and nudges 4px right on hover. The whole row is the link.
- **District list:** rule top and row hairlines, a 32px numbered family-color marker, serif name, mono family label, summary, fact line, source chip. Hover or focus tints the row with surface and lifts the matching district on the sticky plan beside it.

### Navigation
- **Header:** paper ground with a rule bottom border. Utility row (13px, ink-2) above the main row (56px tall on desktop, 64px on mobile). Main links are 15px ink-2, ink on hover; the current page is ink with a 2px Harvest Amber underline at 0.5em offset. The compact primary button closes the row.
- **Mobile:** a 44px menu button opens a full-width ruled list of serif 22px links and a primary button. Escape and route changes close it.
- **Footer:** basalt ground, wordmark in paper, a 2–3 column link grid, then a white-15% rule and a mono legal line carrying the plan disclaimer.

### Plan stage (Today / Planned)
The signature component. A surface-toned stage with a 1px rule border and a faint rule-colored survey grid. Today (left) shows the site perimeter in ink at 55% and existing uses at low fill with mono labels on paper tags. Planned (right) is clipped by the divider and shows the ten districts in family fills with numbered roundels. A 2px amber divider with a 44px amber handle (white chevrons) splits them. The handle is a keyboard slider (arrow keys step 5, Shift 20, Home/End, PageUp/PageDown) and a pointer drag; the segmented control jumps to 100 / 50 / 0. Hovering a district dims the rest and shows a surface map tag with its zero-padded number and name. Mono corner labels, a north arrow, and the mono disclaimer beneath are always present.

**Motion:** on first paint the perimeter draws (900ms), existing labels fade in (400ms at 600ms), then the divider sweeps from the right edge to its 50% rest (1600ms after a 900ms delay) while each roundel pops in (320ms, scale 0.4 to 1) at the moment the divider uncovers it. If the stage first appears below the fold, the intro replays when it scrolls half into view. Button jumps animate the divider over 600ms; dragging is immediate. Hover state changes take 150–200ms. Everything uses `cubic-bezier(0.22, 1, 0.36, 1)`.

**Reduced motion:** no intro at all; the outline is drawn, the divider rests at 50%, and all transitions collapse to 0.01ms globally.

## Do's and Don'ts

### Do:
- **Do** pair one green primary button with one green underlined text link for every call to action.
- **Do** set every figure beside a mono source chip, and every plan or map beside the line "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."
- **Do** give every district its number, name and family color together, and give every plan an HTML list equivalent.
- **Do** separate sections with 96–144px of space and, at most, one 1px rule.
- **Do** use `cubic-bezier(0.22, 1, 0.36, 1)` for every transition: 150–200ms for interface states, 600ms or more for spatial moves on the plan.
- **Do** keep Harvest Amber to marks: divider, active roundel, current-page underline, focus ring.
- **Do** check every new surface in both light and dark mode; use tokens, not literals, so dark mode follows.

### Don't:
- **Don't** put a shadow on anything on the page plane; only a top-layer popover may carry the Overlay shadow.
- **Don't** build card grids as the main device; use ruled lists.
- **Don't** set amber (`harvest-amber`) as text on paper, or Harvest Gold as text on paper.
- **Don't** identify a district by color alone.
- **Don't** add looping animation, parallax, count-up statistics or smooth-scroll libraries.
- **Don't** put mono uppercase eyebrows or kickers above headlines.
- **Don't** use Blossom pink (#D9466F); it is retired.
