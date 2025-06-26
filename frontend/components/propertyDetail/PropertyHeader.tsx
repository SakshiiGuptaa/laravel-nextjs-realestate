import { PropertyDetails } from "@/types/propertyDetails";
import React from "react";

// Props type for the PropertyHeader component
type PropertyHeaderProps = {
  property: PropertyDetails; // The full property details object
};

/**
 * PropertyHeader Component
 *
 * This component renders the top section of the property details page.
 * It displays the price, BHK, baths, price per sq.ft., RERA status, registration number,
 * and main action buttons (Contact Owner, Shortlist).
 *
 * - Stays sticky at the top of the page for easy access to actions.
 * - Uses the PropertyDetails type for full type safety.
 * - All UI text and badges are driven by the property data, not hardcoded.
 */
export default function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    // Sticky header with backdrop blur and subtle shadow
    <header className="bg-blue-600/80 backdrop-blur-md border-b border-blue-700 shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Left section: Main property info */}
        <div>
          {/* Price, BHK, Baths, Price per sq.ft. */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-2xl font-bold text-white">
              {property.price}
            </span>
            <span className="text-lg text-blue-100">
              {property.bhk}BHK {property.baths}Baths
            </span>
            <span className="text-sm text-blue-200">
              {property.pricePerSqft}
            </span>
          </div>
          {/* RERA status, registration, and ready-to-move badge */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* RERA Registered badge */}
            {property.reraStatus.isRegistered && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                RERA REGISTERED
              </span>
            )}
            {/* Registration number */}
            <span className="text-xs text-blue-100">
              Registration No: {property.reraStatus.registrationNo}
            </span>
            {/* RERA website link */}
            <a
              href={property.reraStatus.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline text-xs ml-2"
            >
              RERA Website
            </a>
            {/* Ready to Move badge */}
            {property.isReadyToMove && (
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded ml-2">
                Ready to Move
              </span>
            )}
          </div>
        </div>
        {/* Right section: Action buttons */}
        <div className="flex gap-2 mt-2 md:mt-0">
          {/* Contact Owner button */}
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition border border-white">
            Contact Owner
          </button>
          {/* Shortlist button */}
          <button className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition">
            Shortlist
          </button>
        </div>
      </div>
    </header>
  );
}
