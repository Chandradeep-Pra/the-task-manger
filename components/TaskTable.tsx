"use client";

import { Calendar, ChevronDown, ChevronUp, Ellipsis, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import VerticalGrip from "@/public/icons/verticalGrip.svg";
import RightTick from "@/public/icons/rightTick.svg";
import Enter from "@/public/icons/enter.svg";
import { Button } from "./ui/button";
import TaskAction from "./TaskAction";

const TaskTable = ({ title, color, tasks }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    dueOn: "",
    status: "",
    category: "",
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="rounded-2xl overflow-hidden mt-2 mb-4 bg-[#F1F1F1]">
      {/* Header Section */}
      <div
        className={`flex justify-between items-center cursor-pointer ${color} py-2 px-4`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">
          {title} ({tasks.length})
        </h2>
        <button
          className={`text-xl transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <ChevronUp />
        </button>
      </div>

      {/* SlideDown Animation for Expand/Collapse */}
      <SlideDown className="duration-100">
        {isOpen && (
          <table className="w-full mt-2 border-collapse text-sm mx-2">
            <tbody>
              {title == "To-Do" && (
                <tr
                  className="hidden md:table-row    border-b border-gray-200 cursor-pointer"
                  onClick={() => setShowNewTask(!showNewTask)}
                >
                  <td className="p-2 flex gap-1 items-center ml-20 hover:bg-primary/20 rounded-full transition-colors duration-300  w-1/10">
                    <Plus className="text-primary" />
                    <span>ADD TASK</span>
                  </td>
                </tr>
              )}

              {showNewTask && (
                <tr className="border-b border-gray-20 ">
                  <td className="p-2 flex flex-col  gap-2 w-full  ml-20">
                    <div className="w-full flex gap-4">
                      <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        className="border p-1 rounded-full w-1/4"
                      />
                      <div className="rounded-full ml-4 flex items-center gap-2 text-gray-500 border border-gray-300 px-4 py-2">
                        <Calendar size={16} />
                        <span>Add date</span>
                      </div>
                      <div className="w-1/6 flex justify-center items-center">

                      <PlusCircle className="self-center justify-center text-gray-500" />
                      </div>
                      <div className="w-1/6 flex justify-center items-center">

                      <PlusCircle className="self-center justify-center text-gray-500" />
                      </div>
                      {/* <select
                        name="status"
                        value={newTask.status}
                        onChange={handleInputChange}
                        className="border p-1 rounded w-1/6"
                      >
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select> */}
                      {/* <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={newTask.category}
                        onChange={handleInputChange}
                        className="border p-1 rounded w-1/6"
                      /> */}
                    </div>
                    <div className="flex gap-2 items-center">
                       <Button variant="default" className="p-2 flex items-center gap-2 rounded-full" ><span>ADD</span> <Enter  /> </Button>
                       <span className="font-semibold">CANCEL</span>    
                    </div>
                  </td>
                </tr>
              )}

              {tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-200 flex items-center" draggable
                >
                  <td className="p-2 flex items-center gap-2 md:w-1/3 w-full">
                    <input
                      type="checkbox"
                      className="accent-[var(--color-primary)]"
                    />
                    <div className="hidden md:block cursor-grab">
                      <VerticalGrip />
                    </div>
                    <div
                      className={
                        title == "Completed"
                          ? "text-success-green"
                          : "text-[#A7A7A7]"
                      }
                    >
                      <RightTick />
                    </div>
                    <span className={`${title == "Completed" && "line-through"}`}>{task.title}</span>
                  </td>
                  <td className="p-2 w-1/6 hidden md:block">{task.dueOn}</td>
                  <td className="p-2 w-1/6 hidden md:block   rounded px-2 text-xs">
                  <span className="bg-[#DDDADD] p-2 rounded-sm text-md font-semibold">

                    {task.status.toUpperCase()}
                  </span>
                  </td>
                  <td className="p-2 w-1/6 hidden md:block capitalize">{task.category}</td>
                  <td className=" hidden  mr-10 w-1/6 md:flex justify-end"> <TaskAction task={task} /> </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SlideDown>
    </div>
  );
};

export default TaskTable;
