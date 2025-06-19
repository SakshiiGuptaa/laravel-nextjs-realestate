type PropertyScoreProps = {
  percent: number;
};

export default function PropertyScore({ percent }: PropertyScoreProps) {
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (percent / 100) * circumference;
  const color = percent < 100 ? "#22c55e" : "#2563eb"; // green or blue

  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 shadow w-full">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".35em"
          fontSize="0.95rem" // smaller font size for better fit
          fontWeight={600}
          fill="#22223b"
        >
          {percent}%
        </text>
      </svg>
      <div>
        <div className="font-semibold text-[#12284c]">Property Score</div>
        <div className="text-xs text-gray-500">
          Better your property score, <br />
          greater your visibility
        </div>
      </div>
    </div>
  );
}
