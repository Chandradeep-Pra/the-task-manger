"use client";

import React, { useState } from "react";
import { Ellipsis } from "lucide-react";
import { useTaskContext } from "@/app/context/TaskContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import EditTaskDialog from "./EditTaskDialog";
import Edit from "@/public/icons/edit.svg";
import Delete from "@/public/icons/delete.svg";

interface TaskActionProps {
  task: import("@/app/context/TaskContext").TaskItem;
}

const TaskAction = ({ task }: TaskActionProps) => {
  const { deleteTask } = useTaskContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 text-muted-foreground hover:text-primary">
            <Ellipsis size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-1 -top-2 rounded-xl px-4 bg-popover text-popover-foreground shadow-lg border border-border">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="inline-flex gap-2 items-center hover:scale-110 cursor-pointer">
                <Edit />
                <span>Edit</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader />
              <EditTaskDialog task={task} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
          <button
            className="inline-flex gap-2 items-center hover:scale-110 cursor-pointer text-destructive"
            onClick={() => deleteTask(task.id)}
          >
            <Delete />
            <span>Delete</span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskAction;
