"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Project } from "@/types";
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";
import { Section } from "@/components/portfolio/Section";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";
import { PinnedPlate } from "@/components/portfolio/case-study/PinnedPlate";
import { DiagramPlate } from "@/components/portfolio/case-study/DiagramPlate";
import { PipelinePlate } from "@/components/portfolio/case-study/PipelinePlate";
import { SimplePlate } from "@/components/portfolio/case-study/SimplePlate";
import { ProjectIndex } from "@/components/portfolio/case-study/ProjectIndex";
import type { ProjectDoc } from "@/components/portfolio/case-study/PlateParts";
import { caseStudies, findCaseStudy, type CaseStudy } from "@/lib/caseStudies";

/** Used only when no Convex project has a case-study entry: the first few still get plates. */
const FALLBACK_FEATURED = 3;

interface Featured {
  project: ProjectDoc;
  study?: CaseStudy;
}

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projectsData = useQuery(api.portfolio.getProjects);

  let featured: Featured[] = [];
  let rest: ProjectDoc[] = [];

  if (projectsData) {
    const withStudy = projectsData
      .map((project) => ({ project, study: findCaseStudy(project.title) }))
      .filter((entry): entry is Required<Featured> => entry.study !== undefined)
      // Present them in the order the case studies are authored
      .sort((a, b) => caseStudies.indexOf(a.study) - caseStudies.indexOf(b.study));

    if (withStudy.length > 0) {
      featured = withStudy;
      rest = projectsData.filter((p) => !withStudy.some((f) => f.project._id === p._id));
    } else {
      featured = projectsData.slice(0, FALLBACK_FEATURED).map((project) => ({ project }));
      rest = projectsData.slice(FALLBACK_FEATURED);
    }
  }

  return (
    <Section id="projects" index="02" eyebrow="Selected work" title="Projects" tone="loud" theme="paper" wide>
      {projectsData === undefined ? (
        <ListSkeleton rows={3} />
      ) : (
        <>
          <div>
            {featured.map(({ project, study }, i) => {
              if (!study) return <SimplePlate key={project._id} project={project} index={i} />;
              if (study.kind === "pinned") return <PinnedPlate key={project._id} project={project} study={study} index={i} />;
              if (study.kind === "diagram") return <DiagramPlate key={project._id} project={project} study={study} index={i} />;
              return <PipelinePlate key={project._id} project={project} study={study} index={i} />;
            })}
          </div>

          {rest.length > 0 && (
            <div className="mt-8 md:mt-16">
              <p className="label mb-6">More projects ({rest.length})</p>
              <ProjectIndex projects={rest} offset={featured.length} onOpen={setActiveProject} />
            </div>
          )}
        </>
      )}

      <ProjectModal selectedProject={activeProject} setSelectedProject={setActiveProject} />
    </Section>
  );
};
