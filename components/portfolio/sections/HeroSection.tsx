"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { LINKS } from "@/lib/links";
import { Magnet } from "@/components/ui/Magnet";
import { StaticShape } from "@/components/portfolio/sculpture/StaticShape";
import { registerSlot } from "@/components/portfolio/sculpture/store";

const quietLinks = [
  { label: "Resume", href: LINKS.resume },
  { label: "CV", href: LINKS.cv },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "LeetCode", href: LINKS.leetcode },
];

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const slot = useRef<HTMLDivElement>(null);

  // The particle sculpture lives in this slot while the hero is on screen
  useEffect(() => {
    if (!slot.current) return;
    return registerSlot(slot.current, "hero");
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from("[data-line]", { yPercent: 115, duration: 1.2, stagger: 0.1 })
          .from("[data-fade]", { opacity: 0, y: 16, duration: 0.9, stagger: 0.07 }, "-=0.8");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative min-h-[100svh]">
      {/* The sculpture's stage. Empty on purpose: the fixed WebGL canvas draws here. */}
      <div
        ref={slot}
        className="absolute inset-x-[var(--gutter)] top-[11svh] h-[40svh] lg:inset-x-auto lg:bottom-[9svh] lg:right-[calc(var(--gutter)+8.5rem)] lg:top-[9svh] lg:h-auto lg:w-[46vw]"
      >
        <StaticShape shape="pose" className="sculpture-still h-full w-full transition-opacity duration-700" />
        <p
          data-fade
          className="label pointer-events-none absolute bottom-0 right-0 hidden text-right lg:block"
        >
          Pose field, 33 landmarks
          <span className="mt-1 block !text-faint">Move to disturb. Press and hold to calibrate.</span>
        </p>
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-24 sm:pb-10">
        <div data-fade className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-line bg-paper/5">
            <Image
              src="/tanmay-portrait.jpg"
              alt="Portrait of Tanmay Mirgal"
              fill
              priority
              sizes="40px"
              className="mono-img object-cover"
            />
          </div>
          <p className="label !text-paper">Full-Stack &amp; AI Engineer</p>
        </div>

        <div>
          <h1 className="display hero-name m-0">
            <span className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
              <span data-line className="block text-paper">
                Tanmay
              </span>
            </span>
            <span className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
              <span data-line className="block text-paper/35">
                Mirgal
              </span>
            </span>
          </h1>

          <div className="grid-12 mt-8 items-end gap-y-8 border-t border-line pt-5 sm:mt-10">
            <div data-fade className="col-span-12 space-y-6 md:col-span-6 lg:col-span-5">
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-mute">
                I design and build high-performance systems bridging modern web architecture and
                machine learning.
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnet>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-paper px-6 py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-white"
                  >
                    View projects <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </Magnet>
                <Magnet>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 border border-paper/40 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-paper transition-colors hover:border-paper"
                  >
                    Contact
                  </a>
                </Magnet>
              </div>
            </div>

            <ul
              data-fade
              className="col-span-12 flex flex-wrap gap-x-6 gap-y-3 md:col-span-6 md:justify-end lg:col-span-6 lg:col-start-7"
            >
              {quietLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label u-link inline-flex items-center gap-1 pb-1 !text-paper"
                  >
                    {label}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
