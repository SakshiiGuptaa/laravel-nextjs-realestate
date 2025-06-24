/**
 * AppliedFiltersBar component
 *
 * Displays a horizontal bar of all currently applied filters as "chips".
 * Also provides a "Clear All" button to remove all filters at once.
 *
 * Props:
 * - appliedFilters: Array of filter objects (each should have a 'label' property)
 * - onClear: Function to call when "Clear All" is clicked
 */
type AppliedFilter = {
  label: string;
};

export default function AppliedFiltersBar({
  appliedFilters,
  onClear,
}: {
  appliedFilters: AppliedFilter[]; // Array of applied filter objects
  onClear: () => void; // Function to clear all filters
}) {
  // If there are no applied filters, render nothing
  if (!appliedFilters.length) return null;

  return (
    // Container for the filter chips and clear button
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Render each applied filter as a "chip" */}
      {appliedFilters.map((f, i) => (
        <span
          key={i}
          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100"
        >
          {/* Show the filter's label */}
          {f.label}
        </span>
      ))}
      {/* "Clear All" button to remove all filters */}
      <button
        onClick={onClear}
        className="ml-2 text-blue-700 text-xs font-semibold hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}
