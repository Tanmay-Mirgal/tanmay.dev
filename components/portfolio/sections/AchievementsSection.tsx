"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Achievement } from "@/types";
import { Section } from "@/components/portfolio/Section";
import { RecordList } from "@/components/portfolio/RecordList";
import { ListSkeleton } from "@/components/portfolio/ListSkeleton";
import { AchievementModal } from "@/components/portfolio/modals/AchievementModal";

export const AchievementsSection = () => {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const achievementsData = useQuery(api.portfolio.getAchievements);

  // Achievements & hackathons (standard course certifications live in their own section)
  const achievements = achievementsData?.filter((item) => {
    const title = item.title.toUpperCase();
    return (
      title.includes("HACKATHON") ||
      title.includes("IDEATHON") ||
      title.includes("OFFER") ||
      title.includes("INTERNSHIP") ||
      title.includes("RESEARCH") ||
      title.includes("PUBLICATION")
    );
  });

  return (
    <Section id="achievements" index="05" eyebrow="Recognition" title="Achievements">
      {achievements === undefined ? (
        <ListSkeleton rows={4} />
      ) : (
        <RecordList items={achievements} onSelect={setSelected} />
      )}
      <AchievementModal selectedAchievement={selected} setSelectedAchievement={setSelected} />
    </Section>
  );
};
