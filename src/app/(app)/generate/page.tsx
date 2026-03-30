import { Stars } from 'lucide-react'

const Generate = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-5">
            <div className="max-w-5xl mx-auto space-y-5">

                <div className='text-center pt-5'>
                    <div className='flex align-center justify-center'><Stars className="text-white bg-green-600 p-2 rounded-xl w-10 h-10" /></div>
                    <h1 className="text-2xl font-bold text-gray-800">AI Recipe Generator</h1>
                    <p className="text-sm text-gray-500">
                        Let AI create delicious recipes based on your ingredients
                    </p>
                </div> 
                <div>
                    <div>
                        {/* <Ingredients></Ingredients> */}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Generate
