"use client";

import React from "react";

// Chrome
import { NAV_ITEMS, SidebarNav } from "@/components/portfolio/SidebarNav";
import { TopBar } from "@/components/portfolio/TopBar";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SculptureHost } from "@/components/portfolio/sculpture/SculptureHost";
import { useActiveSection } from "@/hooks/useActiveSection";

// Sections
import { HeroSection } from "@/components/portfolio/sections/HeroSection";
import { StatementSection } from "@/components/portfolio/sections/StatementSection";
import { WorkSection } from "@/components/portfolio/sections/WorkSection";
import { ProjectsSection } from "@/components/portfolio/sections/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/sections/SkillsSection";
import { EducationSection } from "@/components/portfolio/sections/EducationSection";
import { AchievementsSection } from "@/components/portfolio/sections/AchievementsSection";
import { CertificationsSection } from "@/components/portfolio/sections/CertificationsSection";
import { PublicationsSection } from "@/components/portfolio/sections/PublicationsSection";
import { ContactSection } from "@/components/portfolio/sections/ContactSection";

const SECTION_IDS = ["top", ...NAV_ITEMS.map((item) => item.id)];

export default function Home() {
  const current = useActiveSection(SECTION_IDS);
  // The hero isn't in the nav, so nothing is highlighted while it's on screen.
  const activeSection = current === "top" ? "" : current;

  return (
    <>
      <SculptureHost />
      <TopBar />
      <SidebarNav activeSection={activeSection} />

      <main id="main" className="relative">
        <HeroSection />
        <StatementSection />
        <WorkSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <AchievementsSection />
        <CertificationsSection />
        <PublicationsSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
