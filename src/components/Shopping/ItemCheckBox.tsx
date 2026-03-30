'use client'

import { Dispatch, SetStateAction, useTransition } from 'react'
import { toggleItem } from '@/src/actions/shopping'
import { Item } from './ShoppingList'

const ItemCheckbox = ({
    id,
    checked,
    setBoughtItems,
    item
}: {
    id: string
    checked: boolean
    setBoughtItems: Dispatch<SetStateAction<string[]>>
    item: Item
}) => {

    const [isPending, startTransition] = useTransition()

    return (
        <input
            type="checkbox"
            defaultChecked={checked}
            disabled={isPending}
            onChange={(e) => {
                const isChecked = e.target.checked;

                startTransition(() => {
                    toggleItem(id, checked)
                });

                setBoughtItems(prev => {
                    if (isChecked) {
                        return [...prev, item._id];
                    } else {
                        return prev.filter(id => id !== item._id);
                    }
                });
            }}
            className="w-5 h-5 accent-green-500 cursor-pointer"
        />
    )
}

export default ItemCheckbox