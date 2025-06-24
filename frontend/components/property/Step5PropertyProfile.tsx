import { PropertyFormData } from "@/types/propertyForm";
import { useState } from "react";

type Step5PropertyProfileProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
  onBack: () => void;
};

const defaultAmenities = [
  "Lift", "Power Backup", "Swimming Pool", "Gym", "Garden",
  "Parking", "Security", "Club House", "Children's Play Area",
];

export default function Step5PropertyProfile({
  data,
  setData,
  onNext,
  onBack,
}: Step5PropertyProfileProps) {
  const [amenities, setAmenities] = useState<string[]>(data.amenities || []);
  const [customAmenity, setCustomAmenity] = useState("");

  const toggleAmenity = (amenity: string) => {
    const updated = amenities.includes(amenity)
      ? amenities.filter((a) => a !== amenity)
      : [...amenities, amenity];
    setAmenities(updated);
    setData((prev) => ({ ...prev, amenities: updated }));
  };

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (
      trimmed &&
      !amenities.includes(trimmed) &&
      !defaultAmenities.includes(trimmed)
    ) {
      const updated = [...amenities, trimmed];
      setAmenities(updated);
      setData((prev) => ({ ...prev, amenities: updated }));
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
      <button type="button" className="text-blue-700 mb-2 sm:mb-4 text-base sm:text-lg font-semibold" onClick={onBack}>
        &larr; Back
      </button>

      <h2 className="text-2xl font-bold text-black">Select Amenities</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {defaultAmenities.map((amenity) => (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            className={`px-4 py-2 rounded-full border font-medium ${
              amenities.includes(amenity)
                ? "border-blue-700 bg-blue-50 text-blue-700"
                : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
            }`}
          >
            {amenity}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={customAmenity}
          onChange={(e) => setCustomAmenity(e.target.value)}
          placeholder="Enter custom amenity"
          className="border rounded-xl px-4 py-2 w-full"
        />
        <button type="button" onClick={addCustomAmenity} className="hover:bg-blue-800 px-4 py-2 rounded-full border font-medium border-gray-300 text-white bg-blue-500 cursor-pointer hover:border-blue-300">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {amenities
          .filter((a) => !defaultAmenities.includes(a))
          .map((a, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 rounded-full border flex items-center gap-2"
            >
              {a}
              <button type="button" onClick={() => toggleAmenity(a)}>
                &times;
              </button>
            </span>
          ))}
      </div>

      <button type="submit"  className="mt-6 sm:mt-8 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full">Finish</button>
    </form>
  );
}
