// components/cms_sidenav.tsx
import { FaHome, FaUsers, FaChartBar } from "react-icons/fa";

export default function CmsSidenav({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          bg-white w-64 h-full border-r flex flex-col items-center py-6 space-y-6
          fixed top-0 left-0 z-50 transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-20 md:h-screen md:z-10
        `}
        style={{ minHeight: "100vh" }}
      >
        <FaHome className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer mb-8" />
        <FaUsers className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer mb-8" />
        <FaChartBar className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer" />
      </aside>
    </>
  );
}
