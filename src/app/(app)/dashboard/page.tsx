import Dashboard_Card from "@/src/components/Dashboard_Card"
import Action_Card from "@/src/components/Action_Card"
import { ChefHat, Utensils, Calendar } from "lucide-react"

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-5">
            <div className="max-w-5xl mx-auto space-y-5">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-sm text-gray-500">
                        Welcome back! Here&apos;s your cooking overview
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Dashboard_Card heading="Total Recipes" Icon={ChefHat} />
                    <Dashboard_Card heading="Pantry Items" Icon={Utensils} />
                    <Dashboard_Card heading="Meals This Week" Icon={Calendar} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Action_Card
                        title="Generate Recipe"
                        description="Create AI-powered recipes"
                        Icon={ChefHat}
                        href={'/generate'}
                    />
                    <Action_Card
                        title="Manage Pantry"
                        description="Add and track ingredients"
                        Icon={Utensils}
                        href={'/pantry'}
                    />
                </div>

            </div>
        </div>
    )
}

export default Page