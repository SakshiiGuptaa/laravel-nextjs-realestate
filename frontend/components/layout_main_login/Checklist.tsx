import { FaCheckCircle } from "react-icons/fa";

const items = [
  { text: "Advertise for FREE" },
  { text: "Get unlimited enquiries" },
  { text: "Get shortlisted buyers and tenants", star: true },
  { text: "Assistance in co-ordinating site visits", star: true },
];

export default function Checklist() {
  return (
    <ul className="space-y-3 text-base sm:text-lg text-white font-medium">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 sm:gap-3">
          <FaCheckCircle className="text-green-400 w-5 h-5 sm:w-7 sm:h-7 drop-shadow" />
          <span>
            {item.text}
            {item.star && <span className="text-yellow-300 ml-1">*</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
