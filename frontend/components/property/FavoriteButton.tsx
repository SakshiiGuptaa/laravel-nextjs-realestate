import { useState } from "react";

export default function FavoriteButton({ propertyId }: { propertyId: number }) {
  const [fav, setFav] = useState(false);

  return (
    <button
      aria-label="Favorite"
      onClick={() => setFav((v) => !v)}
      className={`rounded-full p-2 bg-white shadow transition-all duration-200 border border-gray-200 hover:bg-blue-50 active:scale-90 ${
        fav ? "text-red-500" : "text-gray-400"
      }`}
    >
      <svg
        className={`w-6 h-6 transition-colors duration-200 ${
          fav ? "fill-red-500" : "fill-none"
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
}
