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
        <ol className="space-y-8">
          {experiences.map((exp) => (
            <Reveal as="li" key={exp._id} className="poster-card grid gap-x-10 gap-y-6 p-6 md:grid-cols-12 md:p-8">
              <div className="md:col-span-5">
                <p className="pill bg-yellow">{exp.date}</p>
                <h3 className="mt-5 text-[clamp(1.2rem,1.9vw,1.6rem)] font-bold uppercase leading-[1.15] tracking-tight">
                  {exp.role}
                </h3>
                <p className="pill mt-4 bg-ink">{exp.company}</p>
              </div>

              <ul className="space-y-4 text-[15px] leading-relaxed md:col-span-7">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.15em] text-blue">
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
