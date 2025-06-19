import Image from "next/image";

// components/cms_nav.tsx
export default function CmsNav() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <div className="text-lg font-bold text-gray-800">
                  <Image src="/logo/logo_crossingrepublic.png" alt="Logo" width={200} height={200} />
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-gray-600 hover:text-blue-600">Logout</button>
      </div>
    </nav>
  );
}
