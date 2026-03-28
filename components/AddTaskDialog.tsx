import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AddTaskDialogProps {
  formState: {
    title: string;
    description: string;
    dueOn: string;
    status: "To-Do" | "In-Progress" | "Completed";
    category: "work" | "personal" | "other";
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
}

const AddTaskDialog = ({ formState, onChange, error }: AddTaskDialogProps) => {
  return (
    <div className="px-2 flex flex-col gap-4 mt-4">
      <div>
        <label className="block text-sm font-medium mb-1">Task Title</label>
        <Input name="title" value={formState.title} onChange={onChange} placeholder="Enter title" className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={onChange}
          className="w-full border rounded-md p-2"
          rows={4}
          placeholder="Task description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Due On</label>
          <Input
            type="date"
            name="dueOn"
            value={formState.dueOn}
            onChange={onChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formState.category}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="work">work</option>
            <option value="personal">personal</option>
            <option value="other">other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formState.status}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default AddTaskDialog;