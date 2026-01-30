"use client";

import Link from "next/link";

interface StateStat {
  state: string;
  stateName: string;
  dealerCount: number;
  cityCount: number;
}

interface TopStatesSectionProps {
  topStates: StateStat[];
}

export default function TopStatesSection({ topStates }: TopStatesSectionProps) {
  return (
    <div className="bg-gray-50 py-16 md:py-20" id="browse-states">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Trailer Dealerships by State
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Find semi-trailer dealerships in your state. Our directory includes independent dealers, warehouse stores, and major retailers with store details and contact information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topStates.map((state) => (
            <Link
              key={state.state}
              href={`/?state=${state.state}`}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold text-gray-900">{state.stateName}</span>
                </div>
              </div>
              <div className="text-gray-600">
                <div className="font-medium">{state.dealerCount} {state.dealerCount === 1 ? "dealership" : "dealerships"}</div>
                <div className="text-sm">{state.cityCount} {state.cityCount === 1 ? "city" : "cities"}</div>
              </div>
              <div className="mt-4 text-blue-600 font-medium text-sm">
                View Directory →
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/states"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All 50 States →
          </Link>
        </div>
      </div>
    </div>
  );
}
