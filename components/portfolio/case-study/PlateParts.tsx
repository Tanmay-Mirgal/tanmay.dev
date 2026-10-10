"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";
import type { CaseStudy } from "@/lib/caseStudies";
import { demoOfflineNote } from "@/lib/caseStudies";

export type ProjectDoc = Doc<"projects">;

export const pad = (n: number) => String(n + 1).padStart(2, "0");

interface HeaderProps {
  project: ProjectDoc;
  study: CaseStudy;
  index: number;
}

/** Kicker, title, summary and the problem statement, shared by every plate. */
export function PlateHeader({ project, study, index }: HeaderProps) {
  return (
    <div>
      <p data-thread="dot" className="label">
        ({pad(index)}) {study.kicker}
      </p>
      <h3 className="display mt-5 text-[clamp(3.25rem,7vw,7.5rem)]">{project.title}</h3>
      <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-mute md:text-base">
        {study.summary}
      </p>
      <div className="mt-8 max-w-xl border-t border-line pt-5">
        <p className="label">The problem</p>
        <p className="mt-3 text-[15px] leading-relaxed text-paper/90">{study.problem}</p>
      </div>
    </div>
  );
}

/** Repository and demo links. A demo that failed its last check shows as offline, not as a dead link. */
export function PlateLinks({ project }: { project: ProjectDoc }) {
  const offline = project.liveLink ? demoOfflineNote(project.title) : undefined;
  const hasSource = project.link && project.link !== "#";

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      {project.liveLink &&
        (offline ? (
          <li className="label !text-faint" title={offline}>
            Demo offline
          </li>
        ) : (
          <li>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="label u-link inline-flex items-center gap-1 pb-1 !text-paper"
            >
              Live demo <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </li>
        ))}
      {hasSource && (
        <li>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="label u-link inline-flex items-center gap-1 pb-1 !text-paper"
          >
            Source <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  );
}

export function PlateTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-mute">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export function PlateFacts({ facts }: { facts: NonNullable<CaseStudy["facts"]> }) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-2">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="label">{fact.label}</dt>
          <dd className="mt-1 text-[15px] text-paper">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PlateStatus({ children }: { children: string }) {
  return (
    <p className="max-w-xl border-l-2 border-[var(--color-thread)] pl-4 text-sm leading-relaxed text-mute">
      {children}
    </p>
  );
}

interface ImageProps {
  project: ProjectDoc;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function ProjectImage({ project, sizes, className = "", priority }: ImageProps) {
  return (
    <Image
      src={project.image}
      alt={`${project.title} screenshot`}
      fill
      sizes={sizes}
      priority={priority}
      className={`mono-img object-cover ${className}`}
    />
  );
}
