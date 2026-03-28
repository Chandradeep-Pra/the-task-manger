"use client";

import { ChangeEvent, useState } from "react";

import IcoListView from "@/public/icons/IcoList.svg";
import IcoBoardView from "@/public/icons/IcoBoard.svg";
import ListComponent from "@/components/ListComponent";
import BoardComponent from "@/components/BoardComponent";
import { useTaskContext } from "@/app/context/TaskContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskFilters from "@/components/TaskFilters";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTaskDialog from "@/components/AddTaskDialog";

// import {ListViewIco} from "@/public/icons/IcoList.svg"

export default function Dashboard() {
  const { theme, setTheme, addTask, toast } = useTaskContext();
  const [view, setView] = useState("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  type AddTaskForm = {
    title: string;
    description: string;
    dueOn: string;
    status: "To-Do" | "In-Progress" | "Completed";
    category: "work" | "personal" | "other";
  };

  const [formState, setFormState] = useState<AddTaskForm>({
    title: "",
    description: "",
    dueOn: "",
    status: "To-Do",
    category: "work",
  });
  const [error, setError] = useState("");

  const handleDialogChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateTask = () => {
    const result = addTask({
      title: formState.title,
      description: formState.description,
      dueOn: formState.dueOn,
      status: formState.status,
      category: formState.category,
      attachment: null,
    });

    if (!result.success) {
      setError(result.message ?? "Failed to create task");
      return;
    }

    setError("");
    setDialogOpen(false);
    setFormState({ title: "", description: "", dueOn: "", status: "To-Do", category: "work" });
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setError("");
  };

  return (
    <div className="font-primary px-0">
      {toast && (
        <div className="fixed top-4 right-4 z-50 w-auto max-w-sm animate-fade-in rounded-lg p-3 shadow-xl border border-border bg-card text-foreground">
          <p className={`text-sm font-medium ${toast.type === "success" ? "text-green-500" : toast.type === "error" ? "text-red-500" : "text-blue-500"}`}>
            {toast.message}
          </p>
        </div>
      )}
      {/* View Switch */}
      <div className="w-full md:flex gap-4 items-center hidden px-4 py-2 text-muted-foreground">
        <span
          className={`flex items-center gap-1 cursor-pointer ${
            view != "list" && "text-muted-foreground"
          }`}
          onClick={() => setView("list")}
        >
          {" "}
          <IcoListView className="h-4 w-4" /> <span>List</span>{" "}
        </span>
        <span
          className={`flex items-center gap-1 ${
            view != "board" && "text-muted-foreground"
          } cursor-pointer`}
          onClick={() => setView("board")}
        >
          {" "}
          <IcoBoardView className="h-4 w-4" /> <span>Board</span>{" "}
        </span>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="ml-auto rounded-full border px-3 py-1 text-sm"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      <div className="h-screen p-4">
        <div className="flex justify-between  py-2">
          <div className="md:flex gap-2 items-center hidden  w-full">
            <span>Filter by:</span>
            <TaskFilters />
          </div>
          <div className="flex flex-col-reverse md:flex-row  w-full justify-end items-end md:items-center gap-2">
            <SearchBar />
            <div className="flex flex-col gap-2  md:hidden  w-full">
              <span>Filter by:</span>
              <TaskFilters />
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground rounded-full px-4 cursor-pointer">
                  {"Add Task".toUpperCase()}
                </Button>
              </DialogTrigger>
              <DialogContent className=" px-0 py-0 md:mt-0 mt-12 md:mb-0  h-[80%] md:scale-100 scale-110   ">
                <div className="w-full  md:h-full flex flex-col overflow-y-auto">
                  <DialogHeader className="border-b px-4 py-2 w-full">
                    <DialogTitle className="text-3xl text-start font-normal ">
                      Create Task
                    </DialogTitle>
                  </DialogHeader>
                  <AddTaskDialog formState={formState} onChange={handleDialogChange} error={error} />
                </div>
                <DialogFooter className="bg-card px-4 h-full rounded-b-md"  >
                  <div className="flex gap-4 py-2 justify-end">
                    <Button variant="outline" onClick={handleCancel} className="px-4 py-2 rounded-full">
                      CANCEL
                    </Button>
                    <Button variant="default" onClick={handleCreateTask} className="px-4 py-2 rounded-full">
                      CREATE
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {view === "list" ? <ListComponent /> : <BoardComponent />}
      </div>
    </div>
  );
}
