import mongoose, { Schema, models } from "mongoose";

const ShoppingListSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            enum: [
                "Pieces",
                "Kilograms",
                "Grams",
                "Liters",
                "Milliliters",
                "Cups",
                "Tablespoons",
                "Teaspoons",
            ],
            required: true,
        },
        category: {
            type: String,
            enum: [
                "Vegetables",
                "Fruits",
                "Dairy",
                "Meat",
                "Grains",
                "Spices",
                "Other",
            ],
            default: "Other",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default models.shoppingList ||
    mongoose.model("shoppingList", ShoppingListSchema);