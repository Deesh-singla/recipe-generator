"use client";

import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import { useActionState } from "react";
import { State, addUser } from "@/src/app/actions/auth";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
    const initialState: State = { error: {}, message: null };
    const [state, formAction] = useActionState(addUser, initialState);

    return (
        <form action={formAction} className="bg-white p-6 rounded-xl shadow-sm border">

            {/* Name */}
            <label className="text-sm text-gray-600">Full Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                <User size={18} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full outline-none text-sm"
                />
            </div>
            <div className="text-red-500 text-xs mt-1 mb-3">
                {state.error?.username}
            </div>

            {/* Email */}
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full outline-none text-sm"
                />
            </div>
            <div className="text-red-500 text-xs mt-1 mb-3">
                {state.error?.email}
            </div>

            {/* Password */}
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full outline-none text-sm"
                />
            </div>
            <div className="text-red-500 text-xs mt-1 mb-3">
                {state.error?.password}
            </div>

            {/* Success / Error Message */}
            {state.message && (
                <div className="text-green-600 text-sm mb-3 text-center">
                    {state.message}
                </div>
            )}

            {/* Button */}
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-3"
            >
                Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-3 text-sm text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Button */}
            <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
                onClick={()=>{signIn('google',{callbackUrl:'/dashboard'})}}
            >
                <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    width={20}
                    height={20}
                />
                <span className="text-sm">Continue with Google</span>
            </button>

        </form>
    );
}