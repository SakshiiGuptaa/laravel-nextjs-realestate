// app/page.tsx or components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";

const destinations = [
  {
    name: "Bengaluru",
    projects: "1500+ Projects",
    imageUrl: "/bengaluru.jpg",
  },
  {
    name: "Chennai",
    projects: "2000+ Projects",
    imageUrl: "/chennai.jpg",
  },
  {
    name: "Hyderabad",
    projects: "1500+ Projects",
    imageUrl: "/hyderabad.jpg",
  },
  {
    name: "Coimbatore",
    projects: "300+ Projects",
    imageUrl: "/coimbatore.jpg",
  },
  {
    name: "Madurai",
    projects: "50+ Projects",
    imageUrl: "/madurai.jpg",
  },
];

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Destinations destinations={destinations} />
      <Footer/>
   </>
  );
}
