import type { MetadataRoute } from "next";
import { getPortfolioSnapshot, latestChange } from "@/lib/portfolioSnapshot";
import { PORTRAIT_PATH, SITE_URL } from "@/lib/site";

// Matches the home page, so both refresh together.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastModified is the newest edit to the portfolio data, not "now": a date that changes on
  // every build teaches crawlers to ignore it. When Convex can't be read it is left out.
  const lastModified = latestChange(await getPortfolioSnapshot());

  return [
    {
      url: `${SITE_URL}/`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}${PORTRAIT_PATH}`],
    },
    // Add new pages here (a /blog, a /projects/[slug] page) as they exist.
  ];
}
