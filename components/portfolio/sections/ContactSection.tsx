"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";
import { HolographicNode } from "../HolographicNode";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 md:py-40 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative text-center flex justify-center">
      <HolographicNode id="contact_node">
        <div className="border-y border-white/10 py-16 md:py-24 w-full relative">
          <h2 className="text-[2.8rem] sm:text-6xl md:text-[8rem] font-display font-black leading-none mb-8 tracking-tighter hover:text-[#D4AF37] transition-colors cursor-default">EXECUTE</h2>
          <p className="text-sm sm:text-xl text-white/50 font-light mb-10 max-w-lg mx-auto">I am ready to architect your next high-performance enterprise system.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="mailto:tanmaymirgal26@gmail.com" className="px-8 py-4 md:px-12 md:py-5 bg-[#D4AF37] text-black font-mono font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all">Establish Connection</a>
            <div className="flex gap-4">
              <a href="https://github.com/Tanmay-Mirgal" target="_blank" className="p-4 border border-white/20 text-white/50 hover:bg-white hover:text-black transition-all"><Github size={24}/></a>
              <a href="https://linkedin.com/in/tanmay-mirgal-1402792a2" target="_blank" className="p-4 border border-white/20 text-white/50 hover:bg-[#0A66C2] hover:text-white transition-all"><Linkedin size={24}/></a>
            </div>
          </div>
        </div>
      </HolographicNode>
    </section>
  );
};
