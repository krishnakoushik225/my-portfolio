import { MetadataRoute } from "next";

// Next.js App Router auto-generates /sitemap.xml from this file.
// Update the `url` base once you have a custom domain.

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://krishnakoushik.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}