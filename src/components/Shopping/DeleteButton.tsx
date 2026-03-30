'use client'

import { X } from 'lucide-react'
import { useTransition } from 'react'
import { deleteItem } from '@/src/actions/shopping'

const DeleteButton = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    deleteItem(id)
                })
            }}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
        >
            <X size={18} />
        </button>
    )
}

export default DeleteButton