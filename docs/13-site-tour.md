# 13 — Site Tour (/tour): build brief

*Content pack v1, prepared in Cowork on Oct 28, 2026. This brief replaces the integration plan in `06-virtual-site-tour.md`. Section 06 still describes how the prototype works.*

## 1. Decisions (owner, Oct 28, 2026)

| Topic | Decision |
|---|---|
| Approach | **Native rebuild.** The tour becomes part of the website: a client component on `/tour`, using the site's header, footer, fonts, buttons, focus ring and reduced-motion hook. No iframe. The prototype in `reference/virtual-site-tour/` is a reference for behavior only. Do not copy its CSS. |
| Map tiles | **Esri, used with an API key** (ArcGIS Location Platform account, free tier: 2M basemap tiles a month). This replaces the keyless `server.arcgisonline.com` tiles and the public OpenStreetMap tile server. Neither of those may ship. |
| Video host | **Vercel Blob**, public store, at stable addresses `tour/<tour id>.mp4`. |
| Audio | **Removed** from every clip. Phone audio can pick up private conversation and road noise. Clips play muted, and there is no audio control. |
| Data | `data/tours.json` is the one source for tour titles, routes, pins and landmarks (CLAUDE.md rule 4). |

## 2. Files in this pack

| Path | What it is |
|---|---|
| `docs/13-site-tour.md` | This brief |
| `docs/06-virtual-site-tour.md` | Same as before, with a note at the top that points here |
| `data/tours.json` | 16 tours: `id, order, title, subtitle, kind ("drive"/"walk"), duration (s), trimEnd? (s), orientation ("portrait"/"landscape"), video, poster, posterTime, sourceFile, status, route [[lat,lng]…] or point, anchors [{t, ll}], landmarks [{t, label}]`, plus `config.siteCenter` / `config.siteZoom` |
| `public/tour/posters/<id>.jpg` | 16 poster frames (≤1280 px on the long side, about 1.2 MB in total). Frames were chosen to avoid readable license plates. |
| `scripts/tour-videos/prepare.mjs` | Copies each original clip without re-encoding, strips the audio, ends it at `trimEnd` where set, and moves the file index to the front ("faststart") so playback starts quickly. Tested: 16 of 16 clips, 209 MB in total. |
| `scripts/tour-videos/upload.mjs` | Uploads the prepared clips to Vercel Blob and prints `NEXT_PUBLIC_TOUR_VIDEO_BASE`. Has a `--dry-run` flag. |
| `reference/virtual-site-tour/` | Prototype source (`index.html`, `tour-core.js`, `styles.css`, `tours.js`), for behavior reference |

`sourceFile` and `status` are for provenance only. Never show them on the page. (All 16 tours are verified, so the public page shows no status badges.)

## 3. Environment variables

| Name | Where | Value |
|---|---|---|
| `NEXT_PUBLIC_ESRI_API_KEY` | `.env.local`, and Vercel → Settings → Environment Variables (Production and Preview) | The owner provides it. **Never commit it.** It is a browser key, locked by Esri to referrer addresses, so it is safe in the client bundle but not in git. |
| `NEXT_PUBLIC_TOUR_VIDEO_BASE` | Same places | Printed by `upload.mjs`, e.g. `https://<store>.public.blob.vercel-storage.com/tour/` (ends with `/`) |
| `BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN` | `.env.vercel.local` only (for the upload script; git-ignored) | The store `abc-tour-videos` is connected with OIDC, and Vercel did **not** create a `BLOB_READ_WRITE_TOKEN` (confirmed Oct 28). Fetch these with `npx vercel login`, `npx vercel link`, then `npx vercel env pull .env.vercel.local`. Use a separate file so `.env.local`, which holds the Esri key, is never overwritten. The site itself doesn't need these: public blob URLs are plain links. |

Notes on the Esri key:
- **Referrers.** The key only works from the web addresses the owner entered when creating it (at least `https://apple-blossom-commons-web.vercel.app`, and `http://localhost` for local development, if they added it). Random Vercel preview URLs will get blank tiles unless they were added. If tiles fail with 403 or "Invalid token", check the referrer list before debugging code. The referrers and expiry date can't be edited without generating a new key.
- **Expiry.** Location Platform keys last up to one year. When the key is near expiry, the owner generates "API key 2" on the same credential, swaps the env var, then lets key 1 lapse.
- **If the key is missing,** the page must still work: video, tour list and landmarks still show, and the map area shows a calm linen panel reading "Map unavailable right now."

## 4. Map (Leaflet + Esri)

Install **Leaflet 1.9.4** (`leaflet`, plus `@types/leaflet` as a dev dependency). That's the version the prototype uses; check it is still the current stable 1.x before installing. Use plain Leaflet inside a client component loaded with `next/dynamic` and `ssr: false`, because Leaflet needs `window`. No react-leaflet is needed. Import `leaflet/dist/leaflet.css`, and restyle the controls with site tokens (see §7).

Layers. These URLs are the keyed endpoints from Esri's developer docs. Tile order is `{z}/{y}/{x}`.

```ts
const KEY = process.env.NEXT_PUBLIC_ESRI_API_KEY;
const STATIC = "https://static-map-tiles-api.arcgis.com/arcgis/rest/services/static-basemap-tiles-service/v1/";
const POWERED = 'Powered by <a href="https://www.esri.com/">Esri</a>';

// Satellite (default): World Imagery + Esri's imagery labels overlay
L.tileLayer(`https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=${KEY}`,
  { maxNativeZoom: 19, maxZoom: 20, attribution: `${POWERED} | Imagery: Esri, Vantor, Earthstar Geographics, and the GIS User Community` });
L.tileLayer(`${STATIC}arcgis/imagery/labels/static/tile/{z}/{y}/{x}?token=${KEY}`,
  { tileSize: 512, zoomOffset: -1, maxNativeZoom: 19, maxZoom: 20, attribution: "Labels: Esri, TomTom, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors" });

// Streets (optional second view)
L.tileLayer(`${STATIC}arcgis/streets/static/tile/{z}/{y}/{x}?token=${KEY}`,
  { tileSize: 512, zoomOffset: -1, maxNativeZoom: 19, maxZoom: 20, attribution: `${POWERED} | Esri, TomTom, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors` });
```

- **Attribution is a license condition.** Keep Leaflet's attribution control visible at the bottom right of the map, restyled in the site's sans at 12px, hearth on linen at 90% opacity. Don't hide or collapse it. Call `map.attributionControl.setPrefix(false)`.
- **Check on first run** that the labels overlay lines up with the imagery and isn't blurry at zoom 17–19. If it is, adjust `maxNativeZoom` on that layer only.
- The Satellite/Streets switch is optional. If it stays, build it as the site's segmented control rather than Leaflet's layer control.
- Starting view: `config.siteCenter`, `config.siteZoom`. Fit to the active route with 40px padding and max zoom 18.

## 5. Video

1. The owner creates a Blob store in Vercel (Project → Storage → Create → Blob, public access) and connects it to the project (done Oct 28, with OIDC). Then pull its credentials into `.env.vercel.local` as described in §3.
2. `npm i -D ffmpeg-static @vercel/blob` (`@vercel/blob` 2.x; `put` supports `addRandomSuffix`, `allowOverwrite`, `cacheControlMaxAge` and `multipart`). Add `.tour-videos/` to `.gitignore`.
3. `node scripts/tour-videos/prepare.mjs --source "<folder with the original VID_*.mp4 files>"`. The originals are in the `videos/` folder of the GitHub repo `AppleBlossomCommons/abc-tour`, and on the owner's computer. **Never commit video to this repo.**
4. `node --env-file=.env.vercel.local scripts/tour-videos/upload.mjs` (try `--dry-run` first), then put the printed `NEXT_PUBLIC_TOUR_VIDEO_BASE` in `.env.local` and Vercel.
5. Page: `src = NEXT_PUBLIC_TOUR_VIDEO_BASE + tour.video`. Use `muted`, `playsInline`, `preload="none"` until a tour is selected (then `metadata`), and `poster = tour.poster`. Only the selected clip loads.

**Tour 15 ends at 0:23** (`trimEnd: 23`). The last two seconds of the original show the camera operator, not the road. Its `duration`, route end and a final anchor at 0:23 are already adjusted, so the marker matches the old timing exactly up to the cut. Use the trimmed file's real duration (`video.duration`) for the progress bar.

Seven clips are portrait (`orientation: "portrait"`: tours 3, 4, 5, 6, 8, 9, 10). The video frame takes its aspect ratio from the data (16:9 or 3:4, capped at 70vh), with `object-fit: contain` on a `map-frame` (#E9DFCC) ground. **Never black**, because the site has no dark grounds.

## 6. Engine

Port `reference/virtual-site-tour/tour-core.js` to `lib/tour-core.ts` as typed, pure functions with no globals: `dist`, `bearing`, `Path` (`at`, `project`, `slice`), `Timeline` (`distanceAt`, `positionAt`, `timeAt`) and `fmt`. Keep the math unchanged. Add a small test or script that compares the port with the original JS for each tour at t = 0, 25%, 50%, 75% and the end (positions within 0.5 m). Drop `videoUrl`.

## 7. Look (match the live site, not the prototype)

The source of truth is what has shipped: `app/globals.css` tokens, `components/site/*` (buttons, layout, header, footer) and `DESIGN.md`/`docs/04` rules. Where they conflict, use the shipped tokens. Specifics:

| Element | Prototype | Site version |
|---|---|---|
| Page | white top bar, grey paper | Site header and footer. A linen intro block (`container`), then a **full-bleed sand stage** for the tour (docs/04: "the tour opens full-bleed on a sand ground"), then linen again. |
| Headings | Source Serif | Site display font and sizes, as on other pages (`PagePlaceholder` and `/plan` show the pattern). No eyebrow kickers above headlines. |
| Tour list | grey cards, green selected | A ruled list on sand: number (mono, tabular), title, "Drive · 1:53" / "On foot · 0:29" in muted. The selected row gets a gold tint with `aria-current="true"`. No status badges. |
| Video and map frames | shadows, 10px radius, black ground | No shadows and no borders (Flat Page Rule). `--radius-card` (16px) corners, `map-frame` ground. |
| Active route | white dashes, amber travelled line | Remaining route: linen, 5px, dashed, over a 9px hearth halo at 25%. Travelled route: **gold** 6px (DESIGN: gold marks the tour route). Start dot sage-deep, end dot hearth, both with a linen 2px ring. |
| Other tours on the map | white dotted | Linen dotted at 55%. Tooltip on hover with a map-tag look (linen, hearth caption text, 3px radius). |
| Marker | blossom-pink dot, pulsing | Hearth dot with a linen 3px ring and a linen heading arrow. **No pulse.** |
| Landmark dots and ticks | blossom pink | Orange dots with a hearth 1.5px stroke on the map. Progress-bar ticks in hearth at 60%. |
| Landmark chips | pink-bordered pills | Sand-on-linen pills, `--radius-chip`, mono time and sans label. The chip whose moment is playing gets a gold fill. |
| Buttons (Previous/Next, Follow, Whole route) | grey/green | `buttonClass("secondary","sm")`. Follow is a pressed toggle (`aria-pressed`) with a gold fill when on. |
| Progress bar | green fill | Rail in `line`, fill in hearth, knob linen with a 2px hearth ring. |
| Map controls and attribution | Leaflet default | Restyled: linen buttons, hearth icons, no shadow, 12px sans attribution. |

## 8. Behavior to keep, change, or drop

**Keep:** the synced marker and travelled line, click-route-to-seek, landmark chips and ticks that seek, Previous/Next, the "Up next" prompt when a clip ends, Follow / Whole route, deep links (`/tour#isenhart-edwin`, update with `history.replaceState`), and the keyboard slider (←/→ ±5 s, Home/End).

**Change:** use custom controls instead of native video controls: play/pause, the progress slider, current time / duration, and fullscreen. That keeps the dark native control bar off the page. Selecting a tour from the list autoplays (it's a user gesture), **except under reduced motion, where video never autoplays**. Map pans jump instead of animating under reduced motion.

**Drop:** `?preview=draft` and `localStorage`, `author.html`, the "route not mapped" and "draft" notes (no tours need them), the walk pulse, `prefers-color-scheme: dark`, and every `window.*` global.

## 9. Page copy (approved tone; owner may edit)

- **Title:** Site Tour
- **Lede:** Sixteen short drives and walks around the land, each paired with a map that follows the route as the video plays.
- **How-to line (muted, under the lede):** Choose a clip and press play. Select any point on the route, or any landmark, to jump to that moment.
- **Under the stage (mono caption, muted):** Filmed September 27, 2026. Routes are matched to the footage by hand; between pinned moments the map marker's position is approximate. Clips play without sound.
- **Map fallback:** Map unavailable right now. The video and landmarks still work.
- **Closing band (linen):** heading "Questions about the land or the plan?", buttons "See the plan" → `/plan` (secondary) and "Contact us" → `/contact` (primary).
- **Home teaser** (`components/home/TourTeaser.tsx`): replace the placeholder still with `public/tour/posters/valley-view.jpg` (or the owner's pick), with alt text "Country road with green fields and dry hills under a cloudy sky." Keep the existing copy.

Copy rules applied to tour data (CLAUDE.md public copy rules). These changes are already in `data/tours.json`:
- Tour 15: "at the Chelan city limits" → "at the edge of town"; the landmark "Entering Chelan city limits" → "Entering Chelan" (rule: never refer to the City).
- Tour 11: "Clinic district and open parcels" → "Medical offices and open parcels". "District" is reserved for the ten Apple Blossom Commons districts.
- Lake Chelan Health appears only as a landmark or neighbor ("past the hospital campus"). It is never called a partner. Keep it that way in any new copy.

## 10. Accessibility (part of "done")

- The tour list is an `<ol>` of buttons, and the selected one has `aria-current="true"`. The landmarks are real buttons with their time in the accessible name ("0:35, Turning onto S Apple Blossom Dr").
- The progress slider uses `role="slider"` with `aria-valuetext="0:35 of 1:53"`.
- Each video has an `aria-label` made from its title. The subtitle and landmark list act as its text description (the clips are silent, so captions aren't needed).
- The map is supplementary. `aria-label="Map of the tour route"`, and everything it does (choosing a tour, jumping to a moment) can also be done from the list and chips.
- Focus ring: the site's 2px lake-deep outline. Text contrast is at least 4.5:1, including attribution and captions.
- Respect `usePrefersReducedMotion()` (`lib/use-reduced-motion.ts`).

## 11. Owner review before the page goes public (not blockers for the build)

1. **Neighbors' homes** are clearly visible in tours 6, 7, 12 and 14. Tour 14 is entirely private frontage. Andy should confirm these can be public, since the site calls residents "neighbors". The simple fallback is to remove tour 14 from `data/tours.json`.
2. **License plates** are readable on a few close passes: tour 3 at about 0:31, tour 11 at about 0:24–0:34, and tour 1 at about 1:18. Blurring would be a separate task.
3. **Tour 5** (Isenhart Road past the transfer station and truck yard) and **tour 8** (mostly gravel shoulder from the side window) are the least flattering clips. Keep, reorder or drop them.
4. **Order.** The current order follows the drive sequence. The first clip a visitor sees could instead be a scenic one (tour 9 meadow viewpoint or tour 13 valley view).

## 12. Definition of done

- [ ] `/tour` renders inside the site layout and matches §7. There is no prototype CSS and no dark surfaces.
- [ ] All 16 clips play from Vercel Blob with posters, muted, and the marker syncs. Tours 3, 4, 5, 6, 8, 9 and 10 display upright.
- [ ] Esri tiles load with the key from the environment, and the key is not in git (`git grep AAPT` returns nothing). Attribution is visible, and the page works without the key (fallback panel).
- [ ] Deep links work, keyboard-only use works end to end, and reduced motion is honored.
- [ ] `lib/tour-core.ts` passes the comparison check against the prototype.
- [ ] Lint, type-check and build pass. Run `web-design-guidelines` on the page. Lighthouse accessibility ≥ 95.
- [ ] Report back for Cowork: the Blob store name and video base URL, and which owner-review items (§11) were resolved.
