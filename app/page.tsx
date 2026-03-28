"use client";

import Circle from "@/components/Circle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col  md:flex-row h-screen font-urbanist">
      <Circle radius={80} className="absolute left-70 bottom-10 md:hidden" />
      <Circle radius={80} className="absolute right-25 md:hidden" />
      <div className="flex flex-col items-center md:items-start justify-center px-8 md:w-2/3 h-full ">

        <div className="flex gap-1 items-center">
          <Image
            src="./icons/clipboard.svg"
            width={32}
            height={32}
            alt="icon"
          />
          <span className="text-primary font-bold text-2xl">TaskBuddy</span>
        </div>
        <span className="pt-2 text-center md:text-start">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </span>
        <button className="flex w-auto self-center md:self-start items-center gap-2 px-6 py-2 bg-primary rounded-2xl text-primary-foreground cursor-pointer hover:bg-primary/90 transition-all duration-300 ease-in-out mt-4" onClick={() => window.location.href = "/dashboard"}>
          <Image
            src="./icons/clipboard.svg"
            height={22}
            width={22}
            alt="go to dashboard"
          />
          <span className="text-lg font-normal">
            Go to Dashboard
          </span>
        </button>

      </div>
      <div className="md:hidden">
      <Circle radius={80} className="absolute left-26 bottom-20" />
        
      </div>

      {/* //div with circles */}
      <div className="w-full hidden md:block overflow-hidden relative">
        {/* Circle component (background) */}
        <Circle radius={500} className="absolute right-20 left-0 top-10 " />

        {/* Blue div (foreground) */}
        {/* <div className="bg-blue-500 w-[80%] h-[90%] border-2 rounded-2xl shadow-2xl relative ">
          A
        </div> */}
      </div>
    </div>
  );
}
