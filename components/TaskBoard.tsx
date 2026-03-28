"use client";

import { Ellipsis, GripVertical } from "lucide-react";
import "react-slidedown/lib/slidedown.css";

interface TaskBoardProps {
  title: string;
  color: string;
  tasks: Array<{ id: string; title: string; category: string; dueOn: string; status: string }>;
}

const TaskBoard = ({ title, color, tasks }: TaskBoardProps) => {
  return (
    <div className="rounded-xl overflow-hidden mt-2 mb-4 w-full h-full bg-card border border-border px-2 py-4">
      <span className={`${color} py-1 px-2 rounded-sm`}>{title.toUpperCase()}</span>

      <div className="mt-4">
        {tasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No tasks</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("text/plain", task.id);
                event.dataTransfer.effectAllowed = "move";
              }}
              className="bg-popover rounded-md p-2 mt-2 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between">
                <span className="cursor-grab p-1 rounded hover:bg-muted/70" title="Drag to move">
                  <GripVertical size={14} />
                </span>
                <span className={`font-semibold ${title === "Completed" ? "line-through" : ""}`}>
                  {task.title}
                </span>
                <Ellipsis size={14} />
              </div>
              <div className="mt-2 text-xs flex items-center justify-between">
                <span className="capitalize">{task.category}</span>
                <span className="capitalize">{task.dueOn}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
