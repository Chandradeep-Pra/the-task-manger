import type { Metadata } from "next";
import { Mulish, Urbanist } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "./context/TaskContext";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskBuddy",
  description: "Streamline your workflow and track progress effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} ${urbanist.variable} antialiased bg-background text-foreground`}>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
