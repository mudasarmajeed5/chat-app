import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
export const getMessages = query({
    args: {
        conversationId: v.id("conversation")
    },
    handler: async (ctx, args) => {
        const messages = await ctx.db.query("messages").filter((q) => q.eq(q.field("conversationId"), args.conversationId)).order("asc").collect();
        return messages;
    }
})
export const sendMessage = mutation({
    args: {
        conversationId: v.id("conversation"),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Unauthorized")
        const messageId = await ctx.db.insert("messages", {
            conversationId: args.conversationId,
            senderId: userId,
            body: args.body,
            sentAt: Date.now()
        })
        return messageId;
    }
})