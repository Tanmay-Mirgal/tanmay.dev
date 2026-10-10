"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EMAIL, LINKS } from "@/lib/links";
import { HeroStage } from "@/components/portfolio/hero/HeroStage";
import type { SceneControls } from "@/components/portfolio/hero/StackScene";

const heroLinks = [
  { label: "Resume", href: LINKS.resume },
  { label: "CV", href: LINKS.cv },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "LeetCode", href: LINKS.leetcode },
];

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const controls = useRef<SceneControls>({ progress: 0, px: 0, py: 0, active: -1, reduced: false });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from("[data-line]", { yPercent: 118, duration: 1.3, stagger: 0.12 })
          .from("[data-fade]", { opacity: 0, y: 18, duration: 1, stagger: 0.08 }, "-=0.8");

        // One trigger drives both the 3D scene and the headline drift
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            controls.current.progress = self.progress;
          },
        });
        gsap.to("[data-name]", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden">
      {/* Twelve hairline columns: the visible grid the layout hangs on */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(236 235 230 / 0.045) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      {/* Signature 3D stage */}
      <div className="absolute inset-x-0 top-[9svh] h-[50svh] lg:inset-y-0 lg:left-[34%] lg:right-[calc(var(--gutter)+8.5rem)] lg:h-auto">
        <HeroStage controls={controls} />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-24 sm:pb-10">
        <div data-fade className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-line">
            <Image
              src="https://github.com/Tanmay-Mirgal.png"
              alt="Portrait of Tanmay Mirgal"
              fill
              priority
              sizes="56px"
              className="mono-img object-cover"
            />
          </div>
          <div className="space-y-1.5">
            <p className="label !text-paper">Full-Stack &amp; AI Engineer</p>
            <p className="label flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper" />
              </span>
              Open to roles &amp; collaborations
            </p>
          </div>
        </div>

        <div>
          <h1 data-name className="display hero-name text-paper">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-line className="block">
                Tanmay
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] pl-[7vw] italic lg:pl-[9vw]">
              <span data-line className="block">
                Mirgal
              </span>
            </span>
          </h1>

          <div className="grid-12 mt-8 items-end gap-y-8 border-t border-line pt-5 sm:mt-10">
            <p
              data-fade
              className="col-span-12 max-w-md text-pretty text-[15px] leading-relaxed text-mute md:col-span-5"
            >
              I design and build high-performance systems bridging modern web architecture and
              machine learning.
            </p>

            <ul
              data-fade
              className="col-span-12 flex flex-wrap gap-x-6 gap-y-3 md:col-span-6 md:col-start-7 lg:col-span-6"
            >
              {heroLinks.map(({ label, href }) => (
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
              <li>
                <a href={`mailto:${EMAIL}`} className="label u-link pb-1 !text-paper">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[var(--gutter)] hidden h-14 w-px bg-line sm:block"
      >
        <span className="scroll-cue block h-full w-px bg-paper" />
      </div>
    </section>
  );
};
