import { LINKS } from "@/lib/links";
import type { PortfolioSnapshot } from "@/lib/portfolioSnapshot";
import { JOB_TITLE, PORTRAIT_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const HOME = `${SITE_URL}/`;
const WEBSITE_ID = `${HOME}#website`;
const PAGE_ID = `${HOME}#profile`;
const PERSON_ID = `${HOME}#person`;
const PROJECTS_ID = `${HOME}#projects`;

const MAX_SKILLS = 30;

const unique = (values: string[]) => [...new Set(values.map((v) => v.trim()).filter(Boolean))];

/**
 * schema.org graph for the home page: the site, the profile page, the person, and the
 * projects. Everything is drawn from the same Convex data the page renders, so the
 * markup cannot drift from what visitors see. Fields the site does not state (address,
 * birth date, employer) are left out rather than guessed.
 */
export function buildStructuredData(snapshot: Partial<PortfolioSnapshot>) {
  const portrait = `${SITE_URL}${PORTRAIT_PATH}`;

  const skills = unique((snapshot.skillGroups ?? []).flatMap((group) => group.tags)).slice(0, MAX_SKILLS);
  const schools = unique((snapshot.education ?? []).map((edu) => edu.institution));

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    givenName: "Tanmay",
    familyName: "Mirgal",
    url: HOME,
    image: { "@type": "ImageObject", url: portrait, width: 460, height: 460 },
    jobTitle: JOB_TITLE,
    description:
      "Full-stack and AI engineer who builds high-performance systems bridging modern web architecture and machine learning.",
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.leetcode],
    mainEntityOfPage: { "@id": PAGE_ID },
  };
  if (skills.length > 0) person.knowsAbout = skills;
  if (schools.length > 0) {
    person.alumniOf = schools.map((name) => ({ "@type": "EducationalOrganization", name }));
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: HOME,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": PAGE_ID,
      url: HOME,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: portrait },
    },
    person,
  ];

  const projects = snapshot.projects ?? [];
  if (projects.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": PROJECTS_ID,
      name: `Projects by ${SITE_NAME}`,
      itemListElement: projects.map((project, i) => {
        const hasSource = Boolean(project.link) && project.link !== "#";
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            // A confidential project has no repository to point at, so it is a plain work.
            "@type": hasSource ? "SoftwareSourceCode" : "CreativeWork",
            name: project.title,
            description: project.desc,
            image: project.image,
            keywords: project.tags.join(", "),
            author: { "@id": PERSON_ID },
            ...(hasSource ? { codeRepository: project.link } : {}),
            ...(project.liveLink || hasSource ? { url: project.liveLink ?? project.link } : {}),
          },
        };
      }),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
