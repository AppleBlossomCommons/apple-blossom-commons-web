// Navigation and footer from docs/10-content-v2.md, "Navigation and footer", with the About Us
// changes from docs/12-about-us-content.md, section 1.
// "Districts" opens a menu of the ten district pages instead of linking to an index page
// (owner decision, Oct 28, 2026; /districts redirects to the map on The Plan).
export const mainNav = [
  { href: "/plan", label: "The Plan" },
  { href: "/districts", label: "Districts", menu: "districts" },
  { href: "/tour", label: "Site Tour" },
  { href: "/participate", label: "How Can I Participate?" },
  { href: "/about", label: "About Us" },
] as const;

export const partnerLink = { href: "/partners", label: "Partner with Us" } as const;

export const footerColumns = [
  {
    title: "Explore",
    items: [
      { href: "/plan", label: "The Plan" },
      { href: "/plan#explore", label: "Districts" },
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
      { href: "/about", label: "About Us" },
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
