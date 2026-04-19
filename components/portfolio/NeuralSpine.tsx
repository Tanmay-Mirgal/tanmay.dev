"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";

interface NeuralSpineProps {
  spineHeight: MotionValue<string>;
  activeSection: string;
}

export const NeuralSpine = ({ spineHeight, activeSection }: NeuralSpineProps) => {
  const sections = ["home", "capabilities", "stack", "projects", "freelance", "achievements", "contact"];

  return (
    <div className="fixed left-2 sm:left-6 md:left-12 lg:left-24 top-0 bottom-0 w-[1px] bg-white/5 z-[50]">
      {/* Active Liquid Gold flowing down */}
      <motion.div 
        style={{ height: spineHeight, transformOrigin: "top" }} 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-[#F9A826] to-[#D4AF37] shadow-[0_0_15px_#D4AF37]" 
      />
      
      {/* Node trackers */}
      {sections.map((id, i) => (
        <a 
          key={id} 
          href={`#${id}`}
          className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 min-[400px]:w-4 min-[400px]:h-4 rounded-full border border-[#D4AF37] transition-all duration-700 shadow-[0_0_15px_#D4AF37] cursor-pointer z-50 hover:bg-[#D4AF37]/40 ${activeSection === id ? 'bg-[#F9A826] scale-150' : 'bg-black scale-100'}`}
          style={{ top: `${(i + 1) * 12.5}%` }}
        >
          <div className={`absolute top-1/2 left-6 -translate-y-1/2 text-[9px] font-mono tracking-widest uppercase transition-opacity duration-500 hidden sm:block ${activeSection === id ? 'opacity-100 text-[#D4AF37]' : 'opacity-0'}`}>
            {id}
          </div>
        </a>
      ))}
    </div>
  );
};
