"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/portfolio";
import { Project } from "@/types";
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Projects
        </h2>
      </div>

      {/* Projects Stack */}
      <div className="space-y-[30vh] pb-36">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            onClick={() => setActiveProject(project)}
            className="sticky bg-[#0E0E10] border border-white/[0.06] rounded-3xl p-5 sm:p-7 md:p-8 space-y-6 cursor-pointer group shadow-[0_25px_60px_rgba(0,0,0,0.75)] hover:border-white/15 transition-all duration-500"
            style={{
              top: `${80 + idx * 80}px`,
              zIndex: 10 + idx,
            }}
          >
            
            {/* Full-bleed Image Container */}
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] border border-white/[0.08] rounded-2xl relative overflow-hidden transition-all duration-350 hover:border-white/30 select-none">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 p-2 bg-[#151518]/80 backdrop-blur-md border border-white/[0.08] rounded-xl text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
                <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Project Details Below Canvas */}
            <div className="space-y-3 px-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Technology badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-white/[0.08] bg-[#151518]/60 backdrop-blur-sm rounded-lg text-[9px] font-mono text-white/50 uppercase tracking-wide font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans font-light max-w-2xl">
                {project.desc}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Project Modal Dossier Overlay */}
      <ProjectModal selectedProject={activeProject} setSelectedProject={setActiveProject} />

    </section>
  );
};
