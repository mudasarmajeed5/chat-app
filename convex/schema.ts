import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  conversation: defineTable({
    memberOneId: v.id("users"),
    memberTwoId: v.id("users"),
    createdAt: v.number(),
  }).index("memberOneId", ["memberOneId"]).index("memberTwoId", ["memberTwoId"]),
  messages: defineTable({
    conversationId: v.id("conversation"),
    senderId: v.id("users"),
    body: v.string(),
    sentAt: v.number(),
  })
});

export default schema;