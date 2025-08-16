"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useCallback, useState } from "react"
type RequestType = {
    conversationId: Id<"conversation">
    body: string,
}
type ResponseType = Id<"messages">
const useSendMessage = () => {
    const [data, setData] = useState<ResponseType | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const mutation = useMutation(api.messages.sendMessage);
    const mutate = useCallback(async (values: RequestType) => {
        try {
            setError('')
            setIsLoading(true);
            const response = await mutation(values)
            setData(response);
            return response;
        } catch (error) {
            const err = error as Error;
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }, [mutation])
    return {
        data,
        mutate,
        isLoading,
        error
    }
}

export default useSendMessage