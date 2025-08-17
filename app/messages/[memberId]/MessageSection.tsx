"use client"
import { useGetMessages } from "@/app/features/conversation/use-get-message";
import { Id } from "@/convex/_generated/dataModel";

interface MessageSectionProps {
    conversationId: Id<"conversation">
    memberId: Id<"users">
}

const MessageList = ({ conversationId, memberId }: MessageSectionProps) => {
    if (!conversationId) return null;

    const { messages } = useGetMessages({ conversationId });

    if (!messages || messages.length === 0) 
        return <div className="text-gray-500 p-2">No messages yet.</div>;

    return (
        <div className="flex flex-col gap-2 p-2">
            {messages.map((msg) => {
                const isYou = msg.senderId !== memberId; // ✅ fixed

                return (
                    <div
                        key={msg._id}
                        className={`max-w-xs px-3 py-2 rounded-lg shadow-sm transform transition duration-150 hover:scale-105
                            ${isYou ? "ml-auto bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                    >
                        <p className="break-words">{msg.body}</p>
                        <small className="text-[10px] text-gray-400 mt-1 block">
                            {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
