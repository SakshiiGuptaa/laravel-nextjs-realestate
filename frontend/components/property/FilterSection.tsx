import { useState, ReactNode } from "react";

export default function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button
        className="flex justify-between items-center w-full font-semibold text-gray-800 text-base mb-2 focus:outline-none transition-colors duration-200 hover:text-blue-700"
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span
          className={`ml-2 text-gray-400 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {open && <div className="animate-fade-in">{children}</div>}
      </div>
    </div>
  );
}