"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";

export const PublicationsSection = () => {
  return (
    <Section id="publications" index="07" eyebrow="Research" title="Publications">
      <Reveal className="poster-card grid gap-x-10 gap-y-6 p-6 md:grid-cols-12 md:p-8">
        <div className="md:col-span-7">
          <p className="pill bg-yellow">JAAFR Journal &mdash; May 2025 Edition</p>
          <h3 className="mt-5 text-[clamp(1.2rem,1.9vw,1.6rem)] font-bold uppercase leading-[1.15] tracking-tight">
            Target Tracking &amp; Advanced Deep Learning Algorithms in Combat Systems
          </h3>
        </div>

        <div className="space-y-6 md:col-span-5">
          <p className="text-[15px] leading-relaxed">
            Peer-reviewed research paper outlining convolutional tracking algorithms, real-time
            bounding updates in multi-sensor naval streams, and microservice backend orchestration
            protocols.
          </p>
          <a
            href="https://www.rjwave.org/jaafr/viewpaperforall.php?paper=JAAFR2601296"
            target="_blank"
            rel="noopener noreferrer"
            className="pbtn"
          >
            Read journal <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
};
