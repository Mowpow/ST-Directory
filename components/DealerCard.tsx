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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200/60 hover:border-indigo-300/60 group">
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        <Link
          href={`/dealers/${dealer.id}`}
          className="hover:text-indigo-600 transition-colors group-hover:text-indigo-600"
        >
          {dealer.name}
        </Link>
      </h3>
      
      <div className="space-y-2.5 text-slate-600 mb-5">
        <p className="flex items-start">
          <svg
            className="w-5 h-5 mr-2.5 mt-0.5 text-indigo-500 flex-shrink-0"
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
          <span className="leading-relaxed">{getFullAddress(dealer.address)}</span>
        </p>
        
        <p className="flex items-center">
          <svg
            className="w-5 h-5 mr-2.5 text-indigo-500 flex-shrink-0"
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
          <a href={`tel:${dealer.phone}`} className="hover:text-indigo-600 transition-colors font-medium">
            {dealer.phone}
          </a>
        </p>
      </div>

      {dealer.services && dealer.services.length > 0 && (
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {dealer.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-lg"
              >
                {service}
              </span>
            ))}
            {dealer.services.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium text-slate-500">
                +{dealer.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <Link
        href={`/dealers/${dealer.id}`}
        className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-700 font-semibold text-sm group-hover:gap-2 gap-1 transition-all"
      >
        View Details
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
