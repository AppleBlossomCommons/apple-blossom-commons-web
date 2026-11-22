# 14 — The Plan: the whole vision (content pack v2)

*Prepared in Cowork, 2026-11-13, after the owner's meeting with Andy. Source: the July 2026 masterplan (jeffrey mak: architect ltd), the Connected Community vision (Sept 2026) and the copy already on the site. Put this file in the repo as `docs/14-plan-vision-content.md`. It adds to `docs/10-content-v2.md` and `docs/11-plan-and-districts-content.md`. Where they conflict, this file wins for The Plan page.*

Words in [brackets] are notes for the builder, not copy. Lines marked **DECISION** need a yes from the owner and Andy before they go public (section 7).

---

## 0. Read this first (for Claude Code)

1. **Why this pack exists.** Andy feels The Plan page lists the parts of Apple Blossom Commons but doesn't yet say what makes it new: **a different way to spend retirement, where good homes, a hospital campus next door and helpful technology are planned together in one community designed for walking.** This pack adds three sections that carry that story, expands one, and adds images to the village.
2. **Get approval before building.** Three new sections and new `places` entries in `data/districts.json` are a major feature under `CLAUDE.md`. Play back the plan, propose the components, and wait for a yes.
3. **Reuse what's there.** The new sections use the existing patterns: `RuleList` for short items, `PlaceCard` for image cards, `ConceptNote`, `Reveal`, `DistrictPageLink`. No new design language.
4. **One source for district data.** Heritage Grove cards read from `places` on the `heritage` entry (section 4.3 gives the new entries). General explainer copy (Life Plan Community) can live in the component, like the other Plan sections.
5. **Public copy rules still apply.** Lake Chelan Health is only "the hospital campus". No City, no Comprehensive Plan, no counts, no promises on fees.

---

## 1. New page order

*Superseded Nov 19, 2026: The Plan is now three pages (see `docs/02-sitemap.md`). The sections below are unchanged, but they are spread across `/plan`, `/plan/living-and-care` and `/plan/village-and-outdoors`, and Heritage Grove on Neighborhoods for a lifetime is a short summary that links to the district page. The optional jump list is built, on all three pages.*

Hero · Intro *(one line changed)* · **A different kind of retirement** *(new)* · 3D explorer · How it fits together · **What is a Life Plan Community?** *(new)* · **Heritage Grove** *(new)* · Care, close by *(expanded: health and technology)* · The village at the center *(images added)* · A neighborhood designed for walking · Parks, trails and open space · What guides the plan · Why Chelan

[The page is getting long. Optional, ask first: a slim "On this page" jump list under the intro with five links: The idea · Life Plan Community · Heritage Grove · Care and technology · The village.]

**Metadata description (new):** A long-range plan near Lake Chelan for a different kind of retirement: homes for every stage of life, care a short walk away, technology that supports people, and a small village at the center.

---

## 2. Intro [one sentence added]

Keep the text from `docs/10-content-v2.md` and add this sentence at the start:

- **New first sentence:** Apple Blossom Commons is planned around a simple idea: the years after work are better when a good home, good care and good neighbors are close together.

> **Update (owner decision, Nov 22, 2026):** The intro is now this sentence only. The `docs/10` text after it was dropped because it repeated the hero lede ("long-range plan… one neighborhood at a time") and the sections below (homes, village, parks). It sits on a wide card with the Lake Chelan photo from the Home "Once in a Generation" step behind it.

---

## 3. A different kind of retirement [id="vision"; new; directly after the intro]

- **Heading:** A different kind of retirement
- **Intro:** Most retirement communities offer a place to live. Apple Blossom Commons is planned to offer a whole neighborhood: homes for every stage of life, a hospital campus a short walk away, and technology that quietly helps, all within a small village near the lake.
- **Three pillars** [three columns on desktop, stacked on phones; each with an image slot (section 8, slots V1–V3), a short title and two lines]:
  - **A home for every chapter.** Cottages and townhomes for active years, and independent living, assisted living, memory care and nursing care for when more support helps. Moving between them doesn't mean leaving your neighbors.
  - **Care, a short walk away.** The senior neighborhoods are planned beside the hospital campus, with clinics, therapy and rehabilitation planned nearby in the Wellness District.
  - **Technology that supports people.** Ideas like virtual visits, home sensors that can alert a caregiver, and robots that take on routine tasks, so the people who give care have more time to spend with residents. *(concept)*
- **Closing line** [larger text, centered or left under the three columns]: Planned as one connected community, for the people who live here and the families who visit them.

[No partner language. "The hospital campus" only. Tech items end with "(concept)" shown in the muted style.]

---

## 4. What is a Life Plan Community? [id="life-plan"; new]

### 4.1 Explainer

- **Heading:** What is a Life Plan Community?
- **Lead:** A Life Plan Community is a neighborhood designed so you can plan once for the years ahead. You move in while you're active and independent. If your needs change, more support is available in the same community, close to your home, your friends and your routines.
- **Text:** You may know the older name, "continuing care retirement community". The idea is the same: independent homes, assisted living, memory care and nursing care, planned together in one place, so a change in health doesn't have to mean a move across town.
- **How it fits here:** At Apple Blossom Commons, **Orchard Grove** is planned as the Life Plan Community: cottages and townhomes for active adults, with a recreation center, gardens and trails close by. **Heritage Grove**, next door, is planned for independent living, assisted living, memory care and nursing care, so more support is a short walk away if it's ever needed. Both are planned near the hospital campus.

### 4.2 How it works [a four-step path; horizontal on desktop, vertical on phones. A simple line connecting four numbered dots, not a chart. HTML list underneath is the equivalent.]

- **Subheading:** One community, four levels of support
- **Steps:**
  1. **Live on your own terms.** Your own cottage, townhome or apartment, with the upkeep handled for you.
  2. **A little help each day.** Assisted living, for when everyday routines take more effort.
  3. **Memory care.** Homes designed for people living with Alzheimer's or dementia, with staff trained in their care.
  4. **Nursing care.** Around-the-clock care for people who need it.
- **Caption under the steps:** Most people move in at the first step. The others are there if they're ever needed.

### 4.3 Why people choose it [cluster of ten (owner decision, Nov 13, 2026; replaces the 5 × 2 grid): the subheading sits in a center panel, the ten titles sit around it as same-size chips, and choosing one shows its text in the panel, with Previous / Next and a "See all ten as a list" toggle. On the ring the items run clockwise in related groups: aging in place and care at the top; maintenance, price and costs on the right; family and pets at the bottom; neighbors, meals and an engaged life on the left. Below 1100px the panel comes first and the chips wrap underneath. Built in `components/plan/BenefitCluster.tsx`.]

- **Subheading:** Why people choose a Life Plan Community
- **Items:**
  - **Designed for aging in place.** Level paths, single-level homes, wider doorways and good lighting, so your home keeps working for you as your needs change.
  - **An engaged life.** Hiking groups, classes, outings, gardening and community events, planned by and for the people who live here.
  - **Maintenance-free living.** Home repairs, yard work and snow are taken care of, so your time is your own.
  - **Homes at more than one price.** A range of home types and sizes is planned, so more people can find one that fits.
  - **Care, close by.** The hospital campus and nearby clinics are planned within a short walk.
  - **Meals worth sharing.** Dining rooms and cafés serving food from the valley's own farms and orchards, with choices for different diets. *(concept)*
  - **Neighbors who become friends.** People at a similar stage of life, with clubhouses, courtyards and the village to meet in.
  - **Pets welcome.** Pet-friendly homes, with places to walk a dog close by. *(concept)*
  - **Room for family.** Guest suites in the clubhouses, so children and grandchildren can stay close when they visit. *(concept)*
  - **Costs you can plan for.** Many Life Plan Communities offer contracts that keep monthly costs steadier as care needs grow. How this will work at Apple Blossom Commons hasn't been decided yet.

### 4.4 What's different here [two or three sentences in a highlighted band (sand background), after the grid]

- **Subheading:** What makes this one different
- **Text:** Many Life Plan Communities are a single campus set apart from town. Here, the senior neighborhoods are part of a larger community, next to family homes, parks, trails, a small village of cafés and tasting rooms, and a hospital campus. Grandchildren can visit the park, and a coffee in the village is a short stroll from home.

### 4.5 Three quick questions [a small accordion, reusing the FAQ pattern from /participate. Copy matches the existing FAQ so the site says one thing.]

- **Is it only for people 55 and older? Will there be entrance fees?** It's too early to say. Join the update list to hear as plans firm up. [→ /participate]
- **Can I stay if my care needs change?** That's the goal. Independent homes, assisted living, memory care and nursing care are planned in one connected community.
- **When could I move in?** It's too early to say. Each neighborhood comes when there's real demand for it, and we'll share timing as plans firm up.

**Link:** Explore Orchard Grove → [/districts/orchard-grove] · Explore Heritage Grove → [/districts/heritage-grove]

---

## 5. Heritage Grove [id="heritage-grove"; new]

### 5.1 Section copy

- **Heading:** Heritage Grove: support, when it's needed
- **Intro:** Heritage Grove is planned for people who prefer or need support. Each group of homes is planned around a protected garden courtyard, with clubhouses for meals, fitness, reading and visits from family.
- **Cards, part 1: levels of care** [four `PlaceCard`s in a 2 × 2 grid, each with an image slot (section 8, slots H1–H4). Read name and text from `places` on `heritage`; the existing text stays.]
  - **Independent living** · **Assisted living** · **Memory care** · **Nursing care**
- **Cards, part 2: everyday life** [six smaller cards, 3 × 2 on desktop, each with an image slot (slots H5–H10). Read from `places` on `heritage` (new entries in 5.2).]
  - **Garden courtyards** *(existing entry)*
  - **Shared clubhouses** *(existing entry)*
  - **Fitness for every age** *(new)*
  - **Dining** *(new)*
  - **Activities and classes** *(new)*
  - **Pet-friendly homes** *(new)*
- **Link:** Explore Heritage Grove → [/districts/heritage-grove]
- **Concept note** (from `docs/11`, 1.9) under the cards.

### 5.2 New `places` entries for `heritage` in `data/districts.json` [add after "Shared clubhouses"; they will also show on the district page's "What's planned here"]

```json
{ "name": "Fitness for every age", "text": "Classes built for strength, balance and flexibility, in a fitness room close to home. (concept)" },
{ "name": "Dining", "text": "More than one place to eat, with menus made from local food and choices for different diets. (concept)" },
{ "name": "Activities and classes", "text": "Art, music, reading groups and outings, in every home and at the clubhouses, to keep body and mind active. (concept)" },
{ "name": "Pet-friendly homes", "text": "Room for a dog or cat, with places nearby for a walk. Pets are good company and good for health. (concept)" }
```

[Leave the clubhouse text as it is. The masterplan also lists "spiritual rooms / chapel"; the existing entry already says "quiet room". Keep that wording.]

---

## 6. Care, close by [id="care-close-by"; expanded]

Keep the heading, the first paragraph, the courtyard paragraph from `docs/11` and the "Read the full vision" link. Replace the "Technology that supports people" block with this:

- **Subheading:** Technology that supports people
- **Lead:** Technology is planned to take on the routine work, so the people who give care have more time for the people they care for. It will never replace them.
- **Items** [six short items, `RuleList` "three" layout; each ends with "(concept)" in the muted style]:
  - **Virtual visits.** Seeing a specialist by video from home, without a long drive. *(concept)*
  - **A home that notices.** Sensors that can notice a fall or a change in routine and alert a caregiver or family member. *(concept)*
  - **Robots for routine tasks.** Robots that carry meals, linens and supplies, so staff can spend that time with residents. *(concept)*
  - **Shuttles on car-free lanes.** Slow, self-driving shuttles linking homes, clinics and the village. *(concept)*
  - **A helpful assistant.** A simple AI assistant for reminders, appointments and questions, for residents who want one. *(concept)*
  - **Homes that help.** Lighting that guides the way at night, voice controls, and doors and appliances that are easy to use. *(concept)*
- **Closing line:** Residents will decide how their own information is used.

[Keep "never replace" and the information line. Both come from the governance principles in the Connected Community vision and `CLAUDE.md` rule 3.]

---

## 7. Decisions for the owner and Andy

| # | Decision | Recommendation |
|---|---|---|
| 1 | Call Orchard Grove + Heritage Grove "a Life Plan Community" in public | Yes. The masterplan uses the term on the Orchard Grove sheet. The page explains it in plain words and makes no contract promises. |
| 2 | Add "Costs you can plan for" (4.3, optional item) | Only in the generic form given. `docs/11` left out "monthly fees will remain stable" because the FAQ says fees are "too early to say", and that is still true. |
| 3 | "Affordable senior living" | Use "Homes at more than one price" until Andy confirms what "affordable senior housing" means on the masterplan. If it means income-restricted homes, the wording can change once a program is chosen. |
| 4 | Robots, self-driving shuttles and an AI assistant on the public page | Yes, as marked concepts. They carry the "technology" part of the story Andy wants. Each is framed as giving staff more time, never replacing them. |
| 5 | Heritage Grove images with people | Licensed stock with model releases (Andy's rule: AI images show no people). AI for the spaces (section 8, column "AI, no people"). |
| 6 | The masterplan's own pictures | Use as Gemini reference only. See section 9. |

---

## 8. Images and Gemini prompts

**Rules (unchanged):** AI images show **no people and no animals**. People appear only in licensed stock with model releases. AI images get the small label "Illustrative concept". No crowds, traffic, busy patios, dark or moody scenes, or real Lake Chelan landmarks. Warm and welcoming, not corporate.

**Export:** 3:2 landscape, WebP, 1600 × 1067 (place cards) or 2400 × 1600 (pillars). Save to `public/images/plan/` with the file names below, then replace the matching placeholder in `lib/place-images.ts`.

**How to use the prompts in Gemini:** paste one prompt per chat. If the result has people, signs or text, reply: *"Same image, but remove every person and every sign, letter and logo."* Ask for the largest size it offers. Add this line at the end of any prompt if the light looks too dark: *"Bright, airy, warm daylight; no dark shadows."*

### 8.1 The village at the center (five cards)

All five end with the same **style line**:
> Photorealistic architectural photograph, 3:2 landscape. Pacific Northwest high-desert lake country: dry golden grass hills, ponderosa pines, sagebrush and lavender planting. Warm, calm, welcoming. Shallow depth of field, soft natural film grain. No people, no animals, no text, no signs with lettering, no logos, no cars.

| File | Prompt (add the style line) | Alt text |
|---|---|---|
| `village-harvest-square.webp` | A small town plaza at golden hour at the center of a new wine village. A low, round stone fountain in the middle, two stone fire pits ringed by empty wooden Adirondack chairs, crushed-granite paths, native grasses and lavender in raised stone planters. Low timber-and-stone pavilions with deep overhanging eaves and warm lit windows frame the square. A tall black lamp post with a blank banner. Dry golden hills rise behind under a clear sky with a few soft clouds. | Illustrative concept of Harvest Square: a quiet stone plaza with a round fountain and fire pits, framed by low timber pavilions and golden hills. |
| `village-vintners-walk.webp` | A quiet, car-free pedestrian lane in early-morning light, lined on both sides by low two-storey timber-and-stone storefronts with large windows and awnings. Wide stone pavers, small trees in planters, lavender and ornamental grasses, a few empty café tables and chairs set out, string lights overhead between the buildings. The lane gently curves toward dry golden hills. | Illustrative concept of Vintner's Walk: a quiet lane of timber and stone shopfronts with café tables, planters and string lights. |
| `village-tasting-courtyard.webp` | An eye-level view into a small, sunny courtyard surrounded by a ring of small single-storey tasting rooms, each with a different wood or painted-metal facade and an open glass door. A long communal wooden table in the center with empty wine glasses and a carafe of water, a grapevine-covered pergola overhead casting dappled light, gravel and stone paving, olive and lavender planters. Golden hills and a hint of a blue lake in the far distance. | Illustrative concept of the Tasting Courtyard: a ring of small tasting rooms around a long table under a vine-covered pergola. |
| `village-market-hall.webp` | A large open-sided timber market hall with tall black steel-framed glass doors rolled up, exposed wood trusses and pendant lights inside. Wooden tables of fresh apples, pears, cherries, vegetables, cut flowers and bread in crates, with nobody at the stalls. Outside, a stone terrace with a few empty tables and a fire pit. Soft late-afternoon light. | Illustrative concept of Market Hall: an open timber hall with tables of fruit, vegetables and flowers, doors rolled up to a terrace. |
| `village-barrel-house.webp` | A warm industrial-rustic winery hall at dusk with a tall gabled roof, dark-stained timber and steel frame, and floor-to-ceiling windows glowing warmly. Inside, rows of stacked oak barrels and stainless steel tanks are visible. A wide stone terrace in front with fire pits and empty wooden lounge chairs, native grasses and boulders. Dry golden hills behind under a soft pink and blue evening sky. | Illustrative concept of the Barrel House: a tall timber winery hall with oak barrels inside and a terrace with fire pits. |

**Using the masterplan picture as a reference (better match to what Andy has seen).** In Gemini, attach the matching file from `reference/masterplan-images/wine-village/` and paste:
> Recreate this scene as a new, high-resolution photorealistic image. Keep the architecture, building materials, layout, landscaping, hills and warm light. Remove every person. Remove all text, titles, signs with lettering and logos (leave sign boards blank or remove them). No cars. 3:2 landscape.

[Don't do this for the Tasting Courtyard. Its masterplan picture is an aerial photo that may show a real place. Use the text prompt above.]

### 8.2 A different kind of retirement (three pillars)

| Slot / file | Source | Prompt or stock search |
|---|---|---|
| V1 `vision-home.webp` | AI, no people | A single-storey craftsman cottage with a deep front porch, two rocking chairs and a small table with two coffee mugs, a level path with no steps to the door, a low picket fence with lavender, morning light, dry golden hills behind. *(add the style line)* |
| V2 `vision-care.webp` | Licensed stock with people | Search: "senior couple walking garden path sunny", "older adults walking tree-lined path". No hospital or clinical scenes. |
| V3 `vision-technology.webp` | AI, no people | A bright, warm living room in a modern craftsman cottage: a small tablet on a stand on a side table, soft under-cabinet lighting along a hallway floor, a simple wall-mounted smart panel, an armchair by a large window looking out to golden hills. Tech blends into a cozy home, not a lab. *(add the style line)* |

### 8.3 Heritage Grove (ten cards)

Pick **one source per card**. Stock shows the human side (best for the four levels of care); AI shows the spaces.

| Slot / file | Licensed stock search (people OK) | Gemini prompt, no people (add the style line, swap "architectural photograph" for "interior photograph" where indoors) |
|---|---|---|
| H1 `heritage-independent.webp` | "active senior couple cottage porch" | A bright apartment kitchen and living room in a senior residence: warm wood cabinets, wide doorways, a level floor, a dining table set for two, a window over a garden courtyard. |
| H2 `heritage-assisted.webp` | "caregiver and senior woman smiling living room" | A sunny private suite in assisted living: an armchair with a knitted throw by a large window, a reading lamp, family photos on a shelf, a discreet grab rail in warm wood, plants on the sill. |
| H3 `heritage-memory-care.webp` | "senior woman and caregiver reading together" | A calm, homey common room for memory care: soft colors, a bookcase, a memory shelf of old photos and keepsakes, comfortable sofas, a glass door opening onto a looping garden path. |
| H4 `heritage-nursing.webp` | "nurse with senior woman in garden" | A sunlit nursing-care room that feels residential, not clinical: a wood-trimmed adjustable bed made with a quilt, an armchair for a visitor, a window to the courtyard, fresh flowers. |
| H5 `heritage-courtyard.webp` | — (AI) | A sheltered garden courtyard between single-storey timber-and-stone wings: a looping level path, benches in the sun, a small bubbling fountain, raised planter beds with herbs, shade trees. |
| H6 `heritage-clubhouse.webp` | — (AI) | A clubhouse library and lounge: wall-to-wall bookshelves, a stone fireplace, leather armchairs, a large window to golden hills, a card table set up for a game. |
| H7 `heritage-fitness.webp` | "senior fitness class balance exercise" | A bright senior fitness studio: light hand weights, resistance bands, balance bars along a mirrored wall, yoga mats, a stationary bike, big windows to green trees. |
| H8 `heritage-dining.webp` | "seniors dining outdoor patio friends" (no crowds) | A warm bistro dining room set for lunch: wooden tables with linen napkins, a bowl of local apples, a wooden sideboard with bread and salads, garden patio doors open. |
| H9 `heritage-activities.webp` | "senior art class painting" | An art studio in a senior community: easels with half-finished watercolor landscapes, paint jars, a long work table, natural light from tall windows. |
| H10 `heritage-pets.webp` | "senior couple with small dog on sofa" | A small fenced dog run in a garden courtyard: soft grass, a bench, a water bowl, a leash and a ball resting on the bench, flowering shrubs. *(No animal in the AI image.)* |

**Stock notes:** Use a licensed library (Adobe Stock, Getty, or a free license such as Unsplash/Pexels where model releases are clear). Keep a note of each image's source and license in `data/sources.json` or a simple image-credits list. Avoid busy groups and anything that looks like a hospital ward.

---

## 9. About the masterplan pictures

The pictures were pulled from the July 2026 masterplan PDF and saved in `reference/masterplan-images/` (`wine-village/` and `heritage-grove/`). **Use them as Gemini references only, not on the site,** because:

- **Too small.** The PDF is the "Reduced" version. Each picture is about 375 × 250 pixels, roughly a quarter of what a card needs on a large screen.
- **Text baked in.** Four village pictures have titles printed on them (one misspelled "Vitner's Walk").
- **People.** The village pictures are AI renderings with people in them, which breaks the no-people rule for AI images.
- **Unknown source.** The seven Heritage Grove pictures look like professional stock photos, possibly from a senior-living operator's marketing. The Tasting Courtyard picture looks like an aerial photo of a real place. Without a license, they can't be published.

If Andy wants the originals, the architect's full-size files and their sources are already an open item (`docs/11`, section 5).

---

## 10. Left out on purpose

| Item | Why |
|---|---|
| "Strong hospital system" / any link to Lake Chelan Health beyond proximity | Public copy rules: name the hospital only as a neighbor |
| "Priority access to all levels of care" | A promise the plan can't make yet |
| "Monthly fees will remain stable" | Same; replaced by the optional generic line in 4.3 |
| "Affordable" | Pending DECISION 3 |
| 55+ | FAQ says "too early to say" (open item in `docs/09`) |
| "24/7 nurse care" as a headline | Kept inside the clubhouse and nursing-care text only, as "around the clock", to avoid a staffing promise in a headline |
| Robots with faces, "AI-powered" | Hype; the copy talks about what technology does for people |

---

## 11. Open items to add to `docs/09-open-items.md`

- Confirm with Andy that Orchard Grove and Heritage Grove together are "the Life Plan Community", and whether the Wellness District's medical-assisted living is part of it.
- Contract model (entrance fee, rental, other): not decided. The FAQ stays "too early to say".
- Meaning of "affordable senior housing" on the masterplan (carried from `docs/11`).
- Self-driving shuttles, robots and an AI assistant: shown as concepts. Revisit once the Connected Community work has an operating partner.
