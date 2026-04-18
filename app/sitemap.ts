import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tanmay-dev-81mf.vercel.app";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly", // Updated to weekly for fresher indexing
      priority: 1,
    },
    // If you add more pages like /blog or /projects, add them here
  ];
}
