import { PropertyFormData } from "@/types/propertyForm";

type Step1BasicDetailsProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
};

const listingTypes = ["Buy", "Sell", "Rent / Lease", "Projects", "PG"];
const propertyTypes = ["Residential", "Commercial"];
const subTypes = [
  "Flat/Apartment",
  "Independent House / Villa",
  "Independent / Builder Floor",
  "Plot / Land",
  "1 RK/ Studio Apartment",
  "Serviced Apartment",
  "Farmhouse",
  "Other",
];

export default function Step1BasicDetails({
  data,
  setData,
  onNext,
}: Step1BasicDetailsProps) {
  return (
    <form
      className="bg-white rounded-2xl shadow w-full p-2 sm:p-6 md:p-10 sm:max-w-2xl sm:mx-auto space-y-6 sm:space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-black">
        Fill out basic details
      </h2>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          I am looking to
        </label>
        <div className="flex gap-2 sm:gap-4 mb-4 flex-wrap">
          {listingTypes.map((type) => (
            <button
              type="button"
              key={type}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.listingType === type
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => setData((d) => ({ ...d, listingType: type }))}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          What kind of property do you have?
        </label>
        <div className="flex gap-4 mb-3">
          {propertyTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-base font-medium text-gray-800"
            >
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={data.propertyType === type}
                onChange={() => setData((d) => ({ ...d, propertyType: type }))}
                className="accent-blue-700 w-5 h-5"
              />
              {type}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {subTypes.map((sub) => (
            <button
              type="button"
              key={sub}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border text-base sm:text-lg font-medium transition ${
                data.subType === sub
                  ? "border-blue-700 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-800 bg-white hover:border-blue-300"
              }`}
              onClick={() => setData((d) => ({ ...d, subType: sub }))}
            >
              {sub}
            </button>
          ))}
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
