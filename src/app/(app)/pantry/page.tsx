import AddItem from '@/src/components/Pantry/AddItemBtn';
import FilterItems from '@/src/components/Pantry/FilterItems';
import ItemCard from '@/src/components/Pantry/ItemCard';
import { fetchPantryItems } from '@/src/lib/data';
import { Item } from '@/src/types/types';

async function Pantry(props: {
    searchParams?: Promise<{
        query?: string;
        category?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    let cat: string = ''
    let ing: string = ''
    if (searchParams?.category) cat = searchParams.category;
    if (searchParams?.query) ing = searchParams.query;
    const items = await fetchPantryItems(cat, ing);
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-5">
            <div className="max-w-5xl mx-auto space-y-5">

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>

                    <div>
                        <h1 className='text-xl sm:text-2xl font-semibold'>Pantry</h1>
                        <p className='text-sm sm:text-base text-gray-600'>
                            Manage your ingredients and track expiry dates
                        </p>
                    </div>

                    <div className='w-full sm:w-auto'>
                        <AddItem />
                    </div>
                </div>

                <div>
                    <FilterItems />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item: Item, i: number) => (
                        <ItemCard key={i} item={item} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Pantry