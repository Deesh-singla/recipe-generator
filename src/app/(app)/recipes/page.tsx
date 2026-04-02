import RecipesPageClient from "@/src/components/recipes/RecipesPageClient";
import { fetchRecipes } from "@/src/lib/data";

export const dynamic = "force-dynamic";

const RecipesPage = async () => {
    const recipes = await fetchRecipes();

    return <RecipesPageClient recipes={recipes} />;
};

export default RecipesPage;
