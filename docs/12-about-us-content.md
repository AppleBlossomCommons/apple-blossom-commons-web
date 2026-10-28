# About Us page content pack (v1)

Drafted 2026-10-28. Put this file in the repo as `docs/12-about-us-content.md`. It adds the About Us page and replaces the "Stewardship" placeholder at `/about`. The public copy rules in `CLAUDE.md` apply to every line.

**Voice:** warm, friendly and plain, like the other public pages. Second person where it fits, short sentences, no hype words, no exclamation marks. This page should feel like meeting people, not reading a company profile.

**Andy's name:** "Andy Yeung" on first mention, "Andy" after that.

Words in [brackets] are notes for the builder, not copy. Everything about Andy needs Andy's sign-off before launch (see section 9).

---

## 1. Navigation and footer changes

**Main nav (new):** The Plan · Districts · Site Tour · How Can I Participate? · About Us · [button] Partner with Us

[In `components/site/nav.ts`, add `{ href: "/about", label: "About Us" }` to `mainNav` after "How Can I Participate?". Check the header at about 1024px wide: with five text links plus the button, it may need to switch to the mobile menu a little earlier.]

**Footer, "About" column (new):** About Us (/about) · Research Library (/research)

[Rename the footer link "Our Approach" to "About Us". Same URL.]

**Page metadata**
- Title: About Us
- Description: Meet the people behind Apple Blossom Commons, a community being planned slowly and carefully near Lake Chelan.

---

## 2. Intro [soft image header, no dark background]

- **Eyebrow:** About us
- **Heading:** A place to call home, planned with patience
- **Text:** Apple Blossom Commons is a community being planned near Lake Chelan for people at every stage of life. Behind it are people who care about this place and want to get it right, even if that takes time.

[Header image: AI, no people. See section 8.]

---

## 3. Our story [id="our-story"]

- **Heading:** It started with an orchard
- **Text:**
  The land where Apple Blossom Commons will grow was once orchard, rows of fruit trees on the edge of town.

  When Andy Yeung looked at it, he saw the start of a village. A place where retirees and young families could live side by side. Where a cup of coffee, a visit to the doctor and a walk among the trees could all be close to home. Where people could stay in the community they love as their needs change.

  That idea became Apple Blossom Commons. It is still taking shape, and it will grow slowly, one neighborhood at a time, over many years.

[Image beside the text: AI, no people, labeled "Illustrative concept". Apple blossoms in the foreground with an orchard row behind. See section 8.]

---

## 4. Meet Andy [id="andy"; photo + text, side by side on desktop, stacked on mobile]

- **Photo:** `andy-yeung-portrait` (4:5) on desktop; `andy-yeung-square` (1:1) on small screens if the layout needs it.
- **Alt text:** Andy Yeung, founder of Apple Blossom Commons, standing on a hillside above Lake Chelan with mountains in the background.
- **Caption (optional):** Andy, on a winter afternoon above the lake.
- **Name line:** Andy Yeung
- **Title line:** Founder
- **Text:**
  Apple Blossom Commons began with Andy Yeung's vision of a community with a true village feel, a place that welcomes seniors and families alike.

  Andy leads Chelan Village, LP, which looks after the land and the long-term plan. He has guided Apple Blossom Commons from the beginning, and his idea is still at its heart: a place where people feel at home, with neighbors close by and care within reach.

- **Pull quote (optional, Andy to approve):**
  > "Our vision was to create a master-planned community with a village feel... a lifestyle that balances comfort, convenience, and community."
  > — Andy Yeung

  [This quote comes from the project description Andy prepared in 2023 for the original Apple Blossom Center plan. Use it only if Andy is happy with it, or replace it with a sentence in his own words. A shorter version that reads more warmly: "A lifestyle that balances comfort, convenience and community." Never invent a quote for Andy.]

---

## 5. What we care about [id="values"; five short items with small icons or photos]

- **Heading:** What we care about
- **Items:**
  1. **Taking our time.** Good places aren't built in a rush. Each neighborhood comes when there's real need for it.
  2. **A home for every chapter.** Families, active adults and people who need more care, all in one community, so a move doesn't mean leaving your neighbors.
  3. **Care, close by.** Senior homes are planned within a short walk of the hospital campus.
  4. **Protecting what makes Chelan special.** The views, the open space, the orchards and a small-town pace. A large orchard preserve is part of the plan.
  5. **Adding to downtown, not competing with it.** The village is sized for the people who live nearby, so it adds to what downtown Chelan already offers.

- **Closing line:** And we listen. Supportive, critical or undecided, every view helps make a better plan. [Link "every view helps make a better plan" → /participate#neighbors]

---

## 6. Who we are [id="who-we-are"]

- **Heading:** Who we are
- **Text:**
  Chelan Village, LP owns the land and looks after the long-term plan. Think of us as caretakers. We aren't planning to build every home ourselves. Our job is to shape the plan, take care of the land, and welcome builders, care providers and local businesses who share our long view.

  Like any proposal, each neighborhood goes through Chelan's public review process before it is built.

- **Subheading:** Center or Commons?
- **Text:** You may see two names. Apple Blossom Center is the name of the land and its planning framework. Apple Blossom Commons is the community we hope to grow there: the homes, the paths, the village and the people. Same place, same plan.

---

## 7. Say hello [id="say-hello"; three cards, same style as the doorway cards]

- **Heading:** Come say hello
- **Text:** Whether you live in Chelan, are thinking about living here or want to build something with us, we'd love to hear from you.
- **Cards:**
  - **Stay in the loop.** Get news as homes and care options take shape. → Join the update list [/participate#update-list]
  - **Share your views.** Tell us what you think about the plan, whatever that is. → Give feedback [/participate#neighbors]
  - **Build with us.** For investors, operators and land buyers. → Partner with Us [/partners]

---

## 8. Images

Rules from the Phase 1 pack still apply: AI images show **no people**, anything showing Apple Blossom Commons is labeled "Illustrative concept", no crowds, no dark backgrounds behind text.

| Slot | Source | Brief |
|---|---|---|
| Intro header | AI, no people | Quiet orchard lane in spring bloom, lake glimpsed between the trees, soft morning light |
| Our story | AI, no people (label: Illustrative concept) | Close-up of apple blossoms on a branch, orchard rows softly out of focus behind |
| Meet Andy | Andy's photo (supplied) | Files below |
| What we care about | Optional icons, or reuse collage images | Keep small; this section should read quickly |

**Andy's photo files** [put in `public/images/about/`]
- `andy-yeung-portrait.webp` / `.jpg`: 1200 × 1500 (4:5). Main image.
- `andy-yeung-square.webp` / `.jpg`: 800 × 800 (1:1). Small screens or a round avatar.

[Use `next/image` with the WebP and explicit width and height. Not `priority` (it's below the fold). Suggested `object-position: 70% 30%` so Andy stays in frame if the box is cropped. Rounded corners to match the cards.]

**Photo edits made:** cropped to Andy only (the second person is out of frame), and the winery logo on Andy's wine glass was digitally removed so no outside brand appears on the page. Nothing else was changed.

**AI prompts** (same template as the Phase 1 pack):
- *Intro header:* "Photorealistic, a quiet orchard lane with rows of apple trees in spring bloom, a calm lake glimpsed between the trees, soft morning light. Pacific Northwest high-desert lake country, calm and quiet, shallow depth of field, soft film grain. No people, no animals, no text, no logos, no recognizable landmarks."
- *Our story:* "Photorealistic, close-up of a branch of white and pink apple blossoms, orchard rows softly out of focus behind, warm late-afternoon light. Pacific Northwest high-desert lake country… No people, no text, no logos, no recognizable landmarks."

---

## 9. Open items for Andy (before launch)

1. **Approve the Meet Andy text and the "Founder" title.**
2. **Pull quote:** keep the 2023 quote, use the shorter version, write a new line in his own words, or drop it.
3. **Photo:** OK with this photo, the crop and the logo removal? A wine glass fits Chelan's wine country, but if he'd rather have a photo without one, a new outdoor photo with the lake behind would work in the same slot.
4. **Our story:** the page says the land was orchard country without naming the former owner. Name them only if Andy wants to and they agree.
5. **More people later?** The page is built so a "Our team" row can be added under Meet Andy if others should be introduced.

---

## 10. Copy check (done 2026-10-28)

- Public name "Apple Blossom Commons" used; "ABC" not used. "Apple Blossom Center" explained as the land and planning framework, not a second project.
- The City, its Council and staff are not named or addressed. Approvals are "Chelan's public review process", matching the FAQ.
- Lake Chelan Health is not named; the page says "the hospital campus".
- No unit counts, acreage, prices, dates or "walkable" claims. No "growth corridor", "density", "luxury", "world-class" or exclamation marks.
- Growth described as slow and in phases, over many years.
- No made-up facts about Andy: his role, his leadership of Chelan Village, LP and the original village-feel vision for seniors and families come from project records. The quote is his own 2023 wording.
