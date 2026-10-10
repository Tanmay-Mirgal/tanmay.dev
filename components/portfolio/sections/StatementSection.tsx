"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";

const STATEMENT =
  "From scalable SaaS platforms to sophisticated computer vision pipelines, I engineer robust solutions that push the boundaries of what’s possible.";

/** Scroll-scrubbed reading moment between the hero and the work. */
export const StatementSection = () => {
  const root = useRef<HTMLElement>(null);
  const words = STATEMENT.split(" ");

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-word]", root.current);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          items,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "bottom 58%",
              scrub: true,
            },
          }
        );
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-label="Profile"
      className="relative py-[clamp(5rem,12vw,11rem)]"
    >
      <div className="shell grid-12">
        <p className="label col-span-12 mb-8 md:col-span-3 md:mb-0 md:pt-3">(Profile)</p>
        <p className="display col-span-12 text-[clamp(2rem,4.6vw,4.75rem)] !leading-[1.08] md:col-span-9">
          {words.map((word, i) => (
            <span key={i} data-word className="inline-block">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};
