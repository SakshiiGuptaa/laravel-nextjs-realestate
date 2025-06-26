import { PropertyDetails } from "@/types/propertyDetails";
import React from "react";

/**
 * Props for PropertyQuickFacts
 * @property property - The full property details object
 */
type PropertyQuickFactsProps = {
  property: PropertyDetails;
};

/**
 * PropertyQuickFacts Component
 *
 * Displays a summary of key property facts such as area, configuration,
 * floor info, property age, and address. Uses icons for visual clarity.
 * All data is driven by the property object (no hardcoded values).
 */
export default function PropertyQuickFacts({
  property,
}: PropertyQuickFactsProps) {
  const { area, areaUnit, configuration, address } = property;

  return (
    <section className="w-full mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        {/* Area */}
        <div className="flex items-center gap-3">
          <span role="img" aria-label="Area" className="text-xl">
            📏
          </span>
          <div>
            <div className="text-sm text-gray-600">Super Built-up Area</div>
            <div className="text-base text-gray-800 font-medium">
              {area} {areaUnit}
            </div>
          </div>
        </div>
        {/* Configuration */}
        <div className="flex items-center gap-3">
          <span role="img" aria-label="Configuration" className="text-xl">
            🛏️
          </span>
          <div>
            <div className="text-sm text-gray-600">Configuration</div>
            <div className="text-base text-gray-800 font-medium">
              {configuration.bedrooms} Bedrooms, {configuration.bathrooms}{" "}
              Bathrooms, {configuration.balconies} Balconies
            </div>
          </div>
        </div>
        {/* Floor Info */}
        <div className="flex items-center gap-3">
          <span role="img" aria-label="Floor" className="text-xl">
            🏢
          </span>
          <div>
            <div className="text-sm text-gray-600">Floor</div>
            <div className="text-base text-gray-800 font-medium">
              {configuration.floor} of {configuration.totalFloors} Floors
            </div>
          </div>
        </div>
        {/* Property Age & Address */}
        <div className="flex items-center gap-3">
          <span role="img" aria-label="Age" className="text-xl">
            ⏳
          </span>
          <div>
            <div className="text-sm text-gray-600">Property Age</div>
            <div className="text-base text-gray-800 font-medium">
              {configuration.propertyAge}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {address.society}, {address.locality}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
