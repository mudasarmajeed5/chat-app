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
import MessageList from './MessageSection'

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
                <MessageList
                    memberId={memberId as Id<"users">}
                    conversationId={conversationId as Id<"conversation">}
                />
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
