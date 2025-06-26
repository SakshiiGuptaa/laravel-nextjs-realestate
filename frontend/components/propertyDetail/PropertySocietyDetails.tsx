import { Society } from "@/types/propertyDetails";
import React from "react";

/**
 * Props for PropertySocietyDetails
 * @property society - Society/project details object
 */
type PropertySocietyDetailsProps = {
  society: Society;
};

/**
 * PropertySocietyDetails Component
 *
 * Displays details about the society/project such as name, area, towers, units,
 * floors, configuration, property type, brochure download, developer, and possession.
 * All data is driven by the society object (no hardcoded values).
 */
export default function PropertySocietyDetails({
  society,
}: PropertySocietyDetailsProps) {
  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Society main info */}
        <div>
          <div className="text-xl font-bold text-gray-900 tracking-tight mb-1">
            {society.name}
          </div>
          <div className="text-base text-gray-700 mb-2">
            {society.configuration} &bull; {society.propertyType}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              <strong>{society.area}</strong> {society.areaUnit} area
            </span>
            <span>
              <strong>{society.towers}</strong> Towers
            </span>
            <span>
              <strong>{society.units}</strong> Units
            </span>
            <span>
              <strong>{society.floors}</strong> Floors
            </span>
          </div>
        </div>
        {/* Right: Brochure, developer, possession */}
        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={society.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-max"
          >
            {/* PDF icon */}
            <span className="mr-2" role="img" aria-label="Download Brochure">
              📄
            </span>
            Download Brochure
          </a>
          <div className="text-xs text-gray-500">
            <span>
              Developer: <strong>{society.developer}</strong>
            </span>
            <span className="ml-4">
              Possession: <strong>{society.possession}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
