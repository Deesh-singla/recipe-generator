'use client'
import { deleteItem } from "@/src/actions/pantry";
import { Item } from "@/src/types/types";
import { Calendar, X } from "lucide-react";


const ItemCard = ({ item }: { item: Item }) => {

    let expiryText = "No expiry";
    let expiryClass = "text-gray-500";

    if (item.expiry) {
        const today = new Date();
        const expiryDate = new Date(item.expiry);

        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const date = expiryDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })

        if (diffDays < 0) {
            expiryText = `Expired: ${date}`;
            expiryClass = "text-red-500 font-medium";
        } else if (diffDays <= 2) {
            expiryText = `Expiring Soon: ${date}`;
            expiryClass = "text-yellow-600 font-medium";
        } else {
            expiryText = `Expires: ${date}`;
            expiryClass = "text-gray-500";
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-semibold text-gray-800">
                        {item.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {item.category}
                    </p>
                </div>

                <button className="text-gray-400 hover:text-red-500" onClick={() => deleteItem(item._id)}>
                    <X size={16} />
                </button>
            </div>

            <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">Quantity:</span>
                <span className="font-medium text-gray-800">
                    {item.quantity} {item.unit}
                </span>
            </div>

            <div className={`mt-2 flex items-center gap-2 text-xs ${expiryClass}`}>
                <Calendar size={14} />
                <span>{expiryText}</span>
            </div>

            {item.lowStock && (
                <div className="mt-3">
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md">
                        Running Low
                    </span>
                </div>
            )}
        </div>
    );
};

export default ItemCard;