# Drone videos (originals)

Put Andy's original aerial drone videos here. Nothing in this folder except this
README is committed to Git: video files are too large for the repo, and the project
rule is "never commit video to this repo". Keep a backup of the originals elsewhere too.

## In use

| File | Where | Part shown |
|---|---|---|
| `DJI_0150.MP4` | Home hero, 1st section | 0:13–0:18 |
| `DJI_0155.MP4` | Home hero, 2nd section | 0:03–0:11 |
| `DJI_0153.MP4` | Home hero, 3rd section | 0:48–0:53 |

## Home hero clip

1. `node scripts/home-video/prepare.mjs` cuts the sections, joins them with 1.2-second crossfades, converts the result to web video (H.264,
   1080p, no audio) at `public/local-video/home-hero.mp4` (git-ignored, served by the dev
   server), and saves its first frame to `public/images/home/hero-still.jpg` (committed).
   To change the parts shown, edit `CLIPS` at the top of that script.
2. `node --env-file=.env.vercel.local scripts/home-video/upload.mjs` puts the clip on Vercel
   Blob and prints `NEXT_PUBLIC_HOME_VIDEO_URL`. Add that in Vercel's environment variables.
   Until then the live site shows the still image only.
