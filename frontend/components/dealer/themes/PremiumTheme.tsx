import { DealerTheme } from "@/types/dealer";

interface PremiumThemeProps {
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
  properties?: Array<{
    id: string | number;
    title: string;
    description: string;
    price?: number;
    type: string;
    images?: string[];
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    location?: string;
  }>;
}
export default function PremiumTheme({
  branding,
  domain,
  properties = [],
}: PremiumThemeProps) {
  const websiteUrl = domain.useCustomDomain
    ? domain.customDomain
    : `${domain.subdomain}.realestatepro.com`;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {branding.logo && (
                <img
                  src={branding.logo}
                  alt="Logo"
                  className="h-10 w-10 rounded-full"
                />
              )}
              <h1
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(45deg, ${
                    branding.primaryColor || "#3B82F6"
                  }, ${branding.secondaryColor || "#8B5CF6"})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {branding.title}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#properties"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Properties
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
            {branding.tagline}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Premium real estate solutions with cutting-edge technology and
            exceptional service
          </p>
          <button
            className="px-10 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            style={{
              background: `linear-gradient(45deg, ${
                branding.primaryColor || "#3B82F6"
              }, ${branding.secondaryColor || "#8B5CF6"})`,
            }}
          >
            Explore Properties
          </button>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Premium Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover exceptional properties with premium features and prime
              locations
            </p>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 6).map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="h-56 bg-gradient-to-r from-gray-200 to-gray-300 overflow-hidden relative">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
                        <span className="text-gray-400 text-5xl">🏢</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 text-xs font-semibold rounded-full text-white shadow-lg"
                        style={{
                          background: `linear-gradient(45deg, ${
                            branding.primaryColor || "#3B82F6"
                          }, ${branding.secondaryColor || "#8B5CF6"})`,
                        }}
                      >
                        {property.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        style={{
                          background: `linear-gradient(45deg, ${
                            branding.primaryColor || "#3B82F6"
                          }, ${branding.secondaryColor || "#8B5CF6"})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        ${property.price?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <span className="mr-1">🛏️</span>
                          {property.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-1">🚿</span>
                          {property.bathrooms}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-1">📐</span>
                          {property.area} sqft
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">📍</span>
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 text-gray-300">🏢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Premium Properties Coming Soon
              </h3>
              <p className="text-gray-600 text-lg">
                Our exclusive property collection will be available here shortly
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-lg">
              Ready to discover your perfect property? Let&apos;s connect!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branding.contactNumber && (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                  style={{
                    background: `linear-gradient(45deg, ${
                      branding.primaryColor || "#3B82F6"
                    }, ${branding.secondaryColor || "#8B5CF6"})`,
                  }}
                >
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Phone</h3>
                <p className="text-gray-600">{branding.contactNumber}</p>
              </div>
            )}

            {branding.email && (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                  style={{
                    background: `linear-gradient(45deg, ${
                      branding.primaryColor || "#3B82F6"
                    }, ${branding.secondaryColor || "#8B5CF6"})`,
                  }}
                >
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Email</h3>
                <p className="text-gray-600">{branding.email}</p>
              </div>
            )}

            {branding.address && (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                  style={{
                    background: `linear-gradient(45deg, ${
                      branding.primaryColor || "#3B82F6"
                    }, ${branding.secondaryColor || "#8B5CF6"})`,
                  }}
                >
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  Address
                </h3>
                <p className="text-gray-600">{branding.address}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {branding.title}. All rights
                reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 text-sm text-center md:text-right">
              {branding.contactNumber && (
                <div className="mb-2 md:mb-0">
                  <div className="font-bold">📞 Call</div>
                  <div>{branding.contactNumber}</div>
                </div>
              )}
              {branding.email && (
                <div>
                  <div className="font-bold">✉️ Email</div>
                  <div>{branding.email}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
