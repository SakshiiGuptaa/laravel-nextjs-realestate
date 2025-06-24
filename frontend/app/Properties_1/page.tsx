"use client";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/layout/HeaderBar";
import Footer from "@/components/Footer";
import { useState } from "react";
import PropertyFilters from "@/components/property/PropertyFilters";
import AppliedFiltersBar from "@/components/property/AppliedFiltersBar";
import SortDropdown from "@/components/ui/SortDropdown";
import PropertyList from "@/components/property/PropertyList";
import Pagination from "@/components/ui/Pagination";
import type { Filters, Property } from "@/types/property";

// --- DUMMY DATA FOR UI TESTING ---
const dummyProperties: Property[] = [
  {
    id: "1",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    ],
    isRera: true,
    isZeroBrokerage: true,
    is3D: true,
    isNewBooking: true,
    title: "Panchsheel Wellington",
    bhk: 3,
    location: "Crossing Republik, Ghaziabad",
    price: "₹1.17 Cr",
    price2: "Price on Request",
    description:
      "Finest 2,3 BHK apartments in Crossing Republik available for sale.",
    builder: "Panchsheel Buildtech",
    phoneNumber: "9876543210",
  },
  {
    id: "2",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    ],
    isRera: false,
    isZeroBrokerage: true,
    is3D: false,
    isNewBooking: false,
    title: "Investors Guide Premium Floor",
    bhk: 2,
    location: "Indirapuram, Ghaziabad",
    price: "₹45 - 75 L",
    price2: "₹64 L - 1.25 Cr",
    description:
      "Beautiful 2,3,4 BHK apartments in Indirapuram, are now available.",
    builder: "Investors Guide",
    phoneNumber: "9876543211",
  },
];

const initialFilters: Filters = {
  localities: [
    { id: "1", name: "Indirapuram", selected: false },
    { id: "2", name: "NH 24 Highway", selected: false },
    { id: "3", name: "Raj Nagar Extension", selected: false },
  ],
  bhk: [
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
  ],
  priceRange: "",
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const properties = dummyProperties;
  const totalPages = 1;

  return (
    <div className="bg-[#f7f9fa] min-h-screen flex flex-col">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-80">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 transition-all duration-300 mb-4">
                <PropertyFilters filters={filters} onChange={setFilters} />
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <span className="text-gray-900 text-lg sm:text-xl font-semibold">
                    {properties.length} result{properties.length !== 1 && "s"}
                  </span>
                  <SortDropdown value={sort} onChange={setSort} />
                </div>
                <AppliedFiltersBar
                  appliedFilters={[]} // TODO: map filters to chips
                  onClear={() => setFilters(initialFilters)}
                />
                <PropertyList properties={properties} />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
