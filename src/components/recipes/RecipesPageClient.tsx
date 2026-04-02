"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
    ChevronDown,
    ChefHat,
    Clock3,
    Search,
    Users,
    X,
} from "lucide-react";
import { SavedRecipe } from "@/src/types/types";
import DeleteRecipeButton from "./DeleteRecipeButton";

type Props = {
    recipes: SavedRecipe[];
};

function truncate(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getUniqueValues(recipes: SavedRecipe[], key: "cuisine" | "difficulty") {
    return [...new Set(recipes.map((recipe) => recipe[key]).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
    );
}

function getDietTagClass(tag: string) {
    const value = tag.toLowerCase();

    if (value.includes("vegetarian") || value.includes("vegan")) {
        return "bg-emerald-100 text-emerald-700";
    }

    if (value.includes("gluten")) {
        return "bg-violet-100 text-violet-700";
    }

    if (value.includes("dairy")) {
        return "bg-fuchsia-100 text-fuchsia-700";
    }

    if (value.includes("protein")) {
        return "bg-sky-100 text-sky-700";
    }

    return "bg-amber-100 text-amber-700";
}

export default function RecipesPageClient({ recipes }: Props) {
    const [search, setSearch] = useState("");
    const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
    const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(null);

    const deferredSearch = useDeferredValue(search);
    const cuisineOptions = useMemo(() => getUniqueValues(recipes, "cuisine"), [recipes]);
    const difficultyOptions = useMemo(() => getUniqueValues(recipes, "difficulty"), [recipes]);

    const filteredRecipes = useMemo(() => {
        const query = deferredSearch.trim().toLowerCase();

        return recipes.filter((recipe) => {
            const matchesSearch =
                query.length === 0 ||
                recipe.title.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.cuisine.toLowerCase().includes(query) ||
                recipe.diet.some((item) => item.toLowerCase().includes(query));

            const matchesCuisine =
                selectedCuisine === "All Cuisines" || recipe.cuisine === selectedCuisine;

            const matchesDifficulty =
                selectedDifficulty === "All Difficulties" ||
                recipe.difficulty === selectedDifficulty;

            return matchesSearch && matchesCuisine && matchesDifficulty;
        });
    }, [deferredSearch, recipes, selectedCuisine, selectedDifficulty]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">My Recipes</h1>
                    <p className="mt-2 text-base text-gray-500">
                        Your collection of saved recipes
                    </p>
                </div>

                <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <label className="relative flex-1">
                            <Search
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search recipes..."
                                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            />
                        </label>

                        <label className="relative min-w-[180px]">
                            <select
                                value={selectedCuisine}
                                onChange={(event) => setSelectedCuisine(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            >
                                <option>All Cuisines</option>
                                {cuisineOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                        </label>

                        <label className="relative min-w-[180px]">
                            <select
                                value={selectedDifficulty}
                                onChange={(event) => setSelectedDifficulty(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            >
                                <option>All Difficulties</option>
                                {difficultyOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                        </label>
                    </div>
                </section>

                <p className="text-sm font-medium text-gray-500">
                    Showing {filteredRecipes.length} of {recipes.length} recipes
                </p>

                {filteredRecipes.length > 0 ? (
                    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredRecipes.map((recipe) => (
                            <article
                                key={recipe._id}
                                className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100">
                                    <div className="rounded-full bg-white/50 p-5 backdrop-blur-sm">
                                        <ChefHat className="h-14 w-14 text-emerald-700" strokeWidth={1.8} />
                                    </div>
                                </div>

                                <div className="space-y-4 p-5">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold leading-tight text-gray-900">
                                            {recipe.title}
                                        </h2>
                                        <p className="text-sm leading-6 text-gray-600">
                                            {truncate(recipe.description, 110)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                            {recipe.cuisine}
                                        </span>
                                        <span className="rounded-md bg-lime-100 px-2.5 py-1 text-xs font-medium text-lime-700">
                                            {recipe.difficulty}
                                        </span>
                                        {recipe.diet.map((tag) => (
                                            <span
                                                key={`${recipe._id}-${tag}`}
                                                className={`rounded-md px-2.5 py-1 text-xs font-medium ${getDietTagClass(tag)}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Clock3 size={16} />
                                            <span>{recipe.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users size={16} />
                                            <span>{recipe.servings} servings</span>
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            {recipe.nutrition.calories}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedRecipe(recipe)}
                                            className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                                        >
                                            View Recipe
                                        </button>
                                        <DeleteRecipeButton id={recipe._id} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                            <ChefHat className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">No recipes found</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Try adjusting your search or filters to see more saved recipes.
                        </p>
                    </section>
                )}
            </div>

            {selectedRecipe && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-900/50 px-4 py-10">
                    <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {selectedRecipe.title}
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    {selectedRecipe.description}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedRecipe(null)}
                                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                aria-label="Close recipe details"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6 p-6">
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                    {selectedRecipe.cuisine}
                                </span>
                                <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-medium text-lime-700">
                                    {selectedRecipe.difficulty}
                                </span>
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                                    {selectedRecipe.time}
                                </span>
                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                    {selectedRecipe.servings} servings
                                </span>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                                <section>
                                    <h3 className="text-lg font-semibold text-gray-900">Ingredients</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                        {selectedRecipe.ingredients.map((item, index) => (
                                            <li key={`${selectedRecipe._id}-ingredient-${index}`} className="flex gap-3">
                                                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Nutrition (per serving)
                                    </h3>
                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                        {[
                                            ["Calories", selectedRecipe.nutrition.calories],
                                            ["Protein", selectedRecipe.nutrition.protein],
                                            ["Carbs", selectedRecipe.nutrition.carbs],
                                            ["Fats", selectedRecipe.nutrition.fats],
                                            ["Fiber", selectedRecipe.nutrition.fiber],
                                        ].map(([label, value]) => (
                                            <div
                                                key={label}
                                                className="rounded-2xl bg-gray-50 px-4 py-3"
                                            >
                                                <p className="font-semibold text-gray-900">{value}</p>
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    {label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <section>
                                <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
                                <div className="mt-3 space-y-3">
                                    {selectedRecipe.instructions.map((step, index) => (
                                        <div
                                            key={`${selectedRecipe._id}-instruction-${index}`}
                                            className="flex gap-3 rounded-2xl bg-gray-50 p-4"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
                                                {index + 1}
                                            </div>
                                            <p className="text-sm leading-6 text-gray-600">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {selectedRecipe.tips.length > 0 && (
                                <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                                    <h3 className="text-lg font-semibold text-emerald-900">Cooking Tips</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-emerald-800">
                                        {selectedRecipe.tips.map((tip, index) => (
                                            <li key={`${selectedRecipe._id}-tip-${index}`}>{tip}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
