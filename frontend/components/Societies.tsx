// components/Destinations.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Society ={
  id: number;
  name: string;
  description: string;
  sortOrder: number;
  // Assuming images and videos are arrays of strings (URLs)
  images : string[];
  videos : string[];
}
export default function Destinations() {

  const [ societies, setSocieties] = useState<Society[]>([]);
  const [ loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/societies`
        );
        if (!res.ok) throw new Error("Failed to fetch societies");
        const data = await res.json();
        setSocieties(data.societies || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocieties();
  }, []);

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-cyan-800 text-3xl md:text-4xl font-bold mb-2">
        Societies
      </h2>
      <p className="text-gray-600 mb-8">
        You are in the right destination where you need to be.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 max-w-7xl mx-auto">
        {societies
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((society) => (
            <div
              key={society.id}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
            <img
              src={society.images[0]}
              alt={society.name}
              width={300}
              height={400}
              className="w-full rounded-xl h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Video on hover */}
            {society.videos.length > 0 && (
              <video
                src={society.videos[0]}
                className="absolute rounded-xl top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                autoPlay
                muted
                loop
                playsInline
              />
            )}

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
            {/* <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{society.description}</p> */}
            <h3 className="text-lg font-bold opacity-100 group-hover:opacity-0 transition-opacity duration-500">{society.name}</h3>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}
