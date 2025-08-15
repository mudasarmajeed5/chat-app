"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import React, { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("password", { flow: step, email, password })

    } catch (error) {
      console.log(`${(error as Error).message}`)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="flex flex-col gap-y-2 w-[450px] bg-slate-800 text-white p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-2 p-2">
          <label htmlFor="email">Email: </label>
          <input required name="email" value={email} className="focus:outline px-2 py-1 rounded-md" onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text" />
        </div>
        <div className="flex flex-col gap-y-2 p-2">
          <label htmlFor="password">Password: </label>
          <input required value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="focus:outline px-2 py-1 rounded-md" placeholder="Password" type="password" />
        </div>
        <div className="flex justify-center bg-gray-300 text-black items-center">
          <button
            disabled={loading}
            className={`cursor-pointer p-2 rounded-md w-full disabled:bg-red-500`}
            type="submit">{step === "signIn" ? "Sign in" : "Sign up"}</button>
        </div>
        <button
          className={`flex items-center justify-center p-2 bg-gray-500 rounded-md`}
          type="button"
          onClick={() => {
            setStep(step === "signIn" ? "signUp" : "signIn");
          }}
        >
          {step === "signIn" ? "Sign up instead" : "Sign in instead"}
        </button>
      </form>
    </div>
  );
}