import Image from "next/image";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";

export default function CmsNav({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        {onMenuClick && (
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <HiMenu className="text-2xl text-gray-700" />
          </button>
        )}
        <Link href="/" className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo/logo_crossingrepublic.png" width={240} height={240} alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-xl text-gray-600 font-medium hover:text-blue-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
