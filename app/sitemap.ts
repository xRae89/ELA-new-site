import type { MetadataRoute } from "next";
import { openings } from "@/lib/careers";
import { posts } from "@/lib/posts";
import { practiceAreas } from "@/lib/practice-areas";
import { locationPages } from "@/lib/regions";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/our-team",
    "/practice-areas",
    "/faq",
    "/reviews",
    "/contact-us",
    "/blog",
    "/careers",
    "/privacy-policy",
    "/terms-and-conditions",
    ...practiceAreas.map((p) => `/${p.slug}`),
    ...locationPages.map((l) => `/${l.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
    ...openings.map((o) => `/careers/${o.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
