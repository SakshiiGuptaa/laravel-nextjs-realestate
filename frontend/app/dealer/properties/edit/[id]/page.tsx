"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Property {
  id: string;
  listing_type: string;
  property_type: string;
  sub_type: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  area_type: string;
  area_value: string;
  area_unit: string;
  description?: string;
}

export default function DealerEditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params); // Unwrap the Promise
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState<Property>({
    id: "",
    listing_type: "Sell",
    property_type: "Apartment",
    sub_type: "",
    city: "",
    bedrooms: "3",
    bathrooms: "2",
    balconies: "2",
    area_type: "Built-up Area",
    area_value: "",
    area_unit: "sq.ft.",
    description: "",
  });

  // Fetch property data from API
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties/${resolvedParams.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.status && data.property) {
          setForm(data.property);
        } else {
          throw new Error("Property not found");
        }
      } catch (err) {
        console.error("Fetch property error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch property"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [resolvedParams.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties/${resolvedParams.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status) {
        alert("Property updated successfully!");
        router.push("/dealer/properties");
      } else {
        throw new Error(data.message || "Failed to update property");
      }
    } catch (err) {
      console.error("Update property error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${form.sub_type}"?`)) {
      return;
    }

    try {
      const token = "2|xpHCwe0TiKdSw6frVlPNWhTTM8w8pAt9wW2lyTlS8eac9737";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/properties/${resolvedParams.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status) {
        alert("Property deleted successfully!");
        router.push("/dealer/properties");
      } else {
        throw new Error(data.message || "Failed to delete property");
      }
    } catch (err) {
      console.error("Delete property error:", err);
      alert("Failed to delete property");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-lg font-medium text-slate-700">
          Loading property...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-900 font-semibold">Error Loading Property</h2>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <Link
            href="/dealer/properties"
            className="text-red-700 hover:text-red-800 text-sm font-medium mt-2 inline-block"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Property</h1>
            <p className="text-slate-600 text-sm mt-1">
              Property ID: {resolvedParams.id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
            >
              Delete Property
            </button>
            <Link
              href="/dealer/properties"
              className="text-slate-600 hover:text-slate-800 text-sm font-medium"
            >
              ← Back to Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-900 font-medium">Error updating property</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-4 sm:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">
              Basic Details
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Listing Type *
            </label>
            <select
              name="listing_type"
              value={form.listing_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Property Type *
            </label>
            <select
              name="property_type"
              value={form.property_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Plot">Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Sub Type *
            </label>
            <input
              type="text"
              name="sub_type"
              value={form.sub_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500"
              placeholder="e.g. 3 BHK Apartment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500"
              placeholder="e.g. Delhi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Bedrooms *
            </label>
            <select
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Bathrooms *
            </label>
            <select
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Balconies *
            </label>
            <select
              name="balconies"
              value={form.balconies}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Area Type *
            </label>
            <select
              name="area_type"
              value={form.area_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              <option value="Built-up Area">Built-up Area</option>
              <option value="Super Built-up Area">Super Built-up Area</option>
              <option value="Carpet Area">Carpet Area</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Area Value *
            </label>
            <input
              type="number"
              name="area_value"
              value={form.area_value}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500"
              placeholder="e.g. 1200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Area Unit *
            </label>
            <select
              name="area_unit"
              value={form.area_unit}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            >
              <option value="sq.ft.">sq.ft.</option>
              <option value="sq.m.">sq.m.</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500"
              placeholder="Describe your property..."
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t">
          <Link
            href="/dealer/properties"
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={updating}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
