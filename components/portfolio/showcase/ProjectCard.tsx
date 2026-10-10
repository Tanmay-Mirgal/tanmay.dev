"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import type { ProjectDoc } from "./ProjectShowcase";

interface Props {
  project: ProjectDoc;
  onOpen: () => void;
}

/** Compact card for the rest of the work. Opens the full-details dialog. */
export function ProjectCard({ project, onOpen }: Props) {
  return (
    <Reveal as="li">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        className="group block w-full text-left"
      >
        <div className="shot relative aspect-[16/10] transition-transform duration-500 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <h4 className="display text-[clamp(1.5rem,2.2vw,2rem)]">{project.title}</h4>
          <ArrowUpRight
            aria-hidden="true"
            size={20}
            className="mt-1 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
          />
        </div>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-mute">{project.desc}</p>
        <p className="label mt-3">{project.tags.slice(0, 3).join(" / ")}</p>
      </button>
    </Reveal>
  );
}
