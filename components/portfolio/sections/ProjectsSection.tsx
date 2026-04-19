"use client";

import React from "react";
import Image from "next/image";
import { HolographicNode } from "../HolographicNode";
import { Project } from "@/types";

interface ProjectsSectionProps {
  projectsData: Project[];
  setSelectedProject: (project: Project) => void;
}

export const ProjectsSection = ({ projectsData, setSelectedProject }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
      <div className="mb-16 md:mb-24">
        <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">DEPLOYED_MISSIONS</h2>
        <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">Featured Production Instances.</p>
      </div>
      <div className="flex flex-col gap-24">
        {projectsData.map((p, i) => (
          <HolographicNode key={i} id={`proj_node_${i}`}>
            <div onClick={() => setSelectedProject(p)} className="flex flex-col xl:flex-row gap-10 group cursor-pointer">
              <div className="w-full xl:w-7/12 aspect-[16/9] border border-white/10 bg-black relative overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              </div>
              <div className="w-full xl:w-5/12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(t => <span key={t} className="text-[9px] font-mono border border-white/20 px-2 py-0.5 uppercase">{t}</span>)}
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                <p className="text-sm sm:text-lg text-white/60 font-light mb-6">{p.desc}</p>
                <button className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                  Access Protocol <span className="w-6 h-[1px] bg-[#D4AF37] group-hover:w-10 transition-all block" />
                </button>
              </div>
            </div>
          </HolographicNode>
        ))}
      </div>
    </section>
  );
};
