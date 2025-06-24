import PropertyCard from "./PropertyCard";
import type { Property } from "@/types/property";

export default function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  if (!properties.length) {
    return (
      <div className="text-center text-gray-500 py-8">No properties found.</div>
    );
  }
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
