import { useState } from "react";
import PropertyImageCarousel from "./PropertyImageCarousel";
import FavoriteButton from "./FavoriteButton";
import ViewNumberModal from "./ViewNumberModal";
import BhkBadge from "./BhkBadge";
import type { Property } from "@/types/property";
import Link from "next/link";

export default function PropertyCard({ property }: { property: Property }) {
  const [showModal, setShowModal] = useState(false);

  return (
    
    <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col sm:flex-row mb-6 overflow-hidden">
      <div className="relative sm:w-72 w-full flex-shrink-0">
        <PropertyImageCarousel
          images={property.images}
          className="h-44 sm:h-48"
        />
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton propertyId={parseInt(property.id, 10)} />
        </div>
      </div>
      <Link href={`/PropertyDetails/${property.id}`}>
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {property.isRera && (
              <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded text-xs">
                RERA
              </span>
            )}
            {property.isZeroBrokerage && (
              <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded text-xs">
                ZERO BROKERAGE
              </span>
            )}
            {property.is3D && (
              <span className="bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded text-xs">
                3D
              </span>
            )}
            {property.isNewBooking && (
              <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded text-xs">
                NEW BOOKING
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <BhkBadge bhk={property.bhk} />
            <span className="text-gray-700 text-sm">
              Flat in {property.location}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-1">
            <span className="text-lg font-bold text-gray-900">
              {property.price}
            </span>
            <span className="text-gray-700 font-medium">{property.price2}</span>
          </div>
          <div className="text-gray-600 text-sm mb-2">
            {property.description}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Builder{" "}
            <span className="font-semibold text-gray-700">
              {property.builder}
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button className="border border-blue-600 text-blue-700 font-semibold rounded-lg px-4 py-1.5 hover:bg-blue-50 transition text-sm">
            Brochure
          </button>
          <button
            className="bg-blue-700 text-white font-semibold rounded-lg px-4 py-1.5 hover:bg-blue-800 transition text-sm"
            onClick={() => setShowModal(true)}
          >
            View Number
          </button>
        </div>
        <ViewNumberModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          phoneNumber={property.phoneNumber}
        />
      </div>
      </Link>
    </div>
  );
}
