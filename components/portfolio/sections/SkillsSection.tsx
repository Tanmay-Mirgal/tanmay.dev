"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";

export const SkillsSection = () => {
  const skillGroups = useQuery(api.portfolio.getSkillGroups);

  return (
    <Section id="skills" index="03" eyebrow="Capabilities" title="Skills">
      {skillGroups === undefined ? (
        <ListSkeleton rows={4} />
      ) : (
        <ol className="border-t border-line">
          {skillGroups.map((group, idx) => (
            <Reveal
              as="li"
              key={group._id}
              className="grid gap-x-10 gap-y-5 border-b border-line py-9 md:grid-cols-12"
            >
              <h3 className="label flex gap-3 !text-paper md:col-span-4">
                <span className="!text-faint">{String(idx + 1).padStart(2, "0")}</span>
                {group.title}
              </h3>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-lg leading-snug text-paper/85 md:col-span-8 md:text-xl">
                {group.tags.map((tag, i) => (
                  <li
                    key={`${tag}-${i}`}
                    className="after:ml-5 after:text-faint after:content-['/'] last:after:hidden"
                  >
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
