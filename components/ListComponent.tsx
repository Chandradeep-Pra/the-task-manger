import React, { useMemo, useCallback } from "react";
import TaskHeader from "./TaskHeader";
import TaskTable from "./TaskTable";
import { useTaskContext } from "@/app/context/TaskContext";

const ListComponent = () => {
  const { filteredTasks, moveTask } = useTaskContext();
  const [dragOverLane, setDragOverLane] = React.useState<"To-Do" | "In-Progress" | "Completed" | null>(null);

  const todo = useMemo(() => filteredTasks.filter((task) => task.status === "To-Do"), [filteredTasks]);
  const inProgress = useMemo(() => filteredTasks.filter((task) => task.status === "In-Progress"), [filteredTasks]);
  const completed = useMemo(() => filteredTasks.filter((task) => task.status === "Completed"), [filteredTasks]);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, destinationStatus: "To-Do" | "In-Progress" | "Completed") => {
      event.preventDefault();
      setDragOverLane(null);
      const taskId = event.dataTransfer.getData("text/plain");
      if (!taskId) return;

      const task = filteredTasks.find((t) => t.id === taskId);
      if (!task) return;
      if (task.status === destinationStatus) return;

      moveTask(taskId, destinationStatus);
    },
    [filteredTasks, moveTask]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>, status: "To-Do" | "In-Progress" | "Completed") => {
    event.preventDefault();
    setDragOverLane(status);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverLane(null);
  }, []);

  return (
    <div>
      <div className="h-[1px] bg-border opacity-30 mt-4 hidden md:block" />
      <TaskHeader />
      <TaskTable
        title="To-Do"
        color="bg-pink-300"
        tasks={todo}
        isDragOver={dragOverLane === "To-Do"}
        onDrop={handleDrop}
        onDragOver={(event) => handleDragOver(event, "To-Do")}
        onDragLeave={handleDragLeave}
      />
      <TaskTable
        title="In-Progress"
        color="bg-blue-300"
        tasks={inProgress}
        isDragOver={dragOverLane === "In-Progress"}
        onDrop={handleDrop}
        onDragOver={(event) => handleDragOver(event, "In-Progress")}
        onDragLeave={handleDragLeave}
      />
      <TaskTable
        title="Completed"
        color="bg-green-300"
        tasks={completed}
        isDragOver={dragOverLane === "Completed"}
        onDrop={handleDrop}
        onDragOver={(event) => handleDragOver(event, "Completed")}
        onDragLeave={handleDragLeave}
      />
    </div>
  );
};

export default React.memo(ListComponent);

