import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    desc: v.string(),
    fullDesc: v.string(),
    tags: v.array(v.string()),
    link: v.string(),
    image: v.string(),
    liveLink: v.optional(v.string()),
    order: v.optional(v.float64()),
  }),
  achievements: defineTable({
    title: v.string(),
    org: v.string(),
    date: v.string(),
    desc: v.string(),
    url: v.string(),
    type: v.union(v.literal("image"), v.literal("pdf")),
    order: v.optional(v.float64()),
  }),
  skills: defineTable({
    title: v.string(),
    desc: v.string(),
    icon: v.string(), // Name of the Lucide icon or a Cloudinary URL
    category: v.optional(v.string()), // e.g., "Frontend", "Backend", "AI/ML"
    order: v.optional(v.float64()),
  }),
});
