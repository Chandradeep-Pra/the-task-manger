import Image from "next/image";
import Sort from "@/public/icons/sort.svg";

export default function TaskHeader() {
  return (
    <div className="md:flex hidden items-center  bg-white px-4 py-2   text-sm font-semibold text-gray-600">
      <span className="w-1/3">Task Name</span>
      <span className="w-1/6 flex items-center gap-1 cursor-pointer">
        Due on
        <div className="mt-1.5">
          <Sort />
        </div>
      </span>
      <span className="w-1/6">Task Status</span>
      <span className="w-1/6">Task Category</span>
    </div>
  );
}
