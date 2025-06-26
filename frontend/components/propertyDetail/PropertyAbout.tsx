import React from "react";
import { About } from "@/types/propertyDetails";

export default function PropertyAbout({ about }: { about: About }) {
  if (!about) return null;

  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="text-xl font-bold text-gray-900 tracking-tight mb-3">
          About Property
        </div>
        <div className="flex items-center mb-2">
          <span
            className="text-blue-600 mr-2"
            role="img"
            aria-label="address"
          >
            📍
          </span>
          <span className="text-base text-gray-800 font-medium">
            {about.address}
          </span>
        </div>
        <div className="text-base text-gray-700 leading-relaxed">
          {about.description}
        </div>
      </div>
    </section>
  );
}
