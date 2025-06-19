import { PropertyFormData } from "@/types/propertyForm";

type Step2LocationDetailsProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
  onBack: () => void;
};

export default function Step2LocationDetails({
  data,
  setData,
  onNext,
  onBack,
}: Step2LocationDetailsProps) {
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
        Where is your property located?
      </h2>
      <div className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">
        An accurate location helps you connect with the right buyers
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Society / Location
        </label>
        <input
          type="text"
          value={data.city}
          onChange={(e) => setData((d) => ({ ...d, city: e.target.value }))}
          className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-xl text-base sm:text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter city, society, or locality"
        />
      </div>
      <button
        type="submit"
        className="mt-6 sm:mt-8 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full"
      >
        Continue
      </button>
    </form>
  );
}
