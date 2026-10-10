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
        <ol className="space-y-8">
          {educations.map((edu) => (
            <Reveal as="li" key={edu._id} className="poster-card grid gap-x-10 gap-y-6 p-6 md:grid-cols-12 md:p-8">
              <div className="md:col-span-5">
                <p className="pill bg-yellow">{edu.date}</p>
                <h3 className="mt-5 text-[clamp(1.2rem,1.9vw,1.6rem)] font-bold uppercase leading-[1.15] tracking-tight">
                  {edu.degree}
                </h3>
                <p className="pill mt-4 bg-ink">{edu.institution}</p>
              </div>
              <p className="text-[15px] leading-relaxed md:col-span-7">{edu.description}</p>
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  );
};
