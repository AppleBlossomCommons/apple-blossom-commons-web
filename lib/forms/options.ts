/**
 * Choices for the public forms, from docs/10-content-v2.md ("Forms"). Shared by the form
 * components (to draw them) and the server actions (to check what comes back).
 */

export const FEEDBACK_TOPICS = [
  "General",
  "Traffic and roads",
  "Housing",
  "Parks and open space",
  "Senior living and care",
  "Community group",
  "Other",
] as const;

export const UPDATE_LIST_ROLES = ["Neighbor", "Future resident", "Family member", "Other"] as const;

export const UPDATE_LIST_INTERESTS = [
  "Active adult homes",
  "Independent living",
  "Assisted living or memory care",
  "Family homes",
  "Parks and trails",
] as const;

/** Shown under every form. */
export const PRIVACY_LINE = "We'll only use your information to respond and to send updates you asked for. We don't sell or share it.";

/** The hidden field bots fill in and people never see (spam protection, no puzzle CAPTCHA). */
export const HONEYPOT_FIELD = "company";

/** What a form action returns to its form. */
export type FormState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Record<string, string>; values: Record<string, string | string[]> }
  | { status: "failed"; message: string; values: Record<string, string | string[]> };
