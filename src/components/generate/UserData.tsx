'use client'

import { useState } from "react"
import Ingredients from "./Ingredients"
import Preferences from "./Preferences"
import { Stars } from "lucide-react"
import { getResponseFromAi } from "@/src/actions/generate"
import { RecipeType } from "@/src/types/types"

type Props = {
    setRecipe: React.Dispatch<React.SetStateAction<RecipeType | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserData = ({ setRecipe, setLoading }: Props) => {

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [usePantryItems, setUsePantryItems] = useState(false);

    const [cuisine, setCuisine] = useState("Mexican");
    const [diet, setDiet] = useState<string[]>(["Vegetarian"]);
    const [servings, setServings] = useState(4);
    const [time, setTime] = useState("Medium (30-60 min)");

    const handleGenerate = async () => {
        try {
            setLoading(true);

            const data = {
                ingredients,
                usePantryItems,
                cuisine,
                diet,
                servings,
                time
            };

            const res = await getResponseFromAi(data);

            setRecipe(res);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <Ingredients
                ingredients={ingredients}
                setIngredients={setIngredients}
                usePantryItems={usePantryItems}
                setUsePantryItems={setUsePantryItems}
            />

            <Preferences
                cuisine={cuisine}
                setCuisine={setCuisine}
                diet={diet}
                setDiet={setDiet}
                servings={servings}
                setServings={setServings}
                time={time}
                setTime={setTime}
            />

            <button
                onClick={handleGenerate}
                className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
                <Stars className="w-5 h-5" />
                <span>Generate Recipe</span>
            </button>

        </div>
    )
}

export default UserData