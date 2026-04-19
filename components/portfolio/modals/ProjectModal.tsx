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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/98 backdrop-blur-3xl overflow-y-auto">
      <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
      <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] z-[2001] border border-white/10 bg-white/5 p-3 rounded hover:bg-white/10"><X size={24} /></button>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl z-10 my-auto">
        <div className="relative w-full h-[250px] md:h-[400px] border-b border-white/10">
          <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h3 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 uppercase">{selectedProject.title}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map(t => <span key={t} className="text-[10px] font-mono px-3 py-1 text-[#D4AF37] border border-[#D4AF37]/30 uppercase">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="p-10">
          <p className="text-white/70 text-lg leading-relaxed font-light">{selectedProject.fullDesc}</p>
          <div className="pt-8 flex gap-4 mt-8 border-t border-white/5">
             <a href={selectedProject.link} target="_blank" className="px-8 py-4 bg-white/5 text-white border border-white/20 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-colors flex items-center gap-3"><Github size={18} /> Source Access</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
