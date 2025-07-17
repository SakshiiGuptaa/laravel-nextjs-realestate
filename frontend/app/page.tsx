// app/page.tsx or components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Societies from "@/components/Societies";
import Footer from "@/components/Footer";
import HeaderBar from "@/components/layout/HeaderBar";
import PropertyTypes from "@/components/PropertyTypes";


export default function Home() {
  return (
    <>
      {/* Show HeaderBar on small screens, Navbar on medium and up */}
      <div className="block md:hidden">
        <HeaderBar />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <HeroSection />
      <Societies />
      <PropertyTypes />
      <Footer />
    </>
  );
}
