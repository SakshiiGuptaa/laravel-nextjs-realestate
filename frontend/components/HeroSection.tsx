// components/HeroSection.tsx
"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div
      className="p-4 relative bg-cover bg-no-repeat bg-center min-h-[80vh] flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: "url('/bg-3.jpg')" }} // replace with your image path
    >
      <div className="text-center text-cyan-900 max-w-3xl mb-12">
        <h1 className="text-4xl md:text-4xl font-extrabold mb-4">REAL ESTATE IN INDIA</h1>
        <p className="text-lg md:text-xl">
          India’s Top Real Estate Portal to Search, Buy, Rent and Sell <strong>Property in India</strong>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-transparent rounded overflow-hidden mb-4">
        <button className="bg-blue-900 text-white px-6 py-2 font-medium">Buy</button>
        <button className="bg-blue-400 text-white px-6 py-2 font-medium">Rent</button>
        <button className="bg-blue-400 text-white px-6 py-2 font-medium">Projects</button>
      </div>

      {/* Filter Row */}
      <div className="bg-white bg-opacity-90 rounded-lg p-4 w-full max-w-6xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <select className="border p-2 rounded">
            <option>Chennai</option>
            <option>Bengaluru</option>
          </select>
          <select className="border p-2 rounded">
            <option>Property Type</option>
          </select>
          <input type="text" placeholder="Search by locality" className="border p-2 rounded" />
          <select className="border p-2 rounded">
            <option>Bedroom</option>
          </select>
          <button className="bg-blue-900 text-white font-semibold rounded px-4 py-2">
            🔍 Search Properties
          </button>
        </div>
      </div>

      {/* City Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {["Chennai", "Bengaluru", "Hyderabad", "Coimbatore"].map((city) => (
          <button
            key={city}
            style={{ backgroundColor: "#45a4ec" }}
            className="text-white px-6 py-2 rounded-full flex items-center gap-2 font-medium"
          >
            🏢 {city}
          </button>
        ))}
      </div>

    </div>
  );
}
