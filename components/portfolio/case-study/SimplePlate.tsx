"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";
import { PlateLinks, PlateTags, ProjectImage, pad, type ProjectDoc } from "./PlateParts";

interface Props {
  project: ProjectDoc;
  index: number;
}

/**
 * Fallback for a featured project that has no case-study entry: still a plate,
 * built only from the Convex fields (image, description, tags, links).
 */
export function SimplePlate({ project, index }: Props) {
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
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <article ref={root} className="grid-12 items-end gap-y-8 border-t border-line py-12 md:py-20">
      <div className={`col-span-12 md:col-span-8 ${flip ? "md:col-start-5" : ""}`}>
        <div data-clip className="relative aspect-[16/10] overflow-hidden border border-line bg-paper/5">
          <div data-parallax className="absolute inset-x-0 -top-[9%] h-[118%]">
            <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 60vw" />
          </div>
        </div>
      </div>

      <div className={`col-span-12 md:col-span-4 ${flip ? "md:col-start-1 md:row-start-1" : "md:col-start-9"}`}>
        <p data-thread="dot" className="label">
          ({pad(index)}) Selected work
        </p>
        <h3 className="display mt-4 text-[clamp(2.5rem,4.2vw,4.5rem)]">{project.title}</h3>
        <p className="mt-5 text-[15px] leading-relaxed text-mute">{project.desc}</p>
        <div className="mt-6">
          <PlateTags tags={project.tags.slice(0, 6)} />
        </div>
        <div className="mt-7">
          <PlateLinks project={project} />
        </div>
      </div>
    </article>
  );
}
