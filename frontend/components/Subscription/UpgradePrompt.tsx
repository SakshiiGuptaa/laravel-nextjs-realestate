import { SubscriptionPlan, SUBSCRIPTION_PLANS } from "@/lib/subscription";

interface UpgradePromptProps {
  requiredPlan: SubscriptionPlan;
  currentPlan: SubscriptionPlan | null;
  className?: string;
}

export default function UpgradePrompt({
  requiredPlan,
  currentPlan,
  className = "",
}: UpgradePromptProps) {
  const requiredPlanData = SUBSCRIPTION_PLANS[requiredPlan];

  return (
    <div
      className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300 text-center ${className}`}
    >
      <div className="mb-2">
        <span className="text-2xl">🔒</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">
        {requiredPlanData.name} Feature
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        {currentPlan
          ? `Upgrade from ${currentPlan.toUpperCase()} to ${
              requiredPlanData.name
            } to unlock this feature`
          : `Upgrade to ${requiredPlanData.name} to unlock this feature`}
      </p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        onClick={() => {
          console.log(`Upgrade to ${requiredPlan}`);
        }}
      >
        Upgrade Now
      </button>
    </div>
  );
}
