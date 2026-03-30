import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import bcrypt from "bcrypt";

// ✅ CREATE USER (Signup)
export async function createUser(
    username: string,
    email: string,
    password: string
) {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
    };
}

// ✅ LOGIN USER (used by NextAuth or manually)
export async function loginUser(email: string, password: string) {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid password");
    }

    return {
        id: user._id.toString(),
        name: user.username,
        email: user.email,
    };
}