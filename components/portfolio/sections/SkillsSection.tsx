"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";

/** Header chip colours cycle through the poster palette. */
const CHIP = ["bg-yellow", "bg-blue text-ink", "bg-paper text-ink", "bg-ink"];

export const SkillsSection = () => {
  const skillGroups = useQuery(api.portfolio.getSkillGroups);

  return (
    <Section id="skills" index="03" eyebrow="Capabilities" title="Skills" wide>
      {skillGroups === undefined ? (
        <ListSkeleton rows={4} />
      ) : (
        <ol className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, idx) => (
            <Reveal as="li" key={group._id} className="poster-card p-6 md:p-8">
              <h3 className="flex flex-wrap items-center gap-3">
                <span className={`pill ${CHIP[idx % CHIP.length]}`}>{String(idx + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(1.15rem,1.9vw,1.6rem)]">{group.title}</span>
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.tags.map((tag, i) => (
                  <li key={`${tag}-${i}`} className="pill bg-ink">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  );
};
