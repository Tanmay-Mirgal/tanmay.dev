"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { gsap, ScrollTrigger, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";
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
 * Sticky split: the screenshot stays pinned (pure CSS sticky, no scroll hijacking)
 * while the engineering beats scroll past it. Each beat lights up as it crosses
 * the reading line and the caption beneath the image follows.
 */
export function PinnedPlate({ project, study, index }: Props) {
  const root = useRef<HTMLElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const beats = study.beats ?? [];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-beat]", root.current);
        const ticks = gsap.utils.toArray<HTMLElement>("[data-tick]", root.current);
        gsap.set(items, { opacity: 0.28 });
        gsap.set(items[0], { opacity: 1 });

        const activate = (i: number) => {
          items.forEach((el, k) => gsap.to(el, { opacity: k === i ? 1 : 0.28, duration: 0.4 }));
          ticks.forEach((t, k) => (t.dataset.active = String(k <= i)));
          if (caption.current) caption.current.textContent = `${pad(i)} / ${pad(beats.length - 1)}  ${beats[i].title}`;
        };
        activate(0);

        items.forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && activate(i),
          })
        );
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <article ref={root} className="grid-12 gap-y-12 border-t border-line py-14 md:py-24">
      <div className="col-span-12 lg:sticky lg:top-[11vh] lg:col-span-7 lg:self-start">
        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper/5">
          <ProjectImage project={project} sizes="(max-width: 1024px) 100vw, 58vw" />
        </div>

        <div className="mt-5 hidden items-center justify-between gap-6 lg:flex">
          <p ref={caption} className="label !text-paper" aria-hidden="true">
            {pad(0)} / {pad(Math.max(beats.length - 1, 0))} {beats[0]?.title}
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            {beats.map((_, i) => (
              <span
                key={i}
                data-tick
                data-active={i === 0 ? "true" : "false"}
                className="h-[3px] w-7 bg-line transition-colors duration-300 data-[active=true]:bg-[var(--color-thread)]"
              />
            ))}
          </div>
        </div>

        <div className="mt-6 hidden lg:block">
          <PlateTags tags={project.tags} />
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <PlateHeader project={project} study={study} index={index} />

        <ol className="mt-14 space-y-12 lg:space-y-0">
          {beats.map((beat, i) => (
            <li key={beat.title} data-beat className="lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center">
              <p className="label">{pad(i)}</p>
              <h4 className="display mt-3 text-[clamp(1.75rem,2.4vw,2.5rem)] !leading-[1.05]">
                {beat.title}
              </h4>
              <p className="mt-4 text-[15px] leading-relaxed text-mute">{beat.body}</p>
              {beat.evidence && (
                <p className="mt-4 font-mono text-[11px] text-faint">{beat.evidence}</p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-14 space-y-8">
          {study.facts && <PlateFacts facts={study.facts} />}
          {study.status && <PlateStatus>{study.status}</PlateStatus>}
          <div className="lg:hidden">
            <PlateTags tags={project.tags} />
          </div>
          <PlateLinks project={project} />
        </div>
      </div>
    </article>
  );
}
