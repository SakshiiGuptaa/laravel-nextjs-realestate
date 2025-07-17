"use client";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";
import ConditionalRender from "@/components/Subscription/ConditionalRender";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function DealerDashboard() {
  const { userPlan, getMaxListings, hasFeature, canAccessFeature } =
    useSubscription();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actualPropertyCount, setActualPropertyCount] = useState(0);
  const [userWebsite, setUserWebsite] = useState<any>(null);

  // Get current plan from URL or context
  const currentPlan = userPlan || "gold";

  // Handle plan change with proper URL update
  const handlePlanChange = (newPlan: "silver" | "gold" | "platinum") => {
    router.push(`/dealer?plan=${newPlan}`);
  };

  const maxListings = getMaxListings();
  const currentProperties = actualPropertyCount; // Use actual count instead of hardcoded

  // Plan-specific features
  const planFeatures = {
    silver: {
      properties: 10,
      analytics: "Basic",
      website: "Basic themes",
      leads: "25/month",
      export: false,
      customDomain: false,
      aiFeatures: false,
    },
    gold: {
      properties: 50,
      analytics: "Advanced",
      website: "Custom domain",
      leads: "100/month",
      export: true,
      customDomain: true,
      aiFeatures: false,
    },
    platinum: {
      properties: "Unlimited",
      analytics: "AI Insights",
      website: "All themes",
      leads: "Unlimited",
      export: true,
      customDomain: true,
      aiFeatures: true,
    },
  };

  const currentFeatures = planFeatures[currentPlan];

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status && data.user) {
            setUser(data.user);
          } else {
            console.warn("Profile API returned unexpected format:", data);
            setUser({ name: "Test Dealer" });
          }
        } else {
          console.warn(
            `Profile API returned ${response.status}: ${response.statusText}`
          );
          setUser({ name: "Test Dealer" });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // Set the correct user for demo (user ID 2)
        setUser({ name: "Test Dealer" });
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchPropertyCount() {
      try {
        const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setActualPropertyCount(data.properties.length);
        }
      } catch (err) {
        console.error("Failed to fetch property count:", err);
      }
    }
    fetchPropertyCount();
  }, []);

  // Add this useEffect to fetch the user's website subdomain
  useEffect(() => {
    async function fetchUserWebsite() {
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
        const data = await response.json();
        if (data.status && data.websites.length > 0) {
          setUserWebsite(data.websites[0]); // Set the first website
        }
      } catch (err) {
        console.error("Failed to fetch user website:", err);
      }
    }
    fetchUserWebsite();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-lg font-medium text-gray-700">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Demo Plan Switcher Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">🧪 Demo Mode</h3>
            <p className="text-sm text-gray-600">
              Switch between plans to see feature differences
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Test Plan:</span>
            <div className="flex space-x-1 bg-white rounded-lg p-1">
              {["silver", "gold", "platinum"].map((plan) => (
                <button
                  key={plan}
                  onClick={() =>
                    handlePlanChange(plan as "silver" | "gold" | "platinum")
                  }
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    currentPlan === plan
                      ? plan === "silver"
                        ? "bg-gray-500 text-white"
                        : plan === "gold"
                        ? "bg-amber-500 text-white"
                        : "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {plan.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section with Plan Info */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || "Dealer"}!
            </h1>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your real estate business
              today.
            </p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                currentPlan === "silver"
                  ? "bg-gray-100 text-gray-800"
                  : currentPlan === "gold"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              <span className="mr-2">
                {currentPlan === "silver"
                  ? "🥈"
                  : currentPlan === "gold"
                  ? "🥇"
                  : "💎"}
              </span>
              {currentPlan?.toUpperCase()} Plan
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Properties: {currentProperties}/
              {maxListings === -1 ? "∞" : maxListings}
            </p>
          </div>
        </div>
      </div>

      {/* Plan Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Plan Features */}
        <div
          className={`bg-white rounded-lg shadow p-6 border-l-4 ${
            currentPlan === "silver"
              ? "border-gray-500"
              : currentPlan === "gold"
              ? "border-amber-500"
              : "border-purple-500"
          }`}
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">📋</span>
            Your {currentPlan?.toUpperCase()} Plan Features
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Properties:</span>
              <span className="font-medium">
                {typeof currentFeatures.properties === "string"
                  ? currentFeatures.properties
                  : currentFeatures.properties.toString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Analytics:</span>
              <span className="font-medium">{currentFeatures.analytics}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Website:</span>
              <span className="font-medium">{currentFeatures.website}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Leads:</span>
              <span className="font-medium">{currentFeatures.leads}</span>
            </div>
          </div>
        </div>

        {/* Feature Access Demo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">🔓</span>
            Available Features
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Export Data:</span>
              {currentFeatures.export ? (
                <span className="text-green-600 font-medium">✓ Available</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Locked</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Custom Domain:</span>
              {currentFeatures.customDomain ? (
                <span className="text-green-600 font-medium">✓ Available</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Locked</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Features:</span>
              {currentFeatures.aiFeatures ? (
                <span className="text-green-600 font-medium">✓ Available</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Locked</span>
              )}
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">📊</span>
            Usage Stats
          </h3>
          <div className="space-y-3">
            {/* Property Usage */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Properties Used</span>
                <span className="font-medium">
                  {currentProperties}/{maxListings === -1 ? "∞" : maxListings}
                </span>
              </div>
              {maxListings !== -1 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentProperties >= maxListings
                        ? "bg-red-500"
                        : currentProperties > maxListings * 0.8
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (currentProperties / maxListings) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Lead Usage */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">This Month's Leads</span>
                <span className="font-medium">18/{currentFeatures.leads}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="w-1/4 bg-green-500 h-2 rounded-full transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Active Properties",
            value: currentProperties.toString(),
            change: "+3",
            color: "blue",
            limit: maxListings === -1 ? null : maxListings,
          },
          {
            label: "Total Views",
            value: "1,247",
            change: "+12%",
            color: "green",
            limit: null,
          },
          {
            label: "Leads Generated",
            value: "18",
            change: "+5",
            color: "purple",
            limit: currentFeatures.leads,
          },
          {
            label: "Website Visits",
            value: "892",
            change: "+8%",
            color: "amber",
            limit: null,
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.limit && (
                  <p className="text-xs text-gray-500">
                    Limit:{" "}
                    {typeof stat.limit === "string"
                      ? stat.limit
                      : stat.limit.toString()}
                  </p>
                )}
              </div>
              <div className="text-sm font-medium text-green-600">
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Add Property - With Real Limit Check */}
        {currentProperties < maxListings || maxListings === -1 ? (
          <Link
            href={`/dealer/properties/add${
              searchParams.get("plan")
                ? `?plan=${searchParams.get("plan")}`
                : ""
            }`}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Add New Property
                </h3>
                <p className="text-sm text-gray-600">
                  List a new property for sale or rent
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <span className="text-2xl text-gray-400">🏠</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">
                  Property Limit Reached
                </h3>
                <p className="text-sm text-gray-400">
                  Upgrade your plan to add more properties
                </p>
                <button
                  onClick={() =>
                    handlePlanChange(
                      currentPlan === "silver" ? "gold" : "platinum"
                    )
                  }
                  className="mt-2 bg-amber-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-amber-700"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Website Builder */}
        <Link
          href={`/dealer/website${
            searchParams.get("plan") ? `?plan=${searchParams.get("plan")}` : ""
          }`}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">🌐</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center">
                Customize Website
                {currentFeatures.customDomain && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1 py-0.5 rounded">
                    Custom Domain
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600">
                Update your website design and content
              </p>
            </div>
          </div>
        </Link>

        {/* Lead Management */}
        <Link
          href={`/dealer/leads${
            searchParams.get("plan") ? `?plan=${searchParams.get("plan")}` : ""
          }`}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center">
                Manage Leads
                {currentFeatures.export && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                    Export
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600">
                Follow up with potential buyers
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Subscription-Aware Feature Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Export Features - Gold+ */}
        <ConditionalRender requiredPlan="gold" showUpgradePrompt={true}>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Export Features
              <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                GOLD+
              </span>
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                📈 Export Property Analytics
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                👥 Export Lead Database
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                🏠 Export Property Listings
              </button>
            </div>
          </div>
        </ConditionalRender>

        {/* AI Features - Platinum Only */}
        <ConditionalRender requiredPlan="platinum" showUpgradePrompt={true}>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🤖</span>
              AI Features
              <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                PLATINUM
              </span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900">
                  🎯 AI Lead Scoring
                </h4>
                <p className="text-sm text-gray-600">
                  Automatically rank leads by conversion probability
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900">💰 Smart Pricing</h4>
                <p className="text-sm text-gray-600">
                  AI-powered price recommendations
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-900">
                  📊 Market Insights
                </h4>
                <p className="text-sm text-gray-600">
                  Advanced market trend analysis
                </p>
              </div>
            </div>
          </div>
        </ConditionalRender>
      </div>

      {/* Website Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">
                {userWebsite?.subdomain
                  ? `${userWebsite.subdomain}.realestatepro.com`
                  : currentFeatures.customDomain
                  ? "yourdomain.com"
                  : "johndoe.realestatepro.com"}
              </p>
              <p className="text-sm text-gray-600">Last updated 2 hours ago</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <a
              href={
                userWebsite?.subdomain
                  ? `http://localhost:3000/dealer-sites/${userWebsite.subdomain}`
                  : `http://localhost:3000/dealer-sites/johndoe`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              🔗 Visit Site
            </a>
            <Link
              href={`/dealer/website${
                searchParams.get("plan")
                  ? `?plan=${searchParams.get("plan")}`
                  : ""
              }`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ✏️ Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
