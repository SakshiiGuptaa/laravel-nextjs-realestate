import { DealerTheme } from "@/types/dealer";
import ModernTheme from "./themes/ModernTheme";
import LuxuryTheme from "./themes/LuxuryTheme";
import MinimalTheme from "./themes/MinimalTheme";
import PremiumTheme from "./themes/PremiumTheme";

interface WebsitePreviewProps {
  theme: DealerTheme;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    tagline: string;
  };
  domain: {
    subdomain: string;
    customDomain: string;
    useCustomDomain: boolean;
  };
}

export default function WebsitePreview({
  theme,
  branding,
  domain,
}: WebsitePreviewProps) {
  const websiteUrl = domain.useCustomDomain
    ? domain.customDomain
    : `${domain.subdomain}.realestatepro.com`;

  const renderTheme = () => {
    switch (theme.id) {
      case "modern":
        return <ModernTheme branding={branding} domain={domain} />;
      case "luxury":
        return <LuxuryTheme branding={branding} domain={domain} />;
      case "minimal":
        return <MinimalTheme branding={branding} domain={domain} />;
      case "premium":
        return <PremiumTheme branding={branding} domain={domain} />;
      default:
        return <ModernTheme branding={branding} domain={domain} />;
    }
  };

  return (
    <div className="sticky top-6 md:static md:top-0 w-full max-w-5xl mx-auto md:mx-0">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-full">
        {/* Preview Header */}
        <div className="bg-gray-50 px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Live Preview</h3>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 truncate">
            {websiteUrl}
          </div>
        </div>

        {/* Theme Preview */}
        <div
          className="bg-gray-100 overflow-auto w-full flex justify-center py-4"
          style={{ minHeight: 500, maxHeight: 800 }}
        >
          <div
            className="w-full"
            style={{
              maxWidth: 1200,
              minHeight: 600,
              border: "1px solid #e5e7eb",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
              background: "#fff",
            }}
          >
            {renderTheme()}
          </div>
        </div>

        {/* Preview Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Theme: {theme.name}</span>
            <a
              href={`/dealer-sites/${domain.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Open in New Tab →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
