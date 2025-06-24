import { useState } from "react";

/**
 * PropertyImageCarousel component
 * Shows a carousel of property images.
 * Props:
 * - images: Array of image URLs (required)
 * - className: Optional string for custom styling
 */
export default function PropertyImageCarousel({
  images,
  className = "",
}: {
  images: string[];
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div
      className={`relative w-full h-44 sm:h-48 rounded-xl border border-gray-200 overflow-hidden ${className}`}
    >
      <img
        src={images[current]}
        alt={`Property image ${current + 1}`}
        className="object-cover w-full h-full"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
            onClick={() =>
              setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
            }
          >
            ‹
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
            onClick={() =>
              setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
            }
          >
            ›
          </button>
        </>
      )}
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs rounded px-2 py-1">
        {current + 1}/{images.length}
      </div>
    </div>
  );
}
