"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Project } from "@/types";
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";

type ProjectDoc = Doc<"projects">;

const FEATURED_COUNT = 3;
const pad = (n: number) => String(n + 1).padStart(2, "0");

interface FeaturedProps {
  project: ProjectDoc;
  index: number;
  onOpen: (project: Project) => void;
}

/** Large showcase row: image reveals with a clip, then drifts against the scroll. */
const FeaturedProject = ({ project, index, onOpen }: FeaturedProps) => {
  const root = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from("[data-clip]", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from("[data-copy]", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  const hasSource = project.link && project.link !== "#";

  return (
    <article ref={root} className="grid-12 items-end gap-y-8 py-10 md:py-16">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
        className={`group relative col-span-12 block text-left md:col-span-8 ${
          flip ? "md:col-start-5" : ""
        }`}
      >
        <div data-clip className="relative aspect-[16/10] overflow-hidden border border-line bg-paper/5">
          <div data-parallax className="absolute inset-x-0 -top-[9%] h-[118%]">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="mono-img object-cover"
            />
          </div>
        </div>
      </button>

      <div
        className={`col-span-12 md:col-span-4 ${
          flip ? "md:col-start-1 md:row-start-1" : "md:col-start-9"
        }`}
      >
        <p data-copy className="label">
          ({pad(index)}) Selected work
        </p>
        <h3 data-copy className="display mt-4 text-[clamp(2.5rem,4.2vw,4.5rem)]">
          {project.title}
        </h3>
        <p data-copy className="mt-5 text-[15px] leading-relaxed text-mute">
          {project.desc}
        </p>
        <p data-copy className="label mt-6 !text-faint">
          {project.tags.slice(0, 5).join(" / ")}
        </p>

        <ul data-copy className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
          <li>
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="label u-link pb-1 !text-paper"
            >
              Details
            </button>
          </li>
          {project.liveLink && (
            <li>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="label u-link inline-flex items-center gap-1 pb-1 !text-paper"
              >
                Live <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
          )}
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
      </div>
    </article>
  );
};

interface IndexProps {
  projects: ProjectDoc[];
  offset: number;
  onOpen: (project: Project) => void;
}

/** Remaining projects as a typographic index; a preview image trails the cursor. */
const ProjectIndex = ({ projects, offset, onOpen }: IndexProps) => {
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(-1);

  useGSAP(
    () => {
      const el = preview.current;
      const container = list.current;
      if (!el || !container) return;

      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const moveX = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          moveX(e.clientX + 28);
          moveY(e.clientY - 110);
        };
        container.addEventListener("pointermove", onMove);
        return () => container.removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: list }
  );

  return (
    <>
      <ul ref={list} className="border-t border-line" onPointerLeave={() => setHovered(-1)}>
        {projects.map((project, i) => (
          <Reveal as="li" key={project._id} className="border-b border-line">
            <button
              type="button"
              onClick={() => onOpen(project)}
              onPointerEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(-1)}
              className="group grid w-full grid-cols-12 items-baseline gap-x-6 py-6 text-left md:py-8"
            >
              <span className="label col-span-2 md:col-span-1">{pad(offset + i)}</span>
              <span className="display col-span-10 text-[clamp(1.9rem,3.6vw,3.5rem)] transition-transform duration-500 group-hover:translate-x-3 group-focus-visible:translate-x-3 md:col-span-6">
                {project.title}
              </span>
              <span className="label col-span-9 col-start-3 mt-3 !text-faint md:col-span-4 md:col-start-8 md:mt-0">
                {project.tags.slice(0, 3).join(" / ")}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="hidden justify-self-end text-faint transition-colors group-hover:text-paper md:col-span-1 md:block"
                size={18}
              />
            </button>
          </Reveal>
        ))}
      </ul>

      {/* Cursor-following preview: decorative, pointer devices only */}
      <div
        ref={preview}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-[13.5rem] w-[21rem] overflow-hidden border border-line bg-ink transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:block ${
          hovered >= 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {projects.map((project, i) => (
          <Image
            key={project._id}
            src={project.image}
            alt=""
            fill
            sizes="336px"
            className={`object-cover transition-opacity duration-300 ${
              hovered === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projectsData = useQuery(api.portfolio.getProjects);

  const featured = projectsData?.slice(0, FEATURED_COUNT) ?? [];
  const rest = projectsData?.slice(FEATURED_COUNT) ?? [];

  return (
    <Section id="projects" index="02" eyebrow="Selected work" title="Projects" wide>
      {projectsData === undefined ? (
        <ListSkeleton rows={3} />
      ) : (
        <>
          <div className="border-t border-line">
            {featured.map((project, i) => (
              <FeaturedProject key={project._id} project={project} index={i} onOpen={setActiveProject} />
            ))}
          </div>

          {rest.length > 0 && (
            <div className="mt-16 md:mt-24">
              <p className="label mb-6">More projects ({rest.length})</p>
              <ProjectIndex projects={rest} offset={FEATURED_COUNT} onOpen={setActiveProject} />
            </div>
          )}
        </>
      )}

      <ProjectModal selectedProject={activeProject} setSelectedProject={setActiveProject} />
    </Section>
  );
};
