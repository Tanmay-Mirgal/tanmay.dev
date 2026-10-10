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

interface BoxSpec {
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
}

/** Transcribed from the architecture section of Orb's README. */
const BOXES: BoxSpec[] = [
  { x: 20, y: 20, w: 130, label: "Browser", sub: "user" },
  { x: 255, y: 20, w: 130, label: "Caddy", sub: "TLS proxy" },
  { x: 60, y: 140, w: 200, label: "Dashboard", sub: "Next.js" },
  { x: 400, y: 140, w: 200, label: "Edge proxy", sub: "Express" },
  { x: 60, y: 240, w: 200, label: "Job queue", sub: "BullMQ on Redis" },
  { x: 270, y: 240, w: 100, label: "PostgreSQL", sub: "state" },
  { x: 60, y: 340, w: 200, label: "Build worker", sub: "Docker sandbox" },
  { x: 400, y: 340, w: 200, label: "MinIO", sub: "artifacts" },
];

const EDGES = [
  "M150 42 H255",
  "M290 64 C290 104 160 100 160 140",
  "M350 64 C350 104 500 100 500 140",
  "M260 166 C300 166 320 200 320 240",
  "M260 362 C300 362 320 330 320 292",
];

const FLOW = "M160 192 V366 H500 V192";
/** Where each numbered step sits along the flow, as a fraction of its length (see FLOW). */
const BADGES = [
  { x: 160, y: 216, at: 0.035 },
  { x: 160, y: 316, at: 0.18 },
  { x: 330, y: 366, at: 0.5 },
  { x: 500, y: 266, at: 0.89 },
];

export function DiagramPlate({ project, study, index }: Props) {
  const root = useRef<HTMLElement>(null);
  const flow = useRef<SVGPathElement>(null);
  const tip = useRef<SVGCircleElement>(null);
  const steps = study.steps ?? [];

  useGSAP(
    () => {
      const path = flow.current;
      const dot = tip.current;
      const svg = path?.ownerSVGElement;
      if (!path || !dot || !svg) return;

      const total = path.getTotalLength();
      path.style.strokeDasharray = `${total}`;
      const badges = Array.from(svg.querySelectorAll<SVGElement>("[data-badge]"));

      const paint = (p: number) => {
        path.style.strokeDashoffset = `${total * (1 - p)}`;
        const pt = path.getPointAtLength(total * p);
        dot.setAttribute("cx", pt.x.toFixed(1));
        dot.setAttribute("cy", pt.y.toFixed(1));
        dot.style.opacity = p > 0 && p < 1 ? "1" : "0";
        badges.forEach((b, i) => (b.style.opacity = p >= BADGES[i].at ? "1" : "0"));
      };

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { p: 0 };
        paint(0);
        const tween = gsap.to(state, {
          p: 1,
          duration: 3.2,
          ease: "power1.inOut",
          onUpdate: () => paint(state.p),
          scrollTrigger: { trigger: svg, start: "top 68%", once: true },
        });
        return () => tween.kill();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => paint(1));

      scheduleScrollRefresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <article ref={root} className="grid-12 gap-y-12 border-t border-line py-14 md:py-24">
      <div className="col-span-12 lg:col-span-5">
        <PlateHeader project={project} study={study} index={index} />

        <ol className="mt-12 space-y-6 border-t border-line pt-6">
          {steps.map((step, i) => (
            <li key={step.label} className="grid grid-cols-[2rem_1fr] gap-x-3">
              <span className="label !text-paper">{pad(i)}</span>
              <div>
                <p className="font-medium text-paper">{step.label}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-mute">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 space-y-8">
          {study.facts && <PlateFacts facts={study.facts} />}
          {study.status && <PlateStatus>{study.status}</PlateStatus>}
          <PlateTags tags={project.tags} />
          <PlateLinks project={project} />
        </div>
      </div>

      <div className="col-span-12 lg:sticky lg:top-[12vh] lg:col-span-7 lg:self-start">
        <div className="relative">
          <svg
            viewBox="0 0 640 440"
            role="img"
            aria-label="Orb architecture: a browser reaches Caddy, which routes to the dashboard and the edge proxy. The dashboard queues build jobs, a Docker build worker builds them and uploads artifacts to MinIO, and the edge proxy serves them. PostgreSQL holds state."
            className="w-full"
            fill="none"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            {EDGES.map((d) => (
              <path key={d} d={d} stroke="var(--color-paper)" strokeOpacity={0.28} strokeDasharray="2 4" />
            ))}

            <path
              ref={flow}
              d={FLOW}
              stroke="var(--color-thread)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {BOXES.map((b) => (
              <g key={b.label}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={52}
                  fill="var(--color-ink)"
                  stroke="var(--color-paper)"
                  strokeOpacity={0.6}
                />
                <text x={b.x + 12} y={b.y + 22} fontSize={12} fill="var(--color-paper)">
                  {b.label}
                </text>
                <text x={b.x + 12} y={b.y + 40} fontSize={10} fill="var(--color-paper)" fillOpacity={0.6}>
                  {b.sub}
                </text>
              </g>
            ))}

            {BADGES.map((b, i) => (
              <g key={i} data-badge style={{ transition: "opacity 0.4s" }}>
                <circle cx={b.x} cy={b.y} r={10} fill="var(--color-ink)" stroke="var(--color-thread)" strokeWidth={2} />
                <text x={b.x} y={b.y + 3.5} fontSize={10} textAnchor="middle" fill="var(--color-paper)">
                  {i + 1}
                </text>
              </g>
            ))}

            <circle ref={tip} r={5} fill="var(--color-thread)" style={{ opacity: 0 }} />
          </svg>

          <div className="absolute right-0 top-0 hidden w-[30%] sm:block">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper/5 shadow-[0_0_0_6px_var(--color-ink)]">
              <ProjectImage project={project} sizes="(max-width: 1024px) 30vw, 18vw" />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:hidden">
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper/5">
            <ProjectImage project={project} sizes="100vw" />
          </div>
        </div>
      </div>
    </article>
  );
}
