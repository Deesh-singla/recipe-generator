'use client'
// import React, { useState } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import { useActionState } from 'react'
import { addPantryItem } from '@/src/actions/pantry'

type AddItemFormProps = {
    closeModal: () => void;
};

type AddPantryState = {
    success: boolean;
    message: string;
};

const initialState: AddPantryState = {
    success: false,
    message: "",
};

const unitOptions = [
    "Pieces",
    "Kilograms",
    "Grams",
    "Liters",
    "Milliliters",
    "Cups",
    "Tablespoons",
    "Teaspoons"
];

const categoryOptions = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Grains",
    "Spices",
    "Other"
];

const AddItemForm = ({ closeModal }: AddItemFormProps) => {

    const [state, formAction, isPending] = useActionState(
        addPantryItem,
        initialState
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/50"
                onClick={closeModal}
            />

            <div className="relative z-10 w-full max-w-md mx-4 sm:mx-0 rounded-2xl bg-white p-4 sm:p-6 shadow-xl">

                <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
                >
                    <X />
                </button>

                {/* 🔥 Only change: onSubmit → action */}
                <form action={formAction} className="flex flex-col gap-4">

                    <h2 className="text-lg font-semibold text-gray-800">
                        Add Pantry Item
                    </h2>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-sm text-gray-600">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                required
                                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-1/2">
                            <label className="text-sm text-gray-600">Unit</label>
                            <select
                                name="unit"
                                defaultValue="Pieces"
                                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {unitOptions.map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Category</label>
                        <select
                            name="category"
                            defaultValue="Other"
                            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categoryOptions.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">
                            Expiry Date (Optional)
                        </label>
                        <input
                            type="date"
                            name="expiry"
                            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="lowStock"
                            className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">
                            Mark as running low
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                        >
                            {isPending ? "Adding..." : "Add Item"}
                        </Button>
                    </div>

                    {/* 🔥 Optional message */}
                    {state.message && (
                        <p className={`text-sm ${state.success ? "text-green-600" : "text-red-500"}`}>
                            {state.message}
                        </p>
                    )}

                </form>
            </div>
        </div>
    )
}

export default AddItemForm