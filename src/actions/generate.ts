'use server'

import { Get } from "@/src/lib/gemini";

import { connectDB } from "@/src/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import { RecipeType } from "../types/types";
import Recipe from "../models/Recipe";

type Data = {
    ingredients: string[];
    usePantryItems: boolean;
    cuisine: string;
    diet: string[];
    servings: number;
    time: string;
};



export async function getResponseFromAi(data: Data) {
    return await Get(data);
}

export async function saveRecipe(recipe: RecipeType) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            throw new Error("Unauthorized");
        }

        await Recipe.create({
            ...recipe,
            userId: session.user.id
        });
        console.log("success") 

        return { success: true };

    } catch (err) {
        console.log(err);
        throw new Error("Failed to save recipe");
    }
}