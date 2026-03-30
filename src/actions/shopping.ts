'use server'
import mongoose from 'mongoose'
import { connectDB } from "../lib/mongodb";
import ShoppingList from "../models/ShoppingList";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import PantryItem from '../models/PantryItem';

export async function addShoppingItem(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);

        await connectDB();

        await ShoppingList.create({
            name: formData.get('itemName'),
            quantity: formData.get('quantity'),
            unit: formData.get('unit'),
            category: formData.get('category'),
            userId: session?.user.id
        })

    } catch (err) {
        console.log(err);
        throw new Error('Internal server Error');
    }
    revalidatePath('/shopping')
    redirect('/shopping')
}

export async function toggleItem(id: string, checked: boolean) {
    await connectDB()

    await ShoppingList.findByIdAndUpdate(id, {
        checked: !checked
    })

    revalidatePath('/shopping')
}

export async function deleteItem(id: string) {
    try {
        await connectDB()

        await ShoppingList.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
        throw new Error('internal server Error');
    }

    revalidatePath('/shopping')
}



export async function moveToPantry(ids: string[]) {
    const session = await mongoose.startSession()

    try {
        await session.withTransaction(async () => {
            const items = await ShoppingList.find({
                _id: { $in: ids }
            }).session(session)

            if (!items.length) {
                throw new Error('No items found to move')
            }

            await PantryItem.insertMany(items, { session })

            await ShoppingList.deleteMany({
                _id: { $in: ids }
            }).session(session)
        })

        revalidatePath('/shopping')

        return { success: true }

    } catch (error) {
        console.error('Error moving items to pantry:', error)

        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        }

    } finally {
        session.endSession()
    }
}