"use client"
import { useAuthActions } from "@convex-dev/auth/react";
const SignOut = () => {
    const { signOut } = useAuthActions();
    const handleSignout = async () => {
        await signOut()
    }

    return (
        <div className="flex justify-end">
            <button className='px-4 text-white bg-gray-500 py-2 rounded-md' onClick={handleSignout}>SignOut</button>
        </div>
    )
}

export default SignOut