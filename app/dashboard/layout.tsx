"use client";

import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-sidebar text-sidebar-foreground shadow-md md:shadow-none">
        {/* Logo Section */}
        <div className="flex gap-1 items-center">
          <Image src="/icons/clipboard.svg" width={32} height={32} alt="icon" />
          <span className="text-sidebar-primary font-semibold text-2xl">TaskBuddy</span>
        </div>

        {/* User Profile Section */}
        {/* {user && (
          <div className="flex items-center gap-3">
            <Image
              src={user.photoURL || "/default-avatar.png"}
              width={40}
              height={40}
              alt="User Profile"
              className="rounded-full"
            />
            <span className="text-lg text-sidebar-foreground font-medium hidden md:block">{user.displayName?.split(" ")[0]}</span>
          </div>
        )} */}
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
