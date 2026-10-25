import { getFunctionName, type FunctionReference, type FunctionReturnType } from "convex/server";
import { api } from "@/convex/_generated/api";

/** How long the server-rendered page and its Convex data stay cached before a rebuild in the background. */
export const REVALIDATE_SECONDS = 3600;

export interface PortfolioSnapshot {
  projects: FunctionReturnType<typeof api.portfolio.getProjects>;
  experience: FunctionReturnType<typeof api.portfolio.getExperience>;
  skillGroups: FunctionReturnType<typeof api.portfolio.getSkillGroups>;
  education: FunctionReturnType<typeof api.portfolio.getEducation>;
  achievements: FunctionReturnType<typeof api.portfolio.getAchievements>;
}

/**
 * Runs one public query through Convex's HTTP API (https://docs.convex.dev/http-api/).
 *
 * Plain `fetch` rather than ConvexHttpClient or `fetchQuery`: both of those force
 * `cache: "no-store"`, which would opt the whole page out of static rendering, and the
 * client's fetch-options hook is internal. Every field these queries return is plain JSON.
 */
async function runQuery<Q extends FunctionReference<"query", "public">>(
  deploymentUrl: string,
  query: Q
): Promise<FunctionReturnType<Q>> {
  const response = await fetch(`${deploymentUrl}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: getFunctionName(query), args: {}, format: "json" }),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const body = (await response.json()) as { status: string; value?: unknown; errorMessage?: string };
  if (body.status !== "success") throw new Error(body.errorMessage ?? "query failed");
  return body.value as FunctionReturnType<Q>;
}

/**
 * Reads the portfolio from Convex on the server, so the HTML that crawlers fetch already
 * contains the projects, experience and skills instead of loading skeletons.
 *
 * A failed read leaves that key out. The client then loads it live, exactly as before.
 */
export async function getPortfolioSnapshot(): Promise<Partial<PortfolioSnapshot>> {
  const deploymentUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.replace(/\/$/, "");
  if (!deploymentUrl) return {};

  const read = async <Q extends FunctionReference<"query", "public">>(name: string, query: Q) => {
    try {
      return await runQuery(deploymentUrl, query);
    } catch (error) {
      console.error(`[seo] could not prefetch ${name} from Convex:`, error);
      return undefined;
    }
  };

  const [projects, experience, skillGroups, education, achievements] = await Promise.all([
    read("projects", api.portfolio.getProjects),
    read("experience", api.portfolio.getExperience),
    read("skillGroups", api.portfolio.getSkillGroups),
    read("education", api.portfolio.getEducation),
    read("achievements", api.portfolio.getAchievements),
  ]);

  const snapshot: Partial<PortfolioSnapshot> = {};
  if (projects) snapshot.projects = projects;
  if (experience) snapshot.experience = experience;
  if (skillGroups) snapshot.skillGroups = skillGroups;
  if (education) snapshot.education = education;
  if (achievements) snapshot.achievements = achievements;
  return snapshot;
}

/** Newest `_creationTime` across the snapshot, or undefined when nothing was read. For an honest sitemap lastmod. */
export function latestChange(snapshot: Partial<PortfolioSnapshot>): Date | undefined {
  const times = Object.values(snapshot).flatMap((docs) => docs.map((doc) => doc._creationTime));
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}
