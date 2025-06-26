// components/PropertyTypes.tsx
import Image from "next/image";

const propertyTypes = [
  {
    name: "Apartments",
    projects: "5000+ Projects",
    imageUrl: "/property-types/apartments.jpg",
    gridSpan: "row-span-2",
  },
  {
    name: "Villas",
    projects: "1000+ Projects",
    imageUrl: "/property-types/villas.jpg",
    highlight: true,
  },
  {
    name: "Plots",
    projects: "1500+ Projects",
    imageUrl: "/property-types/plots.jpg",
  },
];

export default function PropertyTypes() {
  return (
    <section className="px-6 py-12 bg-white text-center">
      <h2 className="text-2xl font-bold text-gray-900">Explore By Property Type</h2>
      <p className="text-gray-600 mt-2">
        Power your search with our Roofandfloor real estate platform, for timely listings and a seamless experience.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {propertyTypes.map((type, index) => (
          <div
            key={index}
            className={`relative group overflow-hidden rounded-lg ${type.gridSpan || ""} ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <Image
              src={type.imageUrl}
              alt={type.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
              <h3 className="text-white text-xl font-bold">{type.name}</h3>
              <p className="text-white text-sm">{type.projects}</p>
              {type.highlight && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded font-semibold text-sm">
                  {type.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
