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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block text-sm font-medium"
          >
            ← Back to Directory
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{dealer.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Dealership Information
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                  <p className="text-gray-900 flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0"
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
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                  >
                    View on Map →
                  </a>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact</h3>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-900">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0"
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
                      <a href={`tel:${dealer.phone}`} className="hover:text-blue-600">
                        {dealer.phone}
                      </a>
                    </p>
                    {dealer.email && (
                      <p className="flex items-center text-gray-900">
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0"
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
                        <a href={`mailto:${dealer.email}`} className="hover:text-blue-600">
                          {dealer.email}
                        </a>
                      </p>
                    )}
                    {dealer.website && (
                      <p className="flex items-center text-gray-900">
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0"
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
                          className="hover:text-blue-600"
                        >
                          Visit Website →
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Services */}
                {dealer.services && dealer.services.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {dealer.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-lg"
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
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${dealer.phone}`}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
                >
                  Call Now
                </a>
                {dealer.email && (
                  <a
                    href={`mailto:${dealer.email}`}
                    className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center block font-medium"
                  >
                    Send Email
                  </a>
                )}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center block font-medium"
                >
                  Get Directions
                </a>
                {dealer.website && (
                  <a
                    href={dealer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center block font-medium"
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
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Semi Trailer Dealership Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
