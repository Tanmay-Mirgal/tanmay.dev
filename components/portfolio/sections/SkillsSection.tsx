"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const SkillsSection = () => {
  const skillGroups = useQuery(api.portfolio.getSkillGroups);

  if (skillGroups === undefined) {
    return (
      <section id="skills" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
            Skills
          </h2>
        </div>
        <div className="text-white/50 text-sm">Loading...</div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Skills
        </h2>
      </div>

      {/* Editorial Table Layout */}
      <div className="divide-y divide-white/[0.06] border-b border-white/[0.06]">
        {skillGroups.map((group, idx) => (
          <div
            key={idx}
            className="py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 font-sans transition-colors duration-300 group hover:bg-white/[0.01] px-2 rounded-lg"
          >
            {/* Left Column: Category Index & Title */}
            <div className="w-full md:w-56 shrink-0 flex items-center gap-2.5 font-mono text-[10px] text-white/30 tracking-widest uppercase">
              <span className="text-white/20">0{idx + 1} {"//"}</span>
              <span className="font-bold text-white/50 group-hover:text-white/80 transition-colors duration-300">
                {group.title}
              </span>
            </div>

            {/* Right Column: Inline Tags separated by mid-dots */}
            <div className="flex-1 flex flex-wrap items-center gap-y-3 gap-x-2 text-sm sm:text-base text-white/40 font-light leading-relaxed">
              {group.tags.map((tag, tIdx) => (
                <React.Fragment key={tIdx}>
                  <span className="text-white/50 hover:text-white hover:translate-y-[-1px] transition-all duration-200 cursor-default select-none">
                    {tag}
                  </span>
                  {tIdx < group.tags.length - 1 && (
                    <span className="text-white/10 select-none font-mono font-bold text-xs mx-0.5">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
