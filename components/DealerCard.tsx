import Link from "next/link";
import { getFullAddress } from "@/lib/utils";

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
  services?: string[];
}

interface DealerCardProps {
  dealer: Dealer;
}

export default function DealerCard({ dealer }: DealerCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-5 md:p-6 border border-blue-100/50 hover:border-cyan-200 group">
      <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
        <Link
          href={`/dealers/${dealer.id}`}
          className="hover:text-cyan-600 transition-colors group-hover:text-cyan-600"
        >
          {dealer.name}
        </Link>
      </h3>
      
      <div className="space-y-2 sm:space-y-2.5 text-blue-700 mb-4 sm:mb-5">
        <p className="flex items-start">
          <svg
            className="w-5 h-5 mr-2 sm:mr-2.5 mt-0.5 text-cyan-500 flex-shrink-0"
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
          <span className="leading-relaxed text-sm sm:text-base">{getFullAddress(dealer.address)}</span>
        </p>
        
        <p className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 sm:mr-2.5 text-indigo-500 flex-shrink-0"
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
          <a href={`tel:${dealer.phone}`} className="hover:text-cyan-600 transition-colors font-medium text-sm sm:text-base touch-manipulation">
            {dealer.phone}
          </a>
        </p>
      </div>

      {dealer.services && dealer.services.length > 0 && (
        <div className="mb-4 sm:mb-5">
          <div className="flex flex-wrap gap-2">
            {dealer.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2.5 sm:px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full"
              >
                {service}
              </span>
            ))}
            {dealer.services.length > 3 && (
              <span className="px-2.5 sm:px-3 py-1 text-xs font-medium text-blue-600">
                +{dealer.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <Link
        href={`/dealers/${dealer.id}`}
        className="inline-flex items-center mt-3 sm:mt-4 text-cyan-600 hover:text-blue-600 font-semibold text-sm sm:text-base group-hover:gap-2 gap-1 transition-all touch-manipulation min-h-[44px]"
      >
        View Details
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
