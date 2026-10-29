# Site Tour content pack v1 (Oct 28, 2026)

Unzip this into the root of your website repo (`apple-blossom-commons-web`). It adds or updates:

- `docs/13-site-tour.md`: the build brief (new)
- `docs/06-virtual-site-tour.md`: a note at the top that points to 13 (updated)
- `data/tours.json`: all 16 tours (new)
- `public/tour/posters/`: 16 poster frames (new)
- `scripts/tour-videos/`: video prepare and upload scripts (new)
- `reference/virtual-site-tour/`: the old prototype, for reference only (new)

Nothing in it replaces existing site code.

## Before you start Claude Code (about 10 minutes)

1. **Esri key:** open `.env.local` in the repo root (create it if it doesn't exist) and add this line, pasting the key from your ArcGIS dashboard:
   `NEXT_PUBLIC_ESRI_API_KEY=your-key-here`
   In Vercel, add the same variable under Project → Settings → Environment Variables, ticking Production and Preview.
2. **Video storage:** in Vercel, go to Project → Storage → Create → Blob, choose public access, and connect it to this project. New stores connect with OIDC and may not create a `BLOB_READ_WRITE_TOKEN`. That's fine: Claude Code fetches the store's credentials with the Vercel command-line tool (see `docs/13`, §3).
3. Have the original clips handy: the `videos` folder of the `abc-tour` repo, or your local tour folder.

## Kickoff prompt for Claude Code

> Read `docs/13-site-tour.md` (and skim `docs/06-virtual-site-tour.md` and `reference/virtual-site-tour/`). The Site Tour is moving onto `/tour` as a native part of the site, restyled to match the live site. Play back your understanding in plain language, list what you'll install, and propose a step-by-step plan: (1) port tour-core to TypeScript with the comparison check, (2) prepare and upload the videos to Vercel Blob, (3) build the /tour page and map, (4) swap the home teaser still. Don't install or build anything until I approve. My Esri key and Blob token are already in `.env.local`. The original videos are at: <paste folder path>.

## Things for you and Andy to decide (section 11 of the brief)

These don't block the build:

- Whether neighbors' homes (tours 6, 7, 12, 14) can be public
- Readable license plates in a few clips
- Whether to keep tours 5 and 8
- Which clip opens the tour
