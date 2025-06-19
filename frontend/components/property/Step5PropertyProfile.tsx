import { PropertyFormData } from "@/types/propertyForm";
import { useState } from "react";

type Step5PropertyProfileProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
  onBack: () => void;
};

const defaultAmenities = [
  "Lift",
  "Power Backup",
  "Swimming Pool",
  "Gym",
  "Garden",
  "Parking",
  "Security",
  "Club House",
  "Children's Play Area",
];

export default function Step5PropertyProfile({
  onNext,
  onBack,
}: Step5PropertyProfileProps) {
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const addCustomAmenity = () => {
    if (
      customAmenity.trim() &&
      !amenities.includes(customAmenity.trim()) &&
      !defaultAmenities.includes(customAmenity.trim())
    ) {
      setAmenities((prev) => [...prev, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

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
        Select Amenities
      </h2>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Available Amenities
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
          {defaultAmenities.map((amenity) => (
            <button
              type="button"
              key={amenity}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                amenities.includes(amenity)
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => toggleAmenity(amenity)}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Add Custom Amenity
        </label>
        <div className="flex gap-2 sm:gap-4">
          <input
            type="text"
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg text-gray-800 w-full"
            placeholder="Enter amenity name"
          />
          <button
            type="button"
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-300 text-blue-700 text-base sm:text-lg font-medium bg-blue-50 hover:bg-blue-100 transition"
            onClick={addCustomAmenity}
          >
            Add
          </button>
        </div>
        {amenities.filter((a) => !defaultAmenities.includes(a)).length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
            {amenities
              .filter((a) => !defaultAmenities.includes(a))
              .map((a, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-gray-300 text-gray-800 text-sm sm:text-base flex items-center gap-2"
                >
                  {a}
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() =>
                      setAmenities((prev) => prev.filter((am) => am !== a))
                    }
                  >
                    &times;
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="mt-6 sm:mt-8 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full"
      >
        Finish
      </button>
    </form>
  );
}
