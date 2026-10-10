"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { LINKS } from "@/lib/links";
import { HeroStage } from "@/components/portfolio/hero/HeroStage";
import type { RopeControls } from "@/components/portfolio/hero/ThreadScene";
import { Magnet } from "@/components/ui/Magnet";

const quietLinks = [
  { label: "Resume", href: LINKS.resume },
  { label: "CV", href: LINKS.cv },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "LeetCode", href: LINKS.leetcode },
];

/** One copy of the headline. Rendered twice: the rope runs between the two copies. */
const Headline = ({ ghost = false }: { ghost?: boolean }) => (
  <div
    data-name
    className={`display hero-name text-paper ${
      ghost ? "pointer-events-none absolute inset-0 z-[4] [clip-path:inset(49%_0_0_0)]" : "relative z-[1]"
    }`}
  >
    {/* The mask needs room below the baseline or descenders (y, g) get clipped */}
    <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
      <span data-line="1" className="block">
        Tanmay
      </span>
    </span>
    <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em] pl-[7vw] italic lg:pl-[10vw]">
      <span data-line="2" className="block">
        Mirgal
      </span>
    </span>
  </div>
);

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const threadStart = useRef<HTMLSpanElement>(null);
  const controls = useRef<RopeControls>({
    w: 0,
    h: 0,
    anchor: { x: 12, y: 800 },
    rest: { x: 600, y: 300 },
    head: null,
    px: 0,
    py: 0,
    pluck: 0,
    scrollVel: 0,
    progress: 0,
    visible: true,
    lite: false,
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Staged entrance: both headline copies move as one
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from('[data-line="1"]', { yPercent: 118, duration: 1.3 })
          .from('[data-line="2"]', { yPercent: 118, duration: 1.3 }, "-=1.1")
          .from("[data-portrait]", { clipPath: "inset(0 0 100% 0)", duration: 1.4 }, "-=1.1")
          .from("[data-fade]", { opacity: 0, y: 18, duration: 1, stagger: 0.08 }, "-=0.9");

        // One trigger: feeds the 3D scene and drives the headline drift
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            controls.current.progress = self.progress;
            controls.current.wake?.();
          },
        });
        gsap.to("[data-name]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Twelve hairline columns: the grid the layout hangs on */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to right, rgb(236 235 230 / 0.045) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      {/* Portrait sits between the two headline layers: "Tanmay" behind it, "Mirgal" in front */}
      <div
        data-portrait
        className="absolute right-[var(--gutter)] top-[22svh] z-[2] w-[clamp(6.5rem,26vw,9.5rem)] lg:right-[calc(var(--gutter)+8.5rem+9vw)] lg:top-[17svh] lg:w-[clamp(12rem,18vw,18.5rem)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden border border-line bg-paper/5">
          <Image
            src="https://github.com/Tanmay-Mirgal.png?size=460"
            alt="Portrait of Tanmay Mirgal"
            fill
            priority
            sizes="(max-width: 1024px) 160px, 300px"
            className="mono-img object-cover"
          />
        </div>
        <p className="label mt-3 hidden text-right lg:block">Tanmay Mirgal, 2026</p>
      </div>

      <HeroStage controls={controls} startRef={threadStart} />

      <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-8 pt-24 sm:pb-10">
        <p data-fade className="label relative z-10 !text-paper">
          Full-Stack &amp; AI Engineer
        </p>

        <div>
          <div className="relative">
            <h1 aria-label="Tanmay Mirgal" className="m-0">
              <Headline />
            </h1>
            <div aria-hidden="true">
              <Headline ghost />
            </div>
          </div>

          <div className="grid-12 relative z-10 mt-8 items-end gap-y-8 border-t border-line pt-5 sm:mt-10">
            <div data-fade className="col-span-12 space-y-6 md:col-span-6 lg:col-span-5">
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-mute [text-shadow:0_0_6px_var(--color-ink),0_0_12px_var(--color-ink),0_0_18px_var(--color-ink)]">
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
                    className="inline-flex items-center gap-2 border border-paper/40 bg-ink px-6 py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-paper transition-colors hover:border-paper"
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
                    className="label u-link inline-flex items-center gap-1 pb-1 !text-paper [text-shadow:0_0_6px_var(--color-ink),0_0_12px_var(--color-ink)]"
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

      {/* Where the page-long thread begins; the rope is anchored here */}
      <span
        ref={threadStart}
        data-thread-start
        aria-hidden="true"
        className="absolute bottom-[3.75rem] left-[calc(var(--gutter)*0.5)] h-px w-px"
      />
    </section>
  );
};
