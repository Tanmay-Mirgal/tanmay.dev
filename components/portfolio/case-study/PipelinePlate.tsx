"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";
import {
  PlateFacts,
  PlateHeader,
  PlateLinks,
  PlateStatus,
  PlateTags,
  ProjectImage,
  pad,
  type ProjectDoc,
} from "./PlateParts";

interface Props {
  project: ProjectDoc;
  study: CaseStudy;
  index: number;
}

/**
 * Cinematic banner (clip reveal, then drift against the scroll), above the
 * project's pipeline as a vertical sequence the thread runs down.
 */
export function PipelinePlate({ project, study, index }: Props) {
  const root = useRef<HTMLElement>(null);
  const steps = study.steps ?? [];

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
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: "[data-clip]", start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.fromTo(
          "[data-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: true },
          }
        );
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <article ref={root} className="border-t border-line py-14 md:py-24">
      <div data-clip className="relative aspect-[16/9] overflow-hidden border border-line bg-paper/5 md:aspect-[21/9]">
        <div data-parallax className="absolute inset-x-0 -top-[10%] h-[120%]">
          <ProjectImage project={project} sizes="(max-width: 1024px) 100vw, 90vw" />
        </div>
      </div>

      <div className="grid-12 mt-12 gap-y-12 md:mt-16">
        <div className="col-span-12 lg:col-span-5">
          <PlateHeader project={project} study={study} index={index} />
          <div className="mt-10 space-y-8">
            {study.status && <PlateStatus>{study.status}</PlateStatus>}
            <PlateTags tags={project.tags} />
            <PlateLinks project={project} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="label mb-6">How it works</p>
          <ol data-steps className="relative space-y-9 pl-9">
            <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
            <span
              data-line
              aria-hidden="true"
              className="absolute bottom-2 left-[6px] top-2 w-[3px] bg-[var(--color-thread)]"
            />
            {steps.map((step, i) => (
              <li key={step.label} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-9 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-[var(--color-thread)] bg-ink"
                />
                <p className="label">{pad(i)}</p>
                <p className="display mt-1 text-[clamp(1.6rem,2.2vw,2.25rem)] !leading-[1.05]">
                  {step.label}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{step.detail}</p>
              </li>
            ))}
          </ol>

          {study.facts && (
            <div className="mt-12">
              <PlateFacts facts={study.facts} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
