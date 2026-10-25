"use client";

import React, { useState } from "react";
import { useAchievements } from "@/components/portfolio/PortfolioData";
import { Achievement } from "@/types";
import { Section } from "@/components/portfolio/Section";
import { RecordList } from "@/components/portfolio/RecordList";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";
import { AchievementModal } from "@/components/portfolio/modals/AchievementModal";

export const CertificationsSection = () => {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const achievementsData = useAchievements();

  // Course certifications (hackathons, offers and timelines live under Achievements)
  const certifications = achievementsData?.filter((item) => {
    const title = item.title.toUpperCase();
    return (
      title.includes("BOOTCAMP") ||
      title.includes("CERTIFICATION") ||
      title.includes("FUNDAMENTALS") ||
      title.includes("LEARNING") ||
      title.includes("TECHNATHON") ||
      item.org.toUpperCase().includes("UDEMY") ||
      item.org.toUpperCase().includes("POSTMAN")
    );
  });

  return (
    <Section id="certifications" index="06" eyebrow="Learning" title="Certifications">
      {certifications === undefined ? (
        <ListSkeleton rows={4} />
      ) : (
        <RecordList items={certifications} onSelect={setSelected} />
      )}
      <AchievementModal selectedAchievement={selected} setSelectedAchievement={setSelected} />
    </Section>
  );
};
