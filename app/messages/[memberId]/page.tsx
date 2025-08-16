"use client"
import { Button } from '@/components/ui/button'
import { Send, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useCreateOrGetConversation from '@/app/features/conversation/use-create-or-get-conversation'
import useSendMessage from '@/app/features/conversation/use-send-message'
import { useGetMessages } from '@/app/features/conversation/use-get-message'

const MessageSection = () => {
    const { memberId } = useParams();
    const passedId = memberId as Id<"users">
    const [message, setMessage] = useState('');
    // Get user info
    const user = useQuery(api.members.getById, { memberId: passedId });

    const {
        mutate: createConversation,
        data: conversationId,
        isLoading: isCreatingConversation,
        error: conversationError
    } = useCreateOrGetConversation();
    const convoId = conversationId as Id<"conversation">
    const { messages } = useGetMessages({ conversationId: convoId ?? undefined });


    // Send message
    const {
        mutate: sendMessage,
        isLoading: isSendingMessage,
        error: sendError
    } = useSendMessage();

    // Run once on mount

    const handleSend = () => {
        if (!conversationId || !message.trim()) return;

        sendMessage({ conversationId, body: message });
        setMessage("");
    };

    useEffect(() => {
        createConversation({ memberId: passedId });
    }, [createConversation, passedId]);
    return (
        <div className='bg-gray-700 text-white h-full flex flex-col justify-between'>
            {/* Header */}
            <div className='text-white flex gap-2 items-center px-2 py-1 text-xl my-2 border-b font-semibold'>
                <User2 className='size-5' /> {user?.email?.split('@')[0] ?? "Loading..."}
            </div>

            {/* Messages Area */}
            <div className='flex-1 p-2 overflow-y-auto'>
                {convoId && messages?.map((msg) => {
                    const isMe = msg.senderId === "123";

                    return (
                        <div
                            key={msg._id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-2xl shadow 
                                ${isMe ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-600 text-white rounded-bl-none"}
                            `}
                            >
                                <p className="whitespace-pre-wrap">{msg.body}</p>
                                <span className="block text-xs opacity-70 mt-1 text-right">
                                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                {isCreatingConversation && <p className="text-sm text-gray-400">Setting up chat...</p>}
                {conversationError && <p className="text-red-400">Failed to load conversation</p>}
                {sendError && <p className="text-red-400">Failed to send message</p>}
            </div>

            {/* Input Area */}
            <div className='flex gap-1 py-2 px-4 bg-white text-black'>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!conversationId || isSendingMessage}
                    className='flex-1 px-2 py-1 rounded-md outline'
                    placeholder='Enter a message'
                />
                <Button
                    size="sm"
                    onClick={handleSend}
                    disabled={!message.trim() || !conversationId || isSendingMessage}
                >
                    {isSendingMessage ? (
                        <span className="animate-pulse">...</span>
                    ) : (
                        <Send className='size-5' />
                    )}
                </Button>
            </div>
        </div>
    )
}

export default MessageSection
