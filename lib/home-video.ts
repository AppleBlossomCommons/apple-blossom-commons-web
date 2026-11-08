/**
 * Where the Home hero drone clip is served from. The clip itself is never committed:
 * scripts/home-video/prepare.mjs makes it, and scripts/home-video/upload.mjs puts it on
 * Vercel Blob and prints the address for NEXT_PUBLIC_HOME_VIDEO_URL.
 *
 * In development, with the variable unset, the dev server serves the prepared local copy.
 * With no address at all, the hero shows the still image only.
 */
export const homeVideoSrc =
  process.env.NEXT_PUBLIC_HOME_VIDEO_URL ||
  (process.env.NODE_ENV === "development" ? "/local-video/home-hero.mp4" : "");
