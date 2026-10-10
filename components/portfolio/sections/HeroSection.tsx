"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { LINKS } from "@/lib/links";
import { caseStudies } from "@/lib/caseStudies";
import { Magnet } from "@/components/ui/Magnet";

const quietLinks = [
  { label: "Resume", href: LINKS.resume },
  { label: "CV", href: LINKS.cv },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "LeetCode", href: LINKS.leetcode },
];

/** Where each of the three screenshots sits in the collage (percent of its box) and how it leans. */
const LAYERS = [
  { left: "0%", top: "3%", width: "79%", rotate: -2.5, depth: 0.5, z: 1, pill: "left-[2%] top-[-1%]" },
  { left: "29%", top: "30%", width: "71%", rotate: 2, depth: 1, z: 2, pill: "right-[2%] top-[27%]" },
  { left: "7.5%", top: "61%", width: "65%", rotate: -1, depth: 1.6, z: 3, pill: "left-[9%] top-[58%]" },
];

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const projects = useQuery(api.portfolio.getProjects);

  // Prefer the projects that have a written case study; otherwise the first three
  const shots = useMemo(() => {
    if (!projects) return [];
    const authored = caseStudies
      .map((c) => projects.find((p) => p.title.toLowerCase() === c.title.toLowerCase()))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    return (authored.length >= 3 ? authored : projects).slice(0, 3);
  }, [projects]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from("[data-line]", { yPercent: 110, duration: 1.1, stagger: 0.1 })
          .from("[data-fade]", { opacity: 0, y: 16, duration: 0.9, stagger: 0.07 }, "-=0.7");

        // The screenshots drift apart at different speeds as the hero scrolls away
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
          const depth = Number(el.dataset.depth);
          gsap.to(el, {
            yPercent: -5 * depth,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        });
      });

      // Cursor tilt: real 3D, driven by CSS perspective. Fine pointers only.
      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const box = stack.current;
        if (!box) return;
        const rotX = gsap.quickTo(box, "rotationX", { duration: 0.8, ease: "power3" });
        const rotY = gsap.quickTo(box, "rotationY", { duration: 0.8, ease: "power3" });
        const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", box);
        const shiftX = layers.map((l) => gsap.quickTo(l, "x", { duration: 0.8, ease: "power3" }));
        const shiftY = layers.map((l) => gsap.quickTo(l, "y", { duration: 0.8, ease: "power3" }));

        const onMove = (e: PointerEvent) => {
          const r = box.getBoundingClientRect();
          const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
          const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
          rotY(nx * 5);
          rotX(-ny * 4);
          layers.forEach((l, i) => {
            const d = Number(l.dataset.layer);
            shiftX[i](nx * 14 * d);
            shiftY[i](ny * 10 * d);
          });
        };
        const reset = () => {
          rotX(0);
          rotY(0);
          shiftX.forEach((f) => f(0));
          shiftY.forEach((f) => f(0));
        };
        const hero = root.current!;
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", reset);
        return () => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", reset);
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [shots.length] }
  );

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] pt-16">
      <div className="shell grid-12 relative gap-y-12 pb-10 pt-10 lg:min-h-[calc(100svh-4rem)] lg:items-center lg:pb-16">
        {/* Copy */}
        <div className="col-span-12 lg:col-span-6">
          <div data-fade className="flex items-center gap-3">
            <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line bg-surface">
              <Image
                src="/tanmay-portrait.jpg"
                alt="Portrait of Tanmay Mirgal"
                fill
                priority
                sizes="44px"
                className="object-cover"
              />
            </span>
            <p className="label !text-paper">Full-Stack &amp; AI Engineer</p>
          </div>

          <h1 className="display hero-name mt-8 text-paper">
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span data-line className="block">
                Tanmay
              </span>
            </span>
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span data-line className="block">
                Mirgal
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="mt-10 max-w-[30rem] text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium leading-[1.25] tracking-[-0.02em]"
          >
            I design and build high-performance systems bridging modern web architecture and machine
            learning.{" "}
            <span className="text-mute">
              From scalable SaaS platforms to sophisticated computer vision pipelines, I engineer
              robust solutions that push the boundaries of what&rsquo;s possible.
            </span>
          </p>

          <div data-fade className="mt-9 flex flex-wrap gap-3">
            <Magnet>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-4 text-base font-semibold text-ink transition-opacity hover:opacity-85"
              >
                View projects <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Magnet>
            <Magnet>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border-[1.5px] border-paper px-6 py-4 text-base font-semibold transition-colors hover:bg-paper hover:text-ink"
              >
                Contact
              </a>
            </Magnet>
          </div>
        </div>

        {/* Screenshot collage: your real products, stacked with depth */}
        <div className="col-span-12 lg:col-span-6">
          <div className="mx-auto w-full max-w-[44rem] [perspective:1400px]">
            <div
              ref={stack}
              className="relative aspect-[6.6/7] w-full [transform-style:preserve-3d]"
              data-fade
            >
              {LAYERS.map((layer, i) => {
                const project = shots[i];
                return (
                  <div
                    key={i}
                    data-depth={layer.depth}
                    className="absolute"
                    style={{ left: layer.left, top: layer.top, width: layer.width, zIndex: layer.z }}
                  >
                    <div data-layer={layer.depth} style={{ transform: `rotate(${layer.rotate}deg)` }}>
                      <a
                        href="#projects"
                        aria-label={project ? `View ${project.title}` : "View projects"}
                        className="shot relative block aspect-[16/10] transition-transform duration-500 hover:scale-[1.02]"
                      >
                        {project && (
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            priority={i === 0}
                            sizes="(max-width: 1024px) 90vw, 40vw"
                            className="object-cover"
                          />
                        )}
                      </a>
                    </div>
                    {project && (
                      <span
                        className={`absolute z-10 rounded-full bg-paper px-3 py-1.5 font-mono text-[11px] text-ink ${layer.pill}`}
                      >
                        {project.title}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div data-fade className="shell flex flex-wrap items-center justify-between gap-4 pb-8">
        <span className="label">Scroll</span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {quietLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="label u-link inline-flex items-center gap-1 pb-0.5"
              >
                {label}
                <ArrowUpRight size={11} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
