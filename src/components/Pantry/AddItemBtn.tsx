'use client'
import { useState } from 'react'
import Button from '../ui/Button'
import { Plus } from 'lucide-react'
import AddItemForm from './AddItemForm'

const AddItem = () => {
    const [visible, setVisible] = useState(false);

    function handleSubmit() {
        setVisible(true);
    }

    function closeModal() {
        setVisible(false);
    }

    return (
        <div>
            <Button icon={<Plus />} variant="primary" size="md" onClick={handleSubmit} className='cursor-pointer w-full sm:w-auto'>
                Add Item
            </Button>

            {visible && (
                <AddItemForm closeModal={closeModal} />
            )}
        </div>
    )
}

export default AddItem