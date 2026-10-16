// Sitemap v0 (docs/02-sitemap.md).
export const mainNav = [
  { href: "/plan", label: "The Plan" },
  { href: "/districts", label: "Districts" },
  { href: "/connected-community", label: "Connected Community" },
  { href: "/tour", label: "Site Tour" },
  { href: "/chelan", label: "Chelan & the Region" },
  { href: "/about", label: "Stewardship" },
] as const;

export const utilityNav = [
  { href: "/planning", label: "Planning Framework" },
  { href: "/research", label: "Research Library" },
] as const;

export const partnerLink = { href: "/partners", label: "Partner with Us" } as const;

export const footerNav = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
