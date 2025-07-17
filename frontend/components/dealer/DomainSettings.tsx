import { useState } from "react";

interface DomainSettingsProps {
  domain: {
    subdomain: string;
    customDomain: string;
    useCustomDomain: boolean;
  };
  onChange: (domain: any) => void;
}

export default function DomainSettings({
  domain,
  onChange,
}: DomainSettingsProps) {
  const [checking, setChecking] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(
    null
  );

  const checkSubdomainAvailability = async (subdomain: string) => {
    if (!subdomain) return;

    setChecking(true);
    // Simulate API call
    setTimeout(() => {
      setSubdomainAvailable(Math.random() > 0.3); // 70% chance available
      setChecking(false);
    }, 1000);
  };

  const handleSubdomainChange = (value: string) => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    onChange({
      ...domain,
      subdomain: cleanValue,
    });

    if (cleanValue.length >= 3) {
      checkSubdomainAvailability(cleanValue);
    } else {
      setSubdomainAvailable(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Domain Settings
        </h2>
        <p className="text-gray-600">
          Choose how visitors will access your website
        </p>
      </div>

      {/* Subdomain Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Free Subdomain
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose your subdomain
            </label>
            <div className="flex flex-col sm:flex-row items-stretch">
              <input
                type="text"
                value={domain.subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your-business-name"
                maxLength={50}
              />
              <div className="px-4 py-3 bg-gray-100 border border-t-0 sm:border-t border-l-0 border-gray-300 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-sm text-gray-600">
                .realestatepro.com
              </div>
            </div>

            {/* Availability Status */}
            <div className="mt-2 flex items-center">
              {checking && (
                <div className="flex items-center text-sm text-gray-500">
                  <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full mr-2"></div>
                  Checking availability...
                </div>
              )}

              {!checking && subdomainAvailable === true && (
                <div className="flex items-center text-sm text-green-600">
                  <span className="mr-2">✓</span>
                  Available! Your website will be: {domain.subdomain}
                  .realestatepro.com
                </div>
              )}

              {!checking && subdomainAvailable === false && (
                <div className="flex items-center text-sm text-red-600">
                  <span className="mr-2">✗</span>
                  Not available. Try a different name.
                </div>
              )}
            </div>
          </div>

          {/* Subdomain Suggestions */}
          {domain.subdomain && subdomainAvailable === false && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Suggestions:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  `${domain.subdomain}realty`,
                  `${domain.subdomain}homes`,
                  `${domain.subdomain}properties`,
                  `${domain.subdomain}estate`,
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSubdomainChange(suggestion)}
                    className="text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                  >
                    {suggestion}.realestatepro.com
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Domain Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Custom Domain</h3>
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
            GOLD+ Feature
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="useCustomDomain"
              checked={domain.useCustomDomain}
              onChange={(e) =>
                onChange({
                  ...domain,
                  useCustomDomain: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="useCustomDomain"
              className="text-sm font-medium text-gray-700"
            >
              Use my own custom domain
            </label>
          </div>

          {domain.useCustomDomain && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Domain
              </label>
              <input
                type="text"
                value={domain.customDomain}
                onChange={(e) =>
                  onChange({
                    ...domain,
                    customDomain: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="www.yourbusiness.com"
              />

              {/* Domain Setup Instructions */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  Setup Instructions
                </h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    1. Point your domain's CNAME record to:{" "}
                    <code className="bg-blue-100 px-1 rounded">
                      cname.realestatepro.com
                    </code>
                  </p>
                  <p>2. We'll automatically configure SSL certificate</p>
                  <p>3. Changes may take up to 24 hours to propagate</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
