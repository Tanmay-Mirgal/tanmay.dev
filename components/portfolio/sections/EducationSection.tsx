"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const EducationSection = () => {
  const educations = useQuery(api.portfolio.getEducation);

  if (educations === undefined) {
    return (
      <section id="education" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
            Education
          </h2>
        </div>
        <div className="text-white/50 text-sm">Loading...</div>
      </section>
    );
  }

  return (
    <section id="education" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Education
        </h2>
      </div>

      {/* Entries */}
      <div className="space-y-12">
        {educations.map((edu, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 font-sans">
            
            {/* Date column */}
            <div className="w-full md:w-36 shrink-0 font-mono text-[10px] text-white/30 tracking-wider">
              {edu.date}
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-display font-bold text-white leading-snug">
                  {edu.degree}
                </h3>
                <span className="badge-blue px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide">
                  {edu.institution}
                </span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light max-w-xl">
                {edu.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
