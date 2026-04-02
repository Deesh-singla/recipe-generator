'use server'
import { GoogleGenAI } from "@google/genai";
import PantryItem from "../models/PantryItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";

type Data = {
  ingredients: string[];
  usePantryItems: boolean;
  cuisine: string;
  diet: string[];
  servings: number;
  time: string;
};

export async function Get(data: Data) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("session not found");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
    if (data.usePantryItems) {
      const pantryItems = await PantryItem
        .find({ userId: new mongoose.Types.ObjectId(session.user.id) })
        .select("name -_id")
        .lean();

      const pantryNames = pantryItems.map(i => i.name);
      console.log(pantryNames);

      data.ingredients.push(...pantryNames);
    }
    const prompt = `
You are a professional chef AI.

Generate a recipe based on the following user input:

Ingredients: ${data.ingredients.join(", ")}
Use pantry items: ${data.usePantryItems}
Cuisine: ${data.cuisine}
Diet: ${data.diet.join(", ")}
Servings: ${data.servings}
Cooking time preference: ${data.time}

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT include any explanation or extra text.
- Follow the exact structure below.

{
  "title": "Recipe name",
  "description": "Short appealing description",
  "cuisine": "Cuisine type",
  "difficulty": "Easy | Medium | Hard",
  "diet": ["Vegetarian"],
  "time": "40 mins",
  "servings": 4,
  "ingredients": [
    "350g pasta",
    "2 tbsp olive oil"
  ],
  "instructions": [
    "Step 1...",
    "Step 2..."
  ],
  "nutrition": {
    "calories": "625 kcal",
    "protein": "20g",
    "carbs": "92g",
    "fats": "14g",
    "fiber": "10g"
  },
  "tips": [
    "Tip 1...",
    "Tip 2..."
  ]
}
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL!,
      contents: prompt,
    });

    const text = response.text;

    const cleaned = text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned!);

    return parsed;

  } catch (err) {
    console.log(err);
    throw new Error('internal server error');
  }
}