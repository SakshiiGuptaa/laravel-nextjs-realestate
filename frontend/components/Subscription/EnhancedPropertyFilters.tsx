import { useState } from "react";
import PropertyFilters from "../property/PropertyFilters";
import ConditionalRender from "./ConditionalRender";
import type { Filters } from "@/types/property";

interface EnhancedPropertyFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function EnhancedPropertyFilters({
  filters,
  onChange,
}: EnhancedPropertyFiltersProps) {
  const [advancedFilters, setAdvancedFilters] = useState({
    priceMin: "",
    priceMax: "",
    amenities: [] as string[],
    propertyAge: "",
    furnishing: "",
  });

  return (
    <div className="space-y-6">
      {/* Basic Filters - Available to all */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Basic Filters</h3>
        <PropertyFilters filters={filters} onChange={onChange} />
      </div>

      {/* Gold+ Advanced Filters */}
      <ConditionalRender requiredPlan="gold" showUpgradePrompt={true}>
        <div className="border-t pt-6">
          <h3 className="font-semibold text-amber-700 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Advanced Filters (Gold+)
          </h3>

          <div className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (₹)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Min Price"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={advancedFilters.priceMin}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      priceMin: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Max Price"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={advancedFilters.priceMax}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      priceMax: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Gym",
                  "Swimming Pool",
                  "Parking",
                  "Garden",
                  "Security",
                  "Elevator",
                  "Clubhouse",
                  "Power Backup",
                ].map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      checked={advancedFilters.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAdvancedFilters((prev) => ({
                            ...prev,
                            amenities: [...prev.amenities, amenity],
                          }));
                        } else {
                          setAdvancedFilters((prev) => ({
                            ...prev,
                            amenities: prev.amenities.filter(
                              (a) => a !== amenity
                            ),
                          }));
                        }
                      }}
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Age
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={advancedFilters.propertyAge}
                onChange={(e) =>
                  setAdvancedFilters((prev) => ({
                    ...prev,
                    propertyAge: e.target.value,
                  }))
                }
              >
                <option value="">Any Age</option>
                <option value="new">Under Construction</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5-10">5-10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>
          </div>
        </div>
      </ConditionalRender>

      {/* Platinum Premium Features */}
      <ConditionalRender requiredPlan="platinum" showUpgradePrompt={true}>
        <div className="border-t pt-6">
          <h3 className="font-semibold text-purple-700 mb-4 flex items-center">
            <span className="mr-2">💎</span>
            Premium Features (Platinum)
          </h3>

          <div className="space-y-4">
            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                <span className="mr-2">🤖</span>
                AI Property Recommendations
              </h4>
              <p className="text-sm text-purple-600 mb-3">
                Get personalized property suggestions based on your search
                history and preferences
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors w-full">
                Generate AI Suggestions
              </button>
            </div>

            {/* Market Intelligence */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <span className="mr-2">📊</span>
                Market Intelligence
              </h4>
              <p className="text-sm text-blue-600 mb-3">
                Access real-time market trends, price analysis, and investment
                insights
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full">
                View Market Report
              </button>
            </div>

            {/* Custom Alerts */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <span className="mr-2">🔔</span>
                Smart Alerts
              </h4>
              <p className="text-sm text-green-600 mb-3">
                Set up intelligent alerts for new properties matching your
                criteria
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-full">
                Setup Alerts
              </button>
            </div>
          </div>
        </div>
      </ConditionalRender>
    </div>
  );
}
