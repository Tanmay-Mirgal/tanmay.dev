import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- Projects ---
export const getProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  },
});

export const addProject = mutation({
  args: {
    title: v.string(),
    desc: v.string(),
    fullDesc: v.string(),
    tags: v.array(v.string()),
    link: v.string(),
    image: v.string(),
    liveLink: v.optional(v.string()),
    order: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});

// --- Achievements ---
export const getAchievements = query({
  handler: async (ctx) => {
    return await ctx.db.query("achievements").order("asc").collect();
  },
});

export const addAchievement = mutation({
  args: {
    title: v.string(),
    org: v.string(),
    date: v.string(),
    desc: v.string(),
    url: v.string(),
    type: v.union(v.literal("image"), v.literal("pdf")),
    order: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("achievements", args);
  },
});

// --- Skills ---
export const getSkills = query({
  handler: async (ctx) => {
    return await ctx.db.query("skills").order("asc").collect();
  },
});

export const addSkill = mutation({
  args: {
    title: v.string(),
    desc: v.string(),
    icon: v.string(),
    category: v.optional(v.string()),
    order: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skills", args);
  },
});

// --- Experience ---
export const getExperience = query({
  handler: async (ctx) => {
    const experiences = await ctx.db.query("experience").collect();
    return experiences.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  },
});

export const addExperience = mutation({
  args: {
    date: v.string(),
    role: v.string(),
    company: v.string(),
    bullets: v.array(v.string()),
    order: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experience", args);
  },
});

export const addScoutExperience = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("experience")
      .filter((q) => q.eq(q.field("company"), "Open Source Connect India"))
      .collect();
    if (existing.length > 0) {
      return "Already exists";
    }
    return await ctx.db.insert("experience", {
      date: "2026-01 - Present",
      role: "Project Manager",
      company: "Open Source Connect India",
      bullets: [
        "Led the development and open-source delivery of Scout, a multi-agent research and intelligence platform that turns complex questions into structured, evidence-backed insights.",
        "Architected a scalable monorepo comprising a Next.js web application, FastAPI backend, and automated research agent pipeline with Docker and PostgreSQL; directed contributor workflows, PR reviews, and CI/CD quality gates.",
      ],
      order: 3,
    });
  },
});

// --- Education ---
export const getEducation = query({
  handler: async (ctx) => {
    return await ctx.db.query("education").order("asc").collect();
  },
});

export const addEducation = mutation({
  args: {
    date: v.string(),
    degree: v.string(),
    institution: v.string(),
    description: v.string(),
    order: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("education", args);
  },
});

// --- Skill Groups ---
export const getSkillGroups = query({
  handler: async (ctx) => {
    return await ctx.db.query("skillGroups").order("asc").collect();
  },
});

export const addSkillGroup = mutation({
  args: {
    title: v.string(),
    tags: v.array(v.string()),
    order: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skillGroups", args);
  },
});
