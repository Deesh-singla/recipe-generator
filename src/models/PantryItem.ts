import mongoose, { Schema, models } from "mongoose";

const PantryItemSchema = new Schema(
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
        expiry: {
            type: Date,
        },
        lowStock: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        }
    },
    { timestamps: true }
);

export default models.PantryItem ||
    mongoose.model("PantryItem", PantryItemSchema);