import { useState } from "react";

interface BrandingCustomizerProps {
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
  onChange: (branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    tagline: string;
    title: string;
    contactNumber: string;
    address: string;
    email: string;
  }) => void;
}

export default function BrandingCustomizer({
  branding,
  onChange,
}: BrandingCustomizerProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const presetColors = [
    { name: "Blue", primary: "#3B82F6", secondary: "#10B981" },
    { name: "Purple", primary: "#8B5CF6", secondary: "#F59E0B" },
    { name: "Green", primary: "#10B981", secondary: "#3B82F6" },
    { name: "Orange", primary: "#F59E0B", secondary: "#EF4444" },
    { name: "Red", primary: "#EF4444", secondary: "#8B5CF6" },
    { name: "Teal", primary: "#14B8A6", secondary: "#F59E0B" },
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({
          ...branding,
          logo: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Customize Your Branding
        </h2>
        <p className="text-gray-800">
          Make your website uniquely yours with custom branding
        </p>
      </div>

      {/* Logo Upload */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo</h3>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Logo Preview */}
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            {branding.logo ? (
              <img
                src={branding.logo}
                alt="Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center">
                <div className="text-2xl text-gray-400 mb-1">🏢</div>
                <div className="text-xs text-gray-500">No Logo</div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Upload Logo
              </div>
            </label>
            <p className="text-sm text-gray-700 mt-2">
              Recommended: 200x200px, PNG or JPG
            </p>
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Color Scheme
        </h3>

        {/* Preset Colors */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-800 mb-3">
            Preset Color Combinations
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {presetColors.map((preset) => (
              <button
                key={preset.name}
                onClick={() =>
                  onChange({
                    ...branding,
                    primaryColor: preset.primary,
                    secondaryColor: preset.secondary,
                  })
                }
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex space-x-1">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <span className="text-sm text-gray-900">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={branding.primaryColor}
                onChange={(e) =>
                  onChange({
                    ...branding,
                    primaryColor: e.target.value,
                  })
                }
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.primaryColor}
                onChange={(e) =>
                  onChange({
                    ...branding,
                    primaryColor: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                placeholder="#3B82F6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={branding.secondaryColor}
                onChange={(e) =>
                  onChange({
                    ...branding,
                    secondaryColor: e.target.value,
                  })
                }
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.secondaryColor}
                onChange={(e) =>
                  onChange({
                    ...branding,
                    secondaryColor: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                placeholder="#10B981"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagline</h3>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Business Tagline
          </label>
          <input
            type="text"
            value={branding.tagline || ""} // ✅ Add fallback empty string
            onChange={(e) =>
              onChange({
                ...branding,
                tagline: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your Trusted Real Estate Partner"
            maxLength={100}
          />
          <p className="text-sm text-gray-700 mt-1">
            {/* ✅ Add safe length check */}
            {(branding.tagline || "").length}/100 characters
          </p>
        </div>

        {/* Tagline Suggestions */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">
            Suggestions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Your Dream Home Awaits",
              "Excellence in Real Estate",
              "Finding Homes, Building Dreams",
              "Your Property, Our Priority",
              "Trusted Real Estate Solutions",
              "Where Dreams Meet Reality",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() =>
                  onChange({
                    ...branding,
                    tagline: suggestion,
                  })
                }
                className="text-left px-3 py-2 text-sm text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                &quot;{suggestion}&quot;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Website Title
          </label>
          <input
            type="text"
            value={branding.title || ""} // ✅ Add fallback empty string
            onChange={(e) => onChange({ ...branding, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 mb-4"
            placeholder="Your Real Estate Business"
            maxLength={100}
          />

          <label className="block text-sm font-medium text-gray-800 mb-2">
            Contact Number
          </label>
          <input
            type="text"
            value={branding.contactNumber || ""} // ✅ Add fallback empty string
            onChange={(e) =>
              onChange({ ...branding, contactNumber: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 mb-4"
            placeholder="+1 (555) 123-4567"
            maxLength={30}
          />

          <label className="block text-sm font-medium text-gray-800 mb-2">
            Address
          </label>
          <input
            type="text"
            value={branding.address || ""} // ✅ Add fallback empty string
            onChange={(e) => onChange({ ...branding, address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 mb-4"
            placeholder="123 Main Street, City, State 12345"
            maxLength={100}
          />

          <label className="block text-sm font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            value={branding.email || ""} // ✅ Add fallback empty string
            onChange={(e) => onChange({ ...branding, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900"
            placeholder="your@email.com"
            maxLength={100}
          />
        </div>
      </div>
    </div>
  );
}
