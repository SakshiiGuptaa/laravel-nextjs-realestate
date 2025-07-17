"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CmsNav from "@/cms_components/dashboard/cms_nav";
import CmsSidenav from "@/cms_components/dashboard/cms_sidenav";
import PropertiesTable from "@/cms_components/dashboard/PropertiesTable";
import Pagination from "@/components/ui/Pagination";

export default function PropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/properties`
        );
        setProperties(response.data.properties); // assuming Laravel response format
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <CmsNav onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <CmsSidenav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-2 sm:p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <h5 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin Set Up
            </h5>
            <Link href="/cms_dashboard/societies/new" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                + New Society
              </button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4 w-full">
            <select className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto focus:outline-blue-400">
              <option>Choose Field</option>
              <option value="title">Title</option>
              <option value="type_property">Type</option>
              <option value="city">City</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full md:flex-grow focus:outline-blue-400"
            />
            <button
              type="button"
              className="w-full sm:w-auto text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Search
            </button>
          </div>

          {/* Conditional rendering */}
          {loading ? (
            <div className="text-center text-gray-600">Loading properties...</div>
          ) : (
            <PropertiesTable properties={properties} />
          )}

          {/* Pagination */}
          <div className="pt-4">
            <Pagination
              page={1}
              totalPages={1}
              onPageChange={() => {
                /* handle page change here */
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
