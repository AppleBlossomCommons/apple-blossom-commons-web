# 15 — Research Library (content pack v1.1)

*Prepared in Cowork, 2026-11-15, from the four Research Library drafts (Reports 3–6, v1). Put this file in the repo as `docs/15-research-library-content.md` and the data file as `docs/15-research-proposed.json`. The owner supplies the four report PDFs separately (section 5). It builds the `/research` page that the footer already links to, plus one summary page per report. The public copy rules in `CLAUDE.md` apply to every line.*

*v1.1 (2026-11-15): the report PDFs are now an input that comes with the pack. Claude Code places and renames them, makes the cover images from them with a rerunnable script, and checks the web copy's figures against them before building (sections 0.8, 5, 11 and 12).*

Words in [brackets] are notes for the builder, not copy.

---

## 0. Read this first (for Claude Code)

1. **What this adds.** A library page at `/research` and four report pages at `/research/[slug]`. Each report page is a short web summary of a designed PDF: key findings, one or two charts, what Apple Blossom Commons plans in response, notes for each reader, and a download button for the full PDF.
2. **Get approval before building.** New routes, a new data file and new chart components are a major feature under `CLAUDE.md`. Play back the plan, propose the components and the data shape, and wait for a yes.
3. **One source for report content.** All report copy and chart data live in `docs/15-research-proposed.json`. After approval, move it to `data/research.json`, add a typed loader in `lib/research.ts`, and delete the proposed file. Don't type report copy into components. The appendix at the end of this file is a read-only copy of the JSON for reviewers; if the two ever differ, the JSON wins.
4. **Drafts stay off production.** Every report is `"status": "draft"` until the owner and Andy approve the final PDFs. Production (`VERCEL_ENV === "production"`) lists and builds only `"published"` reports. Preview deployments and local dev show drafts too, with a small "Draft for review" label, and add `noindex` to draft pages. Publishing a report is then a one-word change in the JSON.
5. **Don't change the main nav.** See section 2. The footer link to `/research` already exists.
6. **Reuse what's there.** Use the existing section, card, button, `ConceptNote` and `Reveal` patterns and the warm palette tokens. Charts are new (section 6), but should look like they belong to the site.
7. **These summaries are the public corpus for the future chatbot.** Keep all report text in the JSON as plain strings (no HTML) so it can be indexed later.
8. **The four report PDFs come with this pack.** The owner gives you the PDFs alongside these two files. They are the official documents: never edit, re-export or recompress them. You place and rename them, make the cover images from them, and check the web copy against them (section 5). The web copy itself still comes from the JSON, not from the PDFs, because it has already been through the public copy check.

---

## 1. Name: "Research Library"

Keep **Research Library**, not "Our Research".

- It is already printed on all four PDF covers ("Apple Blossom Commons Research Library · Report 3") and in the footer, so the site and the documents match without re-rendering anything.
- "Library" tells readers what they'll find: a set of reports to browse and download, which will grow to eight.
- "Our Research" reads like an about-us or corporate R&D page and would sit oddly beside "About Us".

The warmth comes from the heading, not the label: the page title is "Research Library" and the visible heading is "The research behind the plan". In running text, links can say "Read the research" or name the report.

## 2. Navigation: footer now, main nav later

**Recommendation: don't add it to the main nav yet.** Reach it from the footer and from links placed where readers are already thinking about each topic (section 7).

- The header already holds five text links plus the Partner with Us button, and `docs/12` flagged that it gets tight around 1024 px. A sixth link pushes it into the mobile menu early.
- Andy set the main nav to the five journeys most visitors take (the plan, the districts, the tour, participating, meeting us). Research supports those journeys; it isn't one most visitors start with.
- Readers who want evidence are usually reading about a topic already. A "Read the research" link inside Care, close by or the Wine Village reaches them at the right moment, and investors get a research band on Partner with Us.

**Revisit when** the library has six or more reports and the Key Findings overview. At that point, add "Research" to the main nav after About Us, or swap it with Site Tour on smaller screens. [Write the nav item as a commented-out entry in `components/site/nav.ts` so it is a one-line change later.]

**Footer:** keep "Research Library (/research)" in the About column, as in `docs/12`.

---

## 3. Library page (/research)

**Metadata**
- Title: Research Library
- Description: Short, plain-language reports on the Lake Chelan Valley and the plan for Apple Blossom Commons: growing older, care close by, lessons from other communities and the village economy.

### 3.1 Intro [soft image header, no dark background]
- **Eyebrow:** Research Library
- **Heading:** The research behind the plan
- **Text:** Good planning starts with learning. These reports share what we've found about the Lake Chelan Valley: who lives here, what people need as they grow older, how care is reached today, and what a small village could add. Each one is short, written in plain language, and lists its sources so you can check our work.

[Header image: reuse the Lake Chelan photo band from Report 3 (`/images/research/report-03-photo.jpg`). No fades over the photo; text sits on a linen panel above or beside it.]

### 3.2 Reports [id="reports"; grid of report cards]
- **Heading:** Read the reports
- **Cards** [one per report in the JSON, ordered by number; two columns on desktop, one on mobile]. Each card shows:
  - the cover thumbnail (`cover.thumb`, portrait, like a book on a shelf)
  - eyebrow: "Report {number}"
  - title, then subtitle in smaller type
  - `card` text
  - meta line: "{pages}-page PDF · {updatedLabel}"
  - buttons: **Read the summary** [→ /research/{slug}] · **Download PDF** [→ `pdf.href`, opens in a new tab]

### 3.3 How we put these together [id="our-approach"; three short items, same style as RuleList]
- **Heading:** How we put these together
- **Items:**
  1. **Public sources.** Figures come from public sources such as the U.S. Census Bureau and Washington State agencies, each listed with its date.
  2. **Plain language.** Numbers are rounded, terms are explained, and charts carry most of the figures.
  3. **Kept up to date.** We'll update each report as plans firm up and better information becomes available.
- **Note under the items:** These reports are prepared by the Apple Blossom Commons team to explain our thinking. Plans described in them are illustrative concepts and may change.

### 3.4 More reports on the way [id="coming-next"; simple list, no dates]
- **Heading:** More reports on the way
- **Text:** We're working on more reports, including:
- **List:** each `planned` entry in the JSON with `"showOnSite": true`, shown as "{title}: {subtitle}". [At launch that is Report 1 "Chelan Today" and Report 2 "Who Chooses Chelan". Reports 7 and 8 are set to false until Andy approves them; see section 10.]

### 3.5 Stay in touch [two doorway cards, same style as About Us "Come say hello"]
- **Get updates.** We'll let you know when new reports are published. → Join the update list [/participate#update-list]
- **Working with us?** Investors, operators and land buyers can ask about more detailed materials. → Partner with Us [/partners]

---

## 4. Report pages (/research/[slug])

Same template for all four. Section headings below are fixed copy; everything else comes from the JSON. [Generate the pages with `generateStaticParams` from the JSON, honoring the draft rule in section 0.4.]

**Metadata:** title = `title`; description = `metaDescription`; Open Graph image = `cover.photo`.

| # | Section | Content | Notes |
|---|---|---|---|
| 1 | **Header** | Eyebrow "Research Library · Report {number}" (links to /research); `title` as H1; `subtitle` below; meta line "{updatedLabel} · {pages}-page PDF"; buttons **Download the full report (PDF)** and **All reports** [→ /research]; `cover.photo` beside or below | Draft label here on previews |
| 2 | **Lead** | `lead` as a large intro paragraph | |
| 3 | **Key findings** | `findings` as numbered cards. Big `stat` with `statLabel` under it, then bold `title` and `text`. Findings without a stat show the number only. The `highlight: true` finding (always last) spans the full width in a soft blossom or sage panel | Heading: "Key findings" |
| 4 | **A closer look** | Each entry in `charts`: `title` as H3, `subtitle`, the chart, `note` if any, `caption` as a short paragraph, `source` in small type, and a "Show the numbers" toggle (section 6) | Heading: "A closer look" |
| 5 | **Extra sections** | Each `extraSections` entry: `heading` as H2, `intro`, `items` as a RuleList. If `concept: true`, add the ConceptNote | Reports 4 and 6 only |
| 6 | **How Apple Blossom Commons responds** | `responds.intro`; then `rows` as two-column pairs, "What we found" → "What's planned". Rows with `district` get a small "Learn about {district name} →" link to /districts/{district}. Rows with `concept: true` get "(concept)" in italics after the text. Then `responds.note` and the ConceptNote | Heading: "How Apple Blossom Commons responds" |
| 7 | **What this means for you** | `forYou` as four cards, `audience` as the card title | Heading: "What this means for you" |
| 8 | **What comes next** | Text: "As plans firm up, we'll share more about:" then `next` as a list; then a button **Join the update list** [→ /participate#update-list] | Heading: "What comes next" |
| 9 | **About the data** | `aboutTheData`, then `sources` as a compact table (Source · What we used it for · Date). Sources with `url` link out. Repeat the **Download the full report (PDF)** button | Heading: "About the data" |
| 10 | **More from the library** | Two cards from `related` (same card as the library page, smaller), plus a link "See all reports →" | Heading: "More from the library" |

[Mobile: the findings grid becomes one column; "What we found → What's planned" stacks as found (small, muted) over planned. Keep the page readable in about three minutes; don't add anything that isn't in the JSON.]

---

## 5. The report PDFs (supplied by the owner)

### 5.1 Where the PDFs arrive

The owner puts the four PDFs in `incoming/research/` at the repo root (or attaches them in the chat; if so, save them there first). Add `incoming/` to `.gitignore`, so the originals are never committed twice.

Match each file to its report by the report number in its name ("Report3", "Report4", …), not by the full name, so later versions (v2, final) still match. The current drafts are named in `pdf.sourceFile`:

| Report | Expected file (current draft) | Copy to (stable, never changes) |
|---|---|---|
| 3 | `ABC_Research_Library_Report3_Growing_Older_by_the_Lake_Draft_v1.pdf` | `public/downloads/research/abc-research-report-03-growing-older-by-the-lake.pdf` |
| 4 | `ABC_Research_Library_Report4_Care_Close_By_Draft_v1.pdf` | `public/downloads/research/abc-research-report-04-care-close-by.pdf` |
| 5 | `ABC_Research_Library_Report5_Learning_from_Others_Draft_v1.pdf` | `public/downloads/research/abc-research-report-05-learning-from-others.pdf` |
| 6 | `ABC_Research_Library_Report6_The_Village_Economy_Draft_v1.pdf` | `public/downloads/research/abc-research-report-06-village-economy.pdf` |

[The public names carry no version or "draft", so links and the future chatbot's citations never break; a revised report replaces the file in place. Use `public/downloads/…`, not `public/research/…`, so static files never collide with the `/research/[slug]` route. If a PDF is missing, build everything else and say which one is missing; don't make a placeholder PDF.]

### 5.2 Script: `scripts/research/prepare-reports.mjs`

Write one script the owner can rerun whenever a PDF is revised. For each PDF in `incoming/research/` it:

1. **Copies** the file to its stable path (table above). Byte-for-byte; no changes to the PDF.
2. **Reads the page count** and updates `pages` in `data/research.json` if it differs, then updates `pdf.sourceFile` to the name it was given.
3. **Makes two cover images** from page 1:
   - `cover.thumb`: the whole cover page, 600 px wide, JPEG, for the library cards.
   - `cover.photo`: the photo band only (the lower part of the cover, below the linen text block), 1600 px wide, JPEG, for the report header and Open Graph.
4. **Reports** file sizes. Flag anything over 10 MB, but don't compress it; the owner decides.
5. **Notes whether the cover still says "Draft for review"**, by searching the text of page 1. If it does, the report stays `"status": "draft"` whatever else happens.

[Rendering: use poppler (`pdftoppm`, `pdftotext`) if available, or a Node package such as `pdfjs-dist` with `@napi-rs/canvas` or `sharp`. Find the top of the photo band by scanning page 1 for the first full-width row that isn't the linen background color, rather than hard-coding a crop: the band covers roughly the lower half of the cover, and its top edge is straight. Look at all eight images before using them. Keep colors in sRGB.]

### 5.3 Check the web copy against the PDFs

Run `pdftotext` on each PDF and check that every figure in that report's JSON (`findings`, `charts`, `extraSections`, `responds`) appears in the PDF text. Report the result in your plan as a short table: report · figure · found or not found · where. **Don't change the JSON to match.** Mismatches go to the owner, who decides which one is right.

These differences are deliberate and are not errors:
- Report 3, last finding: the web says "designed for walking"; the draft PDF says "walkable".
- Report 4, sources: the web says "local hospital district public materials"; the PDF names the hospital.
- Chart captions and stat labels are short web versions of PDF sentences; check the numbers in them, not the wording.
- Chart labels in the PDFs are usually extractable text. If a chart value doesn't turn up, check it against the PDF's chart by eye, or list it as "in chart, not in text".

### 5.4 Download links

Plain links that open the PDF in a new tab (`target="_blank" rel="noopener"`), with the page count in the button's accessible name, e.g. "Download Growing Older by the Lake (PDF, 11 pages)".

---

## 6. Charts

Eight chart types appear in the JSON (`type` field). Build them as small, dependency-free SVG components (no chart library needed), sized to the content column, using the site's tokens. Match the PDFs: one data accent color (lake blue, PDF value `#2F6F88`) for highlighted marks, a warm neutral (PDF value `#DCCFBE`) for the rest, hearth-brown text, no gridlines, values labeled on the marks.

| `type` | Used in | How to draw it |
|---|---|---|
| `columns` | R3 65+ growth | Vertical columns by year, value labeled above each. Columns in `highlight` use the accent; others neutral. A dashed divider and "Projected →" label after the first year (`projectedFrom`). |
| `barsWithReference` | R3 cost of care | Horizontal bars with labels on the left and dollar values at the end. A dashed vertical reference line at `reference.value`, labeled with `reference.label` and `reference.display`. The part of each bar beyond the line uses the accent. |
| `rangeBars` | R4 distance to care | Horizontal scale of miles. A dot for single values, a short bar from `min` to `max` for ranges, `display` as the label. The 0-mile "Next door" row is a dot at the left edge in the accent. |
| `statTiles` | R4 care workforce | Three big numbers with labels, in a row (stacked on mobile). Not a chart, but uses the same title, caption and source pattern. |
| `timeline` | R5 growth over decades | One row per community on a shared year axis (`axis.from`–`axis.to`): a line from `start` to `end`, `startLabel` at the start, `endLabel` at the end. Color by `kind`, with a two-item legend. Sizes are labels only (mixed units), never plotted. |
| `stackedShare` | R5 cottage share | One 100% bar per community, cottages in the accent and apartments neutral, each part labeled "{value} ({share}%)". |
| `groupedBars` | R6 three customer groups | Horizontal paired bars per category: the first series neutral, the second in the accent, values at the ends, legend above. |
| `bars` | R6 visitor spending | Horizontal bars, labeled "${value}M ({share}%)". Rows in `highlight` use the accent. |

**Every chart:**
- `role="img"` with `aria-label` set to `a11ySummary`.
- A "Show the numbers" disclosure (`<details>`) under the chart with a plain table of the same data, so the numbers are readable by screen readers and on small screens.
- Responsive: at 390 px, labels move above bars rather than shrinking below 13 px.
- No animation beyond a gentle fade-in via `Reveal`; respect `prefers-reduced-motion`.

---

## 7. Links into the library from other pages

Small text links in the existing style (e.g. "Read the research: Care Close By →"), placed at the end of the named section. Link only to reports that are published (the same draft rule applies: hide the link if its report is a draft on production).

| Page and section | Link text | Target |
|---|---|---|
| The Plan · A different kind of retirement | Read the research: Growing Older by the Lake → | /research/growing-older-by-the-lake |
| The Plan · What is a Life Plan Community? | What other communities teach us → | /research/learning-from-others |
| The Plan · Care, close by | Read the research: Care Close By → | /research/care-close-by |
| The Plan · The village at the center | Read the research: The Village Economy → | /research/village-economy |
| District pages: Orchard Grove, Heritage Grove | Related research: Growing Older by the Lake → | /research/growing-older-by-the-lake |
| District page: Wellness District | Related research: Care Close By → | /research/care-close-by |
| District page: Chelan Wine Village | Related research: The Village Economy → | /research/village-economy |
| Partner with Us · new band "The research" [after the intro, before the form] | Heading: **The research**. Text: Our public reports set out the evidence behind the plan, from the valley's growing older population to the visitors and neighbors a village would serve. Partners can ask about more detailed materials through the inquiry form. Then the report cards (compact) and a link "See the Research Library →" | /research |
| How Can I Participate? · FAQs [new question, in the general group] | **Where can I read your research?** Our Research Library has short, plain-language reports on growing older in the valley, care close by, lessons from other communities and the village economy, each with its sources. More reports are on the way. [Link "Research Library" → /research] | /research |
| About Us · Who we are [one sentence added at the end] | You can read what we've learned so far in our Research Library. [Link "Research Library" → /research] | /research |

[No change to the Home page.]

---

## 8. Sitemap, SEO and accessibility

- Add `/research` and each published report to the sitemap (if the site has `app/sitemap.ts`). Drafts never appear in it.
- One H1 per page. Headings in order (H2 sections, H3 chart titles).
- Cover thumbnails have empty `alt` on the library cards (the title next to them says it all); `cover.photo` uses `cover.alt` on report pages.
- Big stat numbers are text, not images.
- Lighthouse accessibility ≥ 95 on `/research` and one report page.

---

## 9. Copy check (done 2026-11-15)

- Copy is taken from the four report drafts so the web summaries and PDFs say the same thing. Two deliberate differences: Report 3's last finding says "designed for walking" instead of "walkable", to match the wording the site uses for Apple Blossom Commons (Report 4's "Walkable design is health care too" stays, since it describes a general idea, not a claim about the site); and Report 4's web sources say "local hospital district public materials" instead of naming the hospital (the PDF names it in its sources table).
- The City, its Council and staff are not named or addressed. Lake Chelan Health is never named on the web pages; it is "the hospital campus" or "the local hospital".
- No rents, prices, tenant names, unit counts for Apple Blossom Commons, development costs or dates. Business types and phases in Report 6 are labeled concepts. Technology ideas are labeled concepts.
- Growth is described as slow and in phases, over many years. Every plan carries the concept note.
- Report 5 names eleven outside communities as examples, framed as precedent, not promise.
- King County appears once, in Report 3's migration finding. It is a factual comparison, not a homepage message.

## 10. Open items before publishing (owner and Andy)

1. **Report 6 is a change to the October 16 tier decision.** Tenant feasibility was Partner Access only; this public digest shares spending figures and the space mix by type (no rents, tenants or financials). Andy to approve, or Report 6 stays a draft.
2. **Final PDFs.** The v1 PDFs say "Draft for review" on the cover. Before publishing, give Claude Code final versions without it (same `incoming/research/` folder) and rerun `prepare-reports.mjs`; that replaces the downloads and cover images in place.
3. **Report 3 cross-reference.** The PDF says "Report 2 in this library, 'Who Chooses Chelan,' covers migration in full", but Report 2 isn't written yet. Change to "A future report in this library will cover migration in full" in the final PDF, or publish Report 2 first. (The web summary doesn't include the line.)
4. **Report 3 "walkable".** Mirror the web wording ("designed for walking") in the final PDF, or keep "walkable" in both.
5. **Report 4 EMS building.** Copy says it "was set for completion in fall 2026". Confirm whether it has opened and update both PDF and JSON.
6. **Report 4 sources.** Andy to confirm he's comfortable with the PDF naming Lake Chelan Health in its sources table and mentioning the state-funded EMS building.
7. **"Life Plan Community".** Counsel check on public use of the term (Washington naming restriction from July 2027). Applies to Reports 3, 4 and 5 and The Plan page.
8. **Coming next list.** Confirm showing Reports 1 and 2 as "on the way", and whether Reports 7 (housing and workforce) and 8 (utilities, roads and services) should be listed. Both need approval as public reports.
9. **Cover photo.** The Lake Chelan photo shows a private home in the mid-ground. Fine for a landscape, but confirm before wide sharing. More photos would give each report its own cover.
10. **Report 3 facts to confirm:** "one assisted living and memory care community in Chelan" (Andy comfortable with the description) and "no other senior communities currently planned" (check permit records).

---

## 11. Definition of done

- The four supplied PDFs are at their stable paths in `public/downloads/research/`, unchanged, and `incoming/` is git-ignored.
- `prepare-reports.mjs` runs cleanly and has made all eight cover images; page counts in the JSON match the PDFs.
- The figure check from section 5.3 is reported to the owner, with any mismatches listed.
- `/research` lists every report allowed by the draft rule, with working summary and PDF links.
- Four report pages render all ten sections from the JSON, with all eight charts and their "Show the numbers" tables.
- On a preview deployment, all four drafts show with the "Draft for review" label and `noindex`. On production, none show until `status` is `"published"`, and the library page still renders (with only sections 3.1, 3.3, 3.4 and 3.5 if no report is published).
- Cross-links from section 7 are in place and hide when their report isn't published.
- The main nav is unchanged; the footer link works.
- Screenshots at 1440 px and 390 px of `/research` and `/research/growing-older-by-the-lake`, and of the R5 timeline and R6 grouped bars at 390 px.
- `docs/02-sitemap` (or its current equivalent) updated with the new routes.

## 12. Kickoff prompt for Claude Code

> Read CLAUDE.md, then docs/15-research-library-content.md and docs/15-research-proposed.json. This adds the Research Library at /research, with four report summary pages and PDF downloads. The four report PDFs are in incoming/research/ [or: attached to this message; save them to incoming/research/ first]. They're the official documents: don't edit them. It's a major feature: before writing code, check the JSON's figures against the PDFs as in section 5.3 and report any mismatches, then play back the plan, propose the components, chart approach, data file shape and the prepare-reports script, and wait for my approval. Work on a new branch called "research-library". Use the copy in the JSON exactly. Don't change the main nav. Drafts must show only on preview deployments, never on production. Show me the eight cover images, and screenshots at 1440 px and 390 px of /research and one report page. Don't merge to main until I approve.

---

## Appendix: report copy for review (generated from the JSON)

*Read-only. Claude Code builds from the JSON, not from this appendix.*

### Report 3: Growing Older by the Lake

*Needs, Options and a New Way Forward* · `/research/growing-older-by-the-lake` · 11-page PDF · status: draft

**Card:** How the valley’s older population is growing, where care is today, what it costs, and how Apple Blossom Commons is planned to help people stay close to home.

**Meta description:** How the Lake Chelan Valley’s older population is growing, where senior housing and care are today, and how Apple Blossom Commons is planned to help.

**Lead:** The Lake Chelan Valley is a place people love to grow older in, and more of them do every year. What’s missing is a way to stay here, close to the lake and to family, as needs change. Apple Blossom Commons is planned to fill that gap.

**Key findings**

1. **One in five neighbors is 65 or older.** About 16,800 Chelan County residents (21%) are 65 or older today. State projections put that share above one in four by 2035. [21%: of Chelan County residents are 65 or older]
2. **The older population keeps growing.** The county’s 65+ population is projected to rise from about 19,300 in 2025 to about 26,300 by 2050, an increase of roughly 7,000 people (36%). [+36%: more residents 65+ by 2050]
3. **People choose the valley later in life.** From 2010 to 2020, Chelan County gained more people aged 65 to 69 through moves than it lost, while King County saw the opposite. [+12%: more people aged 65–69 because of moves, 2010–2020]
4. **Most care is about 40 miles away.** Chelan has one assisted living and memory care community and no nursing home. Most of the region’s senior housing and care is in the Wenatchee area, 45 to 60 minutes from the lake. [40 mi: to most senior housing and care]
5. **There is no Life Plan Community in North Central Washington.** The nearest one is in Spokane, about 165 miles away, so moving between levels of care usually means moving between towns. [165 mi: to the nearest Life Plan Community]
6. **Budgets vary widely, so options should too.** Assisted living in Washington costs about $6,975 a month, more than the typical local older household earns. Home equity, a range of home types and prices, and help for staying at home all matter. [$6,975: a month for assisted living in Washington]
7. **Apple Blossom Commons is planned to close these gaps.** One community near the lake designed for walking, with homes for every stage of life, care a short walk away, and a village, parks and trails close by.

**A closer look**

**Chart: The county’s 65+ population is projected to grow by about 7,000 by 2050** (columns)

*Chelan County residents 65 and older. 2020 is census-based; later years are projections.*

| Year | Residents 65+ | Basis |
|---|---|---|
| 2020 | 16,312 | Census-based |
| 2025 | 19,268 | Projected |
| 2030 | 21,962 | Projected |
| 2035 | 23,508 | Projected |
| 2040 | 24,275 | Projected |
| 2045 | 25,125 | Projected |
| 2050 | 26,288 | Projected |

Growth is fastest over the next ten years as the baby boom generation moves into its 70s and 80s. It slows after 2035, but does not stop.

*Source: Washington State Office of Financial Management, Growth Management Act projections, medium series (January 2023).*

**Chart: Every kind of care costs more each month than a typical older household earns** (barsWithReference)

*Typical monthly cost in Washington, compared with a typical Chelan County 65+ household’s monthly income.*

| Type of care | Monthly cost |
|---|---|
| Home care aide, 30 hours a week | $5,456 |
| Assisted living | $6,975 |
| Memory care (estimate) | $8,700 |
| Nursing home, private room | $13,840 |
| *Reference: Typical Chelan County household 65+* | *$4,872 a month in income ($58,467 a year)* |

Note: A household’s income may support two people; care costs are per person.

Most people pay for senior living with a mix of home equity, Social Security and savings. Homes at more than one price, support at home that can delay a move, and every level of care in one neighborhood make later life easier to plan for and to afford.

*Source: CareScout/Genworth Cost of Care Survey, 2025 (Washington medians; memory care estimated as assisted living plus 25%). Income: U.S. Census Bureau, ACS 2019–2023, Chelan County householders 65+.*

**How Apple Blossom Commons responds**

Apple Blossom Commons is planned so that people can stay in the valley through every stage of later life, close to care, close to family and close to the lake. Moving to the next step means a short walk, not a move to another town.

| What we found | What's planned |
|---|---|
| No Life Plan Community in North Central Washington | Orchard Grove, planned as a Life Plan Community: cottages and townhomes for active adults, with more support available in the same community if needs change [link: Orchard Grove] |
| Most care is about 40 miles away | Heritage Grove, planned next door for independent living, assisted living, memory care and nursing care, so more help is a short walk from home [link: Heritage Grove] |
| Care feels far from home | Both senior neighborhoods are planned beside the hospital campus, with clinics, therapy and rehabilitation planned nearby in the Wellness District [link: Wellness District] |
| Most people want to stay in their homes | Homes designed for aging in place: single-level living, level paths, wider doorways and good lighting |
| Many don’t want to live set apart from everyday life | Senior neighborhoods that are part of a larger community, next to family homes, parks, trails and a small village of cafés and shops |
| Budgets vary widely | Homes at more than one price, in a range of types and sizes |
| Families and care workers are stretched | Technology that takes on routine work so caregivers have more time for people: virtual visits, home sensors that can alert a caregiver, and robots for routine tasks *(concept)* |

Apple Blossom Commons will grow in phases over many years, and each neighborhood will come when there is real demand for it. Prices, contract options and timing haven’t been decided yet. We’ll share them as plans firm up.

**What this means for you**

- **If you live in the valley now:** The need is close to home. Many of the people who will need senior housing and care in the coming decades are already our neighbors, parents and friends. More options in Chelan would mean fewer families driving to Wenatchee to visit a parent, and fewer couples living apart when one needs more care.
- **If you’re planning your own future or a parent’s:** Today, staying in the valley as your needs change is hard, because most care is 40 miles away and there is no Life Plan Community in the region. It is worth planning early, learning how different types of care are paid for, and looking at how home equity could help.
- **If you invest in or provide senior housing and care:** The evidence points to a real gap. The older population is growing, local options are few, and there is no Life Plan Community in North Central Washington. As the first community of its kind in the region, it also brings first-mover questions: pricing and how quickly homes fill will be set without a local example, and the care workforce will need early planning.
- **If you buy land or build homes:** Homes designed for later life (single-level, low-upkeep, close to services) are scarce near the lake. Active adults in their late 60s and 70s are the largest group of older residents, and most will want homes that keep working as they age, near care but not in a care setting.

**What comes next**

- Home types, prices and contract options for Orchard Grove and Heritage Grove
- The care providers who will serve each neighborhood
- How homes, the hospital campus, clinics and the village connect on foot
- Timing for the first neighborhoods

**About the data:** Figures come from public sources and are rounded for readability. Some questions can’t be fully answered with public data: no public dataset links a mover’s age with the county they came from, and our home equity figures apply national patterns to local home values. We’ll update this report as better information becomes available.

| Source | What we used it for | Date |
|---|---|---|
| U.S. Census Bureau, American Community Survey 5-Year Estimates | Population by age, income by age, home values | 2020–2024 (income: 2019–2023) |
| Washington State Office of Financial Management, GMA projections (medium series) | 65+ population, 2020–2050 | January 2023 |
| UW–Madison Applied Population Laboratory | Net migration by age | 2010–2020 |
| IRS Statistics of Income, county-to-county migration | Incomes of households moving in and out | 2022–2023 |
| Washington State Department of Health; Medicare Care Compare | Nursing care locations and quality ratings | Accessed August 2026 |
| CareScout / Genworth Cost of Care Survey | Washington monthly costs of care | 2025 |
| AARP, 2024 Home & Community Preferences Survey | What older adults want (national) | 2024 |

**Related:** care-close-by, learning-from-others

---

### Report 4: Care Close By

*Healthcare, Technology and a Connected Community* · `/research/care-close-by` · 10-page PDF · status: draft

**Card:** The hospital campus next door, the care people travel for today, and how homes, clinics and helpful technology can be planned together.

**Meta description:** The hospital campus next door, the care Lake Chelan families travel for today, and how homes, clinics and helpful technology can be planned together.

**Lead:** Chelan is unusually well placed for a community built around care: a hospital campus right next door, specialists choosing to practice here, and regional virtual care already in place. What’s missing is a neighborhood that brings homes, everyday care and helpful technology together.

**Key findings**

1. **Chelan has its own hospital campus.** A hospital campus with round-the-clock emergency care sits right beside the Apple Blossom Commons site, and a new EMS building on the campus was set for completion in fall 2026. [Next door: a hospital campus with 24/7 emergency care]
2. **Specialists are choosing Chelan.** Over the past year the local hospital added dermatology, ear-nose-and-throat and orthopedic physicians, launched a cardiology service and grew its primary care and in-hospital physician teams. [4: specialties added at the local hospital, 2025–26]
3. **Most other care is in Wenatchee.** The region’s larger medical center, and every nursing home in the area, is about 40 miles from the lake. [40 mi: to the regional medical center and nursing homes]
4. **Virtual care already reaches the region.** North Central Washington’s largest health system launched a virtual care platform in 2024, so care by video can build on what is already here. [2024: regional virtual care platform launched]
5. **Older adults welcome technology that helps.** Nationally, 64% of older adults plan to install a medical emergency response system to help them live safely at home. [64%: plan to install an emergency response system (national)]
6. **Walkable design is health care too.** A town-wide healthy-living effort in Albert Lea, Minnesota, built around walking, was projected to add 2.9 years to residents’ life expectancy. [+2.9 yrs: projected life expectancy gain in Albert Lea, Minnesota]
7. **Apple Blossom Commons is planned around care close by.** Senior neighborhoods beside the hospital campus, clinics and therapy in the Wellness District, and technology that gives caregivers more time for people.

**A closer look**

**Chart: Beyond the hospital next door, most care is 40 miles or more away** (rangeBars)

*Approximate road miles from the Apple Blossom Commons site.*

| Place | Distance |
|---|---|
| Hospital campus | Next door |
| Regional medical center, Wenatchee | About 40 miles |
| Nursing homes, Wenatchee area | 40–48 miles |
| Nearest Life Plan Community, Spokane | About 165 miles |

For older adults, the distance to care shapes everyday life. A follow-up visit that means an 80-mile round trip is easy to put off.

*Source: Apple Blossom Commons competitive supply research (August 2026). Distances are approximate road miles.*

**Chart: The people who give care** (statTiles)

*Healthcare workers in the Wenatchee area.*

| Number | Label |
|---|---|
| 1,330 | registered nurses |
| 1,120 | home health and personal care aides |
| 440 | nursing assistants |

Senior care across the country faces a shortage of caregivers, and the valley is no exception. Apple Blossom Commons plans workforce homes nearby, and technology that takes routine work off caregivers’ plates.

*Source: U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics, Wenatchee area (May 2025).*

**Our principles for technology**

Technology at Apple Blossom Commons is planned to take on routine work, so the people who give care have more time for the people they care for. Every idea is a concept being explored, guided by five principles.

- **People first.** Technology supports the relationship between residents and their doctors, nurses and caregivers. It never replaces it.
- **Residents decide.** How personal information is used is settled with residents before anything is built.
- **Build on what’s here.** Start from the region’s existing hospitals and virtual care before adding anything new.
- **Right-sized.** Match ambition to a small community: a small hospital with a long reach, not a big-city medical district.
- **Together.** Plan places, people and technology at the same time.

**How Apple Blossom Commons responds**

Apple Blossom Commons is planned so that care is part of everyday life: a short walk away, connected by video when that is easier, and supported by technology that gives caregivers more time for people.

| What we found | What's planned |
|---|---|
| Most care beyond the hospital is 40 miles away | Senior neighborhoods planned beside the hospital campus, so care is a short walk from home [link: Heritage Grove] |
| Specialists and clinics are growing locally | A Wellness District with space for primary care, dental, eye care, physical therapy and a pharmacy [link: Wellness District] |
| Regional virtual care already exists | Homes and clinic rooms ready for video visits with specialists *(concept)* |
| Older adults want to stay safely at home | Homes designed for aging in place, with optional sensors that can alert a caregiver *(concept)* |
| Caregivers are stretched | Workforce homes planned nearby, and technology that takes on routine tasks *(concept)* |
| Walking is good medicine | Level paths, trails and a small village designed so everyday errands are a pleasant walk |

Apple Blossom Commons will grow in phases over many years. All plans and technology ideas described here are illustrative concepts and may change.

**What this means for you**

- **If you live in the valley now:** More care close to home helps everyone, not only future residents. A Wellness District next to the hospital campus would mean more appointments in Chelan and fewer drives to Wenatchee.
- **If you’re planning your own future or a parent’s:** Being near a hospital campus, with clinics and therapy a short walk away, can make it easier to stay independent longer, and gives families peace of mind.
- **If you invest in or provide healthcare or senior living:** Clinics, a pharmacy and specialist offices next to a growing hospital campus serve residents, staff and the wider valley. Technology is planned to extend people, not replace them, which keeps the model practical.
- **If you buy land or build homes:** Homes near care and services are what older buyers look for. Designing for aging in place from the start is easier and cheaper than adding it later.

**What comes next**

- The clinics and health services planned for the Wellness District
- Which technology ideas move forward first, and how residents will help decide how their information is used
- How homes, the hospital campus and the village connect on foot
- Home health and hospice services available to residents

**About the data:** Distances are approximate road miles from the Apple Blossom Commons site. Examples from other communities come from their own published materials and news coverage; results elsewhere may not repeat here. We’ll update this report as plans and information develop.

| Source | What we used it for | Date |
|---|---|---|
| Local hospital district public materials (year overview and EMS building project page) | Specialists and services added at the local hospital; new EMS building | January–September 2026 |
| Washington State Department of Health | Hospital service area; nursing care locations | 2023; accessed August 2026 |
| U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics | Wenatchee-area healthcare workforce | May 2025 |
| Regional health system announcement and news coverage | Regional virtual care platform | October 2024 |
| Published materials of the communities and programs named | Examples from other communities, and lessons from projects that fell short | 2009–2026 |
| AARP, 2024 Home & Community Preferences Survey | What older adults want (national) | 2024 |

**Related:** growing-older-by-the-lake, village-economy

---

### Report 5: Learning from Others

*What Eleven Communities Teach Us About Building for Later Life* · `/research/learning-from-others` · 9-page PDF · status: draft

**Card:** Six lessons from eleven communities across the country that built for later life, and how Apple Blossom Commons applies them.

**Meta description:** Six lessons from eleven small-town communities that built homes and care for later life, and how Apple Blossom Commons applies them near Lake Chelan.

**Lead:** Communities like the one planned at Apple Blossom Commons have succeeded in small towns across the country. The ones that did best started modestly, connected homes to care, chose beautiful settings and grew patiently over decades. There is no Life Plan Community anywhere in North Central Washington, so we studied eleven elsewhere. They are examples, not promises: each grew in its own place and time.

**Key findings**

1. **The best communities started small and grew for decades.** Rogue Valley Manor opened in a single building in 1961 and now serves about 1,000 residents. Givens Estates opened with 78 apartments in 1979 and served about 750 residents by 2022. [~1,000: residents today at a community that opened in one building in 1961]
2. **Being first in a region can build lasting demand.** Wake Robin, which describes itself as Vermont’s only Life Plan Community, reports waits of 8 to 15 years or more for most of its homes. [8–15+ yrs: waits for most homes at Wake Robin]
3. **Well-run communities stay full.** Wake Robin’s independent living homes were 92–93% occupied from 2021 to 2023. Givens Estates reported about 99% occupancy across all levels of care in 2022. [92–99%: occupancy at two well-run communities]
4. **Cottages lead to care only when planned that way.** Where cottages sit inside a Life Plan Community, they are a front door to care. Where they stand alone, no care was added even after nearly 20 years.
5. **Setting matters.** The communities most like Chelan all sit beside a lake, a river or mountains, and their settings help draw residents from beyond the local area.
6. **Affordable senior homes thrive as good neighbors.** In Durango, Colorado, land was provided for $10 for 53 affordable senior apartments, run as their own property with their own financing. [$10: for the land under 53 affordable senior apartments]
7. **Apple Blossom Commons is planned with these lessons in mind.** A first phase sized to real demand, homes connected to care from the start, affordable homes as good neighbors, and growth over decades beside the lake.

**A closer look**

**Chart: Life Plan Communities grew over decades; active-adult homes sold faster** (timeline)

*Year each community opened, and its latest reported size.*

| Community | Type | Opened | Latest |
|---|---|---|---|
| Rogue Valley Manor | Life Plan Community | 1961 (One building) | About 1,000 residents (2026) |
| Givens Estates | Life Plan Community | 1979 (78 apartments) | About 750 residents (2022) |
| Wake Robin | Life Plan Community | 1993 (Opened) | About 400 residents (2023) |
| Del Webb at Lake Oconee | Active-adult homes | 2007 (Opened) | 775 homes sold (2024) |
| Latitude Margaritaville Watersound | Active-adult homes | 2021 (Opened) | 2,000+ homes sold (2024) |

Planning each part of a community on its own timeline, and not building ahead of demand, is the thread that runs through every success here.

*Source: Community disclosure statements, operator websites and developer announcements, as compiled in Apple Blossom Commons comparable-community research (August 2026).*

**Chart: Cottages are about a quarter to two-fifths of independent living homes** (stackedShare)

*Independent living homes by type.*

| Community | Cottages | Apartments |
|---|---|---|
| Wake Robin | 98 (39%) | 152 (61%) |
| Givens Estates | 126 (27%) | 341 (73%) |

Note: Givens Estates cottages include its houses and duplexes.

What matters most is the connection: at both communities, cottage residents can move to more support on the same campus.

*Source: Wake Robin year-end snapshot (2023); Givens Estates disclosure statement (2024).*

**How Apple Blossom Commons responds**

No single community we studied combines everything planned at Apple Blossom Commons: a Life Plan Community, a neighborhood with every level of care next door, a hospital campus beside them, family homes, and a small village of cafés and shops. That is why we drew lessons from each, rather than copying one.

| What we found | What's planned |
|---|---|
| Start small and grow with demand | A first phase sized to real interest, with each later neighborhood added as demand is shown |
| Being first in a region builds lasting demand | The first Life Plan Community in North Central Washington, at Orchard Grove [link: Orchard Grove] |
| Connect cottages to care | Cottages and townhomes in Orchard Grove, with Heritage Grove next door for more support if it’s ever needed [link: Heritage Grove] |
| Plan for care from the start, even if it opens later | Care neighborhoods set aside on the master plan from day one, beside the hospital campus |
| Setting matters | Homes overlooking the valley, near the lake, with trails and parks woven through |
| Affordable homes work best as good neighbors | Income-restricted senior townhomes planned as their own neighborhood within the community |
| Patient, experienced partners | Working with experienced senior living and housing partners for each part of the plan |

Apple Blossom Commons will grow in phases over many years. All plans described here are illustrative concepts and may change.

**What this means for you**

- **If you live in the valley now:** Communities like these grew slowly, over decades, and became valued parts of their towns. Apple Blossom Commons is planned the same way: one neighborhood at a time, as real demand appears.
- **If you’re planning your own future or a parent’s:** Life Plan Communities elsewhere stay nearly full and some have long waitlists, a sign that residents value having every level of care in one place. Joining an interest list early is common.
- **If you invest in or provide senior living:** The strongest precedents pair a first-mover position with a modest first phase and an experienced operator. Absorption differs sharply by product, so each part of the plan should be planned on its own terms.
- **If you buy land or build homes:** Active-adult homes near a lake sell steadily, and faster than care-based homes. Homes planned next to a care neighborhood offer something stand-alone subdivisions don’t.

**What comes next**

- The size and timing of the first neighborhoods at Orchard Grove and Heritage Grove
- Home types, prices and contract options, including whether entrance fees or rental options will be offered
- The senior living and housing partners involved

**About the data:** Every figure comes from the communities’ own published materials, public filings or news coverage, and is dated where it appears. Some communities publish less than others, and results elsewhere may not repeat here. We’ll update this report as we learn more.

| Source | What we used it for | Date |
|---|---|---|
| Givens Estates disclosure statement | Size, home mix, occupancy | 2024 (data to December 2022) |
| Wake Robin year-end snapshot and website; Vermont financial examination | Size, home mix, occupancy, waitlist | 2018–2023 |
| Rogue Valley Manor, Kendal at Hanover and Touchmark websites and public filings | History, size and contract options | 2024–2026 |
| Developer announcements and local news coverage | Latitude Margaritaville Watersound, Del Webb at Lake Oconee, Cresswind at Lake Harris | 2021–2026 |
| HUD case study; California Tax Credit Allocation Committee; Housing Authority of Chelan County and the City of Wenatchee | Miremonte, Truckee-Donner and Deaconess affordable senior apartments | 2020–2026 |
| Apple Blossom Commons comparable-community research | Selection, scoring and comparison of all eleven | August 2026 |

**Related:** growing-older-by-the-lake, care-close-by

---

### Report 6: The Village Economy

*Shops, Dining and Gathering Places for Neighbors and Visitors* · `/research/village-economy` · 9-page PDF · status: draft

**Card:** Who a small village would serve, what the valley already has, and how shops, dining and gathering places can grow with demand.

**Meta description:** Who a small village at Apple Blossom Commons would serve, what the Lake Chelan Valley already has, and how shops and dining can grow with demand.

**Lead:** The Lake Chelan Valley already has a strong economy built on its wineries, orchards and visitors. A small village at Apple Blossom Commons can serve future residents and the whole valley by adding what’s missing, and growing only as fast as demand allows.

**Key findings**

1. **Visitors already spend generously in the county.** Visitors spent about $675.5 million in Chelan County in 2024, supporting about 6,700 jobs and $71 million in state and local taxes. [$675.5M: visitor spending in Chelan County, 2024]
2. **Overnight visits keep growing.** Overnight visits to Chelan County grew about 5.8% a year over the past five years. [5.8%: yearly growth in overnight visits]
3. **Residents bring a steady base.** People living at Apple Blossom Commons are projected to spend about $15 million a year on everyday needs, from groceries and dining to health care. [~$15M: a year in everyday spending by future residents]
4. **Neighbors carry most of the demand.** The roughly 3,000 households within about five miles outspend future residents about five to one in most categories, so the village is planned to serve the whole valley. [5 : 1: nearby households to future residents, in most categories]
5. **The village adds what’s missing.** Groceries, coffee and wine shops are already well served nearby, so the village keeps those small and focuses on dining, health care, recreation and everyday services.
6. **A home for Lake Chelan wineries.** Shared winemaking space and partner tasting rooms are being explored for the valley’s 40-plus wineries, alongside a hall for weddings and community events. [40+: Lake Chelan wineries]
7. **Apple Blossom Commons is planned as a village that grows with demand.** Everyday services and health care first, then wine, food and gathering places as neighbors and visitors arrive, with no storefronts built ahead of demand.

**A closer look**

**Chart: Nearby households outspend future residents about five to one** (groupedBars)

*Yearly spending, $ millions. Estimates of spending capacity, not sales.*

| Category | Future residents | Households within five miles |
|---|---|---|
| Groceries | $2.3M | $14.6M |
| Recreation | $1.6M | $9.3M |
| Dining out | $1.3M | $6.9M |
| Shopping | $0.9M | $4.4M |
| Personal care | $0.4M | $2.1M |

That is why the village is planned to serve the whole valley, not only the people who live at Apple Blossom Commons. Hundreds of people are also expected to work on or near the site, adding daytime customers for cafés and services.

*Source: Apple Blossom Commons consumption and spending study (November 2026), base case, using the U.S. Bureau of Labor Statistics Consumer Expenditure Survey 2024 and Census income data.*

**Chart: Food, shopping and recreation make up nearly half of visitor spending** (bars)

*Visitor spending in Chelan County, 2024, $ millions (total about $675.5 million).*

| Category | Spending |
|---|---|
| Lodging | $284M (42%) |
| Food and drink | $135M (20%) |
| Shopping | $108M (16%) |
| Recreation | $81M (12%) |
| Getting around | $68M (10%) |

Visitor spending helps keep restaurants, tasting rooms and shops open year-round for the people who live here. The village’s visitor businesses are planned to open only as visits are measured.

*Source: BERK Consulting, Chelan County Tourism Impact Study (February 2026). Shares rounded.*

**Built in phases, tied to demand**

The village would open in stages, each one when the residents, neighbors and visitors to support it are there. Nothing would be built ahead of demand.

- **Phase 1.** Opens with everyday needs that don’t depend on visitors: a pharmacy and primary care, dining, fuel, offices, coworking and childcare.
- **Phase 2.** Follows the hotel and the first neighborhoods: partner tasting rooms, a market hall, an event hall and shared winemaking space, plus more health care and services.
- **Phase 3.** Adds what needs a fuller community or proven visitor numbers, such as a brewery taproom, a pub and outdoor gear.

**How Apple Blossom Commons responds**

The village at Apple Blossom Commons includes the Chelan Wine Village and the Wellness District. It is planned to add to downtown Chelan, not compete with it.

| What we found | What's planned |
|---|---|
| Visitors already spend heavily on food, shopping and recreation | A Wine Village of cafés, tasting rooms, a market hall and gathering places *(concept)* [link: Chelan Wine Village] |
| Nearby households carry most demand | Businesses planned to serve the whole valley, not only the people who live at Apple Blossom Commons |
| Some categories are already well served | Keep groceries, coffee and wine shops small and leave room for downtown |
| Care and clinics are needed close to home | A Wellness District beside the hospital campus, with clinics, therapy and a pharmacy [link: Wellness District] |
| Lake Chelan wineries are a regional strength | Shared winemaking space and partner tasting rooms for existing wineries *(concept)* |
| Families need childcare and flexible workspace | Childcare, coworking and professional offices in the first phase |
| Demand builds over time | Phases tied to signed tenants and real visitor numbers, with no empty storefronts |

Apple Blossom Commons will grow in phases over many years. All plans, business types and phases described here are illustrative concepts and may change.

**What this means for you**

- **If you live in the valley now:** More restaurants, health care and everyday services close to home, without duplicating the grocery stores, coffee shops and wine shops you already rely on downtown.
- **If you run a local business or winery:** The village is planned with space for local operators: market hall stalls, partner tasting rooms, shared winemaking and small storefronts. Early conversations with local producers will shape it.
- **If you’re planning to live here:** Coffee, dinner, a doctor’s visit and a walk on the trails, all within a short stroll of home, in a village that grows as the community does.
- **If you invest or build:** A program built bottom-up from three customer groups and phased to signed demand. Health care, everyday services and office users anchor early phases; visitor-driven uses follow measured visitation.

**What comes next**

- Opportunities for local businesses, producers and wineries to take part
- The timing of the first village phase and the Wellness District
- A study of how visitors move through the valley, to guide when visitor businesses open

**About the data:** Spending figures are estimates of what households could spend, not sales forecasts for any one business, and are rounded for readability. Nearby-household and visitor spending rest on planning assumptions that a visitor study and conversations with local businesses will refine. Rents and business-level figures are shared with partners separately. We’ll update this report as plans and information develop.

| Source | What we used it for | Date |
|---|---|---|
| BERK Consulting, Chelan County Tourism Impact Study | Visitor spending, jobs, taxes, overnight visits | February 2026 (2024 data) |
| U.S. Bureau of Labor Statistics, Consumer Expenditure Survey | Household spending patterns | 2024 |
| U.S. Census Bureau, American Community Survey | Household incomes | 2020–2024 |
| Apple Blossom Commons consumption and spending study; tenant feasibility study | Resident and nearby spending; business mix and phasing | November 2026 |
| Child Care Aware of Washington, Chelan County profile | Childcare need | 2024 |

**Related:** care-close-by, learning-from-others

---

### Planned reports

- Report 1: Chelan Today: The regional economy and community (showOnSite: true)
- Report 2: Who Chooses Chelan: Who is moving to the valley, and why (showOnSite: true)
- Report 7: Homes for Every Stage: Housing and the local workforce (showOnSite: false)
- Report 8: Planning for Growth: Utilities, roads and services (showOnSite: false)

