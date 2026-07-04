"use client";

import React, { useState, useEffect } from "react";

// Components
import { SidebarNav } from "@/components/portfolio/SidebarNav";
import { TopBar } from "@/components/portfolio/TopBar";

// Sections
import { HeroSection } from "@/components/portfolio/sections/HeroSection";
import { WorkSection } from "@/components/portfolio/sections/WorkSection";
import { EducationSection } from "@/components/portfolio/sections/EducationSection";
import { SkillsSection } from "@/components/portfolio/sections/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/sections/ProjectsSection";
import { AchievementsSection } from "@/components/portfolio/sections/AchievementsSection";
import { CertificationsSection } from "@/components/portfolio/sections/CertificationsSection";
import { PublicationsSection } from "@/components/portfolio/sections/PublicationsSection";
import { ContactSection } from "@/components/portfolio/sections/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("work");

  // Determine active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "work",
        "education",
        "skills",
        "projects",
        "achievements",
        "certifications",
        "publications",
      ];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      // Special check for top of page (Hero section)
      if (window.scrollY < 200) {
        setActiveSection("work"); // Default highlight first sidebar link
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0B0B0C] text-[#A1A1AA] font-sans selection:bg-white/10 selection:text-white overflow-x-clip flex">
      
      {/* 1. Fixed Left Sidebar Nav */}
      <SidebarNav activeSection={activeSection} />

      {/* 2. Scrolling Main Content Area */}
      <div className="flex-1 min-w-0 md:pl-64 flex flex-col min-h-screen">
        
        {/* Main padding container */}
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 md:px-16 py-12 flex-1 flex flex-col justify-start">
          
          {/* Top Bar clock & meta */}
          <TopBar />

          {/* Hero Section (Contains Intro text and 3D Overlapping Card Stack) */}
          <div className="scroll-mt-16">
            <HeroSection />
          </div>

          {/* Work Experience Section */}
          <div id="work" className="scroll-mt-16 pt-12">
            <WorkSection />
          </div>

          {/* Education Section */}
          <div id="education" className="scroll-mt-16 pt-12">
            <EducationSection />
          </div>

          {/* Skills Section */}
          <div id="skills" className="scroll-mt-16 pt-12">
            <SkillsSection />
          </div>

          {/* Projects Catalog */}
          <div id="projects" className="scroll-mt-16 pt-12">
            <ProjectsSection />
          </div>

          {/* Achievements Grid */}
          <div id="achievements" className="scroll-mt-16 pt-12">
            <AchievementsSection />
          </div>

          {/* Certifications Section */}
          <div id="certifications" className="scroll-mt-16 pt-12">
            <CertificationsSection />
          </div>

          {/* Publications Section */}
          <div id="publications" className="scroll-mt-16 pt-12">
            <PublicationsSection />
          </div>

          {/* Contact form (Uplink) */}
          <div id="contact" className="scroll-mt-16 pt-12">
            <ContactSection />
          </div>

        </div>

      </div>

    </main>
  );
}
