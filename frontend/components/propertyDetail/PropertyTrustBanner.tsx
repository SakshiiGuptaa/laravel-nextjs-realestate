import React from "react";

/**
 * PropertyTrustBanner Component
 *
 * Displays a floating or inline trust/info banner about the property.
 * Example: "Properties in Coco County are RERA approved. Now, buy with confidence!"
 * You can extend this to accept props if you want to make it dynamic.
 */
export default function PropertyTrustBanner() {
  return (
    <aside className="w-full mb-6">
      <div className="flex items-center gap-4 bg-gray-800 text-white rounded-2xl shadow-lg px-6 py-4">
        {/* Icon or badge */}
        <div className="flex items-center justify-center bg-green-600 rounded-full w-10 h-10 font-bold text-lg">
          99
        </div>
        {/* Trust message */}
        <div>
          <div className="font-semibold text-lg">Properties you can trust</div>
          <div className="text-sm text-gray-200">
            Properties in Coco County are RERA approved.
            <br />
            Now, buy with confidence!
          </div>
        </div>
      </div>
    </aside>
  );
}
