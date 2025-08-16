import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";


export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;
        const users = await ctx.db.query("users").collect();
        const getUsers = users.filter((user) => user._id !== userId)
        return getUsers;
    }
})
export const getById = query({
    args: {
        memberId: v.id("users")
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.memberId);
        return user;
    }
})
    