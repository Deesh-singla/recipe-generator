'use client'

type PreferencesProps = {
    cuisine: string;
    setCuisine: React.Dispatch<React.SetStateAction<string>>;
    diet: string[];
    setDiet: React.Dispatch<React.SetStateAction<string[]>>;
    servings: number;
    setServings: React.Dispatch<React.SetStateAction<number>>;
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
};

const Preferences = ({
    cuisine,
    setCuisine,
    diet,
    setDiet,
    servings,
    setServings,
    time,
    setTime
}: PreferencesProps) => {

    const diets = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];

    const toggleDiet = (item: string) => {
        setDiet((prev: string[]) =>
            prev.includes(item)
                ? prev.filter(d => d !== item)
                : [...prev, item]
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border-gray-200 p-5 space-y-5">

            <h2 className="text-lg font-semibold text-gray-800">Preferences</h2>

            {/* Cuisine */}
            <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full border-2 border-green-500 rounded-md px-3 py-2"
            >
                <option>Mexican</option>
                <option>Indian</option>
                <option>Italian</option>
                <option>Chinese</option>
            </select>

            {/* Diet */}
            <div className="flex flex-wrap gap-2">
                {diets.map(item => (
                    <button
                        key={item}
                        onClick={() => toggleDiet(item)}
                        className={`px-3 py-1 rounded-full text-sm
                            ${diet.includes(item)
                                ? "bg-green-600 text-white"
                                : "bg-gray-100"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div>
                <p>Servings: {servings}</p>
                <input
                    type="range"
                    min="1"
                    max="12"
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="w-full accent-green-600"
                />
            </div>

            <div className="flex gap-2">
                {["Quick (<30 min)", "Medium (30-60 min)", "Long (>60min)"].map(t => (
                    <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`flex-1 py-2 rounded-md
                            ${time === t ? "bg-green-600 text-white" : "bg-gray-100"}
                        `}
                    >
                        {t}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default Preferences