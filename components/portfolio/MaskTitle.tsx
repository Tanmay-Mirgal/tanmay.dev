"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, scheduleScrollRefresh, useGSAP } from "@/lib/gsap";

/** Slides a heading up out of a clipping mask when it scrolls into view. */
export function MaskTitle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.querySelector("[data-mask-inner]");
      if (!el || !inner) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(inner, {
          yPercent: 108,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
      <span data-mask-inner className="block">
        {children}
      </span>
    </span>
  );
}
