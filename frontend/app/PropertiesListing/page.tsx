"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/layout/HeaderBar";
import Footer from "@/components/Footer";
import PropertyFilters from "@/components/property/PropertyFilters";
import AppliedFiltersBar from "@/components/property/AppliedFiltersBar";
import SortDropdown from "@/components/ui/SortDropdown";
import PropertyList from "@/components/property/PropertyList";
import Pagination from "@/components/ui/Pagination";
import type { Filters, Property } from "@/types/property";
import useProperties from "@/hooks/useProperties";

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
  // Search bar params start
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const property_type = searchParams.get("property_type");
  const bhk = searchParams.get("bhk");
  // Search bar params end

  //Navbar query param of flat,villa,plot,projects

  const sub_type = searchParams.get("sub_type");

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);

useEffect(() => {
  const fetchProperties = async () => {
    try {
      if (city || property_type || bhk ||sub_type) {
        // If ANY query param exists, run filter API
        const payload = {
          city: city || null,
          property_type: property_type || null,
          bhk: bhk || null,
          sub_type: sub_type || null,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/filter`,
          payload
        );
        setProperties(response.data.properties);
      } else {
        // Else fetch ALL properties
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/properties`
        );
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, [city, property_type, bhk,sub_type]);


  const totalPages = 1; // You can update this later if pagination is added

  return (
    <div className="bg-[#f7f9fa] min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="hidden md:block"><Navbar /></div>
      <div className="md:hidden"><MobileNav /></div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-80">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6 mb-4">
                <PropertyFilters filters={filters} onChange={setFilters} />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <span className="text-gray-900 text-lg sm:text-xl font-semibold">
                    {loading ? "Loading..." : `${properties.length} result${properties.length !== 1 ? "s" : ""}`}
                  </span>
                  <SortDropdown value={sort} onChange={setSort} />
                </div>

                <AppliedFiltersBar
                  appliedFilters={[]} // TODO: map selected filters to display
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
