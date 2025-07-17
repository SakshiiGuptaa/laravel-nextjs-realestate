"use client";
import { createContext, useContext, ReactNode } from "react";
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from "@/lib/subscription";

interface SubscriptionContextType {
  userPlan: SubscriptionPlan | null;
  hasFeature: (feature: string) => boolean;
  canAccessFeature: (requiredPlan: SubscriptionPlan) => boolean;
  getMaxListings: () => number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context)
    throw new Error("useSubscription must be used within SubscriptionProvider");
  return context;
};

interface ProviderProps {
  children: ReactNode;
  userPlan: SubscriptionPlan | null;
}

export const SubscriptionProvider = ({ children, userPlan }: ProviderProps) => {
  const planHierarchy: SubscriptionPlan[] = ["silver", "gold", "platinum"];

  const hasFeature = (feature: string): boolean => {
    if (!userPlan) return false;
    return (
      SUBSCRIPTION_PLANS[userPlan].features.includes(feature) ||
      SUBSCRIPTION_PLANS[userPlan].features.includes("all_features")
    );
  };

  const canAccessFeature = (requiredPlan: SubscriptionPlan): boolean => {
    if (!userPlan) return false;
    const userIndex = planHierarchy.indexOf(userPlan);
    const requiredIndex = planHierarchy.indexOf(requiredPlan);
    return userIndex >= requiredIndex;
  };

  const getMaxListings = (): number => {
    if (!userPlan) return 0;
    return SUBSCRIPTION_PLANS[userPlan].maxListings;
  };

  const value: SubscriptionContextType = {
    userPlan,
    hasFeature,
    canAccessFeature,
    getMaxListings,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
