"use client";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export default function TaskFilters() {
  const [category, setCategory] = useState(""); // Task category
  const [dueDate, setDueDate] = useState(""); // Due date selection

  return (
    <div className="flex gap-4">
      {/* Task Category Select */}
      <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="rounded-full border border-gray-300 px-4 py-2">
          <SelectValue defaultValue={category} placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white border-0">
          <SelectGroup>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Due Date Select */}
      <Select onValueChange={(value) => setDueDate(value)}>
        <SelectTrigger className="rounded-full border border-gray-300 px-4 py-2">
          <SelectValue defaultValue={dueDate} placeholder="Due Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="decide-later">Decide Later</SelectItem>
            <SelectItem value="2024-12-30">30 Dec, 2024</SelectItem>
            <SelectItem value="2024-12-31">31 Dec, 2024</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
