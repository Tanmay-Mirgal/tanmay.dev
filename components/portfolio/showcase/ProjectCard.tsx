"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";
import type { ProjectDoc } from "./ProjectShowcase";

interface Props {
  project: ProjectDoc;
  onOpen: () => void;
}

/** Poster tile for the rest of the work. Opens the full-details dialog. */
export function ProjectCard({ project, onOpen }: Props) {
  return (
    <Reveal as="li">
      <button
        type="button"
        onClick={onOpen}
        className="poster-card poster-lift group block h-full w-full text-left"
      >
        <span className="relative block aspect-[16/10] border-b-[3px] border-paper bg-surface">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </span>
        <span className="flex items-start justify-between gap-3 px-4 pt-4">
          <span className="display text-[clamp(1.15rem,1.7vw,1.5rem)] !leading-[1]">{project.title}</span>
          <ArrowUpRight aria-hidden="true" size={22} className="mt-0.5 shrink-0" />
        </span>
        <span className="mt-2 line-clamp-2 block px-4 text-[15px] leading-relaxed text-mute">
          {project.desc}
        </span>
        <span className="mt-3 flex flex-wrap gap-2 px-4 pb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="pill bg-ink !px-2.5 !py-0.5 !text-[11px]">
              {tag}
            </span>
          ))}
        </span>
      </button>
    </Reveal>
  );
}
