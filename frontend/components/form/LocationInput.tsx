// components/form/LocationInput.tsx
"use client";
import { useRef, useEffect } from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function LocationInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current!,
      {
        types: ["geocode"],
      }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Selected place:", place);
    });
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter property location"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
      />
    </div>
  );
}
