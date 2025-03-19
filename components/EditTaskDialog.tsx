import React from 'react'
import { Input } from './ui/input'
import TextEditor from './TextEditor'

const EditTaskDialog = ({task}) => {
  return (
    <div className='w-full flex  border-t '>
        <div className=' w-full flex flex-col gap-4'>
            <Input placeholder={task.title} className='w-full rounded-md' />
            <TextEditor />
        </div>
        <div></div>
    </div>
  )
}

export default EditTaskDialog