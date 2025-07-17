import { ReactNode } from "react";
import { useSubscription } from "@/context/SubscriptionContext";
import { SubscriptionPlan } from "@/lib/subscription";
import UpgradePrompt from "./UpgradePrompt";

interface ConditionalRenderProps {
  requiredPlan: SubscriptionPlan;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export default function ConditionalRender({
  requiredPlan,
  children,
  fallback,
  showUpgradePrompt = false,
}: ConditionalRenderProps) {
  const { canAccessFeature, userPlan } = useSubscription();

  if (canAccessFeature(requiredPlan)) {
    return <>{children}</>;
  }

  if (showUpgradePrompt) {
    return <UpgradePrompt requiredPlan={requiredPlan} currentPlan={userPlan} />;
  }

  return fallback ? <>{fallback}</> : null;
}
