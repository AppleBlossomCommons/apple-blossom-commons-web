// Navigation and footer from the Phase 1 content pack (docs/10-content-v2.md, "Navigation and footer").
export const mainNav = [
  { href: "/plan", label: "The Plan" },
  { href: "/districts", label: "Districts" },
  { href: "/tour", label: "Site Tour" },
  { href: "/participate", label: "How Can I Participate?" },
] as const;

export const partnerLink = { href: "/partners", label: "Partner with Us" } as const;

export const footerColumns = [
  {
    title: "Explore",
    items: [
      { href: "/plan", label: "The Plan" },
      { href: "/districts", label: "Districts" },
      { href: "/tour", label: "Site Tour" },
    ],
  },
  {
    title: "Get involved",
    items: [
      { href: "/participate", label: "How Can I Participate?" },
      { href: "/participate#update-list", label: "Join the update list" },
      { href: "/participate#faqs", label: "FAQs" },
    ],
  },
  {
    title: "About",
    items: [
      { href: "/about", label: "Our Approach" },
      { href: "/research", label: "Research Library" },
    ],
  },
  {
    title: "Connect",
    items: [
      partnerLink,
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;
