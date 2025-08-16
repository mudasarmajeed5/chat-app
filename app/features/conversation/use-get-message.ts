"use client"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
type RequestType = {
    conversationId: Id<"conversation">
}
type ResponseType = Doc<"messages">
export const useGetMessages = ({ conversationId }: RequestType) => {

    const messages = useQuery(api.messages.getMessages, { conversationId })
    const isLoading = messages === undefined;
    return {
        messages,
        isLoading
    }
}
