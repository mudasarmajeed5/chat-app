"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"
import MessageUser from "./components/MessageUser"
const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
    const users = useQuery(api.members.get)
    return (
        <div>
            <div className="flex gap-y-2">
                <div className="bg-slate-700 w-64 h-screen">
                    <div className="text-2xl text-white m-4 font-bold">
                        Message
                    </div>
                    {users?.map((user) => (
                        <div key={user._id}>
                            <Link href={`/messages/${user._id}`}>
                                <MessageUser user={user} />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MessagesLayout