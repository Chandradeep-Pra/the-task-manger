"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import IcoListView from "@/public/icons/IcoList.svg";
import IcoBoardView from "@/public/icons/IcoBoard.svg";
import ListComponent from "@/components/ListComponent";
import BoardComponent from "@/components/BoardComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const [view, setView] = useState("list");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to home if not logged in
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="font-primary px-0">
      {/* View Switch */}
      <div className="w-full md:flex gap-4 items-center hidden px-4 py-2">
        <span
          className={`flex items-center gap-1 cursor-pointer ${
            view != "list" && "text-gray-600"
          }`}
          onClick={() => setView("list")}
        >
          {" "}
          <IcoListView className="h-4 w-4" /> <span>List</span>{" "}
        </span>
        <span
          className={`flex items-center gap-1 ${
            view != "board" && "text-gray-600"
          } cursor-pointer`}
          onClick={() => setView("board")}
        >
          {" "}
          <IcoBoardView className="h-4 w-4" /> <span>Board</span>{" "}
        </span>
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
            <Dialog >
              <DialogTrigger asChild>
                <Button className="bg-primary text-white rounded-full px-4 cursor-pointer">
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
                  <AddTaskDialog />
                </div>
                <DialogFooter className="bg-[#F1F1F1] px-4 h-full rounded-b-md"  >
                  <div className="flex gap-4 py-2 justify-end">
                    <DialogClose asChild>

                  <Button variant="outline" className="px-4 py-2 rounded-full">CANCEL</Button>
                    </DialogClose>
                  <Button variant="default" className="px-4 py-2 rounded-full">CREATE</Button>

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
