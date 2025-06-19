"use client";
import React, { useState } from "react";

import StartNowButton from "./StartNowButton";

const listingTypes = ["Sell", "Rent / Lease", "PG"];
const propertyTypes = ["Residential", "Commercial"];
const subTypes = [
  "Flat/Apartment",
  "Independent House / Villa",
  "Independent / Builder Floor",
  "Plot / Land",
];

export default function PostPropertyForm() {
  const [selectedListing, setSelectedListing] = useState("Rent / Lease");
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("Residential");
  const [selectedSubType, setSelectedSubType] = useState("Flat/Apartment");

  return (
    <div className="space-y-6 text-[#12284c]">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">
        Start posting your property, it’s free
      </h2>
      <div className="font-semibold text-base mb-4">Add Basic Details</div>

      {/* Listing Type */}
      <div>
        <div className="font-semibold mb-2">You are looking to ...</div>
        <div className="flex gap-3">
          {listingTypes.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setSelectedListing(type)}
              className={`px-6 py-2 rounded-full border text-base font-medium transition
                ${
                  selectedListing === type
                    ? "border-blue-400 bg-white text-[#12284c] shadow-[0_0_0_2px_#eaf6ff]"
                    : "border-gray-200 bg-white text-[#12284c] hover:border-blue-300"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <div className="font-semibold mb-2">And its a ...</div>
        <div className="flex gap-6 mb-3">
          {propertyTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-base"
            >
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={selectedPropertyType === type}
                onChange={() => setSelectedPropertyType(type)}
                className="accent-blue-600 w-5 h-5"
              />
              {type}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {subTypes.map((sub) => (
            <button
              type="button"
              key={sub}
              onClick={() => setSelectedSubType(sub)}
              className={`px-4 py-2 rounded-full border text-base font-medium transition
                ${
                  selectedSubType === sub
                    ? "border-blue-400 bg-white text-[#12284c] shadow-[0_0_0_2px_#eaf6ff]"
                    : "border-gray-200 bg-white text-[#12284c] hover:border-blue-300"
                }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Place the Start Now button here */}
      <div className="pt-4">
        <StartNowButton />
      </div>
    </div>
  );
}
