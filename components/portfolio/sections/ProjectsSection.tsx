"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Project } from "@/types";
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";
import { Section } from "@/components/portfolio/Section";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";
import { ProjectDetails } from "@/components/portfolio/ProjectDetails";
import { registerSlot, setProjectShape } from "@/components/portfolio/sculpture/store";
import { StaticShape } from "@/components/portfolio/sculpture/StaticShape";
import { shapeForTitle, type ShapeName } from "@/lib/sculpture";

const FORM_LABEL: Record<ShapeName, string> = {
  cloud: "Cloud",
  pose: "Pose landmarks",
  orb: "Orbit",
  bars: "Feature importance",
  plane: "Infinite canvas",
  wave: "Waveform",
  radar: "Radar sweep",
  city: "City grid",
  mesh: "Mesh network",
  net: "Neural layers",
};

const corner = "absolute h-3 w-3 border-paper/40";

/**
 * One interactive stage instead of a long scroll: pick a project and the particle
 * sculpture re-forms into its symbolic shape while the case study updates beside it.
 */
export const ProjectsSection = () => {
  const projects = useQuery(api.portfolio.getProjects);
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<Project | null>(null);
  const slot = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const current = projects?.[Math.min(active, (projects?.length ?? 1) - 1)];
  const shape = useMemo(() => (current ? shapeForTitle(current.title) : "orb"), [current]);

  // The slot only exists once the projects have loaded
  const loaded = projects !== undefined;
  useEffect(() => {
    if (!loaded || !slot.current) return;
    return registerSlot(slot.current, "projects");
  }, [loaded]);

  useEffect(() => {
    setProjectShape(shape);
  }, [shape]);

  const move = (to: number) => {
    if (!projects) return;
    const next = (to + projects.length) % projects.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <Section id="projects" index="02" eyebrow="Selected work" title="Projects" wide>
      {projects === undefined ? (
        <ListSkeleton rows={3} />
      ) : (
        <>
          <div className="grid-12 gap-y-8 lg:items-start">
            {/* The sculpture's stage: the fixed WebGL canvas draws inside this box */}
            <div className="order-1 col-span-12 lg:order-2 lg:col-span-4 lg:sticky lg:top-[14vh]">
              <div ref={slot} className="relative mx-auto aspect-[4/3] w-full max-w-[26rem] lg:aspect-square">
                <StaticShape shape={shape} className="sculpture-still absolute inset-0 h-full w-full transition-opacity duration-700" />
                <span aria-hidden="true" className={`${corner} left-0 top-0 border-l border-t`} />
                <span aria-hidden="true" className={`${corner} right-0 top-0 border-r border-t`} />
                <span aria-hidden="true" className={`${corner} bottom-0 left-0 border-b border-l`} />
                <span aria-hidden="true" className={`${corner} bottom-0 right-0 border-b border-r`} />
              </div>
              <p className="label mt-4 text-center" aria-live="polite">
                Form: {FORM_LABEL[shape]}
              </p>
            </div>

            <ol
              aria-label="Projects"
              className="order-2 col-span-12 flex gap-x-6 overflow-x-auto border-t border-line pt-2 lg:order-1 lg:col-span-3 lg:block lg:overflow-visible lg:pt-0"
            >
              {projects.map((project, i) => {
                const isActive = i === active;
                return (
                  <li key={project._id} className="shrink-0 lg:border-b lg:border-line">
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setActive(i)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                      onFocus={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                          e.preventDefault();
                          move(i + 1);
                        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          move(i - 1);
                        }
                      }}
                      className={`group flex w-full items-baseline gap-4 py-3 text-left transition-colors duration-300 lg:py-4 ${
                        isActive ? "text-paper" : "text-paper/40 hover:text-paper/80"
                      }`}
                    >
                      <span className="label !text-inherit">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display whitespace-nowrap text-[clamp(1.05rem,1.5vw,1.45rem)] !tracking-[-0.03em] lg:whitespace-normal">
                        {project.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="order-3 col-span-12 lg:col-span-5" role="region" aria-label="Project details">
              {current && (
                <ProjectDetails
                  project={current}
                  index={Math.min(active, projects.length - 1)}
                  total={projects.length}
                  onOpenFull={() => setModal(current)}
                />
              )}
            </div>
          </div>
        </>
      )}

      <ProjectModal selectedProject={modal} setSelectedProject={setModal} />
    </Section>
  );
};
