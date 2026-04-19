"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Github } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export const ProjectModal = ({ selectedProject, setSelectedProject }: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-2 min-[400px]:p-4 md:p-6 bg-black/98 backdrop-blur-3xl overflow-y-auto">
      <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
      <button onClick={() => setSelectedProject(null)} className="fixed top-4 right-4 text-white/50 hover:text-[#D4AF37] z-[2001] border border-white/10 bg-black/50 p-2 min-[400px]:p-3 rounded-full hover:bg-white/10 backdrop-blur-md transition-all"><X size={20} /></button>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl z-10 my-8">
        <div className="relative w-full h-[200px] min-[400px]:h-[250px] md:h-[400px] border-b border-white/10">
          <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 min-[400px]:bottom-10 min-[400px]:left-10 pr-6">
            <h3 className="text-2xl min-[400px]:text-4xl md:text-6xl font-display font-medium text-white mb-3 min-[400px]:mb-6 uppercase tracking-tight leading-tight">{selectedProject.title}</h3>
            <div className="flex flex-wrap gap-1.5 min-[400px]:gap-2">
              {selectedProject.tags.map(t => <span key={t} className="text-[8px] min-[400px]:text-[10px] font-mono px-2 py-0.5 min-[400px]:px-3 min-[400px]:py-1 text-[#D4AF37] border border-[#D4AF37]/30 uppercase">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="p-6 min-[400px]:p-10">
          <p className="text-white/70 text-sm min-[400px]:text-lg leading-relaxed font-light">{selectedProject.fullDesc}</p>
          <div className="pt-6 min-[400px]:pt-8 flex gap-4 mt-6 min-[400px]:mt-8 border-t border-white/5">
             <a href={selectedProject.link} target="_blank" className="w-full sm:w-auto px-6 py-4 min-[400px]:px-8 min-[400px]:py-4 bg-white/5 text-white border border-white/20 font-bold uppercase tracking-widest text-[9px] min-[400px]:text-[10px] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 active:scale-95"><Github size={18} /> Source Access</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
