"use client";

import React, { useState } from "react";
import Image from "next/image";
import { myAppHook } from "@/context/AppProvider";

interface formData {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
  usertype?: string;
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
    email: "",
    password: "",
    password_confirmation: "",
    usertype: "",
  });

  const { login, register } = myAppHook();

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
        await login(formdata.email, formdata.password);
      } else {
        await register(
          formdata.name!,
          formdata.email,
          formdata.password,
          formdata.password_confirmation!
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
                  htmlFor="usertype"
                >
                  User Type
                </label>
                <select
                  name="usertype"
                  id="usertype"
                  onChange={handleOnChangeInput}
                  value={formdata.usertype}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">Select user type</option>
                  <option value="Owner">Owner</option>
                  <option value="Agent">Agent</option>
                  <option value="Promoter">Promoter</option>
                  <option value="Agency">Builder</option>
                </select>
              </div>
            </>
          )}

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

          <div>
            <label
              className="block text-gray-700 mb-1 font-semibold text-sm sm:text-base"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              value={formdata.password}
              onChange={handleOnChangeInput}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label
                className="block text-gray-700 mb-1 font-semibold text-sm sm:text-base"
                htmlFor="password_confirmation"
              >
                Confirm Password
              </label>
              <input
                name="password_confirmation"
                id="password_confirmation"
                type="password"
                value={formdata.password_confirmation}
                onChange={handleOnChangeInput}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 shadow-sm transition-all text-sm sm:text-base"
                required
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 sm:py-3 md:py-4 rounded-xl shadow-md text-base sm:text-lg transition-all duration-200 mt-4"
        >
          {isLogin ? "Login Now" : "Register Now"}
        </button>
      </form>
    </div>
  );
};

export default AuthCard;
