import { notFound } from "next/navigation";
import Link from "next/link";
import dealersData from "@/data/dealers.json";
import { getFullAddress } from "@/lib/utils";
import { generateMetadata } from "./metadata";

export { generateMetadata };

interface Dealer {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email?: string;
  website?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  services?: string[];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const dealers = dealersData.dealers as Dealer[];
  return dealers.map((dealer) => ({
    id: dealer.id,
  }));
}

export default async function DealerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dealers = dealersData.dealers as Dealer[];
  const dealer = dealers.find((d) => d.id === id);

  if (!dealer) {
    notFound();
  }

  const fullAddress = getFullAddress(dealer.address);
  const mapUrl = dealer.coordinates
    ? `https://www.google.com/maps?q=${dealer.coordinates.lat},${dealer.coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-md shadow-lg border-b border-indigo-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-purple-600 hover:text-pink-600 mb-4 inline-flex items-center text-sm font-semibold transition-colors gap-1"
          >
            <span>←</span> Back to Directory
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">{dealer.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-indigo-200/50">
              <h2 className="text-2xl font-bold text-indigo-900 mb-8">
                Dealership Information
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div>
                  <h3 className="text-sm font-semibold text-indigo-700 mb-3 uppercase tracking-wide">Address</h3>
                  <p className="text-indigo-900 flex items-start text-lg">
                    <svg
                      className="w-6 h-6 mr-3 mt-0.5 text-purple-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {fullAddress}
                  </p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-pink-600 text-sm mt-3 inline-flex items-center font-semibold transition-colors gap-1"
                  >
                    View on Map
                    <span>→</span>
                  </a>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-indigo-700 mb-3 uppercase tracking-wide">Contact</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-indigo-900 text-lg">
                      <svg
                        className="w-6 h-6 mr-3 text-purple-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href={`tel:${dealer.phone}`} className="hover:text-purple-600 transition-colors font-medium">
                        {dealer.phone}
                      </a>
                    </p>
                    {dealer.email && (
                      <p className="flex items-center text-indigo-900 text-lg">
                        <svg
                          className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <a href={`mailto:${dealer.email}`} className="hover:text-purple-600 transition-colors font-medium">
                          {dealer.email}
                        </a>
                      </p>
                    )}
                    {dealer.website && (
                      <p className="flex items-center text-indigo-900 text-lg">
                        <svg
                          className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <a
                          href={dealer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-600 transition-colors font-medium inline-flex items-center gap-1"
                        >
                          Visit Website
                          <span>→</span>
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Services */}
                {dealer.services && dealer.services.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-indigo-700 mb-4 uppercase tracking-wide">Services Offered</h3>
                    <div className="flex flex-wrap gap-3">
                      {dealer.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-indigo-200/50 sticky top-24">
              <h3 className="text-lg font-bold text-indigo-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${dealer.phone}`}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all text-center block font-semibold shadow-md hover:shadow-lg"
                >
                  Call Now
                </a>
                {dealer.email && (
                  <a
                    href={`mailto:${dealer.email}`}
                    className="w-full bg-indigo-100 text-indigo-900 px-4 py-3 rounded-xl hover:bg-indigo-200 transition-colors text-center block font-semibold"
                  >
                    Send Email
                  </a>
                )}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-100 text-slate-900 px-4 py-3 rounded-xl hover:bg-slate-200 transition-colors text-center block font-semibold"
                >
                  Get Directions
                </a>
                {dealer.website && (
                  <a
                    href={dealer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-100 text-indigo-900 px-4 py-3 rounded-xl hover:bg-indigo-200 transition-colors text-center block font-semibold"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm border-t border-indigo-200/60 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-indigo-700 text-sm">
            © {new Date().getFullYear()} Semi Trailer Dealership Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
