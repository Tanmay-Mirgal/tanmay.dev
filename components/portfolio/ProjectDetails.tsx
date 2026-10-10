"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";
import { demoOfflineNote, findCaseStudy } from "@/lib/caseStudies";

export type ProjectDoc = Doc<"projects">;

interface Props {
  project: ProjectDoc;
  index: number;
  total: number;
  onOpenFull: () => void;
}

const linkClass = "label u-link inline-flex items-center gap-1 pb-1 !text-paper";

/**
 * Compact case study for the selected project. Convex supplies the title, image,
 * tags and links; lib/caseStudies.ts adds the verified story where one exists.
 */
export function ProjectDetails({ project, index, total, onOpenFull }: Props) {
  const study = findCaseStudy(project.title);
  const notes = study?.beats ?? study?.steps?.map((s) => ({ title: s.label, body: s.detail }));
  const offline = project.liveLink ? demoOfflineNote(project.title) : undefined;
  const hasSource = project.link && project.link !== "#";

  return (
    <div key={project._id} className="animate-fade-in space-y-7">
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-graphite">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="mono-img object-cover"
        />
      </div>

      <div>
        <p className="label">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          {study ? ` ${study.kicker}` : ""}
        </p>
        <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3.25rem)]">{project.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-mute">{study?.summary ?? project.desc}</p>
      </div>

      {study && (
        <div className="border-t border-line pt-5">
          <p className="label">The problem</p>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/90">{study.problem}</p>
        </div>
      )}

      {study?.facts && (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
          {study.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1 text-sm text-paper">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {study?.status && (
        <p className="border-l border-paper/40 pl-4 text-sm leading-relaxed text-mute">{study.status}</p>
      )}

      {notes && notes.length > 0 && (
        <details className="group border-t border-line pt-4">
          <summary className="label flex cursor-pointer list-none items-center justify-between !text-paper">
            Engineering notes ({notes.length})
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <ol className="mt-5 space-y-5">
            {notes.map((note, i) => (
              <li key={note.title} className="grid grid-cols-[1.75rem_1fr]">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-medium text-paper">{note.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-mute">{note.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </details>
      )}

      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-mute">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        <li>
          <button type="button" onClick={onOpenFull} className={linkClass}>
            Full details
          </button>
        </li>
        {project.liveLink &&
          (offline ? (
            <li className="label !text-faint" title={offline}>
              Demo offline
            </li>
          ) : (
            <li>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Live demo <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
          ))}
        {hasSource && (
          <li>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Source <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
