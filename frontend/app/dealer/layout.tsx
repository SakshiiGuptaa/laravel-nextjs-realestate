"use client";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan") as
    | "silver"
    | "gold"
    | "platinum"
    | null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userPlan] = useState<"silver" | "gold" | "platinum">(
    planFromUrl || "gold"
  );
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dealer", icon: "🏠" },
    { name: "Properties", href: "/dealer/properties", icon: "🏢" },
    { name: "Leads", href: "/dealer/leads", icon: "👥" },
    { name: "Analytics", href: "/dealer/analytics", icon: "📊" },
    { name: "Website", href: "/dealer/website", icon: "🌐" },
  ];

  return (
    <SubscriptionProvider userPlan={userPlan}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Topbar (always visible) */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl focus:outline-none text-gray-900"
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <span className="font-bold text-lg text-gray-900">
              Dealer Dashboard
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              userPlan === "silver"
                ? "bg-gray-100 text-gray-900"
                : userPlan === "gold"
                ? "bg-amber-100 text-amber-900"
                : "bg-purple-100 text-purple-900"
            }`}
          >
            {userPlan.toUpperCase()} Plan
          </span>
        </div>

        {/* Slide-in Sidebar Drawer (always used) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative w-64 bg-white shadow-lg z-50 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg text-gray-900">
                  Dealer Dashboard
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-2xl text-gray-900"
                  aria-label="Close sidebar"
                >
                  ×
                </button>
              </div>
              <nav className="flex-1 mt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={`${item.href}${
                      planFromUrl ? `?plan=${planFromUrl}` : ""
                    }`}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="m-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {userPlan === "platinum"
                      ? "You're on the best plan!"
                      : "Upgrade Your Plan"}
                  </h4>
                  <p className="text-xs text-gray-800 mb-3">
                    {userPlan === "platinum"
                      ? "Enjoy all premium features"
                      : "Unlock more features and listings"}
                  </p>
                  {userPlan !== "platinum" && (
                    <button className="w-full bg-blue-600 text-white text-xs py-2 rounded font-medium hover:bg-blue-700 transition-colors">
                      View Plans
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="w-full max-w-none p-2 sm:p-4">{children}</div>
        </main>
      </div>
    </SubscriptionProvider>
  );
}
