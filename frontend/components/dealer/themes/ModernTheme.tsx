// components/dealer/themes/ModernTheme.tsx
import { DealerTheme } from "@/types/dealer";

interface ModernThemeProps {
  branding: any;
  domain: any;
  properties?: any[]; // Add this line
}

export default function ModernTheme({
  branding,
  domain,
  properties = [],
}: ModernThemeProps) {
  const websiteUrl = domain.useCustomDomain
    ? domain.customDomain
    : `${domain.subdomain}.realestatepro.com`;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {branding.logo && (
                <img src={branding.logo} alt="Logo" className="h-8 w-8" />
              )}
              <h1
                className="text-2xl font-bold"
                style={{ color: branding.primaryColor }}
              >
                {branding.title}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a
                href="#properties"
                className="text-gray-600 hover:text-gray-900"
              >
                Properties
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
        style={{
          background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {branding.tagline}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Find your perfect property with our expert guidance
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            View Properties
          </button>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties
            </p>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 6).map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400 text-4xl">🏠</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {property.title}
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${branding.primaryColor}20`,
                          color: branding.primaryColor,
                        }}
                      >
                        {property.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: branding.primaryColor }}
                      >
                        ${property.price?.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>🛏️ {property.bedrooms}</span>
                        <span>🚿 {property.bathrooms}</span>
                        <span>📐 {property.area} sqft</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span>📍 {property.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties Yet
              </h3>
              <p className="text-gray-600">
                Properties will appear here once you add them to your inventory
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600">
              Ready to find your dream property? Contact us today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branding.contactNumber && (
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <span className="text-white text-xl">📞</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">{branding.contactNumber}</p>
              </div>
            )}

            {branding.email && (
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <span className="text-white text-xl">📧</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">{branding.email}</p>
              </div>
            )}

            {branding.address && (
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">{branding.address}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
