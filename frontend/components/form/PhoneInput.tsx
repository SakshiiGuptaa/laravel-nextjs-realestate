export default function PhoneInput() {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Your contact details for the buyer to reach you
      </label>
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
      />
    </div>
  );
}
