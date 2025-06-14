// pages/cms_main.tsx
import CmsNav from "@/cms_components/dashboard/cms_nav";
import CmsSidenav from "@/cms_components/dashboard/cms_sidenav";

export default function CmsMain() {
  return (
    <div className="flex h-screen bg-gray-100">
      <CmsSidenav />
      <div className="flex flex-col flex-grow">
        <CmsNav />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Today Scheduled Appointment</h2>

          {/* Just one box for now - Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-400 h-40 flex justify-center items-center text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl mb-2">🏠</div>
              <div className="text-lg font-bold">PROPERTIES</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
