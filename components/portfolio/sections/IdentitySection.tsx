"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";
import { HolographicNode } from "../HolographicNode";

export const IdentitySection = () => {
  return (
    <section id="identity" className="py-24 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
      <HolographicNode id="identity_node">
        <div className="mb-12">
          <h2 className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
            <span className="text-[#D4AF37]">01.</span> PERSONAL_IDENTITY_NODE
          </h2>
        </div>
        <div className="bg-[#080808]/50 border-l border-white/10 p-10 sm:p-14 space-y-12 backdrop-blur-xl">
          <div className="space-y-6">
            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 font-medium leading-[1.8] font-sans italic">&quot;The best investment is building something that creates value for others.&quot;</p>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/60 font-medium leading-[1.8] font-sans">I am a <span className="text-white">Full-Stack Engineer + ML/DL Developer</span> with a mission to build products from 0 to production. I specialize in delivering production-ready MERN apps, robust ML pipelines, and high-performance Computer Vision systems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
            <div className="space-y-6">
              <h3 className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase">Core Deliverables</h3>
              <ul className="space-y-4 text-sm text-white/50 font-mono">
                {["Production-ready MERN ecosystem", "ML pipelines & Predictive modeling", "Enterprise-grade Computer Vision", "Scalable Backend Architecture"].map(item => (
                  <li key={item} className="flex gap-3"><span className="text-[#D4AF37] opacity-50">/</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase">Status Check</h3>
              <div className="flex flex-wrap gap-4">
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono uppercase tracking-wider">Open to Work: YES</div>
                <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono uppercase tracking-wider">Freelance: Available</div>
              </div>
              <div className="flex gap-10 pt-4">
                <a href="https://github.com/Tanmay-Mirgal" className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-[0.2em] transition-colors"><Github size={12}/> GitHub</a>
                <a href="https://linkedin.com/in/tanmay-mirgal-1402792a2" className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-[0.2em] transition-colors"><Linkedin size={12}/> LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </HolographicNode>
    </section>
  );
};
