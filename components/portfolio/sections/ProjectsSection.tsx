"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Project } from "@/types";
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";
import { Section } from "@/components/portfolio/Section";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";
import { ProjectShowcase, type ProjectDoc } from "@/components/portfolio/showcase/ProjectShowcase";
import { ProjectCard } from "@/components/portfolio/showcase/ProjectCard";
import { caseStudies, findCaseStudy, type CaseStudy } from "@/lib/caseStudies";

/** Used only when no Convex project has a case-study entry: the first few still get the large treatment. */
const FALLBACK_FEATURED = 3;

interface Featured {
  project: ProjectDoc;
  study?: CaseStudy;
}

export const ProjectsSection = () => {
  const [modal, setModal] = useState<Project | null>(null);
  const projects = useQuery(api.portfolio.getProjects);

  let featured: Featured[] = [];
  let rest: ProjectDoc[] = [];

  if (projects) {
    const withStudy = projects
      .map((project) => ({ project, study: findCaseStudy(project.title) }))
      .filter((entry): entry is Required<Featured> => entry.study !== undefined)
      // Present them in the order the case studies are authored
      .sort((a, b) => caseStudies.indexOf(a.study) - caseStudies.indexOf(b.study));

    if (withStudy.length > 0) {
      featured = withStudy;
      rest = projects.filter((p) => !withStudy.some((f) => f.project._id === p._id));
    } else {
      featured = projects.slice(0, FALLBACK_FEATURED).map((project) => ({ project }));
      rest = projects.slice(FALLBACK_FEATURED);
    }
  }

  return (
    <Section id="projects" index="02" eyebrow="Selected work" title="Projects" tone="loud" wide>
      {projects === undefined ? (
        <ListSkeleton rows={3} />
      ) : (
        <>
          <p className="mb-10 max-w-2xl text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium leading-[1.4]">
            From scalable SaaS platforms to sophisticated computer vision pipelines, I engineer robust
            solutions that push the boundaries of what&rsquo;s possible.
          </p>
          <div>
            {featured.map(({ project, study }, i) => (
              <ProjectShowcase
                key={project._id}
                project={project}
                study={study}
                index={i}
                total={featured.length}
              />
            ))}
          </div>

          {rest.length > 0 && (
            <div className="border-t border-line pt-14 md:pt-20">
              <p className="label mb-8">More projects ({rest.length})</p>
              <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((project) => (
                  <ProjectCard key={project._id} project={project} onOpen={() => setModal(project)} />
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <ProjectModal selectedProject={modal} setSelectedProject={setModal} />
    </Section>
  );
};
