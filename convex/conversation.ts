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
        const existingConversation = await ctx.db
            .query("conversation")
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("memberOneId"), userId),
                        q.eq(q.field("memberTwoId"), args.memberId)
                    ),
                    q.and(
                        q.eq(q.field("memberOneId"), args.memberId),
                        q.eq(q.field("memberTwoId"), userId)
                    )
                )
            )
            .unique();

        if (existingConversation) return existingConversation._id;
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