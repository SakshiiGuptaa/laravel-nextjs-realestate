// app/page.tsx or components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";
import HeaderBar from "@/components/layout/HeaderBar";
import PropertyTypes from "@/components/PropertyTypes";

const destinations = [
  {
    name: "Paramount Symphony",
    projects: "",
    imageUrl: "/destinations/Paramount.jpeg",
  },
  {
    name: "Mahagun Mascot",
    projects: "",
    imageUrl: "/destinations/Mahagun.jpeg",
  },
  {
    name: "GH7",
    projects: "",
    imageUrl: "/destinations/Gh7.jpeg",
  },
  {
    name: "Gold Coast",
    projects: "",
    imageUrl: "/destinations/Goldcoast.jpeg",
  },
  {
    name: "Panchsheel Wellington",
    projects: "",
    imageUrl: "/destinations/Panchsheel.jpeg",
  },
];

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
      <Destinations destinations={destinations} />
      <PropertyTypes />
      <Footer />
    </>
  );
}
