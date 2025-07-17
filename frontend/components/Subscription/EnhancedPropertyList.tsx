import { useSubscription } from "@/context/SubscriptionContext";
import PropertyList from "../property/PropertyList";
import ConditionalRender from "./ConditionalRender";
import type { Property } from "@/types/property";

interface EnhancedPropertyListProps {
  properties: Property[];
}

export default function EnhancedPropertyList({
  properties,
}: EnhancedPropertyListProps) {
  const { getMaxListings, userPlan } = useSubscription();

  const maxListings = getMaxListings();
  const limitedProperties =
    maxListings === -1 ? properties : properties.slice(0, maxListings);
  const hasMoreProperties = properties.length > limitedProperties.length;

  return (
    <div>
      {/* Show subscription badge */}
      {userPlan && (
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Viewing with</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                userPlan === "silver"
                  ? "bg-gray-100 text-gray-800"
                  : userPlan === "gold"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {userPlan.toUpperCase()} Plan
            </span>
          </div>

          {hasMoreProperties && (
            <span className="text-sm text-gray-500">
              Showing {limitedProperties.length} of {properties.length}{" "}
              properties
            </span>
          )}
        </div>
      )}

      {/* Property List */}
      <PropertyList properties={limitedProperties} />

      {/* Upgrade prompt if more properties available */}
      {hasMoreProperties && (
        <div className="mt-6">
          <ConditionalRender
            requiredPlan={userPlan === "silver" ? "gold" : "platinum"}
            showUpgradePrompt={true}
          >
            <div></div>
          </ConditionalRender>
          <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-2">
              <strong>{properties.length - limitedProperties.length}</strong>{" "}
              more properties available
            </p>
            <p className="text-sm text-gray-500">
              Upgrade your plan to view all properties
            </p>
          </div>
        </div>
      )}

      {/* Gold+ Features */}
      <ConditionalRender requiredPlan="gold">
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Gold Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                <span className="mr-2">📊</span>
                Property Analytics
              </h4>
              <p className="text-sm text-amber-700 mb-3">
                View detailed insights about property performance and market
                trends
              </p>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                View Analytics
              </button>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                <span className="mr-2">⚖️</span>
                Compare Properties
              </h4>
              <p className="text-sm text-amber-700 mb-3">
                Side-by-side comparison of up to 3 properties
              </p>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                Start Comparison
              </button>
            </div>
          </div>
        </div>
      </ConditionalRender>

      {/* Platinum Exclusive Features */}
      <ConditionalRender requiredPlan="platinum">
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💎</span>
            Platinum Exclusive
          </h3>
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="text-purple-700">
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-medium">Virtual Reality Tours</div>
                <div className="text-sm text-purple-600">
                  Immersive 3D experiences
                </div>
              </div>
              <div className="text-purple-700">
                <div className="text-2xl mb-2">📞</div>
                <div className="font-medium">Priority Support</div>
                <div className="text-sm text-purple-600">
                  24/7 dedicated assistance
                </div>
              </div>
              <div className="text-purple-700">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium">Market Intelligence</div>
                <div className="text-sm text-purple-600">
                  Exclusive market insights
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Explore Platinum Features
              </button>
            </div>
          </div>
        </div>
      </ConditionalRender>
    </div>
  );
}
