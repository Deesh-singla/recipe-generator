"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="text-xs text-red-500 hover:text-red-600 ml-2"
        >
            Logout
        </button>
    );
}