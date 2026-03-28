"use client";

import { GripVertical, ChevronUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import TaskAction from "./TaskAction";
import { useTaskContext } from "@/app/context/TaskContext";

interface TaskTableProps {
  title: "To-Do" | "In-Progress" | "Completed";
  color: string;
  tasks: Array<{ id: string; title: string; description?: string; category: string; dueOn: string; status: string; attachment?: string | null }>; 
  onDrop: (event: React.DragEvent<HTMLDivElement>, destinationStatus: "To-Do" | "In-Progress" | "Completed") => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  isDragOver: boolean;
}

const TaskTable = ({ title, color, tasks, onDrop, onDragOver, onDragLeave, isDragOver }: TaskTableProps) => {
  const { addTask, toggleComplete } = useTaskContext();
  const [isOpen, setIsOpen] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    dueOn: "",
    status: "To-Do",
    category: "work",
  });
  const [error, setError] = useState("");

  const count = useMemo(() => tasks.length, [tasks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: "status" | "category", value: string) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTask = async () => {
    const { title, dueOn } = newTask;
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    if (!dueOn.trim()) {
      setError("Due date is required");
      return;
    }
    const result = addTask({
      title: newTask.title,
      description: "",
      category: newTask.category,
      dueOn: newTask.dueOn,
      status: title === "" ? "To-Do" : newTask.status,
      attachment: null,
    });

    if (!result.success) {
      setError(result.message || "Failed to add task");
      return;
    }

    setError("");
    setNewTask({ title: "", dueOn: "", status: "To-Do", category: "work" });
  };

  return (
    <div className="rounded-2xl overflow-hidden mt-2 mb-4 bg-card border border-border">
      <div
        className={`flex justify-between items-center cursor-pointer ${color} py-2 px-4`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">
          {title} ({count})
        </h2>
        <button
          className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
        >
          <ChevronUp />
        </button>
      </div>

      <SlideDown className="duration-100">
        {isOpen && (
          <div className="p-3">
            {title === "To-Do" && (
              <div className="mb-3 rounded-xl border border-border bg-popover p-3">
                <div className="flex flex-nowrap gap-2 items-center overflow-x-auto">
                  <input
                    name="title"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className="border rounded-lg px-3 py-2 flex-1 min-w-[180px]"
                  />
                  <Input
                    type="date"
                    name="dueOn"
                    value={newTask.dueOn}
                    onChange={handleInputChange}
                    className="rounded-lg"
                  />
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To-Do">To-Do</SelectItem>
                      <SelectItem value="In-Progress">In-Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={newTask.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">work</SelectItem>
                      <SelectItem value="personal">personal</SelectItem>
                      <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddTask} className="rounded-full px-4 py-2">
                    Add
                  </Button>
                </div>
                {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
              </div>
            )}

            <div className="overflow-auto">
              <div className="w-full min-w-[600px] border border-border rounded-lg text-sm">
                <div className="grid grid-cols-[5fr_1fr_1fr_1fr_2fr] bg-popover text-muted-foreground font-semibold text-xs md:text-sm">
                  <div className="p-2">Task</div>
                  <div className="p-2 hidden md:block">Due</div>
                  <div className="p-2 hidden md:block">Status</div>
                  <div className="p-2 hidden md:block">Category</div>
                  <div className="p-2 text-right">Actions</div>
                </div>
                <div
                  onDragOver={(event) => onDragOver(event)}
                  onDrop={(event) => onDrop(event, title)}
                  onDragLeave={onDragLeave}
                  className={`flex flex-col rounded-lg transition-all ${isDragOver ? "ring-2 ring-primary/70 ring-offset-2" : ""}`}
                >
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", task.id);
                        event.dataTransfer.effectAllowed = "move";
                      }}
                      className="grid grid-cols-[5fr_1fr_1fr_1fr_2fr] gap-0 border-b border-border bg-background dark:bg-input/40 transition-all hover:bg-muted/10"
                    >
                      <div className="p-2 flex items-center gap-2">
                        <span className="cursor-grab p-1 rounded hover:bg-muted/70 dark:hover:bg-muted/50" title="Drag to move">
                          <GripVertical size={16} />
                        </span>
                        <input
                          type="checkbox"
                          checked={task.status === "Completed"}
                          onChange={() => toggleComplete(task.id)}
                          className="accent-primary"
                        />
                        <span className={task.status === "Completed" ? "line-through" : ""}>{task.title}</span>
                      </div>
                      <div className="p-2 hidden md:block">{task.dueOn}</div>
                      <div className="p-2 hidden md:block">{task.status}</div>
                      <div className="p-2 hidden md:block capitalize">{task.category}</div>
                      <div className="p-2 text-right flex justify-end items-center">
                        <TaskAction task={task} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </SlideDown>
    </div>
  );
};

export default TaskTable;

