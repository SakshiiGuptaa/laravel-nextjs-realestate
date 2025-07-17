export const SUBSCRIPTION_PLANS = {
  silver: {
    id: "silver",
    name: "Silver",
    maxListings: 10,
    features: ["basic_analytics", "email_notifications", "basic_branding"],
    price: 99,
    color: "#6B7280",
  },
  gold: {
    id: "gold",
    name: "Gold",
    maxListings: 25,
    features: [
      "advanced_analytics",
      "comparison_tool",
      "enhanced_branding",
      "priority_support",
    ],
    price: 199,
    color: "#F59E0B",
  },
  platinum: {
    id: "platinum",
    name: "Platinum",
    maxListings: -1, // unlimited
    features: [
      "all_features",
      "client_portal",
      "market_intelligence",
      "dedicated_support",
    ],
    price: 399,
    color: "#8B5CF6",
  },
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
