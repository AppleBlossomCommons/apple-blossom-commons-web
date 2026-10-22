# Apple Blossom Commons — Website

The public website for Apple Blossom Commons, a generational, mixed-use master-planned community on about 160 acres in Chelan, Washington. Chelan Village, LP is the long-term steward and master planner. This repo is the site build. Research and content decisions are made separately (in Claude Cowork) and arrive here as the files under `docs/` and `data/`.

Read `docs/01-project-brief.md` before the first task in any session. Read the other `docs/` files when a task touches their topic.

## Who you are working with

- The owner is new to web development and treats this as a learning project. Explain what you are doing in plain language, one step at a time. Show the result (run the dev server, share the URL or a screenshot) before moving on.
- **Get approval before building major features.** Propose the approach, wait for a yes, then build. Small fixes don't need approval.
- Andy (Chelan Village) and the owner approve what is public, gated or private. Never publish research content that isn't listed as public in `docs/03-content-and-tiers.md`.

## Stack (decided)

- Next.js (App Router) + React + TypeScript + Tailwind CSS. Deploy target: Vercel.
- 3D: three.js through React Three Fiber (`@react-three/fiber`) and Drei (`@react-three/drei`). R3F v9 pairs with React 19. Check current stable versions when installing; don't guess versions from memory.
- Fonts through `next/font`: Source Serif 4, Inter, IBM Plex Mono.
- Partner Access (later phase): a managed sign-in service. Never hand-written authentication or file-security code.
- Use pnpm or npm, whichever is set up first, and stay consistent.

## Non-negotiable rules

1. **Names.** The public name is "Apple Blossom Commons". "Apple Blossom Center" is the land and planning platform, not a second project. The organization is "Chelan Village, LP". Never "ABC" in public copy.
2. **Tone.** Institutional, disciplined, forward-looking: a master-planning organization, not a salesperson. No hype, no "luxury", no "world-class", no exclamation marks. Growth is always described as evolving over decades, in phases.
3. **Honesty in copy:**
   - Unit counts and square footage are "planning concepts", never commitments.
   - Say "designed to be walkable", never "walkable" (Walk Score today is 23).
   - Never imply utility capacity is solved. It has not been assessed.
   - Discovery Commons is an aspiration, not a commitment.
   - The 3D model and maps are "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."
   - Lake Chelan Health is not called a "partner" until they agree to be named.
   - Technology is presented as supporting residents and care staff, never as replacing human care.
4. **One source for each piece of data.** District facts live in `data/districts.json` and geometry in `data/district-geometry-v1.json`. Pages read from these files. Never type figures into page components.
5. **Every number carries a source** in `data/sources.json` (the Evidence Margin pattern, see `docs/04-design-direction.md`). On public pages, sources show only on Research Library pages and in footnotes (see the public copy rules below).
6. **Accessibility is part of "done":** keyboard navigation, visible focus, alt text, 4.5:1 text contrast, `prefers-reduced-motion` respected, and every 3D or map view has an HTML equivalent.
7. **Never commit secrets.** Keys go in `.env.local`, which is git-ignored.

## Public copy rules (owner decisions, 2026-10-22)
- Never name or address the City of Chelan, its Council or its staff anywhere on the site. Do not imply that the City is working with Chelan Village, LP.
- Call residents "neighbors" or "the Chelan community". Call approvals "the public review process" or "public hearings".
- Do not cite or claim alignment with the Comprehensive Plan. Describe the ideas directly (walkability, aging in place, Firewise design).
- Name Lake Chelan Health only as a neighbor ("a short walk from the hospital campus"). Never call it a partner.
- Do not use "public agencies" as an audience or partner type.
- Public pages show no confidence labels, source tags or placeholders like [SOURCE TO CONFIRM]. Sources belong on Research Library pages and in footnotes.
- Do not show crowds, traffic or busy scenes. Avoid "growth corridor", "density" and unit or acreage counts in hero copy.

## Where things are

| Path | What it is |
|---|---|
| `docs/01-project-brief.md` | Who the site is for, the core story, vocabulary |
| `docs/02-sitemap.md` | Approved sitemap v0 (Oct 16, 2026) |
| `docs/03-content-and-tiers.md` | District facts, what's public, gated or never published, copy guardrails |
| `docs/04-design-direction.md` | "Orchard Atlas": color tokens, type, layout, motion, maps |
| `docs/05-3d-district-model.md` | How the 3D prototype works and how to port it to R3F |
| `docs/06-virtual-site-tour.md` | The existing tour app and how to integrate it |
| `docs/07-partners-and-data-room.md` | Become a Partner form and the Partner Access data room |
| `docs/08-build-plan.md` | Phases, the first build target, definition of done |
| `docs/09-open-items.md` | Unresolved facts. Check here before stating a contested figure |
| `data/` | `districts.json`, `district-geometry-v1.json` |
| `reference/` | The working 3D prototype (single HTML file) and the masterplan base image |

## Skills to use

- **emil-design-eng:** animation and interaction polish.
- **web-design-guidelines:** run it to review UI before calling a page done.
- **r3f-best-practices** (in `.claude/skills/`): any React Three Fiber work.
- **impeccable** and **ui-ux-pro-max** plugins, if installed: design critique and audits.

When the skills disagree with `docs/04-design-direction.md`, the design direction wins. In particular, motion explains space and never decorates.

## Working conventions

- Small commits with clear messages. One feature per branch once the repo is on GitHub.
- Run lint, type-check and build before saying a task is finished.
- When something in `docs/` looks wrong or out of date, say so. Don't silently work around it.
