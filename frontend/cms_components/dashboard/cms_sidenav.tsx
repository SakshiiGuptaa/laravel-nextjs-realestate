// components/cms_sidenav.tsx
import { FaHome, FaUsers, FaChartBar } from "react-icons/fa";

export default function CmsSidenav() {
  return (
    <aside className="bg-white w-20 h-screen border-r flex flex-col items-center py-6 space-y-6">
      <FaHome className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer" />
      <FaUsers className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer" />
      <FaChartBar className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer" />
    </aside>
  );
}
