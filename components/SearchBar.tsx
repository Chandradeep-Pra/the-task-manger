import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="relative mt-4 md:mt-0 w-full md:w-auto max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <Input
        type="text"
        placeholder="Search"
        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}
