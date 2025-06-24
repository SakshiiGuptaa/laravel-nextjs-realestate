export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-3 py-2 bg-white text-gray-700 font-medium shadow-sm text-sm sm:text-base"
    >
      <option value="relevance">Relevance</option>
      <option value="price_low_high">Price: Low to High</option>
      <option value="price_high_low">Price: High to Low</option>
      <option value="newest">Newest</option>
    </select>
  );
}
