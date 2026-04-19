"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Achievement } from "@/types";

interface AchievementModalProps {
  selectedAchievement: Achievement | null;
  setSelectedAchievement: (achievement: Achievement | null) => void;
}

export const AchievementModal = ({ selectedAchievement, setSelectedAchievement }: AchievementModalProps) => {
  if (!selectedAchievement) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/98 backdrop-blur-3xl">
      <button onClick={() => setSelectedAchievement(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] z-[2001] border border-white/10 bg-white/5 p-3 rounded hover:bg-white/10"><X size={24} /></button>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl aspect-video bg-[#050505] border border-[#D4AF37]/30 flex flex-col p-2">
        <div className="relative flex-1 bg-black border border-white/5 overflow-hidden">
          {selectedAchievement.type === 'pdf' ? (
            <iframe src={selectedAchievement.url} className="w-full h-full bg-white"/>
          ) : (
            <Image src={selectedAchievement.url} alt={selectedAchievement.title} fill className="object-contain p-2"/>
          )}
        </div>
        <div className="p-8 pb-4">
          <p className="text-[#D4AF37] font-mono text-[10px] uppercase mb-2">{selectedAchievement.org} | {selectedAchievement.date}</p>
          <h3 className="text-3xl font-display font-medium text-white mb-2">{selectedAchievement.title}</h3>
          <p className="text-white/50 text-sm font-light">{selectedAchievement.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
