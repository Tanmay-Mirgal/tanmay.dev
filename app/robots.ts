import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tanmay.dev/sitemap.xml",
    host: "https://tanmay.dev",
  };
}
