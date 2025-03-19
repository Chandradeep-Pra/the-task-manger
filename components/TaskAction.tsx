import { Ellipsis } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import Edit from "@/public/icons/edit.svg";
import Delete from "@/public/icons/delete.svg";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import EditTaskDialog from "./EditTaskDialog";

const TaskAction = ({task}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-1 -top-2 rounded-xl px-4">
          <Dialog>
            <DialogTrigger asChild>
              <span className="inline-flex gap-2 items-center hover:scale-110 cursor-pointer">
                <Edit />
                <span>Edit</span>
              </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader ></DialogHeader>
              <EditTaskDialog task={task} />
            </DialogContent>
          </Dialog>
          <span className="inline-flex gap-2 items-center hover:scale-110 cursor-pointer text-[#DA2F2F]">
            <Delete />
            <span>Delete</span>
          </span>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskAction;
