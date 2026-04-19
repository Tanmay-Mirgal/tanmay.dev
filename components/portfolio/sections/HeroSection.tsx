"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { HolographicNode } from "../HolographicNode";

interface HeroSectionProps {
  setPreviewDoc: (doc: { url: string; title: string } | null) => void;
}

export const HeroSection = ({ setPreviewDoc }: HeroSectionProps) => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center pr-4 sm:pr-6 md:pr-12 lg:pr-24 overflow-hidden py-24 lg:py-0">
      <HolographicNode id="home_node">
        <div className="flex flex-col gap-12 w-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.02] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="w-full space-y-10 relative z-10">
            <div className="flex flex-wrap gap-4 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-none text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
                ROLE: FULL_STACK_ENGINEER
              </motion.div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">LOC: MUMBAI, MH</div>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex items-center gap-4 sm:gap-6">
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
                >
                  <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-20 animate-pulse" />
                  <Image 
                    src="https://github.com/Tanmay-Mirgal.png" 
                    alt="Tanmay" 
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full border-[2px] border-[#D4AF37] object-cover relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                  />
                </motion.div>
                <h1 className="text-5xl min-[400px]:text-6xl sm:text-7xl lg:text-[8.5rem] font-display font-black leading-none tracking-tighter text-[#D4AF37]">TANMAY</h1>
              </div>
              <h1 className="text-5xl min-[400px]:text-6xl sm:text-7xl lg:text-[8.5rem] font-display font-black leading-none tracking-tighter text-[#D4AF37]">MIRGAL.</h1>
            </div>

            <div className="max-w-2xl space-y-8">
              <p className="text-base sm:text-lg lg:text-2xl text-white/50 font-medium leading-[1.6] tracking-tight">
                Designing scalable digital architecture. I specialize in building high-performance systems and intuitive interfaces. Currently engineering the future of web applications with a focus on optimization and user experience.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  onClick={() => setPreviewDoc({ 
                    url: "/resume_cv/Tanmay_Mirgal_FullStack_AI_Resume.pdf", 
                    title: "Full-Stack AI Resume" 
                  })}
                  className="relative group px-6 py-4 bg-[#D4AF37] text-black font-display font-black uppercase tracking-widest text-[10px] overflow-hidden flex items-center gap-3 transition-transform hover:scale-105"
                >
                  <FileText size={14} /> VIEW_RESUME
                </button>
                <button 
                  onClick={() => setPreviewDoc({ 
                    url: "/resume_cv/Tanmay_Mirgal_CV.pdf", 
                    title: "Professional CV" 
                  })}
                  className="relative group px-6 py-4 border border-[#D4AF37]/50 text-[#D4AF37] font-display font-black uppercase tracking-widest text-[10px] overflow-hidden flex items-center gap-3 hover:bg-[#D4AF37]/10 transition-transform hover:scale-105"
                >
                  <FileText size={14} /> VIEW_CV
                </button>
                <a href="mailto:tanmaymirgal26@gmail.com" className="px-6 py-4 border border-white/10 text-white font-display font-medium uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all flex items-center gap-3">
                  <X size={14} /> CONTACT_ME
                </a>
              </div>
            </div>
          </div>
        </div>
      </HolographicNode>
    </section>
  );
};
