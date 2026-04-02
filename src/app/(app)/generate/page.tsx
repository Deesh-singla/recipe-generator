'use client'

import { useState } from "react"
import UserData from '@/src/components/generate/UserData'
import RecipePanel from '@/src/components/generate/RecipePanel'
import { Stars } from 'lucide-react'
import { RecipeType } from "@/src/types/types"



const Generate = () => {

    const [recipe, setRecipe] = useState<RecipeType | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className='text-center'>
                    <div className='flex justify-center mb-2'>
                        <Stars className="text-white bg-green-600 p-2 rounded-xl w-10 h-10 shadow-md" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        AI Recipe Generator
                    </h1>
                    <p className="text-sm text-gray-500">
                        Let AI create delicious recipes based on your ingredients
                    </p>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <UserData setRecipe={setRecipe} setLoading={setLoading} />
                    <RecipePanel recipe={recipe} loading={loading} />
                </div>

            </div>
        </div>
    )
}

export default Generate