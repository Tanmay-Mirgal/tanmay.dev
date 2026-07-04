"use client";

import React from "react";
import { BookOpen, ArrowUpRight } from "lucide-react";

export const PublicationsSection = () => {
  return (
    <section id="publications" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Publications
        </h2>
      </div>

      {/* Entry */}
      <div className="p-6 bg-[#151518] border border-white/[0.06] rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-white/[0.15] hover:shadow-sm transition-all duration-300 relative group">
        
        {/* Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-display font-bold text-white uppercase tracking-wide leading-snug">
              Target Tracking & Advanced Deep Learning Algorithms in Combat Systems
            </h3>
            <span className="badge-blue px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide">
              JAAFR Journal
            </span>
          </div>

          <p className="text-xs text-white/50 leading-relaxed font-sans font-light max-w-2xl">
            Peer-reviewed research paper outlining convolutional tracking algorithms, real-time bounding updates in multi-sensor naval streams, and microservice backend orchestration protocols.
          </p>

          <div className="text-[10px] font-mono text-white/30 flex items-center gap-1.5 pt-1.5">
            <BookOpen size={12} /> May 2025 Edition
          </div>
        </div>

        {/* Read link */}
        <a
          href="https://www.rjwave.org/jaafr/viewpaperforall.php?paper=JAAFR2601296"
          target="_blank"
          className="px-4 py-2 border border-white/10 bg-white/[0.05] rounded-xl text-[10px] font-mono text-white hover:border-white/30 hover:bg-white/10 cursor-pointer transition-all flex items-center gap-1.5 self-stretch md:self-auto justify-center"
        >
          READ JOURNAL <ArrowUpRight size={11} />
        </a>

      </div>

    </section>
  );
};
