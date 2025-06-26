import React from "react";
import { Amenity } from "@/types/propertyDetails";

/**
 * Props for PropertyAmenitiesList
 * @property amenities - Array of amenity names (strings) to display
 */
type PropertyAmenitiesListProps = {
  amenities: Amenity[];
};

/**
 * Icon map for amenities.
 * You can expand this map with more icons as needed.
 */
const amenityIcons: Record<Amenity, string> = {
  "Power Backup": "🔌",
  "Intercom Facility": "☎️",
  "Lift(s)": "🛗",
  "Water Purifier": "💧",
  "Maintenance Staff": "🧹",
  "Swimming Pool": "🏊",
  Park: "🌳",
  "Security Personnel": "🛡️",
  "Airy Rooms": "💨",
  "Shopping Centre": "🛍️",
  "Pet Friendly": "🐾",
  "Parking Available": "🚗",
  "Fitness Centre/Gym": "🏋️",
  "Club/Community Center": "🏠",
  "Wheel Chair Friendly": "♿",
  "Rain Water Harvesting": "🌧️",
  "Gated Society": "🚪",
  "On-Call Maintenance Staff": "🔧",
};

/**
 * PropertyAmenitiesList Component
 *
 * Displays a grid of amenity badges/icons for the property.
 * All data is driven by the amenities array (no hardcoded UI).
 */
export default function PropertyAmenitiesList({
  amenities,
}: PropertyAmenitiesListProps) {
  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="text-xl font-bold text-gray-900 tracking-tight mb-4">
          Amenities
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 text-gray-800 border border-gray-100"
            >
              <span className="text-xl" role="img" aria-label={amenity}>
                {amenityIcons[amenity] || "✔️"}
              </span>
              <span className="text-base font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
