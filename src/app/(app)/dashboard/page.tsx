import Dashboard_Card from "@/src/components/Dashboard_Card"
import Action_Card from "@/src/components/Action_Card"
import { fetchDashboardStats } from "@/src/lib/data"
import { AlertTriangle, ChefHat, ClipboardList, Refrigerator, Sparkles } from "lucide-react"

const Page = async () => {
    const stats = await fetchDashboardStats();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_#f8fffb_0%,_#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-6">
                <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
                    <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.35fr_0.9fr] lg:px-8">
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                                <Sparkles size={16} />
                                Kitchen overview
                            </div>

                            <div>
                                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900">
                                    Plan meals faster with your pantry, recipes, and shopping list in one place.
                                </h1>
                                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
                                    Keep an eye on what you already have, what needs restocking,
                                    and what recipes are ready to cook next.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Action_Card
                                    title="Generate Recipe"
                                    description="Create a fresh AI recipe from your ingredients."
                                    Icon={ChefHat}
                                    href={'/generate'}
                                    badge="AI"
                                />
                                <Action_Card
                                    title="Browse Recipes"
                                    description="View, search, and clean up your saved recipe collection."
                                    Icon={ClipboardList}
                                    href={'/recipes'}
                                    badge={`${stats.totalRecipes} saved`}
                                />
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-6 text-white shadow-lg">
                            <p className="text-sm font-medium text-emerald-50/90">This week at a glance</p>
                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                                    <p className="text-3xl font-bold">{stats.totalRecipes}</p>
                                    <p className="mt-1 text-sm text-emerald-50/90">saved recipes</p>
                                </div>
                                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                                    <p className="text-3xl font-bold">{stats.shoppingItems}</p>
                                    <p className="mt-1 text-sm text-emerald-50/90">shopping items</p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                                <p className="text-sm text-emerald-50/90">Restock reminder</p>
                                <p className="mt-2 text-xl font-semibold">
                                    {stats.lowStockItems > 0
                                        ? `${stats.lowStockItems} pantry item${stats.lowStockItems === 1 ? "" : "s"} running low`
                                        : "Your pantry is looking well stocked"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Dashboard_Card
                        heading="Total Recipes"
                        value={stats.totalRecipes}
                        description="Recipes you have already saved from previous generations."
                        Icon={ChefHat}
                        tone="green"
                    />
                    <Dashboard_Card
                        heading="Pantry Items"
                        value={stats.pantryItems}
                        description="Ingredients currently available in your kitchen inventory."
                        Icon={Refrigerator}
                        tone="blue"
                    />
                    <Dashboard_Card
                        heading="Shopping List"
                        value={stats.shoppingItems}
                        description="Items still waiting to be purchased."
                        Icon={ClipboardList}
                        tone="amber"
                    />
                    <Dashboard_Card
                        heading="Low Stock"
                        value={stats.lowStockItems}
                        description="Pantry items marked as running low."
                        Icon={AlertTriangle}
                        tone="rose"
                    />
                </div>

                <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Recent Recipes</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest saved dishes are ready to reopen from the recipes page.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-4">
                            {stats.recentRecipes.length > 0 ? (
                                stats.recentRecipes.map((recipe: { _id: string; title: string; cuisine: string; difficulty: string; time: string; }) => (
                                    <div
                                        key={recipe._id}
                                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-900">{recipe.title}</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {recipe.cuisine} · {recipe.difficulty} · {recipe.time}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                            Ready
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-10 text-center">
                                    <p className="font-medium text-gray-700">No saved recipes yet</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Generate and save a recipe to make this dashboard feel alive.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Jump into the next useful part of your cooking workflow.
                        </p>

                        <div className="mt-5 grid gap-4">
                            <Action_Card
                                title="Manage Pantry"
                                description="Add ingredients, update stock, and mark low inventory items."
                                Icon={Refrigerator}
                                href={'/pantry'}
                                badge={`${stats.pantryItems} items`}
                            />
                            <Action_Card
                                title="Open Shopping List"
                                description="Review missing ingredients before your next grocery run."
                                Icon={ClipboardList}
                                href={'/shopping'}
                                badge={`${stats.shoppingItems} pending`}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page
