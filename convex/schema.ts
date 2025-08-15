import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  conversations: defineTable({
    memberOneId: v.id("users"),
    memberTwoId: v.id("users"),
    createdAt: v.number()
  }),
  messages: defineTable({
    conversationId: v.id("conversations"),
    body : v.id("users"),
    memberTwoId: v.id("users"),
    message: v.string()
  }),
  // Your other tables...
});

export default schema;