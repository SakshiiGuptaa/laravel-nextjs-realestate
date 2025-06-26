import React from "react";

/**
 * Props for PropertyWhyConsiderTags
 * @property tags - Array of highlight/reason strings
 */
type PropertyWhyConsiderTagsProps = {
  tags: string[];
};

/**
 * PropertyWhyConsiderTags Component
 *
 * Displays a grid of highlight tags (reasons to consider the property).
 * All data is driven by the tags array (no hardcoded UI).
 */
export default function PropertyWhyConsiderTags({
  tags,
}: PropertyWhyConsiderTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <section className="w-full mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="text-xl font-bold text-gray-900 tracking-tight mb-4">
          Why should you consider this property?
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={tag + idx}
              className="rounded-full px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
