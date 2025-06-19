const items = [
  { text: "Advertise for FREE" },
  { text: "Get unlimited enquiries" },
  { text: "Get shortlisted buyers and tenants", star: true },
  { text: "Assistance in co-ordinating site visits", star: true },
];

export default function Checklist() {
  return (
    <ul className="space-y-2 text-lg text-black">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="text-green-500">✔</span>
          <span>
            {item.text}
            {item.star && <span className="text-blue-700">*</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
