import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/src/lib/auth";
import { CLIENT_ID, CLIENT_SECRET } from "@/src/config/env";
import User from "@/src/models/User";
import bcrypt from "bcrypt";
import { connectDB } from "@/src/lib/mongodb";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const user = await loginUser(
                        credentials.email,
                        credentials.password
                    );

                    return user;

                } catch (error: unknown) {
                    console.error(error);
                    return null;
                }
            }
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    await connectDB();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        const dummyPassword = await bcrypt.hash("google_oauth", 10);

                        await User.create({
                            username: user.name,
                            email: user.email,
                            password: dummyPassword,
                            image: user.image,
                            provider: "google",
                        });
                    }
                    user.id=existingUser._id.toString();

                    return true;
                }

                return true;

            } catch (err) {
                console.log("SignIn Error:", err);
                return false;
            }
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
};
