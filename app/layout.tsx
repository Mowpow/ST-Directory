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
  title: "Semi Trailer Dealership Directory | Find Trailers Nationwide",
  description: "Find semi-trailer dealerships across the United States. Search by location, browse inventory, and connect with trusted trailer dealers.",
  keywords: "semi trailer, trailer dealership, trailer sales, commercial trailers, trailer directory",
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
