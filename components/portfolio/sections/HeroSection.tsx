"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LINKS } from "@/lib/links";
import { caseStudies, findCaseStudy } from "@/lib/caseStudies";

const quietLinks = [
  { label: "Resume", href: LINKS.resume },
  { label: "CV", href: LINKS.cv },
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "LeetCode", href: LINKS.leetcode },
];

/** How each of the three tiles leans on large screens. */
const TILT = [
  { rotate: -2, y: 0 },
  { rotate: 1.5, y: 26 },
  { rotate: -1, y: -8 },
];

const delay = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

const TILE_WIDTH =
  "w-[72vw] max-w-[17rem] shrink-0 snap-center lg:w-[16rem] lg:max-w-none xl:w-[17rem]";

export const HeroSection = () => {
  const projects = useQuery(api.portfolio.getProjects);
  const skillGroups = useQuery(api.portfolio.getSkillGroups);

  // Prefer the projects that have a written case study; otherwise the first three
  const tiles = useMemo(() => {
    if (!projects) return [];
    const authored = caseStudies
      .map((c) => projects.find((p) => p.title.toLowerCase() === c.title.toLowerCase()))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    return (authored.length >= 3 ? authored : projects).slice(0, 3);
  }, [projects]);

  // The tech band is built from the skills in Convex, de-duplicated
  const band = useMemo(() => {
    if (!skillGroups) return [];
    const seen = new Set<string>();
    return skillGroups
      .flatMap((g) => g.tags)
      .filter((tag) => {
        const key = tag.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [skillGroups]);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[68px]">
      <div className="shell relative pt-5 sm:pt-7">
        <h1 className="display hero-name m-0 mt-[5.25rem] sm:mt-0">
          <span className="block overflow-hidden">
            <span className="intro-rise block">Tanmay</span>
          </span>
          <span className="mt-[0.04em] block overflow-hidden pb-[0.06em] pr-3">
            <span className="intro-rise block" style={delay(0.05)}>
              <span
                className="intro-wipe inline-block -rotate-[1.2deg] border-[4px] border-paper bg-blue px-[0.08em] pb-[0.02em] pt-[0.015em] text-ink shadow-[0.045em_0.045em_0_#0f0f0f]"
                style={delay(0.08)}
              >
                Mirgal
              </span>
            </span>
          </span>
        </h1>

        <div
          className="intro-pop absolute right-[calc(var(--gutter)+0.25rem)] top-[1.1rem] flex h-[var(--s)] w-[var(--s)] rotate-12 items-center justify-center rounded-full border-[3px] border-paper bg-yellow p-[9%] text-center shadow-[5px_5px_0_#0f0f0f] [--s:6.25rem] sm:top-2 sm:border-[4px] sm:p-[10%] sm:shadow-[8px_8px_0_#0f0f0f] sm:[--s:clamp(7.5rem,14.5vw,12.5rem)]"
          style={delay(0.35)}
        >
          <p className="display text-balance text-[0.68rem] leading-[1.02] sm:text-[clamp(0.8rem,1.55vw,1.4rem)]">
            Full-stack &amp; AI engineer
          </p>
        </div>
      </div>

      {/* Mobile order: copy, links, tiles. The tile images stay below the first screen. */}
      <div className="shell grid-12 relative mt-8 items-start gap-y-8 lg:mt-10">
        <div className="intro-fade order-1 col-span-12 space-y-6 lg:col-span-5" style={delay(0.3)}>
          <p className="max-w-[28rem] text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium leading-[1.4]">
            I design and build high-performance systems bridging modern web architecture and machine
            learning.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full border-[3px] border-paper bg-surface shadow-[4px_4px_0_#0f0f0f]">
              <Image
                src="/tanmay-portrait.jpg"
                alt="Portrait of Tanmay Mirgal"
                fill
                priority
                sizes="56px"
                className="object-cover"
              />
            </span>
            <a href="#projects" className="pbtn">
              View projects <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className="pbtn-alt">
              Contact
            </a>
          </div>
        </div>

        <div className="order-3 col-span-12 lg:order-2 lg:-mt-14 lg:col-span-7">
          <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 pt-2 lg:mx-0 lg:snap-none lg:justify-end lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0">
            {tiles.length === 0
              ? /* Reserve the tiles' space while Convex loads, so nothing shifts when they arrive */
                projects === undefined &&
                TILT.map((t, i) => (
                  <li
                    key={i}
                    aria-hidden="true"
                    className={TILE_WIDTH}
                    style={{ ["--ty" as string]: `${t.y}px`, ["--tr" as string]: `${t.rotate}deg` }}
                  >
                    <div className="poster-card animate-pulse lg:[transform:translateY(var(--ty))_rotate(var(--tr))]">
                      <div className="aspect-[16/10] border-b-[3px] border-paper bg-paper/10" />
                      <div className="h-[4.5rem]" />
                    </div>
                  </li>
                ))
              : tiles.map((project, i) => {
                  const study = findCaseStudy(project.title);
                  const label = [study?.kicker.split(" / ")[0], project.tags[0]]
                    .filter(Boolean)
                    .join(" · ");
                  return (
                    <li
                      key={project._id}
                      className={`intro-fade ${TILE_WIDTH}`}
                      style={{
                        ...delay(0.45 + i * 0.1),
                        ["--ty" as string]: `${TILT[i].y}px`,
                        ["--tr" as string]: `${TILT[i].rotate}deg`,
                      }}
                    >
                      <a
                        href="#projects"
                        className="poster-card poster-lift block lg:[transform:translateY(var(--ty))_rotate(var(--tr))] lg:hover:[transform:translate(-3px,calc(var(--ty)-3px))_rotate(var(--tr))]"
                      >
                        <span className="relative block aspect-[16/10] border-b-[3px] border-paper bg-surface">
                          <Image
                            src={project.image}
                            alt=""
                            fill
                            priority={i === 0}
                            sizes="(max-width: 1024px) 72vw, 17rem"
                            className="object-cover"
                          />
                        </span>
                        <span className="display block px-3.5 pb-1 pt-3 text-[1.45rem]">{project.title}</span>
                        <span className="label block px-3.5 pb-3.5 !text-paper">{label}</span>
                      </a>
                    </li>
                  );
                })}
          </ul>
        </div>

        <div className="intro-fade order-2 col-span-12 flex flex-wrap items-center justify-between gap-3 lg:order-3 lg:mt-2" style={delay(0.5)}>
          <span className="label hidden sm:inline">Scroll</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {quietLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label u-link inline-flex items-center gap-1 pb-0.5 !text-paper"
                >
                  {label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech band, built from the skills in Convex */}
      <div
        aria-label="Technologies"
        role="group"
        className="mt-auto min-h-[4rem] overflow-hidden border-t-[3px] border-paper bg-blue py-3.5 text-ink"
      >
        <div className="marquee-track display text-[clamp(1.25rem,2.2vw,1.9rem)] !tracking-[-0.01em]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center whitespace-nowrap">
              {band.map((tag) => (
                <li key={`${copy}-${tag}`} className="flex items-center">
                  <span>{tag}</span>
                  <span aria-hidden="true" className="px-5">
                    &#10022;
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
