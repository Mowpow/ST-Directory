interface StatsSectionProps {
  dealerCount: number;
  stateCount: number;
  cityCount: number;
}

export default function StatsSection({ dealerCount, stateCount, cityCount }: StatsSectionProps) {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {dealerCount.toLocaleString()}
            </div>
            <div className="text-lg text-gray-600">Dealership Listings</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {stateCount}
            </div>
            <div className="text-lg text-gray-600">States Covered</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {cityCount.toLocaleString()}
            </div>
            <div className="text-lg text-gray-600">Cities</div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#browse-states"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All States
          </a>
        </div>
      </div>
    </div>
  );
}
