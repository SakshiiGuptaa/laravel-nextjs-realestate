// components/HeroSection.tsx
"use client";
import useProperties from "@/hooks/useProperties";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function HeroSection() {
  
  //For(buy,sell,projects)
  const [selectedTab, setSelectedTab] = useState("Buy");

  const { properties, loading } = useProperties();

  // console.log(properties.map(p => p.listing_type));

  const filteredProperties = properties.filter(
    (property) => property.listing_type?.toLowerCase() === selectedTab.toLowerCase()
  );

  const router = useRouter();
  
  // 👇 Extract unique values using a Set
    const uniquePropertyTypes = Array.from(
      new Set(filteredProperties.map((property) => property.property_type))
    );
    
  // 👇 Extract unique values using a Set
  const uniqueBHKs = [...new Set(filteredProperties.map(p => p.bhk))].sort((a, b) => a - b);

  // ✅ Filter states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");


  // ✅ Define your handler INSIDE the component:
  const handleFilterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build query params
    const query = new URLSearchParams({
      city: selectedCity || "",
      property_type: selectedPropertyType || "",
      bhk: selectedBHK || "",
    }).toString();

    // Navigate with query params
    router.push(`/PropertiesListing?${query}`);
  };


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

    <form onSubmit={handleFilterSubmit}>

        {/* Tabs */}
      <div className="z-30 flex items-center justify-center space-x-2 bg-transparent rounded overflow-hidden mb-4">
        {["Buy", "Sell", "Rent", "Projects"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-2 font-medium ${
              selectedTab === tab ? "bg-blue-700" : "bg-blue-400"
            } text-white`}
          >
            {tab}
          </button>
        ))}
      </div>


        {/* Filter Row */}
        <div className="w-full flex justify-center mt-2 mb-4 px-2">
          <div className="flex flex-col gap-3 md:flex-row md:gap-0 items-stretch w-full max-w-xs sm:max-w-2xl md:max-w-5xl bg-white bg-opacity-95 rounded-2xl md:rounded-full shadow-2xl border border-blue-100 p-3 md:p-3">
            <select 
              value={selectedCity}
              onChange={(e)=> setSelectedCity(e.target.value)}
              className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold">
              
              <option className="text-cyan-800">Society</option>
              {filteredProperties.map((property) => (   
              <option key={property.id} className="text-cyan-800">{property.location}</option>
              ))}

            </select>

            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
             className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold">
              <option className="text-cyan-800">Property Type</option>
              {uniquePropertyTypes.map((type) => ( 
              <option key={type} className="text-cyan-800">{type}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by locality"
              className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold"
            />
            <select
              value={selectedBHK}
              onChange={(e) => setSelectedBHK(e.target.value)}
            className="flex-1 min-w-0 border-none bg-transparent px-4 py-3 text-base rounded-xl md:rounded-full focus:ring-0 focus:outline-none text-cyan-800 placeholder-cyan-600 font-semibold">
              <option className="text-cyan-800">Bedroom</option>
              {uniqueBHKs.map((bhk) => (   
              <option key={bhk} className="text-cyan-800">{bhk}</option>
              ))}
            </select>
            <button
              type="submit"
              className=" w-full md:w-auto mt-1 md:mt-0 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl md:rounded-full px-4 py-2 shadow transition-all duration-150 flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
            >
              <FiSearch className="mr-2 w-5 h-5" /> Search Properties
            </button>
          </div>
        </div>    
      
      </form>


      <div className="flex space-x-2 bg-transparent rounded overflow-hidden mb-10">
        <button className="bg-blue-900 rounded-3xl text-white px-6 py-2 font-medium">Verified Listings</button>
        <button className="bg-blue-400 rounded-3xl text-white px-6 py-2 font-medium">Gated Communities</button>
        <button className="bg-blue-400 rounded-3xl text-white px-6 py-2 font-medium">Trusted by Locals</button>
      </div>

    </div>
  );
}
