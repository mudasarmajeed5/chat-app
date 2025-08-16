import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
export const createOrGetConversation = mutation({
    args: {
        memberId: v.id("users")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)
        if (!userId) throw new Error("Unauthorized");
        const existingOne = await ctx.db.query("conversation").withIndex("memberOneId",
            (q) => q.eq("memberOneId", userId)
        ).filter((q) =>
            q.eq(q.field("memberTwoId"), args.memberId)
        ).unique();
        if (existingOne) return existingOne._id;

        const existingTwo = await ctx.db.query("conversation").withIndex("memberTwoId",
            (q) => q.eq("memberTwoId", args.memberId)
        ).filter((q) =>
            q.eq(q.field("memberOneId"), userId)
        ).unique();
        if (existingTwo) return existingTwo._id;

        const newConversation = await ctx.db.insert("conversation",
            {
                memberOneId: userId,
                memberTwoId: args.memberId,
                createdAt: Date.now(),
            }
        )
        return newConversation;
    }
})