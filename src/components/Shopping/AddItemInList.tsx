'use client'
import { useState } from 'react'
import Button from '../ui/Button'
import { Plus } from 'lucide-react'
import AddItemForm from './AddItemForm'

const AddItemInList = () => {
    const [visible, setVisible] = useState(false)

    function handleOpen() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
    }

    return (
        <div>
            <Button
                icon={<Plus />}
                variant="primary"
                size="md"
                onClick={handleOpen}
                className="cursor-pointer w-full sm:w-auto"
            >
                Add Item
            </Button>

            {visible && (
                <AddItemForm closeModal={closeModal} />
            )}
        </div>
    )
}

export default AddItemInList