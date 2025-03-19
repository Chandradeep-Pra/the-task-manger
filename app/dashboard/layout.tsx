"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <div className="w-full">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:bg-white bg-[#FAEEFC] shadow-md md:shadow-none">
        {/* Logo Section */}
        <div className="flex gap-1 items-center">
          <Image src="/icons/clipboard.svg" width={32} height={32} alt="icon" />
          <span className="text-pBlack font-semibold text-2xl">TaskBuddy</span>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="flex items-center gap-3">
            <Image
              src={user.photoURL || "/default-avatar.png"}
              width={40}
              height={40}
              alt="User Profile"
              className="rounded-full"
            />
            <span className="text-lg text-gray-600 font-medium hidden md:block">{user.displayName?.split(" ")[0]}</span>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
