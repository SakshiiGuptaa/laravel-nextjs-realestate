"use client";

import React, { useState } from "react";
import Image from "next/image";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface formData {
  name?: string;
  user_type?: string;
  email: string;
  phone_number: string;
}

const AuthCard = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}) => {
  const [formdata, setFormData] = useState<formData>({
    name: "",
    user_type: "",
    email: "",
    phone_number: "",
  });

  const router = useRouter();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const { login, register } = myAppHook();

  // ✅ Handle OTP input boxes
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return; // only digits 0-9

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && idx < otp.length - 1) {
      const nextInput = document.querySelector(
        `input[name=otp-${idx + 1}]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }
    // TODO: validate OTP with backend
    toast.success("OTP submitted successfully!");
    setShowOtpModal(false);
    router.push("/PropertyPost");
  };

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isLogin) {
        setShowOtpModal(true);
        // await login(formdata.email, formdata.phone_number);
      } else {
        await register(
          formdata.name!,
          formdata.user_type!,
          formdata.email,
          formdata.phone_number
        );
      }
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl p-6 sm:p-10 md:p-16 w-full max-w-2xl min-h-[500px] flex flex-col items-center transition-all duration-300">
      <Image
        src="/logo_md.png"
        alt="logo"
        width={220}
        height={44}
        priority
        className="mb-4 sm:mb-8"
      />
      <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-10 md:mb-12 text-center tracking-tight leading-tight">
        {isLogin ? "Login" : "Register at"}{" "}
      </h3>

      <form
        className="space-y-10 sm:space-y-14 md:space-y-16 w-full"
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <div className="space-y-7 sm:space-y-9 md:space-y-10">
          {!isLogin && (
            <>
              <div>
                <label
                  className="block text-gray-700 mb-1 font-semibold text-sm sm:text-base"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={formdata.name}
                  onChange={handleOnChangeInput}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-1 font-semibold text-sm sm:text-base"
                  htmlFor="user_type"
                >
                  User
                </label>
                <select
                  name="user_type"
                  id="user_type"
                  onChange={handleOnChangeInput}
                  value={formdata.user_type}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">--Select type--</option>
                  <option value="user">User</option>
                  <option value="dealer">Dealer</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-1 font-semibold text-sm sm:text-base"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={formdata.email}
                  onChange={handleOnChangeInput}
                  placeholder="Enter your email id"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label
              className="block text-gray-700 mb-1 font-semibold text-sm sm:text-base"
              htmlFor="phone_number"
            >
              Phone number
            </label>
            <input
              name="phone_number"
              id="phone_number"
              type="number"
              value={formdata.phone_number}
              onChange={handleOnChangeInput}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 sm:py-3 md:py-4 rounded-xl shadow-md text-base sm:text-lg transition-all duration-200 mt-4"
        >
          {isLogin ? "Login Now" : "Register Now"}
        </button>
      </form>

    {showOtpModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-center">Enter OTP</h2>
          <div className="flex justify-evenly space-x-1 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                name={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, idx)}
                className="w-12 h-12 border border-gray-300 text-center rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            ))}
          </div>
          <button
            onClick={handleOtpSubmit}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl"
          >
            Submit OTP
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default AuthCard;
