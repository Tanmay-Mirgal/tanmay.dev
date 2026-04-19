"use client";

import React from "react";
import Image from "next/image";
import { Achievement } from "@/types";

interface AchievementsSectionProps {
  achievementsData: Achievement[];
  setSelectedAchievement: (achievement: Achievement) => void;
}

export const AchievementsSection = ({ achievementsData, setSelectedAchievement }: AchievementsSectionProps) => {
  return (
    <section id="achievements" className="py-24 md:py-32 pr-2 sm:pr-4 md:pr-12 lg:pr-24 z-10 relative">
      <div className="mb-12 md:mb-16">
        <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">HALL_OF_FAME / CERTIFICATIONS</h2>
        <p className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white max-w-2xl leading-tight">Elite Recognition & <br/> <span className="text-white/30">System Certifications.</span></p>
      </div>
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[250px]">
        {achievementsData.map((a, i) => (
          <div key={i} onClick={() => setSelectedAchievement(a)} className="group relative overflow-hidden border border-white/10 bg-[#050505] cursor-pointer hover:border-[#D4AF37]/50 transition-all duration-700">
            <Image src={a.url} alt={a.title} fill className="object-cover grayscale-[80%] group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 w-full p-4 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span className="font-mono text-[8px] text-[#D4AF37] bg-black/80 px-2 py-0.5 border border-[#D4AF37]/20 mb-2 inline-block">{a.org} | {a.date}</span>
              <h3 className="text-xs font-display font-bold text-white uppercase tracking-wider">{a.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
