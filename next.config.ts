import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // The Planning Framework page was removed (owner decision, Oct 22, 2026).
      { source: "/planning", destination: "/", permanent: true },
      // Folded into The Plan (docs/10-content-v2.md, "Redirects").
      { source: "/connected-community", destination: "/plan#care-close-by", permanent: true },
      { source: "/chelan", destination: "/plan#why-chelan", permanent: true },
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
