"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

// Types & Data
import { Achievement, Project } from "@/types";
import { achievementsData, projectsData } from "@/data/portfolio";

// Global Components
import { GlassCursor } from "@/components/portfolio/GlassCursor";
import { AmbientBackground } from "@/components/portfolio/AmbientBackground";
import { NeuralSpine } from "@/components/portfolio/NeuralSpine";
import { PortfolioStyles } from "@/components/portfolio/PortfolioStyles";

// Sections
import { HeroSection } from "@/components/portfolio/sections/HeroSection";
import { IdentitySection } from "@/components/portfolio/sections/IdentitySection";
import { CapabilitiesSection } from "@/components/portfolio/sections/CapabilitiesSection";
import { StackSection } from "@/components/portfolio/sections/StackSection";
import { ProjectsSection } from "@/components/portfolio/sections/ProjectsSection";
import { FreelanceSection } from "@/components/portfolio/sections/FreelanceSection";
import { AchievementsSection } from "@/components/portfolio/sections/AchievementsSection";
import { ContactSection } from "@/components/portfolio/sections/ContactSection";

// Modals
import { ProjectModal } from "@/components/portfolio/modals/ProjectModal";
import { AchievementModal } from "@/components/portfolio/modals/AchievementModal";
import { DocPreviewModal } from "@/components/portfolio/modals/DocPreviewModal";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{ url: string; title: string } | null>(null);

  // Fetch data from Convex with fallback to static data
  const convexAchievements = useQuery(api?.portfolio?.getAchievements as never);
  const convexProjects = useQuery(api?.portfolio?.getProjects as never);
  const convexSkills = useQuery(api?.portfolio?.getSkills as never);

  const finalAchievements = convexAchievements ?? achievementsData;
  const finalProjects = convexProjects ?? projectsData;
  const finalSkills = convexSkills; // Can be passed to CapabilitiesSection

  // Global neural spine progress
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { damping: 30, stiffness: 100, mass: 0.5 });
  const spineHeight = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden bg-[#030303]">
      <GlassCursor />
      
      {/* Immersive neural backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <AmbientBackground />
         <div className="absolute inset-0 bg-[#030303]/80" />
      </div>

      <NeuralSpine spineHeight={spineHeight} activeSection={activeSection} />

      <div className="relative z-10 w-full flex flex-col pl-6 sm:pl-16 md:pl-32 lg:pl-48">
          <HeroSection setPreviewDoc={setPreviewDoc} />
          <IdentitySection />
          <CapabilitiesSection skills={finalSkills} />
          <StackSection />
          <ProjectsSection projectsData={finalProjects} setSelectedProject={setSelectedProject} />
          <FreelanceSection />
          <AchievementsSection achievementsData={finalAchievements} setSelectedAchievement={setSelectedAchievement} />
          <ContactSection />

          <footer className="w-full text-center pb-10 pt-20 border-t border-white/5 opacity-40 text-[9px] font-mono tracking-[0.2em] uppercase px-4">
             NEURAL NETWORK ONLINE. SERVER UPTIME: 99.99%. (C) {new Date().getFullYear()} Tanmay Mirgal
          </footer>
      </div>

      {/* Modals Handling */}
      <AnimatePresence>
        <ProjectModal selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      </AnimatePresence>

      <AnimatePresence>
        <AchievementModal selectedAchievement={selectedAchievement} setSelectedAchievement={setSelectedAchievement} />
      </AnimatePresence>

      <AnimatePresence>
        <DocPreviewModal previewDoc={previewDoc} setPreviewDoc={setPreviewDoc} />
      </AnimatePresence>

      <PortfolioStyles />
    </main>
  );
}
