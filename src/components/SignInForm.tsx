"use client";

import { Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm({ urlError = "" }: { urlError?: string }) {
    const [error, setError] = useState("");
    const router = useRouter();

    const errorMessage =
        urlError === "session_expired"
            ? "Session expired. Please sign in again."
            : urlError === "OAuthCallback"
                ? "Google sign-in failed. Try again."
                : "";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) setError("Invalid email or password");
            else router.push("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {errorMessage && (
                <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm">{errorMessage}</span>
                        <button
                            onClick={() => setError("")}
                            className="font-bold"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-sm border"
            >
                {/* Email */}
                <label className="text-sm text-gray-600">Email</label>
                <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-4">
                    <Mail size={18} className="text-gray-400 mr-2" />
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full outline-none text-sm"
                    />
                </div>

                {/* Password */}
                <label className="text-sm text-gray-600">Password</label>
                <div className="flex items-center border rounded-lg px-3 py-2 mt-1 mb-4">
                    <Lock size={18} className="text-gray-400 mr-2" />
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className="w-full outline-none text-sm"
                    />
                </div>
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-3 mb-2 py-2 rounded-md mt-2 border border-red-200 text-center">
                        {error}
                    </div>
                )}

                {/* Sign In Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-3"
                >
                    Sign In
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
                    onClick={() =>
                        signIn("google", { callbackUrl: "/dashboard" })
                    }
                >
                    <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                    <span className="text-sm">
                        Continue with Google
                    </span>
                </button>
            </form>
        </>
    );
}
