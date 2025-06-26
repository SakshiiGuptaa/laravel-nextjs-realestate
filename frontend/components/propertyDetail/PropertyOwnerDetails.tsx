import React from "react";
import { Owner } from "@/types/propertyDetails";

/**
 * Props for PropertyOwnerDetails
 * @property owner - Owner details object
 */
type PropertyOwnerDetailsProps = {
  owner: Owner;
};

/**
 * PropertyOwnerDetails Component
 *
 * Displays the owner's avatar, name, phone button, properties listed,
 * localities, and a simple enquiry form.
 * All data is driven by the owner object (no hardcoded UI).
 */
export default function PropertyOwnerDetails({ owner }: PropertyOwnerDetailsProps) {
  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Owner Card */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 w-full">
          {/* Avatar (placeholder if not provided) */}
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl mb-2">
            {owner.avatar ? (
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span role="img" aria-label="Owner">👤</span>
            )}
          </div>
          <div className="font-semibold text-gray-900 text-lg">{owner.name}</div>
          <div className="text-xs text-gray-500 mb-2">Owner</div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition mb-2">
            View Phone Number
          </button>
          <div className="text-xs text-gray-500">
            Properties Listed: <span className="font-semibold">{owner.propertiesListed}</span>
          </div>
          <div className="text-xs text-gray-500">
            Localities: {owner.localities.join(", ")}
          </div>
        </div>
        {/* Enquiry Form */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-lg mb-2">Send enquiry to Owner</div>
          <form className="space-y-3">
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-xs text-gray-700">
                <input type="radio" name="userType" defaultChecked /> Individual
              </label>
              <label className="flex items-center gap-1 text-xs text-gray-700">
                <input type="radio" name="userType" /> Dealer
              </label>
            </div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-base text-gray-900 placeholder-gray-400 font-medium focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-base text-gray-900 placeholder-gray-400 font-medium focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded px-3 py-2 text-base text-gray-900 placeholder-gray-400 font-medium focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <textarea
              placeholder="I am interested in this Property."
              className="w-full border border-gray-300 rounded px-3 py-2 text-base text-gray-900 placeholder-gray-400 font-medium focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              rows={3}
            />
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#" className="underline">Terms & Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Email & SMS
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}