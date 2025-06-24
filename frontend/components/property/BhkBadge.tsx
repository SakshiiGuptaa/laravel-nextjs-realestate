/**
 * BhkBadge component
 * Shows a badge for the number of bedrooms.
 * Props:
 * - bhk: number (required)
 */
type BhkBadgeProps = {
  bhk: number;
};

export default function BhkBadge({ bhk }: BhkBadgeProps) {
  return (
    <span className="inline-block bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs sm:text-sm">
      {bhk} BHK
    </span>
  );
}
