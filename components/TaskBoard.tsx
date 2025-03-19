"use client";

import { Ellipsis } from "lucide-react";

import "react-slidedown/lib/slidedown.css";

const TaskBoard = ({ title, color, tasks }) => {
  return (
    <div className="rounded-xl overflow-hidden mt-2 mb-4 w-full h-full bg-[#F1F1F1] px-2 py-4">
      {/* Header Section */}
      <span className={`${color} py-1 px-2 rounded-sm`}>
        {title.toUpperCase()}
      </span>

      <div className="mt-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-md p-2 mt-2" draggable>
            <div className="flex items-center justify-between">
              <span
                className={`font-semibold ${
                  title == "Completed" && "line-through"
                } `}
              >
                {task.title}
              </span>
              <Ellipsis size={14} />
            </div>
            <div className="mt-[40px] text-xs flex items-center justify-between">
              <span className="capitalize">{task.category}</span>
              <span className="capitalize">{task.dueOn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
