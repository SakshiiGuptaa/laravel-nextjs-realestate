import { DealerTheme } from "@/types/dealer";
import { useMemo } from "react";

interface LuxuryThemeProps {
  branding: any;
  domain: any;
  properties?: any[];
}

export default function LuxuryTheme({
  branding,
  domain,
  properties = [],
}: LuxuryThemeProps) {
  // Add safety checks for all data
  const safeProperties = Array.isArray(properties) ? properties : [];
  const safeBranding = branding || {};
  const safeDomain = domain || {};

  const websiteUrl = safeDomain.useCustomDomain
    ? safeDomain.customDomain
    : `${safeDomain.subdomain || "demo"}.realestatepro.com`;

  // Use useMemo to prevent unnecessary re-calculations
  const validProperties = useMemo(() => {
    if (!Array.isArray(safeProperties) || safeProperties.length === 0) {
      return [];
    }

    return safeProperties
      .map((property, index) => {
        // Add safety checks for each property
        if (!property || typeof property !== "object") {
          return null;
        }

        try {
          return {
            id: property.id || `property-${index}`,
            title: String(
              property.title ||
                `${
                  property.sub_type || property.property_type || "Property"
                } in ${property.city || "Prime Location"}`
            ),
            description: String(
              property.description ||
                `${property.listing_type || "Available"} - ${
                  property.bedrooms || "N/A"
                } bedrooms, ${property.bathrooms || "N/A"} bathrooms.`
            ),
            type: String(
              property.property_type || property.listing_type || "Property"
            ),
            price: Number(property.price) || 0,
            bedrooms: String(property.bedrooms || "N/A"),
            bathrooms: String(property.bathrooms || "N/A"),
            area: property.area_value
              ? `${property.area_value} ${property.area_unit || "sq.ft"}`
              : "N/A",
            location: String(
              property.location || property.city || "Prime Location"
            ),
            images: Array.isArray(property.images) ? property.images : [],
            listingType: String(property.listing_type || "Sale"),
            subType: String(
              property.sub_type || property.property_type || "Property"
            ),
            balconies: String(property.balconies || "N/A"),
            areaType: String(property.area_type || "Built-up Area"),
          };
        } catch (error) {
          console.error("Error processing property:", error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries
  }, [safeProperties]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white">
      {/* Subtle luxury pattern */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M50 0L100 50L50 100L0 50z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              {safeBranding.logo && (
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                  <img
                    src={safeBranding.logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-light tracking-[0.2em] text-white">
                  {String(safeBranding.title || "Luxury Real Estate")}
                </h1>
                <p className="text-xs text-white/60 tracking-[0.3em] mt-1">
                  LUXURY REAL ESTATE
                </p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10">
              {["Home", "Properties", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                  className="text-sm font-light tracking-wider text-white/80 hover:text-white transition-all duration-300 relative group"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="relative text-center z-10 max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8" />
            <p className="text-sm tracking-[0.4em] text-white/70 mb-8">
              EXCEPTIONAL PROPERTIES
            </p>
          </div>

          <h2 className="text-7xl md:text-8xl font-thin mb-8 leading-none tracking-tight">
            <span className="block text-white">LUXURY</span>
            <span className="block text-white/60 text-6xl md:text-7xl mt-2">
              {String(safeBranding.tagline || "REDEFINED")}
            </span>
          </h2>

          <p className="text-xl md:text-2xl font-light mb-16 text-white/60 max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary properties where architectural excellence
            meets uncompromising luxury
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-12 py-4 bg-white text-black font-light text-sm tracking-[0.2em] transition-all duration-500 hover:bg-white/90">
              <span className="relative z-10">VIEW COLLECTION</span>
            </button>

            <button className="group relative px-12 py-4 border border-white/30 text-white font-light text-sm tracking-[0.2em] transition-all duration-500 hover:bg-white hover:text-black">
              PRIVATE CONSULTATION
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Properties Section */}
      <section
        id="properties"
        className="relative py-24 bg-gradient-to-b from-black to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8" />
            <p className="text-sm tracking-[0.4em] text-white/70 mb-8">
              PORTFOLIO
            </p>
            <h2 className="text-5xl md:text-6xl font-thin mb-8 text-white leading-tight">
              Curated Properties
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Each property represents the pinnacle of luxury living,
              meticulously selected for discerning clientele
            </p>
          </div>

          {validProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {validProperties.slice(0, 6).map((property, index) => (
                <div
                  key={property.id}
                  className="group relative bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-700 hover:border-white/30"
                >
                  {/* Property Image */}
                  <div className="relative h-80 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <div className="w-16 h-16 border border-white/20 flex items-center justify-center">
                          <div className="w-8 h-8 border-t border-r border-white/40 rotate-45" />
                        </div>
                      </div>
                    )}

                    {/* Property Type and Listing Type Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.2em] font-light">
                        {property.type
                          ? property.type.toUpperCase()
                          : "PROPERTY"}
                      </span>
                      <span
                        className={`px-3 py-1 backdrop-blur-sm border text-xs tracking-[0.2em] font-light ${
                          property.listingType === "Rent"
                            ? "bg-blue-600/60 border-blue-400/20 text-blue-100"
                            : "bg-green-600/60 border-green-400/20 text-green-100"
                        }`}
                      >
                        FOR{" "}
                        {property.listingType
                          ? property.listingType.toUpperCase()
                          : "SALE"}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Property Details */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-light mb-2 text-white tracking-wide">
                        {property.title}
                      </h3>
                      <p className="text-white/40 text-xs tracking-wider">
                        {property.subType}
                      </p>
                    </div>

                    <p className="text-white/60 mb-6 text-sm leading-relaxed font-light">
                      {property.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-2xl font-light text-white">
                        {property.price > 0
                          ? `₹${property.price.toLocaleString()}`
                          : "Price on Request"}
                        {property.listingType === "Rent" &&
                          property.price > 0 && (
                            <span className="text-sm text-white/60 ml-1">
                              /month
                            </span>
                          )}
                      </div>
                      <div className="text-white/40 text-xs tracking-[0.2em]">
                        EXCLUSIVE
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="grid grid-cols-4 gap-3 mb-8">
                      <div className="text-center py-3 border-r border-white/10">
                        <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white/60"
                          >
                            <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" />
                            <polyline points="9,22 9,12 15,12 15,22" />
                          </svg>
                        </div>
                        <div className="text-white text-sm font-light">
                          {property.bedrooms}
                        </div>
                        <div className="text-white/40 text-xs tracking-wider">
                          BEDS
                        </div>
                      </div>
                      <div className="text-center py-3 border-r border-white/10">
                        <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white/60"
                          >
                            <path d="M9 6L9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V6" />
                            <rect x="8" y="6" width="8" height="14" rx="1" />
                            <path d="M12 11V13" />
                          </svg>
                        </div>
                        <div className="text-white text-sm font-light">
                          {property.bathrooms}
                        </div>
                        <div className="text-white/40 text-xs tracking-wider">
                          BATHS
                        </div>
                      </div>
                      <div className="text-center py-3 border-r border-white/10">
                        <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white/60"
                          >
                            <rect
                              x="2"
                              y="3"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                            />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                          </svg>
                        </div>
                        <div className="text-white text-sm font-light">
                          {property.balconies}
                        </div>
                        <div className="text-white/40 text-xs tracking-wider">
                          BALC
                        </div>
                      </div>
                      <div className="text-center py-3">
                        <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white/60"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 9H15V15H9V9Z" />
                          </svg>
                        </div>
                        <div className="text-white text-sm font-light">
                          {property.area}
                        </div>
                        <div className="text-white/40 text-xs tracking-wider">
                          AREA
                        </div>
                      </div>
                    </div>

                    {/* Location and Area Type */}
                    <div className="mb-6">
                      <div className="flex items-center text-white/60 text-sm mb-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="mr-2"
                        >
                          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="font-light tracking-wide">
                          {property.location}
                        </span>
                      </div>
                      <div className="text-white/40 text-xs tracking-wider">
                        {property.areaType}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button className="w-full py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-light tracking-[0.2em]">
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto mb-8 border border-white/20 flex items-center justify-center">
                <div className="w-10 h-10 border-t border-r border-white/40 rotate-45" />
              </div>
              <h3 className="text-2xl font-light mb-4 text-white">
                Coming Soon
              </h3>
              <p className="text-white/60 text-lg font-light max-w-md mx-auto">
                Our exclusive collection of luxury properties is being carefully
                curated
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-b from-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8" />
            <p className="text-sm tracking-[0.4em] text-white/70 mb-8">
              CONTACT
            </p>
            <h2 className="text-5xl md:text-6xl font-thin mb-8 text-white leading-tight">
              Private Service
            </h2>
            <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
              Experience bespoke service with our dedicated team of luxury real
              estate specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M22 16.92V19C22 20.1046 21.1046 21 20 21C10.0589 21 2 12.9411 2 3C2 1.89543 2.89543 1 4 1H7.08C7.55607 1 7.96417 1.33193 8.03924 1.80057L8.80076 6.39943C8.87583 6.86807 8.65089 7.33193 8.22361 7.55279L6.5 8.5C7.5 11 9 12.5 11.5 13.5L12.4472 11.7764C12.6681 11.3491 13.1319 11.1242 13.6006 11.1992L18.1994 11.9608C18.6681 12.0358 19 12.4439 19 12.92V16.92H22Z" />
                  </svg>
                ),
                label: "PHONE",
                value: String(safeBranding.contactNumber || ""),
                key: "contactNumber",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "EMAIL",
                value: String(safeBranding.email || ""),
                key: "email",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                label: "ADDRESS",
                value: String(safeBranding.address || ""),
                key: "address",
              },
            ].map((contact) =>
              contact.value ? (
                <div key={contact.key} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-300">
                    <div className="text-white/60 group-hover:text-white transition-colors duration-300">
                      {contact.icon}
                    </div>
                  </div>
                  <h3 className="text-white/70 text-xs tracking-[0.3em] mb-4 font-light">
                    {contact.label}
                  </h3>
                  <p className="text-white text-lg font-light leading-relaxed">
                    {contact.value}
                  </p>
                </div>
              ) : null
            )}
          </div>

          {/* Footer */}
          <div className="mt-24 pt-12 border-t border-white/10 text-center">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
              <div className="w-2 h-2 border border-white/30 rotate-45" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
            </div>
            <p className="text-white/40 text-xs tracking-[0.3em] font-light">
              © {new Date().getFullYear()}{" "}
              {String(safeBranding.title || "Luxury Real Estate")}. ALL RIGHTS
              RESERVED.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
