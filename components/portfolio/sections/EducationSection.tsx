"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";

export const EducationSection = () => {
  const educations = useQuery(api.portfolio.getEducation);

  return (
    <Section id="education" index="04" eyebrow="Education" title="Education">
      {educations === undefined ? (
        <ListSkeleton rows={1} />
      ) : (
        <ol className="border-t border-line">
          {educations.map((edu) => (
            <Reveal
              as="li"
              key={edu._id}
              className="grid gap-x-10 gap-y-6 border-b border-line py-10 md:grid-cols-12 md:py-14"
            >
              <div className="md:col-span-5">
                <p className="label">{edu.date}</p>
                <h3 className="display mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] !leading-[1.08]">
                  {edu.degree}
                </h3>
                <p className="mt-2 text-sm text-mute">{edu.institution}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-mute md:col-span-7">{edu.description}</p>
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  );
};
