import React from "react";
import { NearbyPlace } from "@/types/propertyDetails";

/**
 * Props for PropertyNearbyPlaces
 * @property places - Array of nearby place objects (name and type)
 */
type PropertyNearbyPlacesProps = {
  places: NearbyPlace[];
};

/**
 * Icon map for place types.
 * You can expand this map with more icons as needed.
 */
const placeTypeIcons: Record<string, string> = {
  Mall: "🏬",
  Road: "🛣️",
  School: "🏫",
  College: "🎓",
  Hospital: "🏥",
  Default: "📍",
};

/**
 * PropertyNearbyPlaces Component
 *
 * Displays a horizontal scrollable list of nearby places with icons and names.
 * All data is driven by the places array (no hardcoded UI).
 */
export default function PropertyNearbyPlaces({
  places,
}: PropertyNearbyPlacesProps) {
  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="text-xl font-bold text-gray-900 tracking-tight mb-4">
          Places Nearby
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {places.map((place, idx) => (
            <div
              key={place.name + idx}
              className="flex flex-col items-center min-w-[100px] bg-gray-50 rounded-lg px-3 py-2 text-gray-700 border border-gray-100"
            >
              <span
                className="text-2xl mb-1"
                role="img"
                aria-label={place.type}
              >
                {placeTypeIcons[place.type] || placeTypeIcons.Default}
              </span>
              <span className="text-xs text-center">{place.name}</span>
              <span className="text-[10px] text-gray-400">{place.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
