import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- Projects ---
export const getProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("asc").collect();
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
    return await ctx.db.query("experience").order("asc").collect();
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
