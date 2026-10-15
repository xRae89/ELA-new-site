import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old WordPress URLs that changed. Practice and location pages keep their
  // original slugs, so they need no redirect.
  async redirects() {
    return [
      { source: "/home3", destination: "/", permanent: true },
      { source: "/retaliation-old-elevan", destination: "/retaliation", permanent: true },
      { source: "/wrongful-termination-lawyer-in-california", destination: "/wrongful-termination", permanent: true },
      { source: "/current-openings", destination: "/careers", permanent: true },
      { source: "/why-work-at-employment-law-assist", destination: "/careers", permanent: true },
      { source: "/training-and-professional-development-at-employment-law-assist", destination: "/careers", permanent: true },
      { source: "/litigation-paralegal-employment-law-assist", destination: "/careers/litigation-paralegal", permanent: true },
      { source: "/employment-law-attorney-woodland-hills-in-office", destination: "/careers/employment-law-attorney", permanent: true },
      { source: "/uncategorized/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
