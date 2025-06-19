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
      <button
        type="submit"
        className="mt-6 sm:mt-10 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full"
      >
        Continue
      </button>
    </form>
  );
}
