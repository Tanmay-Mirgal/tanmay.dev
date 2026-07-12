"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const WorkSection = () => {
  const experiences = useQuery(api.portfolio.getExperience);

  if (experiences === undefined) {
    return (
      <section id="work" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
            Work Experience
          </h2>
        </div>
        <div className="text-white/50 text-sm">Loading...</div>
      </section>
    );
  }

  return (
    <section id="work" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Work Experience
        </h2>
      </div>

      {/* Timeline Entries */}
      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 font-sans">
            
            {/* Date column */}
            <div className="w-full md:w-36 shrink-0 font-mono text-[10px] text-white/30 tracking-wider">
              {exp.date}
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-4">
              
              {/* Role & Company Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-display font-bold text-white leading-snug">
                  {exp.role}
                </h3>
                <span className="badge-gray px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide">
                  {exp.company}
                </span>
              </div>

              {/* Bullet points with angle-brackets */}
              <ul className="space-y-3.5 text-xs text-white/50 font-light leading-relaxed">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="text-white/40 select-none shrink-0 font-mono font-bold">&gt;</span>
                    <span className="font-sans">{bullet}</span>
                  </li>
                ))}
              </ul>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
