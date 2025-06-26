// components/HeroSection.tsx
"use client";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
export default function HeroSection() {
  return (
    <div
      className="p-2 relative bg-cover bg-no-repeat bg-center min-h-[80vh] flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: "url('/bg-3.png')" }} // replace with your image path
    >
      <div className="text-center text-cyan-900 max-w-3xl mb-20">
        <h1 className="text-4xl md:text-4xl font-extrabold mb-4">Find Your Home in Crossing Republik</h1>
        <p className="text-lg md:text-xl">
          Apartments, Villas & Plots in <strong> Ghaziabad’s</strong> Most Loved Township
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-transparent rounded overflow-hidden mb-4">
        <button className="bg-blue-900 text-white px-6 py-2 font-medium">Buy</button>
        <button className="bg-blue-400 text-white px-6 py-2 font-medium">Rent</button>
        <button className="bg-blue-400 text-white px-6 py-2 font-medium">Projects</button>
      </div>

      {/* Filter Row */}
      <div className="w-full flex justify-center mt-2 mb-4 px-2">
        <form className="flex flex-col gap-3 md:flex-row md:gap-0 items-stretch w-full max-w-xs sm:max-w-2xl md:max-w-5xl bg-white bg-opacity-95 rounded-2xl md:rounded-full shadow-2xl border border-blue-100 p-3 md:p-3">
          <select className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold">
            <option className="text-cyan-800">Paramount Symphony</option>
            <option className="text-cyan-800">Mahgun mascot</option>
          </select>
          <select className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold">
            <option className="text-cyan-800">Property Type</option>
          </select>
          <input
            type="text"
            placeholder="Search by locality"
            className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold"
          />
          <select className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold">
            <option className="text-cyan-800">Bedroom</option>
          </select>
          <button
            type="submit"
            className="w-full md:w-auto mt-1 md:mt-0 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl md:rounded-full px-4 py-2 shadow transition-all duration-150 flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
          >
            <FiSearch className="mr-2 w-5 h-5" /> Search Properties
          </button>
        </form>
      </div>

      <div className="flex space-x-2 bg-transparent rounded overflow-hidden mb-10">
        <button className="bg-blue-900 rounded-3xl text-white px-6 py-2 font-medium">Verified Listings</button>
        <button className="bg-blue-400 rounded-3xl text-white px-6 py-2 font-medium">Gated Communities</button>
        <button className="bg-blue-400 rounded-3xl text-white px-6 py-2 font-medium">Trusted by Locals</button>
      </div>

    </div>
  );
}
