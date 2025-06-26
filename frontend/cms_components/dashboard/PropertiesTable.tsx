import Link from "next/link";
type Property = {
  id: number;
  title: string;
  price: string;
  area: number;
  price2: string;
  location: string;
  bhk: number;
  bathrooms: number;
  balconies: number;
  area_type: string;
  description: string;
  builder: string;
  phoneNumber: string;
  isRera: boolean;
  isZeroBrokerage: boolean;
  is3D: boolean;
  isNewBooking: boolean;
  images: string[];
  videos: string[];
  amenities: string[];
};


type PropertiesTableProps = {
  properties: Property[];
};

export default function PropertiesTable({ properties }: PropertiesTableProps) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full min-w-[900px] divide-y divide-gray-200">
      <thead className="bg-gray-50 p-2">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">S No.</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Title</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Property Type</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">City</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">BHK</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Bathrooms</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Balconies</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Area Type</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Area</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Price</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">Builder</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {properties.map((property, index) => (
          <tr key={property.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{property.title}</td>
            <td className="px-4 py-2 text-gray-700 capitalize whitespace-nowrap">{property.description}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.location}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.bhk}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.bathrooms}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.balconies}</td>
            <td className="px-4 py-2 text-gray-700 capitalize whitespace-nowrap">{property.area_type}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.area} sq.ft</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.price}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{property.builder}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <Link href={`/cms_dashboard/properties/${property.id}/edit`}>
                <button className="text-blue-600 hover:underline text-sm">Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
