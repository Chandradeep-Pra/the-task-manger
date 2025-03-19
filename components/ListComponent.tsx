import React from "react";
import TaskHeader from "./TaskHeader";
import tasks from "@/data/tasks";
import TaskTable from "./TaskTable";

const ListComponent = () => {
  return (
    <div>
      <div className="h-[1px] bg-[#000000] opacity-10 mt-4 hidden md:block" />
      <TaskHeader />
      <TaskTable title="To-Do" color="bg-pink-300" tasks={tasks.filter((task) => task.status === "To-Do")} />
      <TaskTable title="In-Progress" color="bg-blue-300" tasks={tasks.filter((task) => task.status === "In-Progress")} />
      <TaskTable title="Completed" color="bg-green-300" tasks={tasks.filter((task) => task.status === "Completed")} />
    </div>
  );
};

export default ListComponent;
