# 11 — The Plan page and district pages (content pack v1)

*Prepared in Cowork, 2026-10-28, from the July 2026 masterplan (jeffrey mak: architect ltd). Put this file in the repo as `docs/11-plan-and-districts-content.md`. It adds to `docs/10-content-v2.md`. Where the two conflict, this file wins for The Plan and district pages. Every line follows the public copy rules in `CLAUDE.md`.*

Words in [brackets] are notes for the builder, not copy.

---

## 0. Read this first (for Claude Code)

1. **Get approval before building.** This pack adds five sections to The Plan and one section to every district page, plus a new `places` field in `data/districts.json`. That's a major feature under `CLAUDE.md`. Play back the plan, propose the components, and wait for a yes.
2. **One source for the data.** The proposed replacement for `data/districts.json` is in `docs/11-districts-proposed.json`. After approval, replace `data/districts.json` with it, update the `District` type and mapping in `lib/districts.ts` to carry `places`, and delete the proposed file. `internalNotes` still never reaches a page.
3. **Shared text.** The village cards on The Plan read from `places` on the Wine Village entry. Don't type them into a component.
4. **Never work from the masterplan PDF itself.** The sheets are overlaid with unrelated material: a "Bellissimo" 400+ unit project, a Kidder Mathews lease listing, 103 Golden Ave, Walmart visit counts, a retail parking table and a phasing diagram. None of it is about Apple Blossom Commons. Everything usable is already in this pack (see section 4).
5. **Everything here is a concept.** Each district page and the new Plan sections carry the concept note in section 1.9.

---

## 1. The Plan (/plan)

**New page order:** Hero · Intro · 3D explorer · How it fits together · **A neighborhood designed for walking** · **The village at the center** · Care, close by *(expanded)* · **Parks, trails and open space** · **What guides the plan** · Why Chelan.

Keep the hero, intro, 3D explorer, How it fits together and Why Chelan as they are (copy in `docs/10-content-v2.md`). New and changed sections follow.

### 1.1 How it fits together [one wording change]
- In "Built in phases.", keep the text and add a jump link: **How the plan grows →** [→ #guiding-ideas]

### 1.2 A neighborhood designed for walking [id="walking"; new]
- **Heading:** A neighborhood designed for walking
- **Intro:** The plan puts everyday places close together. From the village center, most of the community is planned within about a 15-minute walk.
- **Items** [four short items, same style as How it fits together]:
  - **Five, ten, fifteen minutes.** Homes, shops, care and parks are arranged in rings around the village, so a coffee, a checkup or a trailhead is meant to be a short walk away.
  - **Lanes without cars.** Car-free lanes are planned to link the neighborhoods to one another. Slow, low-speed shuttles or carts could share them, so getting around stays easy for everyone. *(concept)*
  - **A main street to the hospital campus.** A shopping street is planned to run through the middle of the plan, from the northeast corner to the hospital campus.
  - **Trails all the way through.** Walking and bike trails are planned to connect every neighborhood, the parks and the village, with a hiking trail along the eastern edge.
- **Visual** [walk-ring diagram: three soft concentric rings centered on Harvest Square, drawn over the flat 2D plan. Label them "about 5 min", "about 10 min", "about 15 min". The radii are not confirmed with the architect (`docs/09-open-items.md`), so read them from one constant marked TBC, and put this caption under the diagram: "Walking times are approximate. Illustrative interpretation of the July 2026 masterplan." HTML equivalent: the four items above.]

### 1.3 The village at the center [id="village"; new]
- **Heading:** The village at the center
- **Intro:** Chelan Wine Village is planned as the heart of the community: a small village of tasting rooms, cafés and places to eat, laid out for people on foot. It's sized to add to downtown Chelan, not compete with it.
- **Cards** [five cards, each with a name, a line of text and an image slot (section 3). Read the names and text from the first five entries of `places` on the `wine` entry of `data/districts.json`: Harvest Square, Vintner's Walk, The Tasting Courtyard, Market Hall, The Barrel House. The sixth entry, "Neighborhood shops", appears on the district page only.]
- **Link:** Explore Chelan Wine Village → [/districts/wine-village]

### 1.4 Care, close by [id="care-close-by"; expanded]
Keep the heading, both paragraphs, "Technology that supports people" and the link from `docs/10-content-v2.md`. Add one paragraph after the first one:

- **New text:** Senior homes are planned around quiet courtyards, so residents have a protected garden for a short walk or a seat in the sun, right outside their door. Shared clubhouses are planned for the things that make a day good: a fitness room, a library, a place to have a meal or host family overnight. *(concept)*

[Name Lake Chelan Health only as a neighbor ("the hospital campus"). Don't name Columbia Valley Community Health on this page.]

### 1.5 Parks, trails and open space [id="outdoors"; new]
- **Heading:** Parks, trails and open space
- **Intro:** A large share of the land is planned to stay open: orchards, trails, play areas and a lookout at the top of the site.
- **Items** [three items with image slots]:
  - **Summit Recreation Park.** Sports fields, a playground, a small pond and a rink that could be roller skating in summer and ice skating in winter. *(concept)* → [/districts/summit-recreation-park]
  - **Orchard Preserve.** Open hillside with a nature trail and a scenic overlook at the highest point of the site, looking out over the town. → [/districts/orchard-preserve]
  - **Green edges.** Planted buffers are planned along the busier roads, so homes look out on green rather than traffic.

### 1.6 What guides the plan [id="guiding-ideas"; new]
- **Heading:** What guides the plan
- **Intro:** A few simple ideas shape every part of Apple Blossom Commons.
- **Items** [six items in a 3 × 2 grid; one column on phones]:
  - **Homes for people who live here.** The plan is meant first for people who call Chelan home all year, including local workers and families.
  - **Built for aging in place.** Level paths, shorter blocks, single-level homes and daily needs close by, so you can stay in your neighborhood as your needs change.
  - **Designed for walking.** Getting around on foot, inside the community and to the places nearby, is planned in from the start.
  - **Firewise from the start.** Site and building design follow Firewise principles, and emergency access is planned with the hillsides in mind.
  - **Sized for year-round life.** Roads, water and power are planned around the people who live here all year, not the busiest summer weekend. That work is still being studied.
  - **Growing at the right pace.** Each neighborhood comes when there's real demand for it. How many homes the land should hold will be settled through the public review process, not decided up front.

[Don't add a source line, a quote or any mention of a plan by the City (`CLAUDE.md`, public copy rules). These are presented as Chelan Village, LP's own ideas.]

### 1.7 Why Chelan
No change.

### 1.8 Metadata
- **Description:** A long-range plan near Lake Chelan: homes for every stage of life, a small village at the center, care close by, and parks and trails throughout, growing one neighborhood at a time.

### 1.9 Concept note [small text at the end of each new section that names places, and on every district page]
Names and places are ideas from the July 2026 masterplan. They're planning concepts and will change as the plan is refined.

---

## 2. District pages (/districts/[slug])

### 2.1 New section: What's planned here [new; between "At a glance" and "Next district"]
- **Heading:** What's planned here
- **Layout** [a list of cards from `places` in `data/districts.json`: name, then one or two lines of text. Two columns on desktop, one on phones. Add an image slot only where section 3 gives a brief. If a place's text ends with "(concept)", show that word in the muted style rather than in parentheses.]
- **Under the list:** the concept note from section 1.9.
- Discovery Commons only: show this line above the list, in the same style as the intro: **This is an aspiration, not a commitment.**

### 2.2 What changes in `data/districts.json`
The full proposed file is `docs/11-districts-proposed.json`. Summary of changes:

| District | Change | Why |
|---|---|---|
| All | New `places` array: `{ "name", "text" }` | Named places from the masterplan |
| Wine Village | Summary rewritten for plain voice; facts unchanged | — |
| Wellness District | Hospital and Columbia Valley no longer listed as district facts; "Lot 17" removed; summary keeps "rehabilitation" | Name the hospital only as a neighbor. "Lot 17" is a parcel number, not public language. The masterplan's Wellness sheet does list rehabilitation, which closes that open item |
| Orchard Grove | Facts add tennis courts and an event hall; promise language left out | The Life Plan bullets ("monthly fees will remain stable", "priority access to all levels of care") contradict the FAQ's "too early to say" |
| Heritage Grove | Facts unchanged; places add courtyards and the two clubhouses | — |
| Apple Blossom Residence | Facts add green buffers | — |
| Harvest Crossing | Facts add studios and one-bedrooms; "affordable" not used | No pricing claims |
| Summit Recreation Park | Facts add the seasonal rink and children's discovery park | — |
| Discovery Commons | No change to facts | Stays aspirational |
| Orchard Preserve | RV park marked as a concept | — |
| Grand Orchard Hotel | **"65 hotel cottages" removed from public facts** | The current file shows 65 publicly, but its own internal note says not to publish a count (65 vs 115 unresolved) |

---

## 3. Images for the new sections

**What's in the masterplan.** The masterplan's 15 pictures are mood images: Vintner's Walk, Harvest Square, the Barrel House, Market Hall, cottages, an age-in-place courtyard, an overlook bench and an aerial view of the village. **Don't use them on the site.** Most show people (AI images may not), four have titles baked in (one misspelled "Vitner's Walk"), two show busy patios, several look like stock photos of unknown origin, and the copies we have are thumbnails. They're useful as art direction only. Andy is asking the architect for the originals and their sources (section 5).

**Until then,** use the existing placeholder pattern (`PlaceholderImage` + `PlaceholderLabel`). The briefs below follow the imagery rules in `docs/10-content-v2.md`: no people in AI images, label "Illustrative concept", no crowds, traffic or real landmarks.

| Slot | Source | Brief (art direction from the masterplan renderings) |
|---|---|---|
| Harvest Square | AI, no people | A small town plaza at golden hour: a low round fountain, two fire pits with empty Adirondack chairs, wood-and-stone pavilions with deep eaves, native grasses, dry golden hills beyond |
| Vintner's Walk | AI, no people | A quiet pedestrian lane between low timber-and-stone storefronts, string lights, planters with lavender and grasses, café chairs set out but empty, early-morning light |
| The Tasting Courtyard | AI, no people | A small courtyard ringed by tasting-room doors, a long communal table with empty wine glasses, vines on a trellis overhead |
| Market Hall | AI, no people | An open-sided timber market hall with tall doors rolled up, produce crates and flowers on tables, soft late-afternoon light |
| The Barrel House | AI, no people | A warm industrial-rustic hall: stacked oak barrels, exposed timber trusses, big glass doors open to a terrace with fire pits |
| Care, close by (courtyard) | AI, no people | A sheltered garden courtyard between single-storey homes with porches, a looping level path, benches in the sun, a small fountain |
| Summit Recreation Park | Licensed stock | A quiet community park in the dry interior Northwest: green field, a small pond, hills behind; no crowds |
| Orchard Preserve | Licensed stock | A wooden bench on a dry hillside looking over a lake valley at sunset. Must not be an identifiable Lake Chelan landmark unless licensed as a photo of one |
| Walking (optional) | AI, no people | A wide, level car-free lane with low-speed carts parked at a rest spot, trees and benches, wayfinding sign with blank arrows |

**Prompt template** (as in `docs/10-content-v2.md`): "Photorealistic, [scene]. Pacific Northwest high-desert lake country, warm natural light, calm and quiet, shallow depth of field, soft film grain. No people, no animals, no text, no logos, no recognizable landmarks."

---

## 4. Left out of the masterplan on purpose

| Masterplan item | Why it isn't used |
|---|---|
| Bellissimo text, Kidder Mathews listing, 103 Golden Ave, Walmart visits, retail parking table, phasing diagram | Not about Apple Blossom Commons (base-sheet overlay) |
| Comprehensive Plan quote and "Key principles from the City" heading | Public copy rules: no citing the City or its plans. The ideas appear in our own words in section 1.6 |
| "Monthly fees will remain stable", "priority access to all levels of care" | Promises the FAQ says are too early to make |
| "Affordable senior housing" | A program term that implies income limits. Described as "a range of senior townhomes" until confirmed |
| Hotel "65 units" | Unresolved (65 vs 115) |
| "Lot 17" | Parcel number |
| Car and boat wash services | Small service use; adds nothing to the story. Add later if wanted |
| "Technology enhanced… automation" for the hotel | Reads as hype; the self-serve shop stays as a concept |
| "Convention center" | Implies a larger venue than planned; "event space" instead |
| "Vibrant", "thoughtfully curated", "safe space to enjoy wines responsibly" | Hype, or raises questions better left to later |

---

## 5. Open items this pack adds (copy into `docs/09-open-items.md`)

- **Resolved:** Wellness District "rehabilitation" is confirmed. The masterplan's Wellness sheet lists clinics, physiotherapists and rehabilitation centers.
- **Hotel count:** 65 cottages (masterplan text) vs 115 keys (stats). These may both be right if the 115 is 65 cottages plus about 50 hotel apartments. Confirm with the architect before publishing any count.
- **55+ wording:** the district data says "55+ cottage homes", but the FAQ answers "Is senior living 55+?" with "too early to say". Owner to pick one.
- **"Affordable senior housing"** in Orchard Grove: is it meant as income-restricted housing? Until answered, it's "a range of senior townhomes".
- **Masterplan renderings:** ask the architect for full-size originals, whether each is AI-generated or a licensed photo, and permission for web use.
- **Walk rings:** radii still need confirming with the architect (already listed). The walk-ring diagram is built around a single constant so the radii can change.
- **Self-driving carts:** kept as a concept ("low-speed shuttles or carts"). Owner to confirm it should be public.
