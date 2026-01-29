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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-md shadow-lg border-b border-indigo-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900">
                Find top Semi Trailer Dealerships
              </h1>
            </div>
            <div className="text-center lg:text-left">
              <div className="inline-block min-w-[280px] h-[1.2em] overflow-hidden relative">
                <span 
                  key={currentTrailerType}
                  className="inline-block animate-scroll-up font-bold text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
                >
                  {trailerTypes[currentTrailerType]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-10 border border-indigo-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-indigo-900 mb-3">
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
          <h2 className="text-2xl font-bold text-indigo-900">
            {filteredDealers.length} {filteredDealers.length === 1 ? "Dealership" : "Dealerships"} Found
          </h2>
        </div>

        {/* Dealership List */}
        <DealerList dealers={filteredDealers} />
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center">
        <div className="text-indigo-700 font-medium">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
