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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-cyan-600 mb-3 sm:mb-4 inline-flex items-center text-sm font-medium transition-colors gap-1 touch-manipulation min-h-[44px]"
          >
            <span>←</span> Back to Directory
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mt-2 break-words">{dealer.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-100/50">
              <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8">
                Dealership Information
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {/* Address */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-600 mb-2 sm:mb-3 uppercase tracking-wide">Address</h3>
                  <p className="text-blue-900 flex items-start text-base sm:text-lg">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-0.5 text-cyan-500 flex-shrink-0"
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
                    <span className="break-words">{fullAddress}</span>
                  </p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 hover:text-blue-600 text-sm mt-3 inline-flex items-center font-medium transition-colors gap-1 touch-manipulation min-h-[44px]"
                  >
                    View on Map
                    <span>→</span>
                  </a>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-600 mb-2 sm:mb-3 uppercase tracking-wide">Contact</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-blue-900 text-base sm:text-lg">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-cyan-500 flex-shrink-0"
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
                      <a href={`tel:${dealer.phone}`} className="hover:text-cyan-600 transition-colors font-medium touch-manipulation break-all">
                        {dealer.phone}
                      </a>
                    </p>
                    {dealer.email && (
                      <p className="flex items-center text-blue-900 text-base sm:text-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-indigo-500 flex-shrink-0"
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
                        <a href={`mailto:${dealer.email}`} className="hover:text-cyan-600 transition-colors font-medium touch-manipulation break-all">
                          {dealer.email}
                        </a>
                      </p>
                    )}
                    {dealer.website && (
                      <p className="flex items-center text-blue-900 text-base sm:text-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-indigo-500 flex-shrink-0"
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
                          className="hover:text-cyan-600 transition-colors font-medium inline-flex items-center gap-1 touch-manipulation break-all"
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
                    <h3 className="text-xs sm:text-sm font-semibold text-blue-600 mb-3 sm:mb-4 uppercase tracking-wide">Services Offered</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {dealer.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full"
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
            <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-5 md:p-6 border border-blue-100/50 lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${dealer.phone}`}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 sm:py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all text-center block font-semibold shadow-md hover:shadow-lg touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  Call Now
                </a>
                {dealer.email && (
                  <a
                    href={`mailto:${dealer.email}`}
                    className="w-full bg-blue-50 text-blue-900 px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl hover:bg-blue-100 transition-colors text-center block font-medium border border-blue-200 touch-manipulation min-h-[44px] flex items-center justify-center"
                  >
                    Send Email
                  </a>
                )}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-100 text-slate-900 px-4 py-3 sm:py-3.5 rounded-xl hover:bg-slate-200 transition-colors text-center block font-semibold touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  Get Directions
                </a>
                {dealer.website && (
                  <a
                    href={dealer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-50 text-blue-900 px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl hover:bg-blue-100 transition-colors text-center block font-medium border border-blue-200 touch-manipulation min-h-[44px] flex items-center justify-center"
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
      <footer className="bg-white/60 backdrop-blur-md border-t border-blue-100/50 mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-blue-600/70 text-xs sm:text-sm">
            © {new Date().getFullYear()} Semi Trailer Dealership Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
