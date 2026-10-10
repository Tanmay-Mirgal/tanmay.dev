"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";

export const PublicationsSection = () => {
  return (
    <Section id="publications" index="07" eyebrow="Research" title="Publications">
      <Reveal className="grid gap-x-10 gap-y-6 border-y border-line py-10 md:grid-cols-12 md:py-14">
        <div className="md:col-span-7">
          <p className="label">JAAFR Journal &mdash; May 2025 Edition</p>
          <h3 className="display mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] !leading-[1.08]">
            Target Tracking &amp; Advanced Deep Learning Algorithms in Combat Systems
          </h3>
        </div>

        <div className="space-y-6 md:col-span-5">
          <p className="text-[15px] leading-relaxed text-mute">
            Peer-reviewed research paper outlining convolutional tracking algorithms, real-time
            bounding updates in multi-sensor naval streams, and microservice backend orchestration
            protocols.
          </p>
          <a
            href="https://www.rjwave.org/jaafr/viewpaperforall.php?paper=JAAFR2601296"
            target="_blank"
            rel="noopener noreferrer"
            className="label u-link inline-flex items-center gap-1 pb-1 !text-paper"
          >
            Read journal <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
};
