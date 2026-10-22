# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Decided before init (see `CLAUDE.md`): Next.js App Router, React, TypeScript, Tailwind CSS, deployed on Vercel. 3D through React Three Fiber and Drei. Fonts through `next/font`. Partner Access will use a managed sign-in service, never hand-written authentication. The app is not scaffolded yet (Phase 0 in `docs/08-build-plan.md`).

## Users

The public website for Apple Blossom Commons, a generational, mixed-use, master-planned community on about 160 acres in Chelan, Washington.

**Whose trust comes first: neighbors and the Chelan community.** They need confidence that growth is phased, coordinated, evolves over decades, and supports historic Downtown Chelan. When audiences pull in different directions, a careful local reader's judgment is the bar: if a long-time neighbor would discount something as a sales pitch, it doesn't ship. (Updated Oct 22, 2026: the site does not name or address the City of Chelan; see the public copy rules in `CLAUDE.md`.)

Other primary audiences, each with its own doorway (see `docs/01-project-brief.md` and `docs/02-sitemap.md`):

- **Investors:** the demand thesis, the evidence behind it, and a path to the gated reports. They end at Become a Partner.
- **Strategic land buyers and developers:** which districts and parcels fit their product, plus frontage and adjacencies. They end at Become a Partner.
- **Operators and brand partners** (senior living, healthcare, hospitality, retail): how the community fits their model. They end at Become a Partner.

**Secondary audience: future residents**, for example people relocating from Western Washington who want to age in place. Some copy may keep them in mind. Nothing is offered or reserved: no sales language, interest lists, reservations or pricing.

## Product Purpose

The site explains a long-horizon plan honestly and turns serious interest into a conversation. It shows the community as a whole (ten districts on one platform, anchored by the existing hospital campus), the evidence behind it, and how Chelan Village, LP plans and stewards it.

Success means:

- City reviewers find it credible and aligned with their plans.
- Qualified investors, land buyers and operators submit a partner inquiry.
- Approved partners can reach gated material (in a later phase).

## Positioning

Chelan Village, LP is the long-term steward and master planner, not a lot seller or a conventional developer. It sets the framework that builders, operators, healthcare providers and investors work within.

The core story is a community where a strong medical system, technology and retirement living come together. It is planned around the existing Lake Chelan Community Hospital campus, inside a full mixed-use community for all stages of life, and is meant to strengthen Downtown Chelan rather than compete with it.

## Operating Context

- Research and content decisions are made outside this repo (Cowork) and arrive as files under `docs/` and `data/`. Content approvals come from the owner and Andy (Chelan Village).
- City staff will read the site as part of a planning review. Investors and partners will read it alongside gated reports in the Partner Access data room.
- Visitors make "site visits" remotely through the Virtual Site Tour (16 verified drive and walk clips synced to a map).

## Capabilities and Constraints

- Sitemap v0 was approved Oct 16, 2026 (`docs/02-sitemap.md`). The News page, phasing page or phase dates, and any chatbot are deliberately left out of v1.
- Signature features: the Plan Table district explorer (2D SVG by default, 3D optional) and the Evidence Margin (a source chip on every figure, backed by one source registry).
- One source for each piece of data: district facts are in `data/districts.json` and geometry in `data/district-geometry-v1.json`. Page components never contain hand-typed figures.
- Content tiers (public, gated, hold, never published) are in `docs/03-content-and-tiers.md`. Nothing outside the public tier appears on a public page.
- The partner inquiry is called an inquiry, never an "application". Its types: Investor · Operator or brand partner · Strategic land buyer or developer · Community organization · Other.
- Unresolved facts are in `docs/09-open-items.md`. Contested figures stay off public pages until the owner resolves them. Examples: the Heritage Grove count, the hotel key count, the Apple Blossom Residence apartment count, and the site-wide unit total.
- Undecided: the inquiry email recipients, the sign-in service and storage, the map tile provider, the video host and the analytics tool.

## Brand Commitments

- **Names.** The public name is "Apple Blossom Commons". "Apple Blossom Center" is the land and planning platform, not a second project. The organization is "Chelan Village, LP". Never "ABC" in public copy.
- **Voice.** Institutional, disciplined, forward-looking: a master-planning organization, not a salesperson. No hype, no "luxury", no "world-class", no exclamation marks. Growth evolves over decades, in phases.
- **Honesty rules:**
  - Unit counts and square footage are "planning concepts".
  - Write "designed to be walkable" (the Walk Score today is 23).
  - Never imply that utility capacity is solved.
  - Discovery Commons is an aspiration, not a commitment.
  - Lake Chelan Health is not called a partner until they agree to be named.
  - Technology supports residents and care staff and never replaces human care.
  - Comparable communities are precedent, not promise.
  - Migration data shows a pattern, not proof.
- **Required label** on every map or model: "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."
- No logo exists. A typographic placeholder wordmark is used, marked temporary.
- The visual direction "Orchard Atlas" was approved Oct 14–15, 2026, in `docs/04-design-direction.md`. It is the visual authority until a DESIGN.md records it.

## Evidence on Hand

- District facts and planning-concept figures: `data/districts.json` (from the July 2026 masterplan by jeffrey mak: architect ltd, and the Aug 25, 2026 plan stats workbook).
- District outlines: `data/district-geometry-v1.json`, traced from a screenshot, so illustrative only.
- A working 3D prototype: `reference/3d-district-model-prototype.html`. The masterplan base image: `reference/districts-sheet-greyscale.jpg`.
- The Virtual Site Tour app and footage are outside this repo (see `docs/06-virtual-site-tour.md`).
- Public research: five summaries (text still to come from the owner) and the BERK Chelan County Tourism Impact Study (Feb 2026).
- **Absent, not to be fabricated:** photography, drone imagery, renderings, logo, testimonials, named partners, phase dates, pricing, a site-wide unit total, vector or GIS boundaries, and utility capacity findings.
- Never reproduce masterplan sheets directly. Some contain unrelated projects and listings.

## Product Principles

1. **Credibility over persuasion.** Every claim should survive a careful local reader. Restraint is the persuasive move.
2. **Show the evidence.** Every number has a source, date and confidence recorded in `data/sources.json`. Public pages show sources on Research Library pages and in footnotes, not as confidence labels or tags. Uncertainty is stated in plain words, not hidden.
3. **Plan, not promise.** Describe intentions as planning concepts that evolve over decades, never as commitments or dates.
4. **One community, one platform.** The ten districts, the hospital campus and Downtown Chelan are presented as parts of a whole, not as separate products.
5. **Route each reader to a conversation.** Each audience has a clear path that ends at Contact or Become a Partner.

## Accessibility & Inclusion

Target: **WCAG 2.2 AA**. Project-specific requirements:

- Keyboard navigation and visible focus.
- 4.5:1 text contrast.
- `prefers-reduced-motion` respected: maps and cameras jump instead of flying, and video never autoplays.
- Alt text.
- Every 3D or map view has an HTML equivalent.
- Districts are told apart by numbered roundels and names, never by color alone.

The secondary audience, future residents, includes people planning to age in place, so readable body text and generously sized targets matter.
