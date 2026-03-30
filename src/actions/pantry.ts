'use server'

import { connectDB } from "@/src/lib/mongodb";
import PantryItem from "@/src/models/PantryItem";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";

type AddPantryState = {
    success: boolean;
    message: string;
    data?: unknown;
};

export async function addPantryItem(
    prevState: AddPantryState,
    formData: FormData
): Promise<AddPantryState> {
    try {
        const session = await getServerSession(authOptions);
        await connectDB();

        await PantryItem.create({
            name: formData.get("name"),
            quantity: Number(formData.get("quantity")),
            unit: formData.get("unit"),
            category: formData.get("category"),
            expiry: formData.get("expiry") || null,
            lowStock: formData.get("lowStock") === "on",
            userId: session?.user.id
        });

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Failed to add item",
        };
    }
    revalidatePath('/pantry');
    redirect('/pantry');
}


export async function deleteItem(id: string) {
    try {
        connectDB();
        const del = await PantryItem.findByIdAndDelete(id)
        console.log(del)
    } catch (err) {
        console.log(err);
        throw new Error("internal server error")
    }
    revalidatePath('/pantry')
}