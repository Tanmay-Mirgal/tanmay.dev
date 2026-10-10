"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { X, Github, ArrowUpRight, Globe } from "lucide-react";
import { Project } from "@/types";
import { useDialog } from "@/hooks/useDialog";
import { demoOfflineNote } from "@/lib/caseStudies";

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export const ProjectModal = ({ selectedProject, setSelectedProject }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = () => setSelectedProject(null);

  useDialog(selectedProject !== null, close, dialogRef);

  if (!selectedProject) return null;

  const demoNote = selectedProject.liveLink ? demoOfflineNote(selectedProject.title) : undefined;

  const buttonBase =
    "inline-flex items-center gap-2 border-[3px] border-paper px-5 py-3 font-mono text-xs font-bold uppercase transition-colors";

  return (
    <div className="animate-fade-in fixed inset-0 z-[2000] overflow-y-auto bg-paper/50 p-4 backdrop-blur-sm md:p-8">
      <div className="absolute inset-0" onClick={close} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="relative z-10 mx-auto my-4 w-full max-w-6xl border-[4px] border-paper bg-ink p-6 shadow-[12px_12px_0_#0f0f0f] sm:p-10 md:my-8 md:p-14"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close project details"
          className="absolute right-4 top-4 border-[3px] border-paper bg-yellow p-2.5 transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="grid gap-10 pt-6 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="label">Project</p>
                <h3
                  id="project-modal-title"
                  className="display text-[clamp(2rem,5vw,4rem)] !leading-[0.95]"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <div className="space-y-3 border-t border-line pt-6">
                <p className="label">Technologies</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-paper/80">
                  {selectedProject.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedProject.liveLink && demoNote && (
                <span
                  title={demoNote}
                  className={`${buttonBase} cursor-not-allowed border border-line text-faint`}
                >
                  <Globe size={14} aria-hidden="true" /> Demo offline
                </span>
              )}
              {selectedProject.liveLink && !demoNote && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonBase} bg-paper text-ink hover:opacity-85`}
                >
                  <Globe size={14} aria-hidden="true" /> Live demo <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
              {selectedProject.link === "#" ? (
                <span className={`${buttonBase} cursor-not-allowed border border-line text-faint`}>
                  Confidential source
                </span>
              ) : (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonBase} ${
                    selectedProject.liveLink
                      ? "border border-line text-paper hover:border-paper/50"
                      : "bg-paper text-ink hover:bg-white"
                  }`}
                >
                  <Github size={14} aria-hidden="true" /> Source <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <div className="shot relative aspect-[16/10]">
              <Image
                src={selectedProject.image}
                alt={`${selectedProject.title} screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <p className="label">Overview</p>
              <p className="text-[15px] leading-relaxed text-mute sm:text-base">
                {selectedProject.fullDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
