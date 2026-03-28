import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { useTaskContext } from "@/app/context/TaskContext";

const EditTaskDialog = ({ task, onClose }) => {
  const { updateTask } = useTaskContext();
  const [formState, setFormState] = useState({
    title: task.title,
    dueOn: task.dueOn,
    status: task.status,
    category: task.category,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formState.title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    updateTask({
      ...task,
      title: formState.title,
      dueOn: formState.dueOn,
      status: formState.status,
      category: formState.category,
    });

    setError("");
    onClose?.();
  };

  return (
    <div className="space-y-4 p-2">
      <Input name="title" value={formState.title} onChange={handleChange} className="w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          type="date"
          name="dueOn"
          value={formState.dueOn}
          onChange={handleChange}
          className="border rounded-md px-2 py-2"
        />
        <Select value={formState.status} onValueChange={(value) => setFormState((prev) => ({ ...prev, status: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To-Do">To-Do</SelectItem>
            <SelectItem value="In-Progress">In-Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formState.category} onValueChange={(value) => setFormState((prev) => ({ ...prev, category: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="work">work</SelectItem>
            <SelectItem value="personal">personal</SelectItem>
            <SelectItem value="other">other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default EditTaskDialog;
