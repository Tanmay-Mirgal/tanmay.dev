"use client";

import React from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { Achievement } from "@/types";

interface AchievementsSectionProps {
  achievementsData: Achievement[];
  setSelectedAchievement: (achievement: Achievement) => void;
}

export const AchievementsSection = ({ achievementsData, setSelectedAchievement }: AchievementsSectionProps) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <section id="achievements" className="py-24 md:py-32 pr-4 sm:pr-8 md:pr-12 lg:pr-24 z-10 relative">
      <div className="mb-12 md:mb-16">
        <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">HALL_OF_FAME / CERTIFICATIONS</h2>
        <p className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-display font-black text-white max-w-2xl leading-tight">Elite Recognition & <br/> <span className="text-white/30">System Certifications.</span></p>
      </div>
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {achievementsData.map((a, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedAchievement(a)} 
            className="group relative overflow-hidden border border-white/10 bg-[#050505] cursor-pointer hover:border-[#D4AF37]/50 transition-all duration-700 mb-4"
            style={{ 
              borderRadius: '2px',
              height: i % 2 === 0 ? 'auto' : '280px',
              minHeight: '200px'
            }}
          >
            <div className="relative w-full h-full min-h-[inherit]">
              <Image 
                src={a.url} 
                alt={a.title} 
                width={500}
                height={500}
                className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span className="font-mono text-[8px] text-[#D4AF37] bg-black/80 px-2 py-0.5 border border-[#D4AF37]/20 mb-2 inline-block">{a.org} | {a.date}</span>
              <h3 className="text-[10px] sm:text-xs font-display font-bold text-white uppercase tracking-wider line-clamp-2">{a.title}</h3>
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
};
