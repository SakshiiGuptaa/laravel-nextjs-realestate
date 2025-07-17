"use client";
import { useState } from "react";
import { useSubscription } from "@/context/SubscriptionContext"; // ✅ ADD THIS
import ConditionalRender from "@/components/Subscription/ConditionalRender"; // ✅ ADD THIS

// Mock data for analytics
const mockAnalytics = {
  overview: {
    totalViews: 1247,
    totalLeads: 18,
    activeProperties: 24,
    websiteVisits: 892,
    conversionRate: 1.4,
  },
  chartData: {
    propertyViews: [
      { month: "Jan", views: 120 },
      { month: "Feb", views: 180 },
      { month: "Mar", views: 240 },
      { month: "Apr", views: 200 },
      { month: "May", views: 280 },
      { month: "Jun", views: 320 },
    ],
    leadGeneration: [
      { month: "Jan", leads: 2 },
      { month: "Feb", leads: 4 },
      { month: "Mar", leads: 6 },
      { month: "Apr", leads: 3 },
      { month: "May", leads: 8 },
      { month: "Jun", leads: 12 },
    ],
    topProperties: [
      { id: "1", title: "Modern 2BHK Apartment", views: 284, leads: 8 },
      { id: "2", title: "Luxury Villa", views: 156, leads: 4 },
      { id: "3", title: "Studio Apartment", views: 98, leads: 2 },
    ],
  },
};

export default function DealerAnalyticsPage() {
  const { hasFeature, canAccessFeature, userPlan } = useSubscription(); // ✅ ADD THIS
  const [timeRange, setTimeRange] = useState("6months");

  interface ChartItem {
    month: string;
    [key: string]: string | number;
  }

  interface SimpleBarChartProps {
    data: ChartItem[];
    dataKey: string;
    color?: string;
  }

  const SimpleBarChart = ({
    data,
    dataKey,
    color = "#3B82F6",
  }: SimpleBarChartProps) => {
    const maxValue = Math.max(...data.map((item) => Number(item[dataKey])));

    return (
      <div className="flex items-end space-x-2 h-32">
        {data.map((item, index: number) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-t transition-all duration-500 hover:opacity-80"
              style={{
                backgroundColor: color,
                height: `${(Number(item[dataKey]) / maxValue) * 100}%`,
                minHeight: "4px",
              }}
            />
            <span className="text-xs text-gray-500 mt-1">{item.month}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header with plan info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-gray-600 text-sm">
              Track your property performance and leads
            </p>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {userPlan?.toUpperCase()}
            </span>
          </div>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Basic Overview Stats - Available for all plans */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          {
            label: "Total Property Views",
            value: mockAnalytics.overview.totalViews.toLocaleString(),
            change: "+12%",
            positive: true,
            icon: "👁️",
          },
          {
            label: "Leads Generated",
            value: mockAnalytics.overview.totalLeads,
            change: "+5",
            positive: true,
            icon: "👥",
          },
          {
            label: "Active Properties",
            value: mockAnalytics.overview.activeProperties,
            change: "+3",
            positive: true,
            icon: "🏠",
          },
          {
            label: "Website Visits",
            value: mockAnalytics.overview.websiteVisits.toLocaleString(),
            change: "+8%",
            positive: true,
            icon: "🌐",
          },
          {
            label: "Conversion Rate",
            value: `${mockAnalytics.overview.conversionRate}%`,
            change: "+0.2%",
            positive: true,
            icon: "📈",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`text-sm font-medium ${
                  stat.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Views Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Property Views
            </h3>
            <span className="text-sm text-gray-500">Last 6 months</span>
          </div>
          <SimpleBarChart
            data={mockAnalytics.chartData.propertyViews}
            dataKey="views"
            color="#3B82F6"
          />
        </div>

        {/* Lead Generation Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Lead Generation
            </h3>
            <span className="text-sm text-gray-500">Last 6 months</span>
          </div>
          <SimpleBarChart
            data={mockAnalytics.chartData.leadGeneration}
            dataKey="leads"
            color="#10B981"
          />
        </div>
      </div>

      {/* Top Performing Properties */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Property
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Views
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Leads
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Conversion
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {mockAnalytics.chartData.topProperties.map((property, index) => {
                const conversionRate = (
                  (property.leads / property.views) *
                  100
                ).toFixed(1);
                return (
                  <tr
                    key={property.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-sm">
                            #{index + 1}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {property.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.views}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.leads}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseFloat(conversionRate) > 2
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {conversionRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                (property.views / 300) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.min(
                            Math.round((property.views / 300) * 100),
                            100
                          )}
                          %
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>

        <div className="space-y-3">
          {[
            {
              type: "view",
              message: "Modern 2BHK Apartment viewed by Rahul Sharma",
              time: "2 hours ago",
              icon: "👁️",
            },
            {
              type: "lead",
              message: "New lead inquiry for Luxury Villa",
              time: "4 hours ago",
              icon: "📧",
            },
            {
              type: "contact",
              message: "Contact form submitted for Studio Apartment",
              time: "6 hours ago",
              icon: "📞",
            },
            {
              type: "view",
              message: "Luxury Villa viewed by Priya Patel",
              time: "8 hours ago",
              icon: "👁️",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export/Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span>📊</span>
            <span className="text-sm font-medium">Export Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span>📈</span>
            <span className="text-sm font-medium">Performance Report</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span>📋</span>
            <span className="text-sm font-medium">Lead Summary</span>
          </button>
        </div>
      </div>

      {/* Advanced Analytics - Gold+ only */}
      <ConditionalRender requiredPlan="gold" showUpgradePrompt={true}>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Advanced Property Analytics
          </h3>
          {/* ...your existing top properties table... */}
        </div>
      </ConditionalRender>

      {/* Premium Insights - Platinum only */}
      <ConditionalRender requiredPlan="platinum" showUpgradePrompt={true}>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">Market Trends</h4>
              <p className="text-sm text-gray-600">
                AI-powered market analysis
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">
                Price Recommendations
              </h4>
              <p className="text-sm text-gray-600">
                Dynamic pricing suggestions
              </p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">Lead Scoring</h4>
              <p className="text-sm text-gray-600">
                Advanced lead qualification
              </p>
            </div>
          </div>
        </div>
      </ConditionalRender>
    </div>
  );
}
