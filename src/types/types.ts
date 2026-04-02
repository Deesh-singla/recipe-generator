
export type NavLink={
    name:string,
    href:string,
    icon:string
}

export type Item = {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
    category: string;
    expiry: string | null;
    lowStock: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

export type Query = {
    userId: string;
    category?: string;
    name?: string|{$regex:string,$options:string};
}

export type RecipeType = {
  title: string;
  description: string;
  cuisine: string;
  difficulty: string;
  diet: string[];
  time: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
    fiber: string;
  };
  tips: string[];
};