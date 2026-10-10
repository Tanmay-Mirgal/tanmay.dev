"use client";

import { useRef, type ReactNode } from "react";
import { MaskTitle } from "@/components/portfolio/MaskTitle";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  /** Span the full 12-column grid instead of the offset 9-column reading column */
  wide?: boolean;
  /** "loud" sections get oversized titles; the rest stay quiet and readable */
  tone?: "quiet" | "loud";
  /** "paper" inverts the section into a printed plate and tilts in on scroll */
  theme?: "ink" | "paper";
  children: ReactNode;
}

const TITLE_SIZE = {
  quiet: "text-[clamp(2.5rem,5.2vw,5rem)]",
  loud: "text-[clamp(3.5rem,11vw,11rem)]",
} as const;

/**
 * Shared section frame: hairline rule, mono index + serif title, then content
 * in an offset column. Owns the section's anchor id and marks a thread knot
 * on its heading, which the page-long thread ties itself around.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  wide = false,
  tone = "quiet",
  theme = "ink",
  children,
}: SectionProps) {
  const root = useRef<HTMLElement>(null);
  const isPaper = theme === "paper";

  // Paper sections arrive as a tilted plane that settles flat as you scroll in.
  useGSAP(
    () => {
      if (!isPaper || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          root.current,
          { clipPath: "polygon(0 14vh, 100% 0, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 96%", end: "top 40%", scrub: true },
          }
        );
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root, dependencies: [isPaper] }
  );

  return (
    <section
      id={id}
      ref={root}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-20 ${
        isPaper
          ? "theme-paper pb-[clamp(5rem,11vw,10rem)] pt-[clamp(3rem,7vw,6rem)]"
          : "pb-[clamp(5rem,11vw,10rem)]"
      }`}
    >
      <div className="shell">
        <div
          data-thread="loop"
          className="grid-12 items-end border-t border-line pb-10 pt-6 md:pb-16"
        >
          <p className="label col-span-12 mb-8 flex gap-3 md:col-span-3 md:mb-3">
            <span>({index})</span>
            <span>{eyebrow}</span>
          </p>
          <h2
            id={`${id}-title`}
            className={`display col-span-12 md:col-span-9 ${TITLE_SIZE[tone]}`}
          >
            <MaskTitle>{title}</MaskTitle>
          </h2>
        </div>

        <div className="grid-12">
          <div className={wide ? "col-span-12" : "col-span-12 md:col-span-9 md:col-start-4"}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
