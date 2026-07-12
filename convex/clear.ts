import { mutation } from "./_generated/server";

export const clear = mutation({
  handler: async (ctx) => {
    const existingProjects = await ctx.db.query("projects").collect();
    for (const doc of existingProjects) await ctx.db.delete(doc._id);

    const existingAchievements = await ctx.db.query("achievements").collect();
    for (const doc of existingAchievements) await ctx.db.delete(doc._id);

    const existingSkills = await ctx.db.query("skills").collect();
    for (const doc of existingSkills) await ctx.db.delete(doc._id);
    return "Cleared all tables";
  }
});
