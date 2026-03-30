"use server";

import { createUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export type State = {
    message?: string | null;
    error?: {
        username?: string[];
        email?: string[];
        password?: string[];
    };
};

export async function addUser(
    prevState: State,
    formData: FormData
): Promise<State> {
    try {
        const username = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const errors: State["error"] = {};

        // 🔹 Validation
        if (!username || username.length < 3) {
            errors.username = ["Username must be at least 3 characters"];
        }

        if (!email || !email.includes("@")) {
            errors.email = ["Invalid email address"];
        }

        if (!password || password.length < 6) {
            errors.password = ["Password must be at least 6 characters"];
        }

        if (Object.keys(errors).length > 0) {
            return {
                error: errors,
                message: null,
            };
        }

        // ✅ Create user
        await createUser(username, email, password);

        
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "Email already exists") {
                return {
                    error: { email: ["Email already exists"] },
                    message: null,
                };
            }
        }

        return {
            message: "Something went wrong",
            error: {},
        };
    }
    redirect('/signin')
}