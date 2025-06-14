import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppProvider";

export const metadata: Metadata = {
  title: "Real Estate in India | Buy, Rent, Sell Property in India -",
  description: "Real Estate in India | Buy, Rent, Sell Property in India -",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
        <Toaster/>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}
