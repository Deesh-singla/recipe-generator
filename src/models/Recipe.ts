import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: String,
    description: String,
    cuisine: String,
    difficulty: String,
    diet: [String],
    time: String,
    servings: Number,
    ingredients: [String],
    instructions: [String],
    nutrition: {
        calories: String,
        protein: String,
        carbs: String,
        fats: String,
        fiber: String
    },
    tips: [String],
}, { timestamps: true });

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);