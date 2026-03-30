import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "./config/env";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: NEXTAUTH_SECRET
    });

    const { pathname } = request.nextUrl;

    if (token) {
        if (pathname === '/' || pathname === '/signin' || pathname === '/signup') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    const isProtectedRoute = pathname.startsWith("/dashboard");

    if (!token && isProtectedRoute) {
        // return NextResponse.redirect(new URL("/signin", request.url));
        const signInUrl = new URL('/signin', request.url);
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        signInUrl.searchParams.set("error", "session_expired");
        return NextResponse.redirect(signInUrl); 
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/signin', '/signup', '/dashboard']
};