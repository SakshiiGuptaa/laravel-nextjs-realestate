import { DealerTheme } from "@/types/dealer";

interface MinimalThemeProps {
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    tagline: string;
    title: string;
    contactNumber: string;
    address: string;
    email: string;
  };
  domain: {
    subdomain: string;
    customDomain: string;
    useCustomDomain: boolean;
  };
}

export default function MinimalTheme({
  branding,
  domain,
  properties = [],
}: MinimalThemeProps) {
  const websiteUrl = domain.useCustomDomain
    ? domain.customDomain
    : `${domain.subdomain}.realestatepro.com`;

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              {branding.logo && (
                <img src={branding.logo} alt="Logo" className="h-8 w-8" />
              )}
              <h1
                className="text-2xl font-light tracking-wide"
                style={{ color: branding.primaryColor || "#000" }}
              >
                {branding.title}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-12">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-light"
              >
                Home
              </a>
              <a
                href="#properties"
                className="text-gray-600 hover:text-gray-900 font-light"
              >
                Properties
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 font-light"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 font-light"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-900 leading-tight">
            {branding.tagline}
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Simple. Clean. Effective property solutions.
          </p>
          <button
            className="px-8 py-3 border font-light hover:bg-gray-900 hover:text-white transition-all duration-300"
            style={{
              borderColor: branding.primaryColor || "#000",
              color: branding.primaryColor || "#000",
            }}
          >
            View Properties
          </button>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4 text-gray-900">
              Properties
            </h2>
            <div
              className="w-16 h-0.5 mx-auto"
              style={{ backgroundColor: branding.primaryColor || "#000" }}
            ></div>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {properties.slice(0, 6).map((property) => (
                <div key={property.id} className="group">
                  <div className="h-56 bg-gray-100 overflow-hidden mb-6">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400 text-4xl">□</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-light text-gray-900">
                        {property.title}
                      </h3>
                      <span
                        className="text-xs font-light px-2 py-1 border"
                        style={{
                          borderColor: branding.primaryColor || "#000",
                          color: branding.primaryColor || "#000",
                        }}
                      >
                        {property.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 font-light line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-2xl font-light"
                        style={{ color: branding.primaryColor || "#000" }}
                      >
                        ${property.price?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 font-light">
                      <div className="flex items-center space-x-4">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 font-light">
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6 text-gray-300">□</div>
              <h3 className="text-xl font-light text-gray-900 mb-2">
                No Properties Available
              </h3>
              <p className="text-gray-600 font-light">
                Properties will be displayed here once added
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4 text-gray-900">Contact</h2>
            <div
              className="w-16 h-0.5 mx-auto"
              style={{ backgroundColor: branding.primaryColor || "#000" }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {branding.contactNumber && (
              <div className="text-center">
                <div
                  className="w-12 h-12 border flex items-center justify-center mx-auto mb-6"
                  style={{ borderColor: branding.primaryColor || "#000" }}
                >
                  <span
                    className="text-lg"
                    style={{ color: branding.primaryColor || "#000" }}
                  >
                    📞
                  </span>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 font-light">
                  {branding.contactNumber}
                </p>
              </div>
            )}

            {branding.email && (
              <div className="text-center">
                <div
                  className="w-12 h-12 border flex items-center justify-center mx-auto mb-6"
                  style={{ borderColor: branding.primaryColor || "#000" }}
                >
                  <span
                    className="text-lg"
                    style={{ color: branding.primaryColor || "#000" }}
                  >
                    📧
                  </span>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 font-light">{branding.email}</p>
              </div>
            )}

            {branding.address && (
              <div className="text-center">
                <div
                  className="w-12 h-12 border flex items-center justify-center mx-auto mb-6"
                  style={{ borderColor: branding.primaryColor || "#000" }}
                >
                  <span
                    className="text-lg"
                    style={{ color: branding.primaryColor || "#000" }}
                  >
                    📍
                  </span>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 font-light">{branding.address}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
