"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Project } from "@/types";
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";
import { motion } from "framer-motion";

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projectsData = useQuery(api.portfolio.getProjects);

  if (projectsData === undefined) {
    return (
      <section id="projects" className="py-24 border-t border-white/[0.06] flex justify-center items-center">
        <div className="text-white/50 font-mono text-xs uppercase tracking-widest animate-pulse">Loading Projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 border-t border-white/[0.06] relative select-none">
      
      {/* Title */}
      <div className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white uppercase flex items-center gap-4">
          Selected Projects
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projectsData.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActiveProject(project)}
            className="group relative bg-[#09090B] border border-white/5 hover:border-white/20 rounded-3xl overflow-hidden cursor-pointer transition-colors duration-500 flex flex-col"
          >
            {/* Hover Glow Behind */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Container */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] relative overflow-hidden border-b border-white/5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={idx < 2}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                 <div className="p-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors">
                   <ArrowUpRight size={16} />
                 </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/[0.03] text-white/60 border border-white/[0.05] rounded-md text-[10px] font-mono uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2.5 py-1 bg-white/[0.03] text-white/40 border border-white/[0.05] rounded-md text-[10px] font-mono">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal Dossier Overlay */}
      <ProjectModal selectedProject={activeProject} setSelectedProject={setActiveProject} />

    </section>
  );
};
