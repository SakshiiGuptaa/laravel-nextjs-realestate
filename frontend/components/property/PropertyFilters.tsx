import { useState } from "react";
import FilterSection from "./FilterSection";

type Locality = {
  id: string;
  name: string;
  selected: boolean;
};

type BhkOption = {
  value: number;
  selected: boolean;
};

type Filters = {
  localities: Locality[];
  bhk: BhkOption[];
  priceRange: string;
};

type PropertyFiltersProps = {
  filters: Filters;
  onChange: (f: Filters) => void;
};

export default function PropertyFilters({
  filters,
  onChange,
}: PropertyFiltersProps) {
  const toggleLocality = (id: string) => {
    onChange({
      ...filters,
      localities: filters.localities.map((l) =>
        l.id === id ? { ...l, selected: !l.selected } : l
      ),
    });
  };
  const toggleBhk = (value: number) => {
    onChange({
      ...filters,
      bhk: filters.bhk.map((b) =>
        b.value === value ? { ...b, selected: !b.selected } : b
      ),
    });
  };

  const [photosOnly, setPhotosOnly] = useState(false);
  const [videosOnly, setVideosOnly] = useState(false);

  return (
    <div>
      <FilterSection title="Localities">
        <div className="flex flex-col gap-3">
          {filters.localities.map((l) => (
            <label
              key={l.id}
              className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm"
            >
              <input
                type="checkbox"
                checked={l.selected}
                onChange={() => toggleLocality(l.id)}
                className="accent-blue-600 w-4 h-4 rounded border-gray-300"
              />
              {l.name}
              <span className="ml-1 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded font-semibold">
                4.{l.id}
              </span>
            </label>
          ))}
          <button className="text-blue-700 text-xs mt-1 hover:underline">
            + More Localities
          </button>
        </div>
      </FilterSection>
      <FilterSection title="BHK">
        <div className="flex flex-wrap gap-2">
          {filters.bhk.map((b) => (
            <button
              key={b.value}
              onClick={() => toggleBhk(b.value)}
              className={`px-3 py-1 rounded-full border text-sm font-medium ${
                b.selected
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
              type="button"
            >
              {b.value} BHK
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Properties with photos">
        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            checked={photosOnly}
            onChange={() => setPhotosOnly((v) => !v)}
            className="accent-blue-600 w-4 h-4 rounded border-gray-300"
          />
          Show only properties with photos
        </label>
      </FilterSection>
      <FilterSection title="Properties with videos">
        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            checked={videosOnly}
            onChange={() => setVideosOnly((v) => !v)}
            className="accent-blue-600 w-4 h-4 rounded border-gray-300"
          />
          Show only properties with videos
        </label>
      </FilterSection>
      {/* Add more FilterSection blocks for other filters as needed */}
    </div>
  );
}
