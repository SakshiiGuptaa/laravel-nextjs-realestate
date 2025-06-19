import PropertyScore from "./PropertyScore";

type SidebarStepperProps = {
  step: number;
  totalSteps: number;
};

const steps = [
  { label: "Basic Details", sub: "Step 1" },
  { label: "Location Details", sub: "Step 2" },
  { label: "Property Profile", sub: "Step 3" },
  { label: "Photos, Videos", sub: "Step 4" },
  { label: "Amenities section", sub: "Step 5" },
];

export default function SidebarStepper({
  step,
  totalSteps,
}: SidebarStepperProps) {
  const percent = Math.min(Math.round((step / totalSteps) * 100), 100);

  return (
    <>
      {/* Horizontal stepper for mobile */}
      <nav className="block lg:hidden w-full mb-6">
        <ol className="flex justify-between items-center w-full overflow-x-auto bg-white rounded-xl shadow px-2 py-4">
          {steps.map((s, idx) => (
            <li
              key={s.label}
              className="flex-1 flex flex-col items-center relative"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-base font-bold mb-1
                  ${
                    step > idx + 1
                      ? "bg-[#38b6ff] border-[#38b6ff] text-white"
                      : step === idx + 1
                      ? "border-[#38b6ff] text-[#38b6ff] bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
              >
                {step > idx + 1 ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12l4 4L19 7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  step === idx + 1 ? "text-[#38b6ff]" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <span
                  className={`absolute top-4 right-0 left-1/2 h-0.5 ${
                    step > idx + 1 ? "bg-[#38b6ff]" : "bg-gray-200"
                  }`}
                  style={{ width: "100%", zIndex: -1 }}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Vertical stepper for desktop */}
      <aside className="hidden lg:block w-80">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col justify-between min-h-[90vh]">
          <ol className="overflow-hidden space-y-8">
            {steps.map((s, idx) => (
              <li
                key={s.label}
                className={`relative flex-1 ${
                  idx < steps.length - 1
                    ? `after:content-[''] after:w-0.5 after:h-full after:inline-block after:absolute after:left-4 lg:after:left-5 ${
                        idx < step - 1
                          ? "after:bg-[#38b6ff] after:-bottom-11"
                          : "after:bg-gray-200 after:-bottom-12"
                      }`
                    : ""
                }`}
              >
                <a className="flex items-center font-medium w-full">
                  {idx < step - 1 ? (
                    <span className="w-8 h-8 bg-[#38b6ff] border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                      <svg
                        className="w-5 h-5 stroke-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : idx === step - 1 ? (
                    <span className="w-8 h-8 bg-blue-50 border-2 border-[#38b6ff] rounded-full flex justify-center items-center mr-3 text-sm text-[#38b6ff] lg:w-10 lg:h-10">
                      {idx + 1}
                    </span>
                  ) : (
                    <span className="w-8 h-8 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm text-gray-400 lg:w-10 lg:h-10">
                      {idx + 1}
                    </span>
                  )}
                  <div className="block">
                    <h4
                      className={`text-lg font-bold ${
                        idx < step - 1
                          ? "text-[#38b6ff]"
                          : idx === step - 1
                          ? "text-[#38b6ff]"
                          : "text-gray-900"
                      }`}
                    >
                      {s.label}
                    </h4>
                    <span className="text-sm text-gray-500">{s.sub}</span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <PropertyScore percent={percent} />
          </div>
        </div>
      </aside>
    </>
  );
}
