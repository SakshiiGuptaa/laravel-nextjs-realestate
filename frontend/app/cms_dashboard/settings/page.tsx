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
          <main className="p-6 flex-1 overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Backend Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Admin Settings */}
              <Link href="/cms_dashboard/settings/admin_settings">
                <div className="h-[150px] flex flex-col justify-center items-center text-gray-800 bg-white border border-gray-300 shadow-sm hover:shadow-lg rounded-lg p-4">
                  <div className="text-lg font-semibold">Admin Settings</div>
                  <p className="text-sm text-gray-500 text-center mt-2">Manage site admins, roles & permissions</p>
                </div>
              </Link>

              {/* Dealers Settings */}
              <Link href="/cms_dashboard/settings/dealers">
                <div className="h-[150px] flex flex-col justify-center items-center text-gray-800 bg-white border border-gray-300 shadow-sm hover:shadow-lg rounded-lg p-4">
                  <div className="text-lg font-semibold">Dealers Settings</div>
                  <p className="text-sm text-gray-500 text-center mt-2">Control dealer profiles & access</p>
                </div>
              </Link>

              {/* SEO Settings */}
              <Link href="/cms_dashboard/settings/seo">
                <div className="h-[150px] flex flex-col justify-center items-center text-gray-800 bg-white border border-gray-300 shadow-sm hover:shadow-lg rounded-lg p-4">
                  <div className="text-lg font-semibold">SEO Settings</div>
                  <p className="text-sm text-gray-500 text-center mt-2">Manage meta tags, sitemap, robots.txt</p>
                </div>
              </Link>

              {/* Add more as needed */}

            </div>
          </main>
      </div>
    </div>
  );
}
