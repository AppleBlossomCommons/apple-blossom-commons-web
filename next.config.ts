import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // The Planning Framework page was removed (owner decision, Oct 22, 2026).
      { source: "/planning", destination: "/", permanent: true },
      // Folded into The Plan (docs/10-content-v2.md, "Redirects"), then onto its story pages when
      // The Plan was split (Nov 19, 2026). Old /plan#… links are forwarded in components/plan/MovedSections.tsx.
      { source: "/connected-community", destination: "/plan/neighborhoods#care-close-by", permanent: true },
      { source: "/chelan", destination: "/plan/village-and-chelan#why-chelan", permanent: true },
      // The story pages' first addresses, before they were renamed (owner decision, Nov 22, 2026).
      // Browsers keep any #section on the old link, so in-page links still land in the right place.
      { source: "/plan/living-and-care", destination: "/plan/neighborhoods", permanent: true },
      { source: "/plan/village-and-outdoors", destination: "/plan/village-and-chelan", permanent: true },
      // No districts index page: the header's Districts menu lists the ten pages (owner decision, Oct 28, 2026).
      { source: "/districts", destination: "/plan#explore", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
