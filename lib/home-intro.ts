/**
 * Which Home intro to play (handoff, "Loading intro"). Shared by the inline script in
 * app/layout.tsx (first page load) and HomeIntro (client-side navigation to Home).
 */
export const INTRO_SEEN_KEY = "abc-home-intro-seen";

export type IntroMode = "full" | "return" | "reduce" | "none";

/** First visit: full loader (brief one with reduced motion). Later visits: hero animation only (none with reduced motion). */
export function introMode(seen: boolean, reduce: boolean): IntroMode {
  if (seen) return reduce ? "none" : "return";
  return reduce ? "reduce" : "full";
}

/** Add ?intro=replay to the Home URL to see the first-visit loader again (for reviews). */
export const INTRO_REPLAY_PARAM = "intro=replay";

/**
 * Runs in <head> before the first paint, on the Home page only. Same rules as introMode().
 * ?intro=replay clears the "seen" flag first. If storage is unavailable it does nothing,
 * and Home shows without an intro.
 */
export const introScript = `(function(){try{if(location.pathname!=="/")return;if(location.search.indexOf("${INTRO_REPLAY_PARAM}")>-1)localStorage.removeItem("${INTRO_SEEN_KEY}");var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches,s=localStorage.getItem("${INTRO_SEEN_KEY}")==="1",m=s?(r?"":"return"):(r?"reduce":"full");if(m)d.setAttribute("data-intro",m)}catch(e){}})()`;
