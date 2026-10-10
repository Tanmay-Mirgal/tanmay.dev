"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * The page-long thread: one continuous line that starts where the hero rope
 * leaves the stage, ties a knot at every section heading, a bead at every
 * case study, and ends in a plug at the contact email, the thread's other end.
 *
 * Geometry is measured from the DOM (elements marked data-thread="loop" | "dot" | "end"),
 * so it follows the content as Convex data loads and the layout reflows.
 * It is drawn by scroll with one ScrollTrigger and is fully visible without motion.
 */

interface Knot {
  x: number;
  y: number;
  kind: "loop" | "dot" | "end";
}

interface Geometry {
  w: number;
  h: number;
  d: string;
  knots: Knot[];
  end: { x: number; y: number } | null;
}

const SAMPLE = 6;

/** Prolate trochoid: a coil that leaves the lane, loops once to the right, and rejoins it. */
function coil(x0: number, y0: number, b: number): string {
  const a = b * 0.5;
  let d = "";
  for (let t = -Math.PI; t <= Math.PI + 0.001; t += 0.3) {
    const x = x0 + b * (1 + Math.cos(t));
    const y = y0 + a * t - b * Math.sin(t);
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function measure(main: HTMLElement): Geometry | null {
  const marker = document.querySelector<HTMLElement>("[data-thread-start]");
  const hero = document.getElementById("top");
  if (!marker || !hero) return null;

  const mainRect = main.getBoundingClientRect();
  const top0 = mainRect.top + window.scrollY;
  const left0 = mainRect.left + window.scrollX;
  const mRect = marker.getBoundingClientRect();
  const laneX = mRect.left + mRect.width / 2 - left0;
  const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY - top0;

  const shell = document.querySelector<HTMLElement>(".shell");
  const gutter = shell ? parseFloat(getComputedStyle(shell).paddingLeft) || 24 : 24;
  const b = Math.max(5, Math.min(12, gutter * 0.42));
  const sway = Math.max(2, gutter * 0.12);

  const marks = Array.from(main.querySelectorAll<HTMLElement>("[data-thread]"));
  const knots: Knot[] = [];
  let d = `M${laneX.toFixed(1)} ${heroBottom.toFixed(1)}`;
  let cy = heroBottom;
  let cx = laneX;
  let end: Geometry["end"] = null;

  marks.forEach((el, i) => {
    const kind = (el.dataset.thread as Knot["kind"]) ?? "dot";
    const r = el.getBoundingClientRect();
    const y = r.top + window.scrollY - top0 + (kind === "end" ? r.height / 2 : 30);
    if (y <= cy + 40) return;

    // Gentle meander between knots: the lane drifts a few px either way
    const drift = laneX + (i % 2 ? sway : -sway);
    const mid = (cy + y) / 2;
    d += ` C${cx.toFixed(1)} ${(cy + (y - cy) * 0.35).toFixed(1)} ${drift.toFixed(1)} ${(mid - 10).toFixed(1)} ${drift.toFixed(1)} ${mid.toFixed(1)}`;
    cx = drift;
    cy = mid;

    if (kind === "end") {
      const ex = r.left - left0 - 18;
      d += ` C${cx.toFixed(1)} ${(cy + (y - cy) * 0.6).toFixed(1)} ${ex.toFixed(1)} ${(y - 40).toFixed(1)} ${ex.toFixed(1)} ${y.toFixed(1)}`;
      end = { x: ex, y };
      knots.push({ x: ex, y, kind });
      cx = ex;
      cy = y;
      return;
    }

    d += ` C${cx.toFixed(1)} ${(cy + (y - cy) * 0.5).toFixed(1)} ${laneX.toFixed(1)} ${(y - 22).toFixed(1)} ${laneX.toFixed(1)} ${(y - 20).toFixed(1)}`;
    cx = laneX;
    cy = y - 20;
    if (kind === "loop") {
      d += coil(laneX, y, b);
      cy = y + 20;
    } else {
      d += ` L${laneX.toFixed(1)} ${y.toFixed(1)}`;
      cy = y;
    }
    knots.push({ x: laneX, y, kind });
  });

  return { w: Math.round(mainRect.width), h: Math.round(mainRect.height), d, knots, end };
}

export function Thread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  // Measure now, after fonts, and whenever the page height changes (Convex content arriving)
  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGeo(measure(main)));
    };
    run();
    document.fonts?.ready.then(run);
    const observer = new ResizeObserver(run);
    observer.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const path = pathRef.current;
      const tip = tipRef.current;
      const main = document.getElementById("main");
      if (!geo || !path || !tip || !main) return;

      const total = path.getTotalLength();
      path.style.strokeDasharray = `${total}`;

      // Running-max of y along the path, so scroll position maps to drawn length even through coils
      const count = Math.ceil(total / SAMPLE) + 1;
      const maxY = new Float32Array(count);
      let running = -Infinity;
      for (let i = 0; i < count; i++) {
        const p = path.getPointAtLength(Math.min(i * SAMPLE, total));
        running = Math.max(running, p.y);
        maxY[i] = running;
      }
      const lengthAt = (y: number) => {
        let lo = 0;
        let hi = count - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (maxY[mid] < y) lo = mid + 1;
          else hi = mid;
        }
        return Math.min(lo * SAMPLE, total);
      };

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const top0 = main.getBoundingClientRect().top + window.scrollY;
        const marks = Array.from(svgRef.current?.querySelectorAll<SVGElement>("[data-y]") ?? []);
        const update = () => {
          const targetY = window.scrollY + window.innerHeight * 0.62 - top0;
          const drawn = lengthAt(targetY);
          // Beads and the end plug appear as the tip passes them
          for (const el of marks) el.style.opacity = targetY >= Number(el.dataset.y) ? "1" : "0";
          path.style.strokeDashoffset = `${total - drawn}`;
          if (drawn > 2 && drawn < total - 2) {
            const p = path.getPointAtLength(drawn);
            tip.setAttribute("cx", p.x.toFixed(1));
            tip.setAttribute("cy", p.y.toFixed(1));
            tip.style.opacity = "1";
          } else {
            tip.style.opacity = "0";
          }
        };
        update();
        const st = ScrollTrigger.create({
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          onUpdate: update,
          onRefresh: update,
        });
        return () => st.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        path.style.strokeDashoffset = "0";
        tip.style.opacity = "0";
      });

      return () => mm.revert();
    },
    { dependencies: [geo], revertOnUpdate: true }
  );

  if (!geo) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      className="pointer-events-none absolute left-0 top-0 z-[30] overflow-visible"
      fill="none"
    >
      <path
        ref={pathRef}
        d={geo.d}
        stroke="var(--color-thread)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {geo.knots
        .filter((k) => k.kind === "dot")
        .map((k, i) => (
          <circle
            key={i}
            data-y={k.y}
            cx={k.x}
            cy={k.y}
            r={4}
            fill="var(--color-thread)"
            style={{ transition: "opacity 0.4s" }}
          />
        ))}
      {geo.end && (
        <circle
          data-y={geo.end.y}
          cx={geo.end.x}
          cy={geo.end.y}
          r={7}
          fill="var(--color-paper)"
          stroke="var(--color-thread)"
          strokeWidth={2.5}
          style={{ transition: "opacity 0.4s" }}
        />
      )}
      <circle ref={tipRef} r={4.5} fill="var(--color-thread)" style={{ opacity: 0 }} />
    </svg>
  );
}
