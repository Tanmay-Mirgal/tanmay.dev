"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Reveal } from "@/components/portfolio/Reveal";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { pad, type ProjectDoc } from "./PlateParts";

interface Props {
  projects: ProjectDoc[];
  offset: number;
  onOpen: (project: Project) => void;
}

/**
 * The remaining projects as a typographic index. On a fine pointer, a preview
 * image trails the cursor; everywhere else each row simply opens the details dialog.
 */
export function ProjectIndex({ projects, offset, onOpen }: Props) {
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

      {/* Cursor-following preview: decorative, fine pointers only */}
      <div
        ref={preview}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[35] hidden h-[13.5rem] w-[21rem] overflow-hidden border border-line bg-ink transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:block ${
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
            className={`object-cover transition-opacity duration-300 ${hovered === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </>
  );
}
