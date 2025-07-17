"use client";
import { useState } from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";
import ConditionalRender from "@/components/Subscription/ConditionalRender";

// Mock data for leads
const mockLeads = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    propertyId: "1",
    propertyTitle: "Modern 2BHK Apartment",
    propertyLocation: "Sector 62, Noida",
    message:
      "Hi, I'm interested in this apartment. Could we schedule a visit this weekend?",
    status: "New",
    priority: "High",
    source: "Website",
    createdAt: "2024-06-27 10:30",
    lastContact: null,
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.p@gmail.com",
    phone: "+91 8765432109",
    propertyId: "2",
    propertyTitle: "Luxury Villa",
    propertyLocation: "Greater Noida",
    message:
      "Looking for a luxury villa for my family. What's the final price?",
    status: "Contacted",
    priority: "Medium",
    source: "Phone Call",
    createdAt: "2024-06-26 14:15",
    lastContact: "2024-06-26 16:30",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.k@company.com",
    phone: "+91 7654321098",
    propertyId: "1",
    propertyTitle: "Modern 2BHK Apartment",
    propertyLocation: "Sector 62, Noida",
    message: "Is this property available for immediate possession?",
    status: "Qualified",
    priority: "High",
    source: "WhatsApp",
    createdAt: "2024-06-25 09:45",
    lastContact: "2024-06-27 11:00",
  },
  {
    id: "4",
    name: "Sunita Yadav",
    email: "sunita.yadav@email.com",
    phone: "+91 6543210987",
    propertyId: "3",
    propertyTitle: "Studio Apartment",
    propertyLocation: "Noida Extension",
    message: "I'm a first-time buyer. Can you help with home loan process?",
    status: "Converted",
    priority: "Low",
    source: "Website",
    createdAt: "2024-06-20 16:20",
    lastContact: "2024-06-25 14:00",
  },
];

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Qualified: "bg-purple-100 text-purple-800",
  Converted: "bg-green-100 text-green-800",
  Lost: "bg-red-100 text-red-800",
};

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

export default function DealerLeadsPage() {
  const { hasFeature, canAccessFeature, userPlan } = useSubscription();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLeads =
    selectedStatus === "All"
      ? mockLeads
      : mockLeads.filter((lead) => lead.status === selectedStatus);

  const getStatusCount = (status: string) => {
    return mockLeads.filter((lead) => lead.status === status).length;
  };

  const handleStatusUpdate = (leadId: string, newStatus: string) => {
    // TODO: API call to update status
    console.log(`Updating lead ${leadId} to status: ${newStatus}`);
    alert(`Lead status updated to: ${newStatus}`);
  };

  const openLeadModal = (lead: any) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const canExportLeads = hasFeature("export_leads") || canAccessFeature("gold");

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {userPlan?.toUpperCase()}
          </span>
        </div>
        <div className="flex space-x-3">
          <ConditionalRender requiredPlan="gold" showUpgradePrompt={true}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              📊 Export Leads
            </button>
          </ConditionalRender>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            ➕ Add Manual Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total Leads", value: mockLeads.length, color: "blue" },
          { label: "New", value: getStatusCount("New"), color: "blue" },
          {
            label: "Contacted",
            value: getStatusCount("Contacted"),
            color: "yellow",
          },
          {
            label: "Qualified",
            value: getStatusCount("Qualified"),
            color: "purple",
          },
          {
            label: "Converted",
            value: getStatusCount("Converted"),
            color: "green",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-2 h-2 bg-${stat.color}-500 rounded-full`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          {["All", "New", "Contacted", "Qualified", "Converted", "Lost"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status}
                {status !== "All" && (
                  <span className="ml-1 text-xs bg-gray-200 px-1 rounded">
                    {getStatusCount(status)}
                  </span>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.phone}
                        </div>
                        <div className="text-xs text-gray-400">
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {lead.propertyTitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lead.propertyLocation}
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {lead.propertyId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[lead.status as keyof typeof statusColors]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        priorityColors[
                          lead.priority as keyof typeof priorityColors
                        ]
                      }`}
                    >
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{lead.createdAt}</div>
                    {lead.lastContact && (
                      <div className="text-xs text-green-600">
                        Last contact: {lead.lastContact}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openLeadModal(lead)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => window.open(`tel:${lead.phone}`)}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        Call
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${lead.email}`)}
                        className="text-purple-600 hover:text-purple-900 font-medium"
                      >
                        Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No leads found
              </h3>
              <p className="text-gray-500">
                {selectedStatus === "All"
                  ? "You haven't received any leads yet. Make sure your properties are published."
                  : `No leads with status "${selectedStatus}".`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-2 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Lead Details
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Lead Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-sm text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <p className="text-sm text-gray-900">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <p className="text-sm text-gray-900">{selectedLead.source}</p>
                </div>
              </div>

              {/* Property Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interested Property
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">
                    {selectedLead.propertyTitle}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedLead.propertyLocation}
                  </p>
                  <Link
                    href={`/dealer/properties/edit/${selectedLead.propertyId}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Property →
                  </Link>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-900">
                    {selectedLead.message}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <div className="flex space-x-2">
                  {["New", "Contacted", "Qualified", "Converted", "Lost"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusUpdate(selectedLead.id, status)
                        }
                        className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                          selectedLead.status === status
                            ? statusColors[status as keyof typeof statusColors]
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <button
                  onClick={() => window.open(`tel:${selectedLead.phone}`)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  📞 Call Now
                </button>
                <button
                  onClick={() => window.open(`mailto:${selectedLead.email}`)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  ✉️ Send Email
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/${selectedLead.phone.replace(
                        /[^\d]/g,
                        ""
                      )}`
                    )
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
