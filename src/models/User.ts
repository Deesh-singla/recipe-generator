import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    provider: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            minlength: [3, "Username must be at least 3 characters"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        provider: {
            type: String,
            enum: ['credentials', 'google'],
            default: 'credentials'
        }
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

// ✅ Prevent model overwrite in Next.js (VERY IMPORTANT)
const User = models.User || model<IUser>("User", UserSchema);

export default User;