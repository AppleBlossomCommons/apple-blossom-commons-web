---
name: Apple Blossom Commons
description: Orchard Atlas layout on Warm palette v1. A planning atlas edited by a good magazine, on warm linen.
colors:
  linen: "#fbf6ee"
  sand: "#f3e9da"
  hearth: "#3b2f2a"
  muted: "#73635a"
  line: "#e6daca"
  orange: "#ffc88f"
  orange-hover: "#ffb877"
  sky: "#9ed8f5"
  lime: "#cdeb8b"
  pink: "#ffc4dc"
  lavender: "#d6cbf7"
  gold: "#f2b544"
  lake-deep: "#2f6f88"
  sage-deep: "#5e7a4f"
  rose: "#b85c66"
  plan-residential: "#ffd9b0"
  plan-residential-2: "#ffc88f"
  plan-senior: "#d6cbf7"
  plan-senior-2: "#e4dcfa"
  plan-commercial: "#ffc4dc"
  plan-commercial-2: "#ffaed0"
  plan-civic: "#9ed8f5"
  plan-civic-2: "#bde5f8"
  plan-parks: "#ddf2ae"
  plan-parks-2: "#cdeb8b"
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
    backgroundColor: "{colors.orange}"
    textColor: "{colors.hearth}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "48px"
  button-primary-compact:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.hearth}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: "10px 16px"
  link-secondary:
    textColor: "{colors.lake-deep}"
    typography: "{typography.body}"
  segment:
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "0 14px"
    height: "36px"
  segment-active:
    backgroundColor: "{colors.hearth}"
    textColor: "{colors.linen}"
    rounded: "{rounded.xs}"
  source-chip:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.muted}"
    typography: "{typography.chip-mono}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
    height: "24px"
  source-chip-hover:
    textColor: "{colors.hearth}"
  source-popover:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.hearth}"
    rounded: "{rounded.md}"
    padding: "20px"
    width: "min(26rem, calc(100vw - 2rem))"
  plan-roundel:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.hearth}"
    typography: "{typography.numeral-mono}"
    rounded: "{rounded.full}"
    size: "30px"
  divider-handle:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.hearth}"
    rounded: "{rounded.full}"
    size: "44px"
  map-tag:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.hearth}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "4px 9px"
  nav-link:
    textColor: "{colors.hearth}"
    typography: "{typography.ui}"
  nav-link-active:
    textColor: "{colors.hearth}"
  site-footer:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.hearth}"
    padding: "64px 24px 40px"
---

# Design System: Apple Blossom Commons

The approved direction is **Orchard Atlas**, pinned in `docs/04-design-direction.md` (approved Oct 14–15, 2026). Its colors were replaced by **Warm palette v1** (owner-approved Oct 22, 2026; light only, no dark grounds or dark mode). This file records how that direction landed in the shipped build (`app/globals.css`, `app/page.tsx`, `components/plan/*`, `components/evidence/SourceChip.tsx`, `components/site/*`). Where the two differ, the build values are recorded here and the difference is named.

## Overview

**Creative North Star: "The Orchard Atlas"**

The site reads like a planning atlas edited by a good magazine. Warm linen and sand grounds, hearth text and line hairlines, Source Serif headlines, and a crisp 2D plan drawn in land-use family colors carry the whole world. Every figure is anchored to its source with a small mono chip. Structure comes from rules and vertical space, never from boxes, cards or shadows. The mood is grounded, unhurried, exact, warm and seasonal; it is not glossy, themed, techno-futurist or salesy.

Density is editorial: generous section spacing, a serif headline column beside a large plan, and ruled lists in place of card grids. The plan is the hero material. It sits on linen inside a 1px line border, with a faint survey grid, numbered mono roundels, a north arrow, and a mandatory disclaimer beneath it.

Motion explains space and never decorates. One ease-out curve, short interface timings, longer spatial moves, and one scroll/story reveal (Today to Planned). Under reduced motion everything jumps or rests instead of moving.

**Key Characteristics:**
- Linen and sand grounds, hearth text, orange primary buttons, gold for selection, lake-deep for links and focus.
- Vibrant fills (sky, lime, orange, pink, lavender) for buttons, cards, map districts and placeholder imagery; never as text.
- No outlines around boxes: space and fill color separate cards, map frames and charts. Only form fields, FAQ dividers and the 3px column bars keep a line.
- Source Serif 4 headlines at weight 600, Inter interface and body, IBM Plex Mono for figures, chips, roundels and map labels.
- District colors grouped by land-use family, always paired with a number and a name.
- Light only: no dark sections and no dark mode.

## Colors

**Warm palette v1** (owner-approved Oct 22, 2026), brightened with vibrant accents on Oct 25, 2026, then lightened the same day. Image placeholders are one flat, very light color with hearth text (no gradients). The full token table, contrast figures and rules are in `docs/04-design-direction.md`; this section records how they land in the build.

### Grounds and text
- **Linen** (`linen`): page background, header, cards, the map frame and district card on the explorer, roundel fill, the source popover.
- **Sand** (`sand`): alternate bands: the district explorer, Connected Community, the tour and the footer. Also the hover tint for secondary buttons and menu rows.
- **Hearth** (`hearth`): all body text and headings, plan outlines (45–55% stroke opacity), strong top rules, secondary button borders (1.5px).
- **Muted** (`muted`, #73635A): secondary text, eyebrows, labels, the disclaimer. Passes 4.5:1 on linen and sand.
- **Line** (`line`): every hairline and border.

### Accents
- **Orange** (`orange`): primary buttons (hearth text, `orange-hover` on hover) and the next-district arrow. Never text.
- **Sky, lime, pink, lavender** (`sky`, `lime`, `pink`, `lavender`): fills only, with hearth text on top. Lime marks a sent form; all four color the map districts and placeholder imagery. Never text.
- **Gold** (`gold`): selection only: the selected district (outline, roundel, list row tint, active map tool), the current page, form focus, the tour route. Never text.
- **Lake-deep** (`lake-deep`): links (hearth on hover), the global focus ring, the King County chart bar.
- **Sage-deep** (`sage-deep`): the logo mark and the Chelan County chart bar. Never text.
- **Rose** (`rose`): form errors and large text accents only. The light lake, sage and blossom tokens were removed on Oct 25, 2026.

### Plan family fills
Districts are colored by land-use family, two shades per family, from `data/districts.json`: residential warm orange (`plan-residential`, `plan-residential-2`), senior-living lavender (`plan-senior`, `plan-senior-2`), commercial and hospitality soft pink (`plan-commercial`, `plan-commercial-2`), health and civic sky blue (`plan-civic`, `plan-civic-2`), parks and open space lime green (`plan-parks`, `plan-parks-2`). Vibrant family colors since Oct 25, 2026. Fills sit at `--plan-fill-opacity` 0.86. When one district is focused the rest dim to 0.32; the selected one gets a gold outline over a hearth keyline on the 2D plan.

### Named Rules
**The Fills-Not-Text Rule.** The vibrant colors are fills with hearth text on top, never text themselves. Gold marks the one selected thing on a screen.

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

The world is flat. Depth comes from tone (linen on sand), hairline rules, and fill opacity on the plan, where focusing a district lifts it by dimming everything else. Page surfaces, buttons, chips, the plan stage and lists carry no shadows.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 12px 40px rgb(59 47 42 / 0.18)`, backdrop `rgb(59 47 42 / 0.2)`): the source popover only, which sits in the top layer above a dimmed page. This is the single recorded exception.

### Named Rules
**The Flat Page Rule.** Nothing on the page plane casts a shadow. Lift is expressed by dimming the rest (plan), by surface tone (hovered row), or by a stronger stroke, never by elevation.

## Shapes

Nearly square, except buttons, which are fully rounded (Warm palette v1). Other rectangular elements use 2–4px corners: 3px for chips, tags and the segmented control frame, 2px for segments inside it and the focus ring, 4px for the popover. Circles are reserved for plan marks: roundels (r 15 in plan units, hearth 1.2 stroke; active is gold), the 32px legend markers (family-color border with a 3px inset ring), and the 44px divider handle (2px surface border). Lines are hairlines: 1px rules everywhere, non-scaling 1px strokes on the plan, 2px for the divider line and focused district.

## Components

### Buttons
Quiet, rounded, confident (`components/site/buttons.ts`).
- **Shape:** fully rounded.
- **Primary:** orange with hearth text, semibold. Hover deepens to `orange-hover` over 150ms.
- **Secondary:** transparent with a 1.5px hearth border and hearth text; sand on hover. On a photo or video (`onPhoto`): white border and white text.
- **Focus:** the global ring: 2px lake-deep outline, 3px offset.

### Segmented control (Today / Compare / Planned)
- **Style:** 1px rule frame, 3px corners, 4px inner padding; segments 36px tall, 14px padding, muted text.
- **State:** pressed segment fills hearth with linen text; hover darkens text to hearth over 150ms.

### Chips (Source chip)
- **Style:** linen fill, 1px line border, 3px corners, 24px minimum height, mono 11px muted text reading `Source label · note`.
- **State:** hover darkens the border to muted and the text to hearth. Opens a native popover: linen, 1px line border, 4px corners, 20px padding, serif 20px source title, a date / geography definition list (no confidence tier on public pages), method note, and a ruled Close button. The popover carries the Overlay shadow.

### Lists (in place of cards)
- **Doorway list:** a strong hearth top rule, line hairlines between rows, 28px row padding; serif title, muted description, arrow that turns lake-deep and nudges 4px right on hover. The whole row is the link.
- **District list:** rule top and row hairlines, a 32px numbered family-color marker, serif name, mono family label, summary, fact line, source chip. Hover or focus tints the row with linen and lifts the matching district on the sticky plan beside it.

### Navigation
- **Header:** linen ground with a line bottom border. Main links are 15px hearth, lake-deep on hover; the current page has a 2px gold underline at 0.5em offset. The compact primary button closes the row.
- **Mobile:** a 44px menu button opens a full-width ruled list of serif 22px links and a primary button. Escape and route changes close it.
- **Footer:** sand ground, hearth wordmark and links (lake-deep on hover), a line rule, then a mono legal line in muted carrying the plan disclaimer.

### Plan stage (Today / Planned)
The signature component. A linen stage with a 1px line border and a faint line-colored survey grid. Today (left) shows the site perimeter in hearth at 55% and existing uses at low fill with mono labels on linen tags. Planned (right) is clipped by the divider and shows the ten districts in family fills with numbered roundels. A 2px gold divider with a 44px gold handle (hearth chevrons) splits them. The handle is a keyboard slider (arrow keys step 5, Shift 20, Home/End, PageUp/PageDown) and a pointer drag; the segmented control jumps to 100 / 50 / 0. Hovering a district dims the rest and shows a linen map tag with its zero-padded number and name. Mono corner labels, a north arrow, and the mono disclaimer beneath are always present.

**Motion:** on first paint the perimeter draws (900ms), existing labels fade in (400ms at 600ms), then the divider sweeps from the right edge to its 50% rest (1600ms after a 900ms delay) while each roundel pops in (320ms, scale 0.4 to 1) at the moment the divider uncovers it. If the stage first appears below the fold, the intro replays when it scrolls half into view. Button jumps animate the divider over 600ms; dragging is immediate. Hover state changes take 150–200ms. Everything uses `cubic-bezier(0.22, 1, 0.36, 1)`.

**Reduced motion:** no intro at all; the outline is drawn, the divider rests at 50%, and all transitions collapse to 0.01ms globally.

## Do's and Don'ts

### Do:
- **Do** pair one orange primary button with one secondary (outlined) button or lake-deep text link for every call to action.
- **Do** set every figure beside a mono source chip, and every plan or map beside the line "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."
- **Do** give every district its number, name and family color together, and give every plan an HTML list equivalent.
- **Do** separate sections with 96–144px of space and, at most, one 1px rule.
- **Do** use `cubic-bezier(0.22, 1, 0.36, 1)` for every transition: 150–200ms for interface states, 600ms or more for spatial moves on the plan.
- **Do** keep gold to selection: the chosen district, the current page, the divider, form focus.
- **Do** use tokens, not literals, and check 4.5:1 for every new text pair.

### Don't:
- **Don't** put a shadow on anything on the page plane; only a top-layer popover may carry the Overlay shadow.
- **Don't** build card grids as the main device; use ruled lists.
- **Don't** set gold, sage-deep or any vibrant fill (sky, lime, orange, pink, lavender) as text, or rose as body text. Don't put white text on a vibrant fill.
- **Don't** use a dark section background anywhere.
- **Don't** identify a district by color alone.
- **Don't** add looping animation, parallax, count-up statistics or smooth-scroll libraries.
- **Don't** put mono uppercase eyebrows or kickers above headlines.
- **Don't** let vibrant fills replace the linen and sand grounds; keep rose rare.
