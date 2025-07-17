"use client";
// pages/cms_main.tsx
import CmsNav from "@/cms_components/dashboard/cms_nav";
import CmsSidenav from "@/cms_components/dashboard/cms_sidenav";
import Link from "next/link";
import { useState } from "react";

export default function CmsMain() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <CmsNav onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <CmsSidenav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="p-6 flex-1 overflow-auto">

          {/* Just one box for now - Properties */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1 - Properties */}
          <Link href="/cms_dashboard/properties">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <div className="text-xl font-bold">PROPERTIES</div>
            </div>
          </Link>

          {/* Box 2 - Agents */}
          <Link href="/cms_dashboard/agents">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-br from-green-500 to-teal-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <div className="text-xl font-bold">PROPERTY TYPE</div>
            </div>
          </Link>

          {/* Box 3 - Inquiries */}
          <Link href="/cms_dashboard/inquiries">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2 text-center">
              <div className="text-xl font-bold">DEALERS</div>
            </div>
          </Link>

          {/* Box 4 - Settings */}
          <Link href="/cms_dashboard/settings">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-br from-yellow-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <div className="text-xl font-bold">SITE SETTINGS</div>
            </div>
          </Link>
        </div>
        <br/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1 - Properties */}
          <Link href="/cms_dashboard/societies">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <div className="text-xl font-bold">SOCIETIES</div>
            </div>
          </Link>

          {/* Box 2 - Agents */}
          <Link href="/cms_dashboard/buyers">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-br from-green-500 to-teal-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <div className="text-xl font-bold">BUYERS</div>
            </div>
          </Link>

          {/* Box 3 - Inquiries */}
          <Link href="/cms_dashboard/users">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2 text-center">
              <div className="text-xl font-bold">USERS</div>
            </div>
          </Link>

          {/* Box 4 - Settings */}
          <Link href="/cms_dashboard/settings">
            <div className="h-[200px] flex flex-col justify-center items-center text-white bg-gradient-to-br from-yellow-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <div className="text-xl font-bold">SETTINGS</div>
            </div>
          </Link>
        </div>

        </main>
      </div>
    </div>
  );
}
