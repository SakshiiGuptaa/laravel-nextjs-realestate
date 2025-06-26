import React from "react";
import Image from "next/image";
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#181e23] text-gray-200 pt-10 pb-4 px-2">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-3xl font-extrabold tracking-wide mb-2 text-white">
              Crossing Republik
            </span>
            <span className="text-base text-gray-400 font-medium">
              Your trusted real estate partner
            </span>
          </div>
          {/* Company */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="uppercase font-bold text-gray-300 text-sm tracking-wider mb-4 block">
              Company
            </span>
            <ul className="space-y-1 text-base font-normal">
              <li>About us</li>
              <li>Contact us</li>
              <li>Careers with us</li>
              <li>Terms & Conditions</li>
              <li>Request Info</li>
              <li>Feedback</li>
              <li>Report a problem</li>
              <li>Testimonials</li>
              <li>Privacy Policy</li>
              <li>Summons/Notices</li>
              <li>Grievances</li>
              <li>Safety Guide</li>
            </ul>
          </div>
          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="uppercase font-bold text-gray-300 text-sm tracking-wider mb-4 block">
              Services
            </span>
            <ul className="space-y-1 text-base font-normal">
              <li>Mobile Apps</li>
              <li>Our Services</li>
              <li>Price Trends</li>
              <li>Post your Property</li>
              <li>Real Estate Investments</li>
              <li>Builders in India</li>
              <li>Area Converter</li>
              <li>Articles</li>
              <li>Rent Receipt</li>
              <li>Customer Service</li>
              <li>Sitemap</li>
            </ul>
          </div>
          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="uppercase font-bold text-gray-300 text-sm tracking-wider mb-4 block">
              Contact
            </span>
            <div className="mb-2 text-base">
              <span className="font-semibold">Toll Free - 1800 41 99099</span>
              <br />
              9:30 AM to 6:30 PM (Mon-Sun)
            </div>
            <div className="mb-4 text-base">
              <span className="font-semibold">Email - </span>
              feedback@crossingrepublik.com
            </div>
            <div className="mb-3 font-semibold text-base">Connect with us</div>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <FaFacebookF size={22} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white">
                <FaYoutube size={22} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <FaTwitter size={22} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <FaInstagram size={22} />
              </a>
            </div>
            <div className="mb-3 font-semibold text-base">Download the App</div>
            <div className="flex justify-center md:justify-start space-x-2 mb-4">
              <a href="#" aria-label="Google Play">
                <Image
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={120}
                  height={36}
                />
              </a>
              <a href="#" aria-label="App Store">
                <Image
                  src="/app-store-badge.png"
                  alt="Download on the App Store"
                  width={120}
                  height={36}
                />
              </a>
            </div>
          </div>
        </div>
        {/* Disclaimer and copyright */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-xs text-gray-400 max-w-3xl">
            Usage of Crossing Republik to upload content showing area in non
            standard units or which enables targeting by
            religion/community/caste/race is prohibited. Please report
            inappropriate content by writing to us at{" "}
            <a href="#" className="underline">
              report abuse
            </a>
          </div>
          <div className="mt-4 border-t border-gray-700 pt-4 w-full text-xs text-gray-400">
            Copyright © 2025 | All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
