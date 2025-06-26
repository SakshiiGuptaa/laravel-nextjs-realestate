// app/login/page.tsx
"use client";
import React, { useState } from "react";
import MainSection from "@/components/layout_main_login/MainSection";
import { Toaster } from "sonner";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-600 to-cyan-300 flex flex-col justify-center items-center px-2 sm:px-4 relative">
      {/* Top header */}
      <div className="absolute top-3 right-2 sm:top-6 sm:right-6 z-10 flex items-center space-x-2 sm:space-x-3">
        <span className="text-gray-100 font-medium text-xs sm:text-base">
          {isLogin ? "Not a member as yet?" : "Already have an account?"}
        </span>
        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-3 py-1 sm:px-6 sm:py-2 rounded-full shadow-lg font-semibold text-xs sm:text-lg transition-all duration-200"
        >
          {isLogin ? "Register Now" : "Login"}
        </button>
      </div>
      {/* Main content */}
      <MainSection isLogin={isLogin} setIsLogin={setIsLogin} />
      {/* Toast notifications */}
      <Toaster richColors position="top-right" />
    </div>
  );
}
