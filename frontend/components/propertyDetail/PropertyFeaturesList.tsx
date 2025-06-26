import React from "react";

/**
 * Props for PropertyFeaturesList
 * @property features - Array of feature strings
 */
type PropertyFeaturesListProps = {
  features: string[];
};

/**
 * Icon map for features.
 * You can expand this map with more icons as needed.
 */
const featureIcons: Record<string, string> = {
  "Power Back-up": "🔌",
  "Intercom Facility": "☎️",
  "Lift(s)": "🛗",
  "Water purifier": "💧",
  "Maintenance Staff": "🧹",
  "Swimming Pool": "🏊",
  Park: "🌳",
  "Security Personnel": "🛡️",
  "Airy Rooms": "💨",
  "Shopping Centre": "🛍️",
};

/**
 * PropertyFeaturesList Component
 *
 * Displays a grid of additional property features with icons and labels.
 * All data is driven by the features array (no hardcoded UI).
 */
export default function PropertyFeaturesList({
  features,
}: PropertyFeaturesListProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="text-xl font-bold text-gray-900 tracking-tight mb-4">
          Features
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div
              key={feature + idx}
              className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 text-gray-800 border border-gray-100"
            >
              <span className="text-xl" role="img" aria-label={feature}>
                {featureIcons[feature] || "✔️"}
              </span>
              <span className="text-base font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
