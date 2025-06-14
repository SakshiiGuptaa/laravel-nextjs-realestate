// components/cms_nav.tsx
export default function CmsNav() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold text-gray-800">B2BIM - ADMIN PANEL</div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-gray-600 hover:text-blue-600">Logout</button>
      </div>
    </nav>
  );
}
