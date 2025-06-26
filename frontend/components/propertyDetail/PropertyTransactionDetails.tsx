import React from "react";
import { TransactionDetails } from "@/types/propertyDetails";

/**
 * Props for PropertyTransactionDetails
 * @property details - Transaction details object
 */
type PropertyTransactionDetailsProps = {
  details: TransactionDetails;
};

/**
 * PropertyTransactionDetails Component
 *
 * Displays transaction-related details such as transaction type, ownership,
 * furnishing, parking, gated community, pet friendly, wheelchair friendly,
 * power backup, and corner property.
 * All data is driven by the details object (no hardcoded UI).
 */
export default function PropertyTransactionDetails({
  details,
}: PropertyTransactionDetailsProps) {
  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="text-xl font-bold text-gray-900 tracking-tight mb-4">
          Transaction Details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-base text-gray-800">
          <div>
            <span className="font-medium text-gray-700">
              Transaction Type:{" "}
            </span>
            {details.transactionType}
          </div>
          <div>
            <span className="font-medium text-gray-700">Ownership: </span>
            {details.propertyOwnership}
          </div>
          <div>
            <span className="font-medium text-gray-700">Furnishing: </span>
            {details.furnishing}
          </div>
          <div>
            <span className="font-medium text-gray-700">Parking: </span>
            {details.parking}
          </div>
          <div>
            <span className="font-medium text-gray-700">Gated Community: </span>
            {details.gatedCommunity ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-medium text-gray-700">Pet Friendly: </span>
            {details.petFriendly ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-medium text-gray-700">
              Wheelchair Friendly:{" "}
            </span>
            {details.wheelchairFriendly ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-medium text-gray-700">Power Backup: </span>
            {details.powerBackup}
          </div>
          <div>
            <span className="font-medium text-gray-700">Corner Property: </span>
            {details.cornerProperty ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </section>
  );
}
