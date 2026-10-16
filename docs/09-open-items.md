# 09 — Open items

*As of Oct 16, 2026. Don't resolve these by guessing. Ask the owner, and keep contested figures off public pages until they're answered.*

## Data conflicts

- **Heritage Grove:** ~419 is either units or beds. Unresolved.
- **Grand Orchard Hotel:** the masterplan text says 65 units; the stats workbook says 115 keys.
- **Apple Blossom Residence:** a 75,000 sf building appears on the PDF but not in the workbook. The unit count ranges from 126 to 332 depending on the tab.
- **Site-wide unit total:** ~986 to ~1,121 depending on the source. Don't publish one.
- **Density** for Apple Blossom East "remains under staff and consultant review" (from the masterplan's Comprehensive Plan page).

## Facts that need reconfirming before public use

- Zoning and Development Agreement details (Lookout PDD / W-I overlay; Feb 2023 Development Agreement amendment permitting multifamily) come from a January 2024 report and are flagged for reconfirmation. The parcel record covers 24.6 of about 160 acres.
- Utility capacity has **not been assessed**. Providers: Chelan County PUD (power), City of Chelan (water and sewer), Isenhart Irrigation.
- Lake Chelan Health facts: confirm each source is current. Don't name them as a partner yet.
- The walk-ring radii on the masterplan need confirming with the architect.
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

- **Roundel positions:** `labels` in `data/district-geometry-v1.json` are stored as `[x, z]` for the 3D prototype (z = −y). The site flips them once in `lib/districts.ts`. After flipping, the Heritage Grove roundel and Summit's second (north) roundel still fall just outside their traced outlines. Check them against the masterplan.
- **Site perimeter:** no site boundary exists in `data/`, so the Today view draws the convex hull of all traced parcels as a stand-in (`sitePerimeterPath()` in `lib/districts.ts`). Replace with the georeferenced boundary when it arrives.
- **Plan map scale bar:** no documented scale for the traced Districts sheet, so the plan shows a north arrow but no scale bar.
- **Roads:** SR 97A and Apple Blossom Drive have no geometry in `data/`, so the plan can't draw them yet.
- **Wellness District summary** in `data/districts.json` mentions "rehabilitation", which isn't in the program in `03-content-and-tiers.md`. Confirm or remove.
- **Acreage source:** "about 160 acres" shows "Source TBC" until its source is named (`data/sources.json` → `acreage-tbc`).
