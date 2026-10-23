// Sitemap v0 (docs/02-sitemap.md), arranged as in the approved homepage mockup (Oct 16, 2026).
export const mainNav = [
  { href: "/plan", label: "The Plan" },
  { href: "/districts", label: "Districts" },
  { href: "/tour", label: "Site Tour" },
  { href: "/connected-community", label: "Connected Community" },
] as const;

/** The header's "About" dropdown and the footer's About column. */
export const aboutNav = [
  { href: "/chelan", label: "Chelan & the Region" },
  { href: "/about", label: "Stewardship" },
  { href: "/research", label: "Research Library" },
] as const;

export const partnerLink = { href: "/partners", label: "Partner with Us" } as const;

/** The footer's Connect column. */
export const connectNav = [
  partnerLink,
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
