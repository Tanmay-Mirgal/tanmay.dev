"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { PortfolioSnapshot } from "@/lib/portfolioSnapshot";

/**
 * The portfolio as the server read it from Convex. Sections render it on the first
 * pass, so the HTML that crawlers fetch already has the content. Once the Convex
 * client connects, its live result takes over.
 */
const SnapshotContext = createContext<Partial<PortfolioSnapshot>>({});

export function PortfolioDataProvider({
  snapshot,
  children,
}: {
  snapshot: Partial<PortfolioSnapshot>;
  children: ReactNode;
}) {
  return <SnapshotContext.Provider value={snapshot}>{children}</SnapshotContext.Provider>;
}

// Live data wins; the server snapshot fills in until the Convex client has connected.
// `undefined` still means "loading", so the sections' skeletons keep working.
// Both hooks run on every render: `useContext` must not sit behind a `??`.

export function useProjects() {
  const live = useQuery(api.portfolio.getProjects);
  const { projects } = useContext(SnapshotContext);
  return live ?? projects;
}

export function useExperience() {
  const live = useQuery(api.portfolio.getExperience);
  const { experience } = useContext(SnapshotContext);
  return live ?? experience;
}

export function useSkillGroups() {
  const live = useQuery(api.portfolio.getSkillGroups);
  const { skillGroups } = useContext(SnapshotContext);
  return live ?? skillGroups;
}

export function useEducation() {
  const live = useQuery(api.portfolio.getEducation);
  const { education } = useContext(SnapshotContext);
  return live ?? education;
}

export function useAchievements() {
  const live = useQuery(api.portfolio.getAchievements);
  const { achievements } = useContext(SnapshotContext);
  return live ?? achievements;
}
