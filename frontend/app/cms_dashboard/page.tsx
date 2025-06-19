// pages/cms_main.tsx
import CmsNav from "@/cms_components/dashboard/cms_nav";
import CmsSidenav from "@/cms_components/dashboard/cms_sidenav";
import Link from "next/link";

export default function CmsMain() {
  return (
    <div className="flex h-screen bg-gray-100">
      <CmsSidenav />
      <div className="flex flex-col flex-grow">
        <CmsNav />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Today Scheduled Appointment</h2>

          {/* Just one box for now - Properties */}

              <Link href="/cms_dashboard/properties">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="h-[200px] flex justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                      <div className="text-3xl mb-2">🏠</div>
                      <div className="text-lg font-bold">PROPERTIES</div>
                    </div>
              </div>
              </Link>
        </main>
      </div>
    </div>
  );
}
