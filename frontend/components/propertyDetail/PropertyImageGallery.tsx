"use client";
import React, { useState } from "react";

/**
 * Props for PropertyImageGallery
 * @property images - Array of image URLs to display in the gallery
 */
type PropertyImageGalleryProps = {
  images: string[];
};

/**
 * PropertyImageGallery Component
 *
 * Displays a responsive image carousel for property images.
 * - Shows navigation arrows on desktop.
 * - Allows swiping on mobile.
 * - Shows image count indicator.
 * - Uses only the images passed in props (no hardcoded images).
 */
export default function PropertyImageGallery({
  images,
}: PropertyImageGalleryProps) {
  // State to track the currently displayed image index
  const [current, setCurrent] = useState(0);

  // Handler for previous image
  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // Handler for next image
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className="w-full mb-6">
      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
        {/* Main image */}
        <img
          src={images[current]}
          alt={`Property image ${current + 1}`}
          className="w-full h-64 sm:h-96 object-cover transition-all duration-300"
        />

        {/* Left arrow (desktop only) */}
        {images.length > 1 && (
          <button
            aria-label="Previous image"
            onClick={prevImage}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-full p-2 shadow transition"
          >
            &#8592;
          </button>
        )}

        {/* Right arrow (desktop only) */}
        {images.length > 1 && (
          <button
            aria-label="Next image"
            onClick={nextImage}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-full p-2 shadow transition"
          >
            &#8594;
          </button>
        )}

        {/* Image count indicator */}
        <div className="absolute bottom-3 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {current + 1} / {images.length}
        </div>
      </div>
    </section>
  );
}
