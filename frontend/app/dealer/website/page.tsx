"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import axios from "axios";
import { useSubscription } from "@/context/SubscriptionContext";
import { DealerTheme } from "@/types/dealer";
import toast from "react-hot-toast";

import ThemeSelector from "@/components/dealer/ThemeSelector";
import BrandingCustomizer from "@/components/dealer/BrandingCustomizer";
import WebsitePreview from "@/components/dealer/WebsitePreview";
import DomainSettings from "@/components/dealer/DomainSettings";
import ModernTheme from "@/components/dealer/themes/ModernTheme";
import LuxuryTheme from "@/components/dealer/themes/LuxuryTheme";
import MinimalTheme from "@/components/dealer/themes/MinimalTheme";
import PremiumTheme from "@/components/dealer/themes/PremiumTheme";

const availableThemes: DealerTheme[] = [
  {
    id: "modern",
    name: "Modern Professional",
    preview: "/themes/modern-preview.png",
    features: [
      "Responsive Design",
      "Property Gallery",
      "Contact Forms",
      "SEO Optimized",
    ],
    availableFor: ["silver", "gold", "platinum"],
  },
  {
    id: "luxury",
    name: "Luxury Estate",
    preview: "/themes/luxury-preview.png",
    features: [
      "Premium Design",
      "Video Backgrounds",
      "Advanced Gallery",
      "Custom Animations",
    ],
    availableFor: ["gold", "platinum"],
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    preview: "/themes/minimal-preview.png",
    features: [
      "Clean Layout",
      "Fast Loading",
      "Mobile First",
      "Simple Navigation",
    ],
    availableFor: ["silver", "gold", "platinum"],
  },
  {
    id: "premium",
    name: "Premium Business",
    preview: "/themes/premium-preview.png",
    features: [
      "Full Customization",
      "Advanced Features",
      "Priority Support",
      "Custom Integrations",
    ],
    availableFor: ["platinum"],
  },
];

const themeComponents = {
  modern: ModernTheme,
  luxury: LuxuryTheme,
  minimal: MinimalTheme,
  premium: PremiumTheme,
};

export default function DealerAddPropertyPage() {
  const { userPlan, canAccessFeature, hasFeature } = useSubscription();

  const [activeTab, setActiveTab] = useState<
    "theme" | "branding" | "domain" | "preview"
  >("theme");
  const [selectedTheme, setSelectedTheme] = useState<DealerTheme>(
    availableThemes[0]
  );
  const [branding, setBranding] = useState({
    logo: "",
    title: "Your Website Title",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    tagline: "Your Trusted Real Estate Partner",
    contactNumber: "",
    address: "",
    email: "",
  });
  const [domain, setDomain] = useState({
    subdomain: "johndoe",
    customDomain: "",
    useCustomDomain: false,
  });
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const tabs = [
    { id: "theme", name: "Choose Theme", icon: "🎨" },
    { id: "branding", name: "Customize Branding", icon: "🎯" },
    { id: "domain", name: "Domain Settings", icon: "🌐" },
    { id: "preview", name: "Preview & Publish", icon: "👁️" },
  ];

  const canUseCustomDomain =
    hasFeature("custom_domain") || canAccessFeature("gold");

  const fetchProperties = async () => {
    try {
      setPropertiesLoading(true);
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties || []);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {
    async function fetchWebsiteConfig() {
      try {
        const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dealer/websites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status && data.websites && data.websites.length > 0) {
            const config = data.websites[0];
            setWebsiteId(config.id);
            setSelectedTheme(
              availableThemes.find((t) => t.id === config.theme_id) ||
                availableThemes[0]
            );

            setBranding({
              logo: config.branding?.logo || "",
              title: config.branding?.title || "Your Website Title",
              primaryColor: config.branding?.primaryColor || "#3B82F6",
              secondaryColor: config.branding?.secondaryColor || "#10B981",
              tagline:
                config.branding?.tagline || "Your Trusted Real Estate Partner",
              contactNumber: config.branding?.contactNumber || "",
              address: config.branding?.address || "",
              email: config.branding?.email || "",
            });

            setDomain({
              subdomain: config.subdomain || "johndoe",
              customDomain: config.custom_domain || "",
              useCustomDomain: config.use_custom_domain || false,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch website config:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWebsiteConfig();
    fetchProperties();
  }, []);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      // Validate required fields
      if (!branding.title.trim()) {
        toast.error("Website title is required");
        return;
      }

      if (!domain.subdomain.trim()) {
        toast.error("Subdomain is required");
        return;
      }

      const payload = {
        theme_id: selectedTheme.id,
        branding: branding,
        subdomain: domain.subdomain,
        custom_domain: domain.customDomain,
        use_custom_domain: domain.useCustomDomain,
        is_active: true,
        status: "published",
      };

      // Add website ID if updating existing website
      if (websiteId) {
        payload.id = parseInt(websiteId);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/websites`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        // Update websiteId if it was a new website
        if (!websiteId && data.website) {
          setWebsiteId(data.website.id.toString());
        }

        toast.success("Website published successfully!");
        
        // Construct the website URL for local development
        const websiteUrl = domain.useCustomDomain && domain.customDomain
          ? `https://${domain.customDomain}`
          : `http://localhost:3000/dealer-sites/${domain.subdomain}`;

        // Show success message with link
        toast.success(
          <div>
            <div>Website is now live!</div>
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Visit your website
            </a>
          </div>,
          { duration: 5000 }
        );

        // Optional: Auto-redirect to the website
        setTimeout(() => {
          window.open(websiteUrl, "_blank");
        }, 1000);

      } else {
        toast.error(data.message || "Failed to publish website");
      }
    } catch (error) {
      console.error("Error publishing website:", error);
      toast.error("An error occurred while publishing the website");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      const payload = {
        theme_id: selectedTheme.id,
        branding,
        subdomain: domain.subdomain,
        custom_domain: domain.customDomain,
        use_custom_domain: domain.useCustomDomain,
        status: "draft",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/websites/${websiteId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Draft saved!");
      } else {
        toast.error("Failed to save draft");
      }
    } catch (err) {
      toast.error("Failed to save draft");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Website Builder
            </h1>
            <p className="text-gray-600">
              Create and customize your professional real estate website
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {userPlan?.toUpperCase()} Plan
          </span>
        </div>
      </div>

      {/* Progress Tabs */}
      <div className="mb-8">
        <nav className="flex flex-wrap gap-2 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "theme" | "branding" | "domain" | "preview"
                )
              }
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-700 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Responsive Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {activeTab === "theme" && (
            <ThemeSelector
              themes={availableThemes}
              selectedTheme={selectedTheme}
              onThemeSelect={setSelectedTheme}
              userPlan={userPlan || "silver"}
            />
          )}

          {activeTab === "branding" && (
            <BrandingCustomizer branding={branding} onChange={setBranding} />
          )}

          {activeTab === "domain" &&
            (canUseCustomDomain ? (
              <DomainSettings domain={domain} onChange={setDomain} />
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🌐</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Custom Domain
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Use your own domain name with Gold plan or higher
                  </p>
                  <button className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors w-full sm:w-auto">
                    Upgrade to Gold
                  </button>
                </div>
              </div>
            ))}

          {activeTab === "preview" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Website Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Theme:</span>
                    <span className="ml-2 font-medium">
                      {selectedTheme.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">URL:</span>
                    <span className="ml-2 font-medium">
                      {domain.useCustomDomain && domain.customDomain
                        ? domain.customDomain
                        : `localhost:3000/dealer-sites/${domain.subdomain}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Primary Color:</span>
                    <div
                      className="ml-2 inline-block w-4 h-4 rounded"
                      style={{
                        backgroundColor: branding.primaryColor,
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-gray-500">Tagline:</span>
                    <span className="ml-2 font-medium">{branding.tagline}</span>
                  </div>
                </div>
              </div>

              {/* Website Status */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Publication Status</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${websiteId ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600">
                      {websiteId ? 'Website Published' : 'Ready to Publish'}
                    </span>
                  </div>
                  {websiteId && (
                    <a
                      href={`http://localhost:3000/dealer-sites/${domain.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Live Website →
                    </a>
                  )}
                </div>
              </div>

              {/* Publish Button */}
              <div className="bg-white rounded-lg shadow p-6">
                <button
                  className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                    isPublishing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                  }`}
                  onClick={handlePublish}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    <>
                      🚀 {websiteId ? 'Update' : 'Publish'} Website
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {websiteId
                    ? 'Update your live website with the latest changes'
                    : 'Make your website live and accessible to visitors'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1 lg:row-span-2 mt-8 lg:mt-0">
          {propertiesLoading ? (
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading preview...</p>
              </div>
            </div>
          ) : (
            <WebsitePreview
              theme={selectedTheme}
              branding={branding}
              domain={domain}
              properties={properties}
              large
            />
          )}
        </div>
      </div>
    </div>
  );
}
