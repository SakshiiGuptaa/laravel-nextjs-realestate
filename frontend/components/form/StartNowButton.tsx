"use client";
import { useState } from "react";

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone);
}

export default function StartNowButton() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Handle OTP input
  const handleOtpChange = (value: string, idx: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    // Move to next input if value entered
    if (value && idx < otp.length - 1) {
      const next = document.getElementById(`otp-${idx + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  // Reset all on close
  const handleClose = () => {
    setOpen(false);
    setShowOtp(false);
    setPhone("");
    setOtp(["", "", "", ""]);
  };

  return (
    <>
      <button
        className="w-full px-6 py-3 rounded-lg font-bold text-lg shadow transition"
        style={{ backgroundColor: "#38b6ff", color: "#fff" }}
        onClick={() => setOpen(true)}
        type="button"
      >
        Start Now
      </button>
      {open && !showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-[#12284c] mb-2">
              Login / Register
            </h2>
            <div className="text-lg text-gray-500 mb-8">
              Please enter your Phone Number
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isValidIndianPhone(phone)) {
                  setShowOtp(true);
                }
              }}
              autoComplete="off"
            >
              <label
                className="block font-bold text-[#12284c] mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <div className="flex items-center border border-blue-400 rounded-lg px-4 py-3 mb-8">
                <span className="text-lg text-gray-700 mr-2">+91</span>
                <span className="text-gray-400 mr-2 select-none">&#9662;</span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your phone number"
                  className="flex-1 outline-none bg-transparent text-[#12284c] text-lg placeholder-gray-400"
                  style={{ minWidth: 0 }}
                  maxLength={10}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={!isValidIndianPhone(phone)}
                className={`w-full py-4 rounded-lg text-2xl font-bold transition ${
                  isValidIndianPhone(phone)
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : "bg-blue-100 text-white cursor-not-allowed"
                }`}
              >
                Start now
              </button>
            </form>
          </div>
        </div>
      )}

      {open && showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-[#12284c] mb-2">
              OTP Verification
            </h2>
            <div className="text-lg text-gray-500 mb-8">
              Enter the 4-digit OTP sent to{" "}
              <span className="font-semibold text-[#12284c]">+91 {phone}</span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle OTP verification here
                handleClose();
                alert("OTP Verified!");
              }}
              autoComplete="off"
            >
              <div className="flex justify-center gap-4 mb-8">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    className="w-12 h-12 text-2xl text-center border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    autoComplete="off"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={otp.some((d) => d === "")}
                className={`w-full py-4 rounded-lg text-2xl font-bold transition ${
                  otp.every((d) => d !== "")
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : "bg-blue-100 text-white cursor-not-allowed"
                }`}
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
