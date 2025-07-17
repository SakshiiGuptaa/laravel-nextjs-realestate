import { DealerTheme } from "@/types/dealer";
import Image from "next/image";
import ModernTheme from "@/components/dealer/themes/ModernTheme";
import LuxuryTheme from "@/components/dealer/themes/LuxuryTheme";
import MinimalTheme from "@/components/dealer/themes/MinimalTheme";
import PremiumTheme from "@/components/dealer/themes/PremiumTheme";

interface ThemeSelectorProps {
  themes: DealerTheme[];
  selectedTheme: DealerTheme;
  onThemeSelect: (theme: DealerTheme) => void;
  userPlan: "silver" | "gold" | "platinum";
}

export default function ThemeSelector({
  themes,
  selectedTheme,
  onThemeSelect,
  userPlan,
}: ThemeSelectorProps) {
  const canAccessTheme = (theme: DealerTheme) => {
    return theme.availableFor.includes(userPlan);
  };

  const getRequiredPlan = (theme: DealerTheme) => {
    const sortedPlans = theme.availableFor.sort((a, b) => {
      const plans = { silver: 1, gold: 2, platinum: 3 };
      return plans[a] - plans[b];
    });
    return sortedPlans[0];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Choose Your Website Theme
        </h2>
        <p className="text-gray-600">
          Select a professional theme that represents your brand
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {themes.map((theme) => {
          const canAccess = canAccessTheme(theme);
          const isSelected = selectedTheme.id === theme.id;

          return (
            <div
              key={theme.id}
              className={`relative bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-blue-500 shadow-lg"
                  : canAccess
                  ? "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  : "border-gray-200 opacity-60"
              }`}
              onClick={() => canAccess && onThemeSelect(theme)}
            >
              {/* Theme Preview */}
              <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
                  {theme.id === "modern" && (
                    <ModernTheme
                      branding={{
                        logo: "",
                        primaryColor: "#3B82F6",
                        secondaryColor: "#10B981",
                        tagline: "Your Real Estate Partner",
                      }}
                      domain={{
                        subdomain: "preview",
                        customDomain: "",
                        useCustomDomain: false,
                      }}
                    />
                  )}
                  {theme.id === "luxury" && (
                    <LuxuryTheme
                      branding={{
                        logo: "",
                        primaryColor: "#F59E0B",
                        secondaryColor: "#EF4444",
                        tagline: "Luxury Living Awaits",
                      }}
                      domain={{
                        subdomain: "preview",
                        customDomain: "",
                        useCustomDomain: false,
                      }}
                    />
                  )}
                  {theme.id === "minimal" && (
                    <MinimalTheme
                      branding={{
                        logo: "",
                        primaryColor: "#6B7280",
                        secondaryColor: "#9CA3AF",
                        tagline: "simple. elegant. home.",
                      }}
                      domain={{
                        subdomain: "preview",
                        customDomain: "",
                        useCustomDomain: false,
                      }}
                    />
                  )}
                  {theme.id === "premium" && (
                    <PremiumTheme
                      branding={{
                        logo: "",
                        primaryColor: "#8B5CF6",
                        secondaryColor: "#06B6D4",
                        tagline: "Premium Real Estate Excellence",
                      }}
                      domain={{
                        subdomain: "preview",
                        customDomain: "",
                        useCustomDomain: false,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Theme Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {theme.name}
                </h3>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {theme.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                {canAccess ? (
                  <button
                    onClick={() => onThemeSelect(theme)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select Theme"}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      disabled
                      className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                    >
                      Upgrade Required
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      Upgrade to {getRequiredPlan(theme).toUpperCase()} plan to
                      use this theme
                    </p>
                  </div>
                )}
              </div>

              {/* Lock Overlay */}
              {!canAccess && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-sm font-medium text-gray-600">
                      {getRequiredPlan(theme).toUpperCase()} Plan Required
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Plan Upgrade Prompt */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6 border border-blue-200 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Want access to all themes?
            </h4>
            <p className="text-sm text-gray-600">
              Upgrade your plan to unlock premium themes and features
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
