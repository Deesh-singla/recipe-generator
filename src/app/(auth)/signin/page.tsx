import Link from "next/link";
import SignInForm from "@/src/components/SignInForm";
import Image from 'next/image';

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#eef5f2]">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Image
                            src="/chef-hat.svg"
                            alt="chef-hat"
                            width={30}
                            height={30}
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Recipe Generator
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Your AI Powered Cooking Assistant
                    </p>
                </div>

                {/* Form Component */}
                <SignInForm />

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-green-600">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}