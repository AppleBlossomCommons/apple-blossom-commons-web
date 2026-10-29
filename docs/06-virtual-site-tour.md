> **Oct 28, 2026:** The integration plan below (iframe) is superseded. The tour is now a native rebuild with Esri keyed tiles and Vercel Blob video. See `13-site-tour.md`. The "How it works" section below still describes the prototype.

# 06 — Virtual Site Tour

*Built Sept 27–30, 2026. 16 tours, all routed, pinned and marked Verified.*

## Where the code lives (not included in this pack)

- **Google Drive:** folder "ABC Virtual Site Tour" in appleblossomcommons@gmail.com's Drive. It contains `index.html`, `tours.js`, `tour-core.js`, `styles.css`, `author.html` and `lib/` (Leaflet 1.9.4).
- **Owner's computer:** `Downloads\Interactive Video Map Videos - ABC\Interactive Video Map Videos - ABC\ABC Virtual Site Tour\`, with the videos in the parent folder.
- **Source of truth for tour data:** the desktop `tours.js` (Sept 30, 2026). The online "ABC Tour Editor" artifact holds older drafts. Don't use it.

To bring it in, the owner downloads the folder (code only, without videos) into `reference/virtual-site-tour/`. Videos (16 clips, ~230 MB of phone footage) are handled separately (see below). Don't commit raw video to git.

## How it works

- Plain HTML, CSS and JS with no build step. Leaflet 1.9.4 is vendored.
- `tour-core.js` is a dependency-free geometry and timing engine. It handles route length, bearing, nearest point on a route, and interpolating video time to map position from "anchor pins". Constant speed is assumed between pins.
- `tours.js` holds the data: `window.ABC_TOUR_CONFIG` (`VIDEO_BASE`, `siteCenter` [47.8388, −119.988], `siteZoom` 16) and `window.ABC_TOURS`, an array of `{ id, title, subtitle, file, duration, kind: "drive"|"walk", status, route: [[lat,lng]…], anchors: [{t, ll}], landmarks: [{t, label}], point? }`.
- The viewer syncs video to a moving map marker, draws the travelled vs remaining route, shows landmark chips and ticks, lets visitors click the route to seek, supports deep links (`#tour-id`), and has a keyboard-operable progress slider (arrow keys seek 5s).
- Conventions: titles spell out road names ("Apple Blossom Drive"), landmark labels abbreviate ("Apple Blossom Dr").

## Risks to fix before it goes public

1. **Global names:** it writes `window.TourCore`, `window.ABC_TOURS` and `window.ABC_TOUR_CONFIG`, and uses generic IDs and classes (`#map`, `#video`, `.top`, `.stage`, `.chip`, `footer`). These collide with site styles if inlined.
2. **Map tiles:** it uses Esri World Imagery and the public OpenStreetMap tile server. OSM public tiles are not for production traffic, and Esri imagery needs a proper account and terms. Choose a licensed tile provider before launch, and ask the owner, since it may cost money.
3. **Video:** about 230 MB loaded from a relative `../` folder. It needs re-encoding (H.264 or H.265 at web bitrates), poster frames, load-on-demand, and a video host. Ask the owner which host.
4. **Dev-only paths:** the `?preview=draft` mode (reads localStorage) and `author.html` (the editor) must not ship publicly.
5. **Motion:** the marker pulses continuously and the map pans with animation, ignoring reduced-motion settings.
6. **Old palette:** blossom pink (#D9466F) ticks and landmark dots need restyling to the new tokens (see `04-design-direction.md`).

## Integration plan (approved direction)

- **v1:** keep it as an isolated static app served from `public/tour-app/`, embedded on `/tour` in an `<iframe>`, and restyled with the new tokens. The iframe isolation removes every collision with almost no code change.
- **Later:** move `tour-core.js` (pure functions) into the React app as a typed module, so district pages can show "see this from the road" clips without the iframe.
- **Later:** a GPS logging app while filming would give exact sync automatically.
- Footer text to keep: "Routes are matched to the footage by hand; between pinned moments the map marker's position is approximate."
