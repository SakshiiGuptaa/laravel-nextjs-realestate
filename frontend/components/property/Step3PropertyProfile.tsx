import { PropertyFormData } from "@/types/propertyForm";

type Step3PropertyProfileProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
  onBack: () => void;
};

export default function Step3PropertyProfile({
  data,
  setData,
  onNext,
  onBack,
}: Step3PropertyProfileProps) {
  return (
    <form
      className="bg-white rounded-2xl shadow w-full p-2 sm:p-6 md:p-10 sm:max-w-2xl sm:mx-auto space-y-6 sm:space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <button
        type="button"
        className="text-blue-700 mb-2 sm:mb-4 text-base sm:text-lg font-semibold"
        onClick={onBack}
      >
        &larr; Back
      </button>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-black">
        Tell us about your property
      </h2>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          No. of Bedrooms
        </label>
        <div className="flex gap-2 sm:gap-4 mb-4 flex-wrap">
          {[1, 2, 3, 4].map((num) => (
            <button
              type="button"
              key={num}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.bedrooms === String(num)
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => setData((d) => ({ ...d, bedrooms: String(num) }))}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-300 text-blue-700 text-base sm:text-lg font-medium"
            onClick={() => setData((d) => ({ ...d, bedrooms: "other" }))}
          >
            + Add other
          </button>
        </div>
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          No. of Bathrooms
        </label>
        <div className="flex gap-2 sm:gap-4 mb-4 flex-wrap">
          {[1, 2, 3, 4].map((num) => (
            <button
              type="button"
              key={num}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.bathrooms === String(num)
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => setData((d) => ({ ...d, bathrooms: String(num) }))}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-300 text-blue-700 text-base sm:text-lg font-medium"
            onClick={() => setData((d) => ({ ...d, bathrooms: "other" }))}
          >
            + Add other
          </button>
        </div>
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Balconies
        </label>
        <div className="flex gap-2 sm:gap-4 mb-4 flex-wrap">
          {[0, 1, 2, 3].map((num) => (
            <button
              type="button"
              key={num}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.balconies === String(num)
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => setData((d) => ({ ...d, balconies: String(num) }))}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-300 text-blue-700 text-base sm:text-lg font-medium ${
              data.balconies === "more" ? "border-blue-700 bg-blue-50" : ""
            }`}
            onClick={() => setData((d) => ({ ...d, balconies: "more" }))}
          >
            More than 3
          </button>
        </div>
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Add Area Details
        </label>
        <div className="flex gap-2 sm:gap-4 mb-4 flex-wrap">
          <select
            value={data.areaType}
            onChange={(e) =>
              setData((d) => ({ ...d, areaType: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg text-gray-800"
          >
            <option value="">Select Area Type</option>
            <option value="Carpet Area">Carpet Area</option>
            <option value="Built-up Area">Built-up Area</option>
            <option value="Super Built-up Area">Super Built-up Area</option>
          </select>
          <input
            type="number"
            placeholder="Area"
            value={data.areaValue}
            onChange={(e) =>
              setData((d) => ({ ...d, areaValue: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 w-28 sm:w-40 text-base sm:text-lg text-gray-800"
          />
          <select
            value={data.areaUnit}
            onChange={(e) =>
              setData((d) => ({ ...d, areaUnit: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg text-gray-800"
          >
            <option value="sq.ft">sq.ft</option>
            <option value="sq.m">sq.m</option>
            <option value="acre">acre</option>
          </select>
        </div>
        <div className="flex gap-4 sm:gap-6 mt-2">
          <button
            type="button"
            className="text-blue-700 underline text-base sm:text-lg"
            onClick={() =>
              setData((d) => ({ ...d, areaType: "Built-up Area" }))
            }
          >
            + Add Built-up Area
          </button>
          <button
            type="button"
            className="text-blue-700 underline text-base sm:text-lg"
            onClick={() =>
              setData((d) => ({ ...d, areaType: "Super Built-up Area" }))
            }
          >
            + Add Super Built-up Area
          </button>
        </div>
      </div>

      {/* Floor Details */}
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Floor Details
        </label>
        <span className="block text-gray-500 text-sm mb-3">
          Total no of floors and your floor details
        </span>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4">
          <input
            type="number"
            min={1}
            placeholder="Total Floors"
            value={data.totalFloors || ""}
            onChange={(e) =>
              setData((d) => ({ ...d, totalFloors: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-1/2 text-base sm:text-lg text-gray-800"
          />
          <select
            value={data.propertyOnFloor || ""}
            onChange={(e) =>
              setData((d) => ({ ...d, propertyOnFloor: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-1/2 text-base sm:text-lg text-gray-800"
          >
            <option value="">Property on Floor</option>
            {[...Array(Number(data.totalFloors || 20)).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Availability Status */}
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Availability Status
        </label>
        <div className="flex gap-3 mb-4 flex-wrap">
          {["Ready to move", "Under construction"].map((status) => (
            <button
              key={status}
              type="button"
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.availabilityStatus === status
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() =>
                setData((d) => ({ ...d, availabilityStatus: status }))
              }
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Ownership */}
      <div>
        <label className="font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black flex items-center gap-2">
          Ownership
          <span
            title="Type of property ownership"
            className="text-blue-600 cursor-pointer text-lg"
          >
            ?
          </span>
        </label>
        <div className="flex gap-3 mb-4 flex-wrap">
          {[
            "Freehold",
            "Leasehold",
            "Co-operative society",
            "Power of Attorney",
          ].map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.ownership === type
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => setData((d) => ({ ...d, ownership: type }))}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Details */}
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Price Details
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-3">
          <input
            type="number"
            placeholder="₹ Expected Price"
            value={data.expectedPrice || ""}
            onChange={(e) =>
              setData((d) => ({ ...d, expectedPrice: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-1/2 text-base sm:text-lg text-gray-800"
          />
          <input
            type="number"
            placeholder="₹ Price per sq.ft."
            value={data.pricePerSqft || ""}
            onChange={(e) =>
              setData((d) => ({ ...d, pricePerSqft: e.target.value }))
            }
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-1/2 text-base sm:text-lg text-gray-800"
          />
        </div>
        <div className="mb-2 text-gray-600 text-sm font-medium">
          ₹ Price in words{" "}
          {data.expectedPrice
            ? `: ${Number(data.expectedPrice).toLocaleString("en-IN")} only`
            : ""}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <label className="flex items-center gap-2 text-gray-700 text-base">
            <input
              type="checkbox"
              checked={!!data.allInclusive}
              onChange={(e) =>
                setData((d) => ({ ...d, allInclusive: e.target.checked }))
              }
              className="accent-blue-700"
            />
            All inclusive price
            <span
              title="Includes all charges"
              className="text-blue-600 cursor-pointer text-lg"
            >
              ?
            </span>
          </label>
          <label className="flex items-center gap-2 text-gray-700 text-base">
            <input
              type="checkbox"
              checked={!!data.taxExcluded}
              onChange={(e) =>
                setData((d) => ({ ...d, taxExcluded: e.target.checked }))
              }
              className="accent-blue-700"
            />
            Tax and Govt. charges excluded
          </label>
          <label className="flex items-center gap-2 text-gray-700 text-base">
            <input
              type="checkbox"
              checked={!!data.priceNegotiable}
              onChange={(e) =>
                setData((d) => ({ ...d, priceNegotiable: e.target.checked }))
              }
              className="accent-blue-700"
            />
            Price Negotiable
          </label>
        </div>
        {/* <button
          type="button"
          className="text-blue-700 underline text-base sm:text-lg mt-1"
          // Add your handler for more pricing details here
        ></button> */}
      </div>

      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          What makes your property unique
        </label>
        <span className="block text-gray-500 text-sm mb-3">
          Adding description will increase your listing visibility
        </span>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4">
          <textarea
            placeholder="Share some details about your property like spacious rooms, well maintained facilities.."
            value={data.description || ""}
            onChange={(e) =>
              setData((d) => ({ ...d, description: e.target.value }))
            }
            className="w-full h-40 px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-xl text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 sm:mt-10 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full"
      >
        Continue
      </button>
    </form>
  );
}
