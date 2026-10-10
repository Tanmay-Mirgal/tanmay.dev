"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Achievement } from "@/types";
import { useDialog } from "@/hooks/useDialog";

interface AchievementModalProps {
  selectedAchievement: Achievement | null;
  setSelectedAchievement: (achievement: Achievement | null) => void;
}

export const AchievementModal = ({ selectedAchievement, setSelectedAchievement }: AchievementModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = () => setSelectedAchievement(null);

  useDialog(selectedAchievement !== null, close, dialogRef);

  if (!selectedAchievement) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-modal-title"
      tabIndex={-1}
      className="animate-fade-in fixed inset-0 z-[2000] flex flex-col bg-ink/97 p-4 backdrop-blur-sm sm:p-8"
      onClick={close}
    >
      <div
        className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="label">
            {selectedAchievement.org} <span className="mx-2 text-faint">/</span> {selectedAchievement.date}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            className="border border-line p-2 text-mute transition-colors hover:text-paper"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="relative my-5 min-h-0 flex-1 overflow-hidden border border-line bg-paper/5">
          {selectedAchievement.type === "pdf" ? (
            <iframe
              src={selectedAchievement.url}
              title={selectedAchievement.title}
              className="h-full w-full bg-white"
            />
          ) : (
            <Image
              src={selectedAchievement.url}
              alt={selectedAchievement.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain p-3"
            />
          )}
        </div>

        <div className="max-w-2xl space-y-2 pb-1">
          <h3 id="record-modal-title" className="text-lg font-medium leading-snug">
            {selectedAchievement.title}
          </h3>
          <p className="text-sm leading-relaxed text-mute">{selectedAchievement.desc}</p>
        </div>
      </div>
    </div>
  );
};
