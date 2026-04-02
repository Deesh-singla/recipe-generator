import PantryItem from "../models/PantryItem";
import { connectDB } from "./mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import { Query } from "../types/types";
import ShoppingList from "../models/ShoppingList";
import Recipe from "../models/Recipe";
import { unstable_noStore as noStore } from "next/cache";


export async function fetchPantryItems(cat: string, ing: string) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session?.user.id);
        await connectDB();

        const query: Query = {
            userId: session?.user.id
        };

        if (cat !== '') {
            query.category = cat;
        }

        if (ing != '') {
            query.name = {
                $regex: `${ing}`,
                $options: "i"
            };
        }
        console.log(ing)

        const items = await PantryItem.find(query).lean();
        return JSON.parse(JSON.stringify(items));

    } catch (err) {
        console.log(err);
        throw new Error('internal server error');
    }
}

export async function fetchShoppingList() {
    try {
        const session = await getServerSession(authOptions);
        await connectDB();
        const items = await ShoppingList.find({ userId: session?.user.id }).lean();
        return JSON.parse(JSON.stringify(items));

    } catch (err) {
        console.log(err);
        throw new Error('Internal server error')
    }
}

export async function fetchRecipes() {
    try {
        noStore();
        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            return [];
        }

        await connectDB();

        const recipes = await Recipe.find({ userId: session?.user.id })
            .sort({ createdAt: -1 })
            .lean();

        return JSON.parse(JSON.stringify(recipes));
    } catch (err) {
        console.log(err);
        throw new Error("Internal server error");
    }
}

export async function fetchDashboardStats() {
    try {
        noStore();
        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            return {
                totalRecipes: 0,
                pantryItems: 0,
                shoppingItems: 0,
                lowStockItems: 0,
                recentRecipes: [],
            };
        }

        await connectDB();

        const [totalRecipes, pantryItems, shoppingItems, lowStockItems, recentRecipes] =
            await Promise.all([
                Recipe.countDocuments({ userId: session.user.id }),
                PantryItem.countDocuments({ userId: session.user.id }),
                ShoppingList.countDocuments({ userId: session.user.id }),
                PantryItem.countDocuments({ userId: session.user.id, lowStock: true }),
                Recipe.find({ userId: session.user.id })
                    .sort({ createdAt: -1 })
                    .limit(3)
                    .lean(),
            ]);

        return {
            totalRecipes,
            pantryItems,
            shoppingItems,
            lowStockItems,
            recentRecipes: JSON.parse(JSON.stringify(recentRecipes)),
        };
    } catch (err) {
        console.log(err);
        throw new Error("Internal server error");
    }
}
