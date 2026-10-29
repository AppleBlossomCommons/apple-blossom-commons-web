# 02 — Sitemap v0 (approved October 16, 2026)

The owner and Andy approved this as the starting structure. Page layouts and final copy are still open, and are proposed and approved page by page during the build. Source doc: "ABC Website — Sitemap v0" (Claude Doc).

## Page tree

```
/                          Home: vision in one screen + audience doorways
├── /plan                  The Plan: Plan Table explorer (2D map + 3D model toggle)
├── /districts/[slug]      District page: one shared template, ten pages (no index page, see below)
├── /connected-community   Healthcare + technology + retirement living story
├── /tour                  Virtual Site Tour (16 verified tours)
├── /chelan                Chelan & the Region
├── /about                 Stewardship: who Chelan Village, LP is and how it plans
├── /research              Research Library: public summaries only
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

## District slugs (legend order)

`wine-village`, `wellness-district`, `orchard-grove`, `heritage-grove`, `apple-blossom-residence`, `harvest-crossing`, `summit-recreation-park`, `discovery-commons`, `orchard-preserve`, `grand-orchard-hotel`

## Page purposes

| Page | Purpose | Primary audience | Key content | Tier |
|---|---|---|---|---|
| Home | Vision in one screen; route each audience | All | Core story, Plan Table preview, audience doorways (investors, land buyers; "For neighbors" comes with the participate page) | Public |
| The Plan | Explore the whole site | All | Plan Table: 2D map plus 3D model toggle from the geometry file; the 10 districts in legend order; "evolves over decades" in place of phasing dates | Public |
| District page (×10) | One district in depth | Varies | Role in the community, what's planned, map highlight, neighbors, related research, "see this from the road" tour clips (later) | Public |
| Connected Community | The healthcare + technology story | Investors, operators, neighbors | Hospital campus facts (Lake Chelan Health named only as a neighbor), technology as support for care, precedent places (precedent, not promise) | Public |
| Site Tour | Remote site visit | Investors, land buyers | Virtual Site Tour (see `06-virtual-site-tour.md`) | Public |
| Chelan & the Region | Why Chelan, why this corridor | All | Location, access, Western WA relocation pattern, tourism, strengthening Downtown | Public |
| Stewardship (About) | Who plans this and how | All | Planning philosophy, Center vs Commons, partnership model | Public |
| Research Library | Public research summaries | Investors, neighbors | The five public summaries in `03-content-and-tiers.md`; full reports via Partner Access | Public summaries |
| Partner with Us | Turn interest into a conversation | Investors, operators, land buyers | One section per partner type + "Become a Partner" button → inquiry form | Public |
| Partner Access | Gated material | Approved partners | Invite-only data room (see `07-partners-and-data-room.md`) | Gated |
| Contact, Privacy, Terms | Basics | All | Contact form; policies needed once forms and video hosting exist | Public |

## Audience paths

| Audience | Doorway on Home | Path | Ends at |
|---|---|---|---|
| Investors | "Investment perspective" | The Plan → Connected Community → Research Library | Become a Partner |
| Strategic land buyers | "Development opportunities" | Districts menu (or the map on The Plan) → District page → Site Tour | Become a Partner |

## Deliberately left out of v1

- News / Updates page (to be added once updates arrive regularly)
- Phasing page or phase dates
- Any chatbot (a future "Yogi" assistant is being scoped separately)
