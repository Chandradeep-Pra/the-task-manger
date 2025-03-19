import React from 'react'
import { Button } from './ui/button'
import { Calendar } from 'lucide-react'

const AddTaskDialog = () => {
  return (
    <div className='px-2 flex flex-col gap-4 mt-4'>
        <div className='w-full p-2 rounded-md border'>
            Task Title
        </div>
        <div className='w-full p-2 rounded-md border md:h-40 h-30'>

        </div>
        <div className='flex md:w-full w-4/5 md:flex-row flex-col justify-between gap-4'>
            <div className=' w-full'>
                <span className='text-sm '>Task Category*</span>
                <div className='flex items-center gap-2'>
                    <Button className='px-4 py-1 rounded-full hover:bg-primary hover:text-white border font-semibold' variant="outline">Work</Button>
                    <Button className='px-4 py-1 rounded-full hover:bg-primary hover:text-white border font-semibold' variant="outline">Personal</Button>
                </div>
            </div>
            <div className=' w-full '>
                <span className='text-sm '>Due On*</span>
                <div className='w-full border rounded-md flex justify-between gap-6 p-2'>
                    <span>DD/MM/YY</span>
                    <Calendar />
                </div>
            </div>
            <div className=' w-full'>
                <span className='text-sm '>Task Status**</span>
                <div className='w-full border rounded-md flex justify-between p-2 gap-6'>
                    <span>Choose</span>
                </div>
            </div>
        </div>
        <div className='w-full'>
            <span>Attachment</span>
            <div className='rounded-md w-full text-center py-2 mt-2 border border-dotted'>
                Drop your files here or <a className='text-blue-700 underline'>Upload</a>
            </div>
        </div>
    </div>
  )
}

export default AddTaskDialog