'use client'
import { useState } from 'react'
import DeleteButton from './DeleteButton'
import ItemCheckbox from './ItemCheckBox'
import AddItemsToPantry from './AddItemsToPantry'

export type Item = {
    _id: string
    name: string
    quantity: number
    unit: string
    category: string
    checked: boolean
}

const categoryOptions = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Grains",
    "Spices",
    "Other"
]

const ShoppingList = ({ items }: { items: Item[] }) => {
    const [boughtItems, setBoughtItems] = useState<string[]>([]);
    console.log(boughtItems);

    const groupedItems = categoryOptions.map((category) => ({
        category,
        items: items
            .filter((item) => item.category === category)
            .sort((a, b) => Number(a.checked) - Number(b.checked))
    })).filter(group => group.items.length > 0)

    return (
        <div className="space-y-4 sm:space-y-5">

            <AddItemsToPantry boughtItems={boughtItems} setBoughtItems={setBoughtItems} />

            {groupedItems.map((group) => (
                <div
                    key={group.category}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                    <div className="px-4 py-2 sm:px-5 sm:py-3 bg-gray-100 text-sm sm:text-base font-semibold text-gray-700">
                        {group.category}
                    </div>

                    <div>
                        {group.items.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 border-t first:border-t-0"
                            >
                                <ItemCheckbox
                                    id={item._id}
                                    checked={item.checked}
                                    setBoughtItems={setBoughtItems}
                                    item={item}
                                />

                                <div className="flex flex-col flex-1 min-w-0">

                                    <span
                                        className={`text-sm sm:text-base font-medium truncate ${item.checked
                                            ? "line-through text-gray-400"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        {item.name}
                                    </span>

                                    <span className="text-xs sm:text-sm text-gray-500">
                                        {item.quantity} {item.unit}
                                    </span>
                                </div>
                                <DeleteButton id={item._id} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ShoppingList