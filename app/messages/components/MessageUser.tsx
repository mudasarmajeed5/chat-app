import { Doc, Id } from "@/convex/_generated/dataModel"
import { User } from "lucide-react"

const MessageUser = ({ user }: { user: Doc<"users"> }) => {
    return (
        <div className="flex gap-2 bg-white text-black ml-2 mr-2 rounded-md px-4 py-2 items-center">
            <User className="size-5"/>
            {user.email?.split('@')[0]}
        </div>
    )
}

export default MessageUser