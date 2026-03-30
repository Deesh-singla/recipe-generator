"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Grains",
    "Spices",
    "Other",
];

const FilterItems = () => {
    const [active, setActive] = useState("All");
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSubmit(cat: string) {
        setActive(cat);

        const params = new URLSearchParams(searchParams.toString());

        if (cat === "All") {
            params.delete("category");
        } else {
            params.set("category", cat);
        }

        router.push(`/pantry?${params.toString()}`);
    }

    const handleChange = useDebouncedCallback((str: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (str) {
            params.set("query", str);
        } else {
            params.delete("query");
        }

        router.push(`/pantry?${params.toString()}`);
    }, 300);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

                <div className="relative w-full sm:max-w-xs">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search ingredients..."
                        onChange={(e) => handleChange(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleSubmit(cat)}
                            className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition 
                                ${active === cat
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterItems;