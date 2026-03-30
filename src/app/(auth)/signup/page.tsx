"use client";

import Link from "next/link";
import SignUpForm from "@/src/components/SignUpForm";
import Image from "next/image";

export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#eef5f2]">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Image src="/chef-hat.svg" alt="chef-hat" width={30} height={30} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Join your AI cooking assistant 
                    </p>
                </div>

                {/* Form */}
                <SignUpForm />

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-green-600">
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    );
}