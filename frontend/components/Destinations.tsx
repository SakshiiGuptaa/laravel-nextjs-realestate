// components/Destinations.tsx
"use client";
import Image from "next/image";

type Destination = {
  name: string;
  projects: string;
  imageUrl: string; // This can be a local or API-based image URL
};

type Props = {
  destinations: Destination[];
};

export default function Destinations({ destinations }: Props) {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-cyan-800 text-3xl md:text-4xl font-bold mb-2">
        Societies
      </h2>
      <p className="text-gray-600 mb-8">
        You are in the right destination where you need to be.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 max-w-7xl mx-auto">
        {destinations.map((city) => (
          <div
            key={city.name}
            className="relative rounded-xl overflow-hidden shadow-lg group"
          >
            <Image
              src={city.imageUrl}
              alt={city.name}
              width={300}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
              <h3 className="text-lg font-bold">{city.name}</h3>
              <p className="text-sm">{city.projects}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
