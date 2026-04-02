'use client'

import { useState } from "react"
import { X } from "lucide-react"

type IngredientsProps = {
    ingredients: string[];
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
    usePantryItems: boolean;
    setUsePantryItems: React.Dispatch<React.SetStateAction<boolean>>;
};

const Ingredients = ({
    ingredients,
    setIngredients,
    usePantryItems,
    setUsePantryItems
}: IngredientsProps) => {

    const [input, setInput] = useState("");

    const addIngredient = () => {
        const value = input.trim().toLowerCase();
        if (!value || ingredients.includes(value)) return;

        setIngredients((prev: string[]) => [...prev, value]);
        setInput("");
    };

    const removeIngredient = (item: string) => {
        setIngredients((prev: string[]) => prev.filter(i => i !== item));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border-gray-200 p-5 space-y-4">

            <h2 className="text-lg font-semibold text-gray-800">Ingredients</h2>

            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-md">
                <input
                    type="checkbox"
                    checked={usePantryItems}
                    onChange={() => setUsePantryItems((prev: boolean) => !prev)}
                    className="accent-green-600"
                />
                <label className="text-sm text-gray-700">
                    Use ingredients from my pantry
                </label>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addIngredient();
                        }
                    }}
                    placeholder="Add ingredient"
                    className="flex-1 border-2 border-green-500 rounded-md px-3 py-2 text-sm"
                />

                <button
                    onClick={addIngredient}
                    className="bg-green-600 text-white px-4 rounded-md"
                >
                    +
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {ingredients.map((item: string) => (
                    <div
                        key={item}
                        className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                        {item}
                        <button onClick={() => removeIngredient(item)}>
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Ingredients