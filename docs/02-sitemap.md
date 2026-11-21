# 02 — Sitemap v0 (approved October 16, 2026)

The owner and Andy approved this as the starting structure. Page layouts and final copy are still open, and are proposed and approved page by page during the build. Source doc: "ABC Website — Sitemap v0" (Claude Doc).

## Page tree

```
/                          Home: vision in one screen + audience doorways
├── /plan                  The Plan: overview, with the Plan Table explorer (2D map + 3D model toggle)
│   ├── /plan/living-and-care       Life Plan Community, Heritage Grove (summary), care and technology
│   └── /plan/village-and-outdoors  The village, walking, parks and trails, Why Chelan
├── /districts/[slug]      District page: one shared template, ten pages (no index page, see below)
├── /tour                  Virtual Site Tour (16 verified tours)
├── /about                 Stewardship: who Chelan Village, LP is and how it plans
├── /research              Research Library: public summaries only
│   └── /research/[slug]   Report summary page, one per report (docs/15)
├── /partners              Partner with Us: "Become a Partner" → inquiry form
│   └── /partners/access   Partner Access: invite-only login data room (GATED, later phase)
├── /contact
├── /privacy
└── /terms
```

**Header:** The Plan · Districts · Connected Community · Site Tour · Chelan & the Region · Stewardship.
**Header utility links:** Research Library · Partner with Us.

*Updated Oct 22, 2026 to follow the owner's public copy rules (see `CLAUDE.md`).* The Planning Framework page (`/planning`) was removed and redirects permanently to `/`.

*Updated Oct 28, 2026 (owner decision):* there is no Districts index page. "Districts" in the header opens a menu listing the ten district pages in legend order, plus "See all districts on the map". `/districts` redirects permanently to the district model on The Plan (`/plan#explore`), and the footer's "Districts" link goes there too. The Plan already shows all ten districts together.
**Footer:** Contact · Privacy · Terms, plus the illustrative-plan disclaimer.

*Updated Nov 15, 2026 (`docs/15-research-library-content.md`):* the Research Library is built at `/research`, with one summary page per report at `/research/[slug]` (`growing-older-by-the-lake`, `care-close-by`, `learning-from-others`, `village-economy`). It is reached from the footer and from "Read the research" links on The Plan, four district pages, Partner with Us, the FAQs and About Us; it is not in the main nav yet (commented-out entry in `components/site/nav.ts`). Report PDFs download from `/downloads/research/`. Reports marked `"draft"` in `data/research.json` show only on preview deployments and local dev, never on production.

*Updated Nov 19, 2026 (owner decision; Andy's sign-off still to be recorded): The Plan was split into three pages.* It had grown to about 19 screens on desktop after `docs/10` folded Connected Community and Chelan & the Region into it and `docs/14` added three sections.

- `/plan` is the overview: hero, intro, A different kind of retirement (each pillar links to its section on Living and care), the 3D/2D explorer, How it fits together, What guides the plan, and two doorway cards to the story pages. About 7 screens.
- `/plan/living-and-care`: What is a Life Plan Community?, Heritage Grove, Care close by (with Technology that supports people).
- `/plan/village-and-outdoors`: The village at the center, A neighborhood designed for walking, Parks trails and open space, Why Chelan.
- Heritage Grove on Living and care is a short summary (intro, the place names, a link). The full place cards are on `/districts/heritage-grove`, which reads the same `places` from `data/districts.json`.
- All three pages share a bar under the hero: the three pages as tabs, then an "On this page" jump list (`components/plan/PlanPageNav.tsx`).
- "The Plan" in the header is now a menu of the three pages, like Districts. The footer's Explore column lists all three.
- Redirects: `/connected-community` → `/plan/living-and-care#care-close-by`, `/chelan` → `/plan/village-and-outdoors#why-chelan`. Old in-page links such as `/plan#village` are forwarded in the browser by `components/plan/MovedSections.tsx`, since the part after `#` never reaches the server.
- The two new heroes, the doorway cards and the menu descriptions are new short copy written in the build, not from a content pack. They need a read by the owner and Andy.

**Current header (supersedes the Oct 16 header line above):** The Plan (menu) · Districts (menu) · Site Tour · How Can I Participate? · About Us, with Partner with Us as the button. Source of truth: `components/site/nav.ts`.

## District slugs (legend order)

`wine-village`, `wellness-district`, `orchard-grove`, `heritage-grove`, `apple-blossom-residence`, `harvest-crossing`, `summit-recreation-park`, `discovery-commons`, `orchard-preserve`, `grand-orchard-hotel`

## Page purposes

| Page | Purpose | Primary audience | Key content | Tier |
|---|---|---|---|---|
| Home | Vision in one screen; route each audience | All | Core story, Plan Table preview, audience doorways (investors, land buyers; "For neighbors" comes with the participate page) | Public |
| The Plan (overview) | Explore the whole site | All | The idea, Plan Table (2D map plus 3D model toggle from the geometry file; the 10 districts in legend order), how it fits together, what guides the plan; "evolves over decades" in place of phasing dates | Public |
| Living and care | The retirement, care and technology story (was Connected Community) | Future residents and families, operators, investors | Life Plan Community, Heritage Grove summary, care close by, technology that supports people | Public |
| Village and outdoors | Daily life and the setting (was Chelan & the Region) | All | The village, walking, parks and trails, why Chelan | Public |
| District page (×10) | One district in depth | Varies | Role in the community, what's planned, map highlight, neighbors, related research, "see this from the road" tour clips (later) | Public |
| Site Tour | Remote site visit | Investors, land buyers | Virtual Site Tour (see `06-virtual-site-tour.md`) | Public |
| Stewardship (About) | Who plans this and how | All | Planning philosophy, Center vs Commons, partnership model | Public |
| Research Library | Public research summaries | Investors, neighbors | Report cards, how the reports are made, reports on the way (`docs/15`); full reports via Partner Access | Public summaries |
| Report page (×4 so far) | One report's web summary | Investors, neighbors, future residents | Key findings, charts, how Apple Blossom Commons responds, notes for each reader, sources, PDF download (`docs/15`, section 4) | Public once published |
| Partner with Us | Turn interest into a conversation | Investors, operators, land buyers | One section per partner type + "Become a Partner" button → inquiry form | Public |
| Partner Access | Gated material | Approved partners | Invite-only data room (see `07-partners-and-data-room.md`) | Gated |
| Contact, Privacy, Terms | Basics | All | Contact form; policies needed once forms and video hosting exist | Public |

## Audience paths

| Audience | Doorway on Home | Path | Ends at |
|---|---|---|---|
| Investors | "Investment perspective" | The Plan → Living and care → Research Library | Become a Partner |
| Strategic land buyers | "Development opportunities" | Districts menu (or the map on The Plan) → District page → Site Tour | Become a Partner |

## Deliberately left out of v1

- News / Updates page (to be added once updates arrive regularly)
- Phasing page or phase dates
- Any chatbot (a future "Yogi" assistant is being scoped separately)
