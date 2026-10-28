# 03 — Content, tiers and guardrails

*As of October 16, 2026; district facts updated October 28, 2026 from the Plan and districts content pack (`11-plan-and-districts-content.md`). All content decisions are made by the owner or Andy. If a needed fact isn't here, ask; don't invent it.*

## Content tiers

| Tier | Meaning | Items |
|---|---|---|
| **Public** | May appear on any page | District descriptions and planning-concept figures; Connected Community narrative; Virtual Site Tour; BERK tourism figures; the five public research summaries below |
| **Gated** | Partner Access data room only | Income & Affordability report; Competitive Supply Analysis (names local operators; pricing goes stale); Tenant Feasibility Study (hypothetical P&Ls); full Healthcare Partnership Framework; other full reports the owner or Andy release |
| **Hold** | Not on the site yet | Consumption & Spend study (being rebuilt as v6) |
| **Never published** | Nowhere on the site, not even gated | JLL appraisal VA-23-254063 and its values (internal use only); Operator/JV target list (names outreach targets) |

## Public research summaries at launch

Each needs a data-currency check before publishing: flag data more than three years old. Each figure needs a source, date and confidence tier, recorded in `data/sources.json`. Public pages show sources only on Research Library pages and in footnotes, never as confidence labels or source tags (public copy rules in `CLAUDE.md`, Oct 22, 2026). The owner provides the summary text. Build the Research Library to read summaries from content files, one file per summary, so they can be added without code changes.

1. **Regional Economic Base:** Chelan County's economy and employment, from public government data. Caveat: some employer data is from 2015–2017 and must be flagged or replaced.
2. **Who is moving to Chelan:** combines the Feeder Market Comparison, the age-verified migration study and the Eastern WA feeder expansion. Headline finding: King County's 65–69 age group had net migration of −10.50%, while Chelan County's was +11.95% (2010–2020), rated Moderate confidence. Required caveat: no dataset links age to a named origin, so this shows a pattern, not a proven flow.
3. **Senior Demographic Profile:** 65+ population growth across the trade area (ACS / WA OFM).
4. **Connected Community vision:** the healthcare and technology story (guardrails below).
5. **Comparable communities:** precedent case studies, presented as precedent, not promise. An honest finding to keep: no precedent combines Orchard Grove's full mix on one campus.

Also public, for `/chelan`: BERK Chelan County Tourism Impact Study (Feb 2026), $675.5M visitor spending and 2.6M overnight visitors in 2024. Cite the study.

## District facts

Source: July 2026 masterplan (jeffrey mak: architect ltd) and the Aug 25, 2026 plan stats workbook. Machine-readable copy: `data/districts.json`. Everything is a **planning concept**.

**What is public:** each district's `summary`, `publicFacts` and `places` in `data/districts.json` (reviewed in the Oct 28, 2026 content pack). The table below is the reference behind them. Anything marked *internal* stays off public pages, and `internalNotes` never reaches a page.

| # | District | Code | Family | Program | Planning figures | Status |
|---|---|---|---|---|---|---|
| 1 | Chelan Wine Village | WINE | Commercial & hospitality | Tasting rooms, cafés, restaurants and shops along Vintner's Walk; Harvest Square (main plaza), The Tasting Courtyard, Market Hall, The Barrel House; smaller neighborhood shops; Retail High Street spine | 188,900 sf commercial · ~21 apartments | Verified |
| 2 | Wellness District | WELL | Health & civic | Medical uses next to the hospital campus: clinics, physical therapy and rehabilitation; medical assisted living; two new 12,000 sf buildings | 24,000 sf new | Part of Apple Blossom Commons. Rehabilitation confirmed by the masterplan's Wellness sheet. *Internal:* the hospital belongs to Lake Chelan Health (name it only as a neighbor, "the hospital campus"); Columbia Valley Community Health is on the campus; medical assisted living is on parcel "Lot 17". None of these are public facts |
| 3 | Orchard Grove | ORCH | Senior living | Cottage homes, townhomes and apartments for active adults who want to age in place; recreation center with gardens, tennis courts, a walking track and an event hall; everyday-life services being explored | 63 cottages · 30 townhomes · ~23 apartments (~116 units) | Verified. "55+" wording undecided (`09-open-items.md`). Masterplan's "affordable senior housing" is "senior townhomes" until confirmed. Don't use the Life Plan promises on fees or priority care |
| 4 | Heritage Grove | HERIT | Senior living | Independent living, assisted living, memory care, nursing; garden courtyards; two shared clubhouses | 335,000 sf | Unit/bed count unresolved: don't publish a count |
| 5 | Apple Blossom Residence | ABR | Residential | Market-rate apartments, townhomes and detached homes; green buffers along Chelan Falls Road and Apple Blossom Drive; not senior housing | 64 townhomes · 37 duplex/single-family | Apartment count under review: don't publish a total |
| 6 | Harvest Crossing | HARV | Residential | Homes for people who work in Chelan (studio and one-bedroom apartments) near the village's shops and services; live-work zone | 200 apartments (working figure) · 32 townhomes | Working figure approved for public use. Don't call it "affordable" (no pricing claims) |
| 7 | Summit Recreation Park | SUMMIT | Parks & open space | Sports fields (existing), seasonal roller/ice rink, children's discovery park, pond, vineyard hiking trail; two parts, north and south | — | Verified |
| 8 | Discovery Commons | DISC | Health & civic | Potential K-12 school, community center, library | 150,000 sf concept | **Aspirational, not a commitment.** Always say so |
| 9 | Orchard Preserve | PRES | Parks & open space | Open space, nature trail, scenic overlook at the site's highest point, bike and walking trails, RV park and campground (concept) | — | Verified |
| 10 | Grand Orchard Hotel | HOTEL | Commercial & hospitality | Cottage-style hotel for families with event space at the village edge; self-serve shop (concept) | Cottage count unresolved · 3-storey hotel apartments (30,000 sf) | Key count unresolved: 65 cottages (masterplan text) vs 115 keys (stats); possibly 65 cottages + ~50 apartments. Don't publish any count |

Site-wide unit totals disagree across sources (~986 to ~1,121). **Don't publish a site-wide unit total.** About 160 acres is stated once, with its source.

## Guardrails for the Connected Community story

- **Lead with what can be verified.** The hospital campus and Columbia Valley Community Health sit inside the Wellness District. Lake Chelan Health's January 2026 board letter documents a new cardiology line, three specialty physicians, expanded Express Care and a hospitalist program. The EMS/Admin building ($12M over two legislative sessions, Fall 2026) is publicly documented. Confirm with the owner that each source is current before publishing.
- **Leave out unsourced figures**, such as about 2,800 visits and a referral trend.
- **Describe the relationship as it stands.** The community is planned around the hospital campus. Lake Chelan Health is not called a partner until they agree to be named, and they see the copy before launch.
- **Technology is presented as concepts being explored**, which support independence, safety and care staff and never replace human care. Data governance and consent come before any build.
- **Precedent, not promise.** Lake Nona, Babcock Ranch with Lee Health, Mercy Virtual and Blue Zones (Albert Lea) show what others have done, not what will happen here.

## Copy rules (repeat of the CLAUDE.md rules, with examples)

| Write | Not |
|---|---|
| "designed to be walkable" | "walkable" |
| "cottage-style rooms for families (planning concept)" | "65 luxury cottages" |
| "a lane designed for walking" | "a walkable lane" |
| "Discovery Commons is an aspiration for lifelong learning" | "a new K-12 school" |
| "utility capacity assessment is underway" (only if true; otherwise "pending") | "infrastructure-ready" |
| "a short walk from the hospital campus" | "in partnership with Lake Chelan Health" |
| "evolves over decades" | "opening 2028" |

## Masterplan sheets: don't publish unedited

Some masterplan sheets include unrelated content: a "Bellissimo" 400+ unit project block, a Kidder Mathews retail listing, 103 Golden Ave, Walmart visit counts, a retail parking table and a phasing diagram. Never reproduce masterplan pages directly. The masterplan's mood images are art direction only, not for the site. What was left out on purpose, and why, is listed in `11-plan-and-districts-content.md`, section 4.
