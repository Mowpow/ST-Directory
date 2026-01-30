"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DealerList from "@/components/DealerList";
import dealersData from "@/data/dealers.json";

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

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  
  // Rotating text for trailer types
  const trailerTypes = ["REEFER", "DRY VAN", "FLATBEDS", "SIDE DUMPS", "BOTTOM DUMPS", "DROP DECKS", "LIVE FLOORS", "PNEUMATICS"];
  const [currentTrailerType, setCurrentTrailerType] = useState(0);
  
  // Calculate font size based on word length
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length <= 8) return "text-5xl md:text-6xl lg:text-7xl";
    if (length <= 12) return "text-4xl md:text-5xl lg:text-6xl";
    return "text-3xl md:text-4xl lg:text-5xl";
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrailerType((prev) => (prev + 1) % trailerTypes.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const dealers = dealersData.dealers as Dealer[];

  const filteredDealers = useMemo(() => {
    let filtered = [...dealers];

    // Filter by state
    if (selectedState) {
      filtered = filtered.filter((dealer) => dealer.address.state === selectedState);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (dealer) =>
          dealer.name.toLowerCase().includes(query) ||
          dealer.address.city.toLowerCase().includes(query) ||
          dealer.address.state.toLowerCase().includes(query) ||
          dealer.address.street.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedState, dealers]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedState) params.set("state", selectedState);
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedState, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase flex-shrink-0">
              FIND TOP
            </h1>
            <div className="inline-block w-[400px] md:w-[450px] lg:w-[500px] h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden relative flex items-center justify-center flex-shrink-0">
              <span 
                key={currentTrailerType}
                className={`inline-block animate-scroll-up font-bold ${getFontSize(trailerTypes[currentTrailerType])} bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent text-center`}
              >
                {trailerTypes[currentTrailerType]}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase flex-shrink-0">
              SEMI TRAILERS
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search and Filter Section */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 mb-10 border border-blue-100/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-3">
                Search Dealerships
              </label>
              <SearchBar
                onSearch={setSearchQuery}
                initialValue={searchQuery}
              />
            </div>
            <div>
              <FilterPanel
                selectedState={selectedState}
                onStateChange={setSelectedState}
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {filteredDealers.length} {filteredDealers.length === 1 ? "Dealership" : "Dealerships"} Found
          </h2>
        </div>

        {/* Dealership List */}
        <DealerList dealers={filteredDealers} />
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-md border-t border-blue-100/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-blue-600/70 text-sm">
            © {new Date().getFullYear()} Semi Trailer Dealership Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-blue-600 font-medium">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
