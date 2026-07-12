"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Check } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Achievement } from "@/types";

export const AchievementsSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Achievement | null>(null);
  const achievementsData = useQuery(api.portfolio.getAchievements);

  if (achievementsData === undefined) {
    return (
      <section id="achievements" className="py-16 border-t border-white/[0.06] flex justify-center items-center">
        <div className="text-white/50 font-mono text-xs uppercase tracking-widest animate-pulse">Loading Achievements...</div>
      </section>
    );
  }

  // Filter achievements & hackathons (exclude standard course certifications)
  const achievements = achievementsData.filter((item) => {
    const title = item.title.toUpperCase();
    return (
      title.includes("HACKATHON") ||
      title.includes("IDEATHON") ||
      title.includes("OFFER") ||
      title.includes("INTERNSHIP") ||
      title.includes("RESEARCH") ||
      title.includes("PUBLICATION")
    );
  });

  return (
    <section id="achievements" className="py-16 border-t border-white/[0.06] relative space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
          Achievements
        </h2>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedPhoto(item)}
            className="p-5 bg-[#151518] border border-white/[0.06] rounded-2xl flex flex-col justify-between hover:border-white/[0.15] hover:shadow-sm transition-all duration-300 relative cursor-pointer group"
          >
            
            {/* Visual thumbnail of the actual certificate/medal link */}
            <div className="w-full aspect-[16/10] border border-white/[0.06] rounded-xl overflow-hidden bg-zinc-900 relative mb-4">
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Content info */}
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-xs sm:text-sm font-display font-bold text-white leading-snug uppercase tracking-wide">
                  {item.title}
                </h3>
                <span className="badge-green shrink-0 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide">
                  {item.date}
                </span>
              </div>

              <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] mt-3 flex justify-between items-center text-[9px] font-mono text-white/30">
              <span>Issuer: {item.org}</span>
              <span className="text-emerald-400 font-bold uppercase flex items-center gap-0.5"><Check size={10} /> Verified Record</span>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox Zoom Overlay */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-[#0B0B0C]/98 z-[990] flex flex-col p-6 select-none"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Header controls */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5 max-w-4xl mx-auto w-full">
            <span className="text-[10px] font-mono text-white/40 flex items-center gap-1.5 uppercase">
              <Award size={13} /> {selectedPhoto.org} | {selectedPhoto.date}
            </span>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="px-4 py-1.5 border border-white/10 bg-white/[0.05] rounded-xl text-[9px] font-mono text-white hover:bg-white/10 cursor-pointer transition-all"
            >
              CLOSE PREVIEW
            </button>
          </div>

          {/* Large Image Frame */}
          <div className="flex-1 relative w-full max-w-3xl mx-auto bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              fill
              priority
              className="object-contain p-3"
            />
          </div>

          {/* Specifications */}
          <div className="py-4 px-2 space-y-2 max-w-xl mx-auto text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-display font-bold text-white uppercase tracking-wider leading-snug">
              {selectedPhoto.title}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
              {selectedPhoto.desc}
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
