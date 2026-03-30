import AddItemInList from '@/src/components/Shopping/AddItemInList'
import ShoppingList from '@/src/components/Shopping/ShoppingList'
import { fetchShoppingList } from '@/src/lib/data'

const Shopping = async () => {
    const list = await fetchShoppingList();

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-5">
            <div className="max-w-5xl mx-auto space-y-5">

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>

                    <div>
                        <h1 className='text-xl sm:text-2xl font-semibold'>Shopping List</h1>
                    </div>

                    <div className='w-full sm:w-auto'>
                        <AddItemInList />
                    </div>
                </div>

                <ShoppingList items={list} />

            </div>
        </div>
    )
}

export default Shopping