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

const pill = "inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mute";
const btnSolid =
  "inline-flex items-center gap-1.5 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-85";
const btnOutline =
  "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-paper px-5 py-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink";

/**
 * One featured project, image first: a large product screenshot beside the case
 * study. Convex supplies the title, image, tags and links; lib/caseStudies.ts adds
 * the verified story where one exists, and the card still works without it.
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
          clipPath: "inset(0% 0% 100% 0% round 14px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
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
    <article ref={root} className="grid-12 items-center gap-y-10 border-t border-line py-14 md:py-20">
      <div className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div data-frame className="shot relative aspect-[16/10]">
          <div data-parallax className="absolute inset-x-0 -top-[7%] h-[114%]">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
        <p data-copy className="label">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          {study ? `  ${study.kicker}` : ""}
        </p>
        <h3 data-copy className="display mt-4 text-[clamp(2.5rem,4.6vw,4.5rem)]">
          {project.title}
        </h3>
        <p data-copy className="mt-5 text-[16px] leading-relaxed text-mute">
          {study?.summary ?? project.desc}
        </p>

        {study && (
          <div data-copy className="mt-6 border-t border-line pt-5">
            <p className="label">The problem</p>
            <p className="mt-2 text-[15px] leading-relaxed">{study.problem}</p>
          </div>
        )}

        {study?.facts && (
          <dl data-copy className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1 text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {study?.status && (
          <p data-copy className="mt-6 border-l-2 border-paper/40 pl-4 text-sm leading-relaxed text-mute">
            {study.status}
          </p>
        )}

        {notes && notes.length > 0 && (
          <details data-copy className="group mt-6 border-t border-line pt-4">
            <summary className="label flex cursor-pointer list-none items-center justify-between !text-paper">
              Engineering notes ({notes.length})
              <span aria-hidden="true" className="text-base transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <ol className="mt-5 space-y-5">
              {notes.map((note, i) => (
                <li key={note.title} className="grid grid-cols-[1.75rem_1fr]">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-semibold">{note.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mute">{note.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </details>
        )}

        <ul data-copy className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className={pill}>
              {tag}
            </li>
          ))}
        </ul>

        <ul data-copy className="mt-7 flex flex-wrap gap-3">
          {project.liveLink &&
            (offline ? (
              <li>
                <span
                  title={offline}
                  className="inline-flex cursor-not-allowed items-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-faint"
                >
                  Demo offline
                </span>
              </li>
            ) : (
              <li>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={btnSolid}>
                  Live demo <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          {hasSource && (
            <li>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                Source <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
