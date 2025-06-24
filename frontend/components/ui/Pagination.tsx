export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div className="flex gap-2 mt-4 sm:mt-6 items-center justify-center">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded border bg-white text-blue-700 font-semibold disabled:opacity-50 text-sm sm:text-base"
      >
        Prev
      </button>
      <span className="text-gray-700 font-medium text-sm sm:text-base">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded border bg-white text-blue-700 font-semibold disabled:opacity-50 text-sm sm:text-base"
      >
        Next
      </button>
    </div>
  );
}
