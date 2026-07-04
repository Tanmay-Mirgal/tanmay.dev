"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Github, ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export const ProjectModal = ({ selectedProject, setSelectedProject }: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/98 backdrop-blur-3xl overflow-y-auto"
    >
      <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
      
      <motion.div 
        initial={{ scale: 0.98, y: 15 }} 
        animate={{ scale: 1, y: 0 }} 
        className="relative w-full max-w-5xl border border-white/[0.06] bg-[#0E0E10] p-6 sm:p-10 md:p-12 shadow-2xl z-10 my-8 rounded-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={() => setSelectedProject(null)} 
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 rounded-full border border-white/5 bg-white/[0.02] cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-4">
          
          {/* Left Column: Title & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.25em]">Project Dossier</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Specs / Meta */}
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block mb-1">Technologies</span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-white/70 font-mono">
                    {selectedProject.tags.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {idx < selectedProject.tags.length - 1 && <span className="text-white/20">•</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 lg:pt-0">
              <a 
                href={selectedProject.link} 
                target="_blank" 
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#0B0B0C] hover:bg-zinc-200 font-mono font-bold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-xl transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                <Github size={14} /> Source Access <ArrowUpRight size={12} />
              </a>
            </div>

          </div>

          {/* Right Column: Image & Description */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Image Container */}
            <div className="relative w-full aspect-[16/10] border border-white/[0.08] rounded-2xl overflow-hidden bg-zinc-955 shadow-md">
              <Image 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Full description */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block">Overview</span>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-light">
                {selectedProject.fullDesc}
              </p>
            </div>

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};
