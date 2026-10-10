"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";

export const WorkSection = () => {
  const experiences = useQuery(api.portfolio.getExperience);

  return (
    <Section id="work" index="01" eyebrow="Experience" title="Work">
      {experiences === undefined ? (
        <ListSkeleton rows={3} />
      ) : (
        <ol className="border-t border-line">
          {experiences.map((exp) => (
            <Reveal
              as="li"
              key={exp._id}
              className="grid gap-x-10 gap-y-6 border-b border-line py-10 md:grid-cols-12 md:py-14"
            >
              <div className="md:col-span-5">
                <p className="label">{exp.date}</p>
                <h3 className="display mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] !leading-[1.08]">
                  {exp.role}
                </h3>
                <p className="mt-2 text-sm text-mute">{exp.company}</p>
              </div>

              <ul className="space-y-4 text-[15px] leading-relaxed text-mute md:col-span-7">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-faint" />
                    <span>{bullet}</span>
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
