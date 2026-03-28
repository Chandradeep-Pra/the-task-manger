"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export type TaskStatus = "To-Do" | "In-Progress" | "Completed" | string;
export type TaskCategory = "work" | "personal" | "other" | string;

type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  dueOn: string;
  status: TaskStatus;
  attachment?: string | null;
}

interface TaskContextValue {
  tasks: TaskItem[];
  filteredTasks: TaskItem[];
  filterStatus: "All" | TaskStatus;
  filterCategory: "All" | TaskCategory;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: ToastType) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  setFilterStatus: (status: "All" | TaskStatus) => void;
  setFilterCategory: (category: "All" | TaskCategory) => void;
  addTask: (task: Omit<TaskItem, "id">) => { success: boolean; message?: string };
  updateTask: (task: TaskItem) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  moveTask: (taskId: string, destStatus: TaskStatus, destIndex?: number) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

function normalizeTaskCategory(category: string): TaskCategory {
  if (category === "work" || category === "personal") return category;
  return "other";
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<TaskItem[]>("taskbuddy_tasks", []);
  const [filterStatus, setFilterStatus] = useState<"All" | TaskStatus>("All");
  const [filterCategory, setFilterCategory] = useState<"All" | TaskCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("taskbuddy_theme", "light");

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    setToast({ id: Date.now(), message, type });
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2500);
  }, []);


  const addTask = useCallback(
    (task: Omit<TaskItem, "id">) => {
      if (!task.title.trim()) {
        showToast("Task title cannot be empty", "error");
        return { success: false, message: "Task title cannot be empty" };
      }
      const newTask: TaskItem = {
        ...task,
        id: crypto.randomUUID(),
        category: normalizeTaskCategory(task.category),
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast(`Created: ${newTask.title} (${newTask.category})`, "success");
      return { success: true };
    },
    [setTasks, showToast]
  );

  const updateTask = useCallback(
    (updatedTask: TaskItem) => {
      setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      showToast(`Updated: ${updatedTask.title}`, "success");
    },
    [setTasks, showToast]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      const removed = tasks.find((task) => task.id === taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      if (removed) {
        showToast(`Deleted: ${removed.title}`, "info");
      } else {
        showToast("Task deleted", "info");
      }
    },
    [setTasks, showToast, tasks]
  );

  const toggleComplete = useCallback(
    (taskId: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== taskId) return task;
          const nextStatus: TaskStatus = task.status === "Completed" ? "To-Do" : "Completed";
          const nextTask = { ...task, status: nextStatus };
          showToast(
            nextStatus === "Completed"
              ? `Completed: ${task.title}`
              : `Re-opened: ${task.title}`,
            "success"
          );
          return nextTask;
        })
      );
    },
    [setTasks, showToast]
  );

  const moveTask = useCallback(
    (taskId: string, destStatus: TaskStatus, destIndex: number = -1) => {
      console.log("[moveTask] start", { taskId, destStatus, destIndex });
      setTasks((current) => {
        const taskToMove = current.find((task) => task.id === taskId);
        if (!taskToMove) {
          console.warn("[moveTask] task not found", taskId);
          return current;
        }

        const updatedTask = { ...taskToMove, status: destStatus };
        const remaining = current.filter((task) => task.id !== taskId);

        const buckets: Record<TaskStatus, TaskItem[]> = {
          "To-Do": remaining.filter((task) => task.status === "To-Do"),
          "In-Progress": remaining.filter((task) => task.status === "In-Progress"),
          Completed: remaining.filter((task) => task.status === "Completed"),
        };

        const destBucket = [...(buckets[destStatus] ?? [])];
        const insertIndex = destIndex < 0 ? destBucket.length : Math.max(0, Math.min(destBucket.length, destIndex));
        destBucket.splice(insertIndex, 0, updatedTask);
        buckets[destStatus] = destBucket;

        const next = [...buckets["To-Do"], ...buckets["In-Progress"], ...buckets["Completed"]];
        console.log("[moveTask] done, next tasks count", next.length);
        return next;
      });

      const moved = tasks.find((task) => task.id === taskId);
      if (moved) {
        showToast(`${moved.title} moved to ${destStatus}`, "success");
      } else {
        showToast("Task moved successfully", "success");
      }
    },
    [setTasks, showToast, tasks]
  );

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (filterStatus !== "All") {
      result = result.filter((task) => task.status === filterStatus);
    }
    if (filterCategory !== "All") {
      result = result.filter((task) => task.category === filterCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((task) => task.title.toLowerCase().includes(query) || (task.description?.toLowerCase().includes(query) ?? false));
    }
    return result;
  }, [tasks, filterStatus, filterCategory, searchQuery]);

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      filterStatus,
      filterCategory,
      searchQuery,
      setSearchQuery,
      toast,
      showToast,
      theme,
      setTheme,
      setFilterStatus,
      setFilterCategory,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      moveTask,
    }),
    [
      tasks,
      filteredTasks,
      filterStatus,
      filterCategory,
      searchQuery,
      toast,
      showToast,
      theme,
      setTheme,
      setFilterStatus,
      setFilterCategory,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      moveTask,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within TaskProvider");
  return context;
}
