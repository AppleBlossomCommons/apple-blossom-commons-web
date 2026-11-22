# 09 — Open items

*As of Oct 16, 2026; updated Oct 28, 2026. Don't resolve these by guessing. Ask the owner, and keep contested figures off public pages until they're answered.*

## Data conflicts

- **Heritage Grove:** ~419 is either units or beds. Unresolved.
- **Grand Orchard Hotel:** the masterplan text says 65 cottages; the stats workbook says 115 keys. Both may be right if 115 is 65 cottages plus about 50 hotel apartments. Confirm with the architect before publishing any count. ("65 hotel cottages" was removed from the public facts on Oct 28, 2026.)
- **Apple Blossom Residence:** a 75,000 sf building appears on the PDF but not in the workbook. The unit count ranges from 126 to 332 depending on the tab.
- **Apple Blossom Residence outline:** retraced from the masterplan on Nov 18, 2026 to include its green edge along the roads and creek (`docs/04-design-direction.md`, "Painted areas"). It is a traced interpretation; confirm the district boundary with the architect before stating any acreage for it.
- **Heritage Grove and Orchard Preserve outlines:** Heritage Grove's outline and the Preserve's piece between Discovery Commons and Heritage Grove were retraced from the masterplan on Nov 18, 2026 to fill their whole areas. Same caveat: traced interpretations, not survey boundaries.
- **Site-wide unit total:** ~986 to ~1,121 depending on the source. Don't publish one.
- **Density** for Apple Blossom East "remains under staff and consultant review" (from the masterplan's Comprehensive Plan page).

## Facts that need reconfirming before public use

- Zoning and Development Agreement details (Lookout PDD / W-I overlay; Feb 2023 Development Agreement amendment permitting multifamily) come from a January 2024 report and are flagged for reconfirmation. The parcel record covers 24.6 of about 160 acres.
- Utility capacity has **not been assessed**. Providers: Chelan County PUD (power), City of Chelan (water and sewer), Isenhart Irrigation.
- Lake Chelan Health facts: confirm each source is current. Don't name them as a partner yet.
- **Walk rings:** the radii need confirming with the architect. On Oct 28, 2026 they were measured from the dashed 5/10/15-minute rings printed on the masterplan sheet (about 111, 336 and 565 sheet pixels). They aren't in proportion to walking time. The masterplan centers its rings on the hospital campus; the site centers them on the village, which stands in for Harvest Square (owner decision, Oct 28, 2026). Harvest Square's exact spot isn't mapped. All of this lives in one place: `lib/walk-rings.ts`.
- The masterplan numbering of districts is assumed to follow the legend order.

## Assets that don't exist yet

- Logo or wordmark, photography, drone imagery, renderings.
- Vector, CAD or GIS district boundaries and a georeferenced site boundary.
- A decision on a production map tile provider and a video host.

## Decisions waiting on the owner or Andy

- The email address(es) that receive partner inquiries.
- The sign-in service and file storage for Partner Access.
- Confidentiality acknowledgement wording.
- Public research summary text (five summaries; see `03-content-and-tiers.md`).
- Drone imagery: scope and budget.

## Found while building the Home page (Oct 16, 2026)

- **Roundel positions:** `labels` in `data/district-geometry-v1.json` are stored as `[x, z]` for the 3D prototype (z = −y). The site flips them once in `lib/districts.ts`. After flipping, Summit's second (north) roundel still falls just outside its traced outline. Check it against the masterplan. (Heritage Grove's roundel is inside its outline since the outline was retraced on Nov 18, 2026.)
- **Site perimeter:** no site boundary exists in `data/`, so the Today view draws the convex hull of all traced parcels as a stand-in (`sitePerimeterPath()` in `lib/districts.ts`). Replace with the georeferenced boundary when it arrives.
- **Plan map scale bar:** no documented scale for the traced Districts sheet, so the plan shows a north arrow but no scale bar.
- **Roads:** SR 97A and Apple Blossom Drive have no geometry in `data/`, so the plan can't draw them yet.
- ~~**Wellness District summary** in `data/districts.json` mentions "rehabilitation", which isn't in the program in `03-content-and-tiers.md`. Confirm or remove.~~ **Resolved Oct 28, 2026:** the masterplan's Wellness sheet lists clinics, physiotherapists and rehabilitation centers.
- **Acreage source:** "about 160 acres" shows "Source TBC" until its source is named (`data/sources.json` → `acreage-tbc`).

## Added by the Plan and districts content pack (Oct 28, 2026)

From `11-plan-and-districts-content.md`, section 5.

- **55+ wording:** the district data used to say "55+ cottage homes", but the FAQ answers "Is senior living 55+?" with "too early to say". The site now says "active adults". Owner to pick one.
- **"Affordable senior housing"** in Orchard Grove: is it meant as income-restricted housing? Until answered, it's "a range of senior townhomes".
- **Masterplan renderings:** ask the architect for full-size originals, whether each is AI-generated or a licensed photo, and permission for web use. Until then the site uses labeled placeholders.
- **Self-driving carts:** "Lanes without cars" on The Plan describes "low-speed shuttles or carts" as a concept. It's built; owner to confirm it should be public before launch.

## No orchards in the plan (Nov 13, 2026)

Per Andy: Apple Blossom Commons will not include orchards. All public copy, image notes, alt text and tour labels that mentioned orchards were rewritten (hero subline, About, Plan, Participate FAQ, home collage and doorway cards, tour 12). The About "Our story" section now opens "It started with a view" instead of describing the land's past orchard use.

## Added by the Plan vision content pack (Nov 13, 2026)

From `14-plan-vision-content.md`, section 11.

- **Life Plan Community:** confirm with Andy that Orchard Grove and Heritage Grove together are "the Life Plan Community", and whether the Wellness District's medical-assisted living is part of it.
- **Contract model** (entrance fee, rental, other): not decided. The FAQ stays "too early to say".
- **"Affordable senior housing"** on the masterplan: what it means (carried from `docs/11`). The Plan says "Homes at more than one price" until answered.
- **Self-driving shuttles, robots and an AI assistant:** shown on The Plan as concepts. Revisit once the Connected Community work has an operating partner.

Raised while building it:

- **"Meals worth sharing"** drops "and orchards" from the pack's "food from the valley's own farms and orchards", to follow the no-orchards decision above. Owner to confirm, or restore it if the valley's orchards are fine to mention.
- **Two FAQ wordings:** The Plan asks "Is it only for people 55 and older? Will there be entrance fees?" and its care answer includes nursing care, as in `docs/14`. The Participate FAQ still says "Is senior living 55+?" and leaves out nursing care. Pick one wording for both pages.
- **Image alt text:** `docs/14` gives alt text only for the five village images. The pillar and Heritage Grove alt texts in `lib/place-images.ts` are drafts; rewrite each one to match the chosen picture, especially the stock photos.
- **Image credits:** licensed stock needs its source and license recorded (`docs/14`, 8.3). There is no image-credits list yet.
- **Village images show people (Nov 13, 2026):** the five village pictures in `public/images/plan/` are AI renderings with a few people in them, against the `docs/14` §8 no-people rule for AI images. The owner chose to publish them for now; Andy still needs to approve, or they get regenerated without people. They were also 1264 × 848 and were upscaled to 1600 × 1067, so a larger export would look sharper. Vintner's Walk has faint lettering on a shop window.
- **Pet-friendly homes photo:** `heritage-pets.webp` is a stock photo (older couple with two dogs), not the AI image `docs/14` planned. Its source and license are not recorded yet. Originals of all six pictures are in `reference/plan-image-originals/`.
- **More Plan images with people (Nov 13, 2026):** `vision-home` and `vision-care` are AI images with people, published under the same owner decision as the village images. `vision-care` was planned as licensed stock; it is AI, so it carries the "Illustrative concept" label. Both were upscaled from 1264 × 848 to 2400 × 1600.
- **Fitness photo:** `heritage-fitness.webp` is a stock photo (older couple boxing), not the AI studio image `docs/14` planned. Its source and license are not recorded yet.
- **Care-level images with people (Nov 22, 2026):** `heritage-assisted`, `heritage-memory-care` and `heritage-nursing` are AI images with people (Gemini), not the licensed stock `docs/14` §8.3 planned. Published under the same owner decision as the village images; Andy still needs to approve. Upscaled from 1264 × 848 to 1600 × 1067; originals in `reference/plan-image-originals/`. The nursing image shows a small red car through the window on the left ("no cars" rule).
- **Technology pillar image held:** `vision-technology.webp` shows a robot with a face keeping a resident company and a self-driving shuttle outside. `docs/14` §10 leaves out "robots with faces", and CLAUDE.md says technology never replaces human care. The owner chose to publish it (Nov 13, 2026); Andy still to approve.

- **"Illustrative concept" label removed (Nov 22, 2026):** owner decision to stop showing the label on AI images site-wide (Plan photo cards and district place cards); it was distracting. The alt text still begins "Illustrative concept of …". `docs/14` §8 and `docs/10-content-v2.md` still ask for the label; Andy should confirm. The 3D model and map disclaimer ("Illustrative interpretation of the July 2026 masterplan") is separate and unchanged.
