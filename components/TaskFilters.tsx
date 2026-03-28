"use client";

import { useTaskContext } from "@/app/context/TaskContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const statuses = ["All", "To-Do", "In-Progress", "Completed"] as const;
const categories = ["All", "work", "personal", "other"] as const;

export default function TaskFilters() {
  const { filterStatus, setFilterStatus, filterCategory, setFilterCategory } = useTaskContext();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Status:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-3 py-1 rounded-full border border-border bg-popover text-foreground hover:bg-accent hover:text-accent-foreground transition">
              {filterStatus}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[10rem]">
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onSelect={() => setFilterStatus(status)}
                className={`rounded-sm ${filterStatus === status ? "bg-primary text-primary-foreground" : ""}`}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Category:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-3 py-1 rounded-full border border-border bg-popover text-foreground hover:bg-accent hover:text-accent-foreground transition">
              {filterCategory}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[10rem]">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onSelect={() => setFilterCategory(category)}
                className={`rounded-sm ${filterCategory === category ? "bg-primary text-primary-foreground" : ""}`}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
