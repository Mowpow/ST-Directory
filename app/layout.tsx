import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Modern font configuration with Inter

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Find Semi Trailer Dealerships | 10,000+ Trailer Dealers Nationwide",
  description: "Find semi-trailer dealerships across America, from local outlets to major retailers. Connect with trusted dealers offering quality trailers in all 50 states.",
  keywords: "semi trailer, trailer dealership, trailer sales, commercial trailers, trailer directory, trailer dealers, trusted dealers",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
