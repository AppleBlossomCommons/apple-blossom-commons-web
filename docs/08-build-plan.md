# 08 — Build plan

*Proposed Oct 16, 2026. The owner approves each phase before it starts. Planning steps 1–3 (asset audit, creative direction, sitemap) are done. The homepage design, the technical architecture and the roadmap details are decided in this repo, with the owner.*

## Phase 0: Set up (first session)

1. Confirm the tools are installed (Node.js LTS, git) and explain each one in plain terms.
2. Create the Next.js app (App Router, TypeScript, Tailwind, ESLint) **in this folder**, keeping `CLAUDE.md`, `docs/`, `data/` and `reference/` where they are.
3. Add the design tokens from `04-design-direction.md` as Tailwind theme values and CSS variables, plus the three fonts through `next/font`.
4. Create empty routes for every page in `02-sitemap.md`, with a shared header, footer and the illustrative-plan disclaimer.
5. Put the project on GitHub (private repo) and explain commits and branches.
6. **Show the owner the running site locally** and stop for review.

## Phase 1: Foundations and the Plan Table

1. A **typographic placeholder wordmark**, marked temporary.
2. `data/districts.json` → typed loader; `data/sources.json` → the Evidence Margin chip component.
3. **The 2D Plan Table** (SVG) from `district-geometry-v1.json`: roundels, hover and focus, selection synced to the URL, and an accessible district list.
4. **Districts index** and the **district page template**, all ten generated from data.
5. Review with web-design-guidelines and the Impeccable audit, if installed. **Stop for approval.**

## Phase 2: Story pages

Home (with the audience doorways), Connected Community, Chelan & the Region, Stewardship, Research Library (content files), Contact. The owner supplies or approves the copy for each page; draft copy follows the rules in `03-content-and-tiers.md`. One page at a time, each one approved.

## Phase 3: 3D model and tour

1. Port the 3D district model to React Three Fiber as an optional view inside the Plan Table (`05-3d-district-model.md`).
2. Integrate the Virtual Site Tour on `/tour` as an iframe app, restyled, with dev paths removed (`06-virtual-site-tour.md`). Settle video hosting and map tiles with the owner first.

## Phase 4: Partners

1. Partner with Us page and the inquiry form (`07-partners-and-data-room.md`).
2. Partner Access data room, after the owner picks the sign-in service and storage.

## Phase 5: Launch readiness

Performance (Lighthouse on mobile), an accessibility pass, SEO metadata and social cards, privacy and terms pages, analytics (ask the owner which tool, privacy-respecting), Vercel deployment and domain, and the content tier check: nothing gated or never-published on a public page.

## Definition of done (every task)

- Builds, lints and type-checks clean.
- Works at 375px wide and on desktop. No horizontal scroll.
- Keyboard-usable, with visible focus, and reduced motion respected.
- Copy follows `03-content-and-tiers.md`, and every figure has a source chip.
- The owner has seen it running.
