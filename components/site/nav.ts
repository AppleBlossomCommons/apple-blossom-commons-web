// Navigation and footer from docs/10-content-v2.md, "Navigation and footer", with the About Us
// changes from docs/12-about-us-content.md, section 1.
// "Districts" opens a menu of the ten district pages instead of linking to an index page
// (owner decision, Oct 28, 2026; /districts redirects to the map on The Plan).
// "The Plan" opens a menu of its three pages (Nov 19, 2026: The Plan split into an overview and two
// story pages; see docs/02-sitemap.md).
export const mainNav = [
  { href: "/plan", label: "The Plan", menu: "plan" },
  { href: "/districts", label: "Districts", menu: "districts" },
  { href: "/tour", label: "Site Tour" },
  { href: "/participate", label: "How Can I Participate?" },
  { href: "/about", label: "About Us" },
  // Research Library: footer only for now (docs/15, section 2). Revisit when the library has six or
  // more reports and the Key Findings overview; then uncomment (or swap with Site Tour on smaller screens).
  // { href: "/research", label: "Research" },
] as const;

/** The three pages of The Plan, in reading order. Used by the header menu and the Plan page nav. */
export const planPages = [
  { href: "/plan", label: "Overview", text: "The idea, the map and how it fits together" },
  { href: "/plan/living-and-care", label: "Neighborhoods for a lifetime", text: "Homes for every stage of life, Heritage Grove, care and technology" },
  { href: "/plan/village-and-outdoors", label: "The Village and Chelan", text: "The village, walking, parks and trails, and why Chelan" },
] as const;

export type PlanPageHref = (typeof planPages)[number]["href"];

export const partnerLink = { href: "/partners", label: "Partner with Us" } as const;

export const footerColumns = [
  {
    title: "Explore",
    items: [
      { href: "/plan", label: "The Plan" },
      { href: "/plan/living-and-care", label: "Neighborhoods for a lifetime" },
      { href: "/plan/village-and-outdoors", label: "The Village and Chelan" },
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
