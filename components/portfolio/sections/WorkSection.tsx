"use client";

import { useExperience } from "@/components/portfolio/PortfolioData";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";

export const WorkSection = () => {
  const experiences = useExperience();

  return (
    <Section id="work" index="01" eyebrow="Experience" title="Work">
      {experiences === undefined ? (
        <ListSkeleton rows={3} />
      ) : (
        <ol className="space-y-6">
          {experiences.map((exp) => (
            <Reveal as="li" key={exp._id} className="poster-card grid gap-x-6 gap-y-4 p-5 md:grid-cols-12 md:gap-x-8 md:p-6">
              <div className="flex flex-col items-start md:col-span-4">
                <p className="pill bg-yellow">{exp.date}</p>
                <h3 className="mt-2.5 text-[clamp(1.2rem,1.9vw,1.55rem)] font-bold leading-snug tracking-tight">
                  {exp.role}
                </h3>
                <p className="pill mt-2 bg-ink">{exp.company}</p>
              </div>

              <ul className="space-y-2.5 text-base leading-relaxed md:col-span-8">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.15em] text-blue select-none">
                      &#10022;
                    </span>
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
