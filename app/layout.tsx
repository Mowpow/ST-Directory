import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Semi Trailer Dealership Directory | Find Trailers Nationwide",
  description: "Find semi-trailer dealerships across the United States. Search by location, browse inventory, and connect with trusted trailer dealers.",
  keywords: "semi trailer, trailer dealership, trailer sales, commercial trailers, trailer directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
