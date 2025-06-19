// app/login/page.tsx or components/AuthForm.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { myAppHook } from '@/context/AppProvider';

interface formData {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
  usertype?: string;
}

const Auth= () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formdata, setFormData] = useState<formData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    usertype: '',
  });

  const { login, register } = myAppHook();

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-600 to-cyan-300 flex flex-col justify-center items-center px-4 relative">
      <div className="absolute top-6 right-6 z-10 flex items-center space-x-2">
        <span className="text-gray-100 font-medium">
          {isLogin ? 'Not a member as yet?' : 'Already have an account?'}
        </span>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg shadow transition"
        >
          {isLogin ? 'Register Now' : 'Login'}
        </button>
      </div>

      <div className="container mx-auto max-w-2xl my-12">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col justify-center items-start p-6 md:p-8 text-left w-full md:w-1/2">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Why Join Us?
              </h2>
              <ul className="space-y-4 text-gray-700 text-base">
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 mr-3 shadow">✔️</span>
                  Post your property for <span className="font-semibold text-green-700">FREE</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 mr-3 shadow">📈</span>
                  Wider <span className="font-semibold text-blue-700">Reach</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 mr-3 shadow">⚡</span>
                  Get <span className="font-semibold text-blue-700">instant response</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center">
              <div className="flex flex-col items-center mb-6">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={140}
                  height={48}
                  className="mb-3 drop-shadow-lg object-contain"
                />
                <h1 className="text-xl font-bold text-gray-800 text-center tracking-tight">
                  {isLogin ? 'Login to' : 'Register at'} <span className="text-blue-700">company_name</span>
                </h1>
              </div>
              <form className="space-y-5" autoComplete="off" onSubmit={handleFormSubmit}>
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium" htmlFor="name">
                        Name
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        value={formdata.name}
                        onChange={handleOnChangeInput}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        required
                      />
                    </div>
                  </>
                )}

                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="usertype">
                      User Type
                    </label>
                    <select
                      name="usertype"
                      id="usertype"
                      onChange={handleOnChangeInput}
                      value={formdata.usertype}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      required
                    >
                      <option value="">Select user type</option>
                      <option value="Owner">Owner</option>
                      <option value="Agent">Agent</option>
                      <option value="Promoter">Promoter</option>
                      <option value="Agency">Builder</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">Email</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={formdata.email}
                    onChange={handleOnChangeInput}
                    placeholder="Enter your email id"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="password">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    value={formdata.password}
                    onChange={handleOnChangeInput}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="password_confirmation">Confirm Password</label>
                    <input
                      name="password_confirmation"
                      id="password_confirmation"
                      type="password"
                      value={formdata.password_confirmation}
                      onChange={handleOnChangeInput}
                      placeholder="Confirm your password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-800 hover:to-cyan-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-lg"
                >
                  {isLogin ? 'Login Now' : 'Register Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
