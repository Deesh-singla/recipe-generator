'use client'

import { RecipeType } from "@/src/types/types"
import { Clock, Users } from "lucide-react"
import { saveRecipe } from "@/src/actions/generate";
import { useState } from "react";

type Props = {
    recipe: RecipeType | null;
    loading: boolean;
};

const RecipePanel = ({ recipe, loading }: Props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    console.log(isSuccess);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border-gray-200 p-6">
                <p className="text-gray-400 animate-pulse">
                    Generating your recipe...
                </p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="bg-white rounded-xl shadow-sm border-gray-200 flex items-center justify-center min-h-100">
                <p className="text-gray-400 text-sm">
                    Your generated recipe will appear here
                </p>
            </div>
        );
    }

    console.log(recipe);
    return (
        <div className="bg-white rounded-xl shadow-sm border-gray-200 p-6 space-y-6">

            {isSuccess && (
                <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slideIn">
                    ✅ Recipe saved successfully
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                    {recipe.description}
                </p>
            </div>

            <div className="flex gap-2 flex-wrap">
                <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">
                    {recipe.cuisine}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
                    {recipe.difficulty}
                </span>
                {recipe.diet.map((d, i) => (
                    <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
                        {d}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {recipe.time}
                </div>
                <div className="flex items-center gap-1">
                    <Users size={16} />
                    {recipe.servings} servings
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-800 mb-2">Ingredients</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                    {recipe.ingredients.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Instructions */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3">Instructions</h3>
                <div className="space-y-4">
                    {recipe.instructions.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">

                            {/* Number */}
                            <div className="mt-0.5 w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white text-xs font-semibold shrink-0">
                                {idx + 1}
                            </div>

                            {/* Text */}
                            <p className="text-sm text-gray-600 leading-6">
                                {step}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

            {/* Nutrition */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                    Nutrition (per serving)
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {[
                        { label: "Calories", value: recipe.nutrition.calories },
                        { label: "Protein", value: recipe.nutrition.protein },
                        { label: "Carbs", value: recipe.nutrition.carbs },
                        { label: "Fats", value: recipe.nutrition.fats },
                        { label: "Fiber", value: recipe.nutrition.fiber }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-md p-3 text-center">
                            <p className="font-semibold text-sm text-gray-800">
                                {item.value}
                            </p>
                            <p className="text-xs text-gray-500">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="bg-green-50 border border-green-100 rounded-md p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                    💡 Cooking Tips
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                    {recipe.tips.map((tip, idx) => (
                        <li key={idx}>• {tip}</li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={async () => {
                        if (!recipe) return;

                        const res = await saveRecipe(recipe);
                        console.log(res);
                        if (res.success) {
                            setIsSuccess(true);
                            setTimeout(() => setIsSuccess(false), 3000); // auto-hide after 3s
                        }
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Save Recipe
                </button>
                <button className="flex-1 border py-2 rounded-md text-gray-600 hover:bg-gray-100">
                    New Recipe
                </button>
            </div>

        </div>
    )
}

export default RecipePanel