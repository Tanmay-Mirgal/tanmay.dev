"use client";

import React from "react";
// import { Github, Linkedin } from "lucide-react"; // Removed as unused
import { HolographicNode } from "../HolographicNode";

export const IdentitySection = () => {
  return (
    <section id="identity" className="py-24 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
      <HolographicNode id="identity_node">
        <div className="mb-12">
          <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">
            PERSONAL_IDENTITY_NODE
          </h2>
        </div>
        <div className="bg-[#080808]/50 border-l border-white/10 p-10 sm:p-14 space-y-12 backdrop-blur-xl">
          <div className="space-y-6">
            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 font-medium leading-[1.8] font-sans italic">&quot;The best investment is building something that creates value for others.&quot;</p>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/60 font-medium leading-[1.8] font-sans">I am a <span className="text-white">Full-Stack Engineer + ML/DL Developer</span> with a mission to build products from 0 to production. I specialize in delivering production-ready MERN apps, robust ML pipelines, and high-performance Computer Vision systems.</p>
          </div>
        </div>
      </HolographicNode>
    </section>
  );
};
