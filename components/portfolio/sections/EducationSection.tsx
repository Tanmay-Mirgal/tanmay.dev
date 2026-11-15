"use client";

import { useEducation } from "@/components/portfolio/PortfolioData";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";

export const EducationSection = () => {
  const educations = useEducation();

  return (
    <Section id="education" index="04" eyebrow="Education" title="Education">
      {educations === undefined ? (
        <ListSkeleton rows={1} />
      ) : (
        <ol className="space-y-6">
          {educations.map((edu) => (
            <Reveal as="li" key={edu._id} className="poster-card grid gap-x-6 gap-y-4 p-5 md:grid-cols-12 md:gap-x-8 md:p-6">
              <div className="flex flex-col items-start md:col-span-4">
                <p className="pill bg-yellow">{edu.date}</p>
                <h3 className="mt-2.5 text-[clamp(1.2rem,1.9vw,1.55rem)] font-bold leading-snug tracking-tight">
                  {edu.degree}
                </h3>
                <p className="pill mt-2 bg-ink">{edu.institution}</p>
              </div>
              <p className="text-base leading-relaxed md:col-span-8">{edu.description}</p>
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  );
};
