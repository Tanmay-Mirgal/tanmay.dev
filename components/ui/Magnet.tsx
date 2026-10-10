"use client";

/**
 * Adapted from React Bits "Magnet" (https://reactbits.dev, MIT + Commons Clause).
 * Re-implemented on GSAP quickTo (already in the bundle) instead of a second
 * animation engine. Only primary actions use it; it is a no-op for touch input
 * and for prefers-reduced-motion.
 */

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface MagnetProps {
  children: ReactNode;
  /** How far the content may travel, in px */
  strength?: number;
  /** How far outside the box the pull starts, in px */
  range?: number;
  className?: string;
}

export function Magnet({ children, strength = 10, range = 70, className }: MagnetProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
        const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const near =
            Math.abs(dx) < r.width / 2 + range && Math.abs(dy) < r.height / 2 + range;
          moveX(near ? (dx / (r.width / 2 + range)) * strength : 0);
          moveY(near ? (dy / (r.height / 2 + range)) * strength : 0);
        };
        const reset = () => {
          moveX(0);
          moveY(0);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", reset);
        return () => {
          window.removeEventListener("pointermove", onMove);
          document.documentElement.removeEventListener("pointerleave", reset);
          gsap.set(el, { x: 0, y: 0 });
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}
