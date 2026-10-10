"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";

type Tag = "div" | "li" | "p" | "section" | "article" | "header";

interface RevealProps {
  as?: Tag;
  className?: string;
  delay?: number;
  y?: number;
  children: ReactNode;
}

/**
 * Fades and lifts its content once, the first time it nears the viewport.
 * One ScrollTrigger per instance, reverted automatically on unmount, so
 * Convex-driven lists can mount/unmount without leaking triggers.
 */
export function Reveal({ as = "div", className, delay = 0, y = 36, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(el, {
          y,
          opacity: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: ref }
  );

  return createElement(as, { ref, className }, children);
}
