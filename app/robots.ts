import { MetadataRoute } from "next";

// Next.js App Router auto-generates /robots.txt from this file.
// Update the `url` base once you have a custom domain.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://krishnakoushik.dev/sitemap.xml",
  };
}