"use client";

import Circle from "@/components/Circle";
import Image from "next/image";
import { googleSignIn } from "./login/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignIn = async () => {
    const user = await googleSignIn();
    if (user) {
      router.push("/dashboard"); // ✅ Redirect after successful login
    }
  };
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
        <button className="flex w-auto self-center md:self-start items-center  gap-2 px-6 py-2 bg-pBlack rounded-2xl cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out mt-4" onClick={handleSignIn}>
          <Image
            src="./icons/google.svg"
            height={22}
            width={22}
            alt="google sign in"
          />
          <span className="text-lg text-white font-normal">
            Continue with Google
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
