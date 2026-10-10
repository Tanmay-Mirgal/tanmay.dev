"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";
import { demoOfflineNote, type CaseStudy } from "@/lib/caseStudies";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";

export type ProjectDoc = Doc<"projects">;

interface Props {
  project: ProjectDoc;
  study?: CaseStudy;
  index: number;
  total: number;
}

/**
 * One featured project, image first: a large product screenshot in a poster frame
 * beside the case study. Convex supplies the title, image, tags and links;
 * lib/caseStudies.ts adds the verified story where one exists, and the row still
 * works without it.
 */
export function ProjectShowcase({ project, study, index, total }: Props) {
  const root = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;
  const notes = study?.beats ?? study?.steps?.map((s) => ({ title: s.label, body: s.detail }));
  const offline = project.liveLink ? demoOfflineNote(project.title) : undefined;
  const hasSource = project.link && project.link !== "#";

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-frame]", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
        gsap.from("[data-copy]", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <article ref={root} className="grid-12 items-start gap-y-10 border-t-[3px] border-paper py-12 md:py-16">
      <div className={`col-span-12 lg:sticky lg:top-24 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div data-frame className="shot relative aspect-[16/10]">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
        <p data-copy className="flex flex-wrap items-center gap-3">
          <span className="pill bg-yellow">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {study && <span className="label !text-paper">{study.kicker}</span>}
        </p>
        <h3 data-copy className="display mt-5 text-[clamp(2rem,4vw,3.75rem)]">
          {project.title}
        </h3>
        <p data-copy className="mt-5 text-base leading-relaxed">
          {study?.summary ?? project.desc}
        </p>

        {study && (
          <div data-copy className="mt-6 border-t-[3px] border-paper pt-5">
            <p className="label !text-paper">The problem</p>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">{study.problem}</p>
          </div>
        )}

        {study?.facts && (
          <dl data-copy className="poster-card mt-6 grid grid-cols-2 gap-x-6 gap-y-4 p-4 !shadow-[5px_5px_0_#0f0f0f]">
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1 text-sm font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {study?.status && (
          <p data-copy className="mt-6 border-l-[6px] border-blue pl-4 text-sm leading-relaxed text-mute">
            {study.status}
          </p>
        )}

        {notes && notes.length > 0 && (
          <details data-copy className="group mt-6 border-t-[3px] border-paper pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-xs font-bold uppercase">
              Engineering notes ({notes.length})
              <span aria-hidden="true" className="pill bg-yellow transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <ol className="mt-5 space-y-5">
              {notes.map((note, i) => (
                <li key={note.title} className="grid grid-cols-[2rem_1fr]">
                  <span className="label !text-blue">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-bold">{note.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mute">{note.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </details>
        )}

        <ul data-copy className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="pill bg-ink">
              {tag}
            </li>
          ))}
        </ul>

        <ul data-copy className="mt-8 flex flex-wrap gap-4">
          {project.liveLink &&
            (offline ? (
              <li>
                <span title={offline} aria-disabled="true" className="pbtn !shadow-none opacity-50">
                  Demo offline
                </span>
              </li>
            ) : (
              <li>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="pbtn">
                  Live demo <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          {hasSource && (
            <li>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="pbtn-alt">
                Source <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
