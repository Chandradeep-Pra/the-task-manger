"use client";

import React, { useMemo, useCallback } from "react";
import TaskBoard from "./TaskBoard";
import { useTaskContext, TaskItem, TaskStatus } from "@/app/context/TaskContext";

const statusOrder = ["To-Do", "In-Progress", "Completed"] as const;

const BoardComponent = () => {
  const { filteredTasks, moveTask } = useTaskContext();

  const tasksByStatus = useMemo(() => {
    const buckets: Record<TaskStatus, TaskItem[]> = {
      "To-Do": [],
      "In-Progress": [],
      Completed: [],
    };
    filteredTasks.forEach((task) => {
      const statusKey = task.status as TaskStatus;
      if (!buckets[statusKey]) buckets[statusKey] = [];
      buckets[statusKey].push(task);
    });
    return buckets;
  }, [filteredTasks]);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, destinationStatus: "To-Do" | "In-Progress" | "Completed") => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      if (!taskId) return;

      const task = filteredTasks.find((t) => t.id === taskId);
      if (!task) return;
      if (task.status === destinationStatus) return;

      console.log("[onDrop - Board]", { taskId, destinationStatus });
      moveTask(taskId, destinationStatus);
    },
    [filteredTasks, moveTask]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full w-full">
      {statusOrder.map((status) => (
        <div
          key={status}
          className="flex-1"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, status)}
        >
          <TaskBoard
            title={status}
            color={status === "Completed" ? "bg-green-300" : status === "In-Progress" ? "bg-blue-300" : "bg-pink-300"}
            tasks={tasksByStatus[status] ?? []}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(BoardComponent);
