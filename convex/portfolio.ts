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
