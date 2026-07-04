"use client";

import React from "react";

export const EducationSection = () => {
  return (
    <section id="education" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Education
        </h2>
      </div>

      {/* Entry */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 font-sans">
        
        {/* Date column */}
        <div className="w-full md:w-36 shrink-0 font-mono text-[10px] text-white/30 tracking-wider">
          2023-01 - 2026-12
        </div>

        {/* Content Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-sm sm:text-base font-display font-bold text-white leading-snug">
              Diploma in Computer Engineering
            </h3>
            <span className="badge-blue px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide">
              Vidyalankar Polytechnic
            </span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed font-sans font-light max-w-xl">
            Graduated with a focus on computer science, algorithms, software engineering principles, and databases. Maintained a distinction GPA of 9.38/10.
          </p>
        </div>

      </div>

    </section>
  );
};
