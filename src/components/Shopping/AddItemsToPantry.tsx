'use client'

import Button from '../ui/Button'
import { ShoppingCartIcon } from 'lucide-react'
import { moveToPantry } from '@/src/actions/shopping'
import { Dispatch, SetStateAction, useTransition, useState } from 'react'
import { Check } from "lucide-react"

const AddItemsToPantry = ({
    boughtItems,
    setBoughtItems
}: {
    boughtItems: string[]
    setBoughtItems: Dispatch<SetStateAction<string[]>>
}) => {
    const [isPending, startTransition] = useTransition()
    const [showSuccess, setShowSuccess] = useState(false)

    const handleClick = () => {
        if (boughtItems.length === 0) return

        startTransition(async () => {
            const res = await moveToPantry(boughtItems)

            if (res?.success) {
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 2500) // auto-hide
                setBoughtItems([])
            }
        })
    }

    return (
        <div className="relative">
            <Button
                variant='primary'
                size='md'
                icon={<ShoppingCartIcon />}
                disabled={boughtItems.length === 0 || isPending}
                onClick={handleClick}
                className='bg-blue-500 hover:bg-blue-600'
            >
                {isPending
                    ? 'Moving...'
                    : `Add to Pantry (${boughtItems.length})`}
            </Button>

             {showSuccess && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 z-50 animate-fade-in">
                    <span className="text-lg"><Check /></span>
                    <span>Items added successfully in Pantry</span>
                </div>
            )}
        </div>
    )
}

export default AddItemsToPantry