import React from 'react'
import TaskBoard from './TaskBoard'
import tasks from '@/data/tasks'

const BoardComponent = () => {
  return (
    <div className='flex w-3/4  gap-4 h-full'>
      <TaskBoard title="To-Do" color="bg-pink-300" tasks={tasks.filter((task) => task.status === "To-Do")} />
      <TaskBoard title="In-Progress" color="bg-blue-300" tasks={tasks.filter((task) => task.status === "In-Progress")} />
      <TaskBoard title="Completed" color="bg-green-300" tasks={tasks.filter((task) => task.status === "Completed")} />
    </div>
  )
}

export default BoardComponent