import { HomeClient } from "@/components/portfolio/HomeClient";
import { PortfolioDataProvider } from "@/components/portfolio/PortfolioData";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolioSnapshot } from "@/lib/portfolioSnapshot";
import { buildStructuredData } from "@/lib/structuredData";

// Static page, rebuilt in the background at most once an hour. Convex edits show up in the
// crawlable HTML within that window; visitors already get them live through the Convex client.
// Must be a literal: Next reads it at build time. Keep it equal to REVALIDATE_SECONDS.
export const revalidate = 3600;

export default async function Home() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <>
      <JsonLd data={buildStructuredData(snapshot)} />
      <PortfolioDataProvider snapshot={snapshot}>
        <HomeClient />
      </PortfolioDataProvider>
    </>
  );
}
