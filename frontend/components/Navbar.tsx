"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-3 shadow-lg border-b border-gray-200 bg-white">
      <Link href="/">
      <div className="flex items-center gap-4">
        <Image src="/logo_lg.png" alt="Logo" width={300} height={170} />
      </div>
      </Link>
      <nav className="flex items-center gap-10 text-md font-medium text-gray-700">
        <Link href="/PropertiesListing">Flats</Link>
        <Link href="/PropertiesListing">Villas</Link>
        <Link href="/PropertiesListing">Plots</Link>
        <Link href="/PropertiesListing">Projects</Link>
        <Link href="/auth">Login</Link>
        <Link
          href="/PropertyPost"
          className="bg-blue-800 text-white px-6 py-2 rounded-full font-bold relative text-base shine-animation overflow-hidden"
        >
          <span className="relative z-10">Post Property</span>
          <span className="shine absolute inset-0"></span>
          <span className="absolute -top-2 -right-3 text-xs font-bold text-cyan-800 bg-white rounded-full px-1 shine-animation overflow-hidden">
            <span className="relative z-10">Free</span>
            <span className="shine absolute inset-0"></span>
          </span>
        </Link>
      </nav>
      {/* Shine animation style */}
      <style jsx>{`
        .shine-animation {
          position: relative;
          display: inline-block;
        }
        .shine {
          position: absolute;
          top: 0;
          left: -75%;
          width: 75%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            #e0f7fa 50%,
            transparent 100%
          );
          opacity: 0.7;
          animation: shine-move 1.5s infinite;
          z-index: 1;
          pointer-events: none;
        }
        @keyframes shine-move {
          0% {
            left: -75%;
          }
          60% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
