"use client";
import { useState } from "react";
import Image from "next/image";
import MobileNav from "../MobileNav";

export default function HeaderBar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      {/* White header bar with logo and black hamburger */}
      <div className="bg-white text-black flex items-center justify-between px-8 py-4 shadow">
        {/* Logo */}
        <div>
          <Image
            src="/logo_lg.png"
            alt="Logo"
            width={240}
            height={135}
            priority
          />
        </div>
        {/* Hamburger icon (always visible) */}
        <button
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="black"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Slide-in Navbar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-gray-600 hover:text-blue-800 text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <MobileNav />
      </div>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
