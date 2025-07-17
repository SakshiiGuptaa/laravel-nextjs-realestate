"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  listedOn: string;
  listing_type: string;
  property_type: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  area_type: string;
  area_value: string;
  area_unit: string;
}

export default function DealerPropertiesPage() {
  const { getMaxListings, userPlan } = useSubscription();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const maxListings = getMaxListings();
  const currentListings = properties.length;
  const canAddMore = maxListings === -1 || currentListings < maxListings;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      // Use the token from your API test
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties`;
      console.log("API URL:", apiUrl);
      console.log("Token:", token);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error:", errorData);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status) {
        setProperties(data.properties);
      } else {
        throw new Error(data.message || "Failed to fetch properties");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      // Use the same token as in fetchProperties
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      const data = await response.json();
      if (data.status) {
        setProperties(properties.filter((p) => p.id !== id));
        alert("Property deleted successfully!");
      } else {
        throw new Error(data.message || "Failed to delete property");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete property");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-medium text-gray-700">
            Loading properties...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-900 font-semibold text-lg">
            Error loading properties
          </h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <button
            onClick={fetchProperties}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header with subscription info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-700 font-medium">
              {currentListings} / {maxListings === -1 ? "∞" : maxListings}{" "}
              properties used
            </p>
            <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
              {userPlan?.toUpperCase()} Plan
            </span>
          </div>
        </div>

        {/* Conditional Add Button */}
        {canAddMore ? (
          <Link
            href="/dealer/properties/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            + Add Property
          </Link>
        ) : (
          <div className="text-center">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-2">
              <p className="text-amber-900 text-sm font-semibold">
                Property Limit Reached
              </p>
              <p className="text-amber-700 text-xs">
                Upgrade to add more properties
              </p>
            </div>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Upgrade Plan
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {maxListings !== -1 && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-800 mb-2 font-medium">
            <span>Property Usage</span>
            <span className="font-semibold">
              {Math.round((currentListings / maxListings) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                currentListings >= maxListings
                  ? "bg-red-500"
                  : currentListings > maxListings * 0.8
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min(
                  (currentListings / maxListings) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-800 border-b-2 border-gray-200">
                <th className="py-3 font-semibold text-sm uppercase tracking-wider">
                  Title
                </th>
                <th className="py-3 font-semibold text-sm uppercase tracking-wider">
                  Location
                </th>
                <th className="py-3 font-semibold text-sm uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 font-semibold text-sm uppercase tracking-wider">
                  Type
                </th>
                <th className="py-3 font-semibold text-sm uppercase tracking-wider">
                  Listed On
                </th>
                <th className="py-3 font-semibold text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 text-gray-900 font-medium">
                    {property.title}
                  </td>
                  <td className="py-4 text-gray-700">{property.location}</td>
                  <td className="py-4 text-green-600 font-semibold">
                    {property.price}
                  </td>
                  <td className="py-4 text-gray-700">
                    {property.property_type}
                  </td>
                  <td className="py-4 text-gray-600">{property.listedOn}</td>
                  <td className="py-4 space-x-3">
                    <Link
                      href={`/dealer/properties/edit/${property.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id, property.title)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {properties.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500">
              Click &quot;Add Property&quot; to get started with your first
              listing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
