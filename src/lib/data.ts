import PantryItem from "../models/PantryItem";
import { connectDB } from "./mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import { Query } from "../types/types";
import ShoppingList from "../models/ShoppingList";


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