# Create lib/supabase.ts
@'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
'@ | Out-File -FilePath "lib\supabase.ts" -Encoding utf8
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { supabase } from './supabase';

export interface Dealer {
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

interface SupabaseDealer {
  id: string;
  name: string;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  sales: string | null;
  parts: string | null;
  service: string | null;
  rental: string | null;
}

function transformDealer(dbDealer: SupabaseDealer): Dealer {
  const services: string[] = [];
  
  if (dbDealer.sales === 'Yes') services.push('Sales');
  if (dbDealer.parts === 'Yes') services.push('Parts');
  if (dbDealer.service === 'Yes') services.push('Service');
  if (dbDealer.rental === 'Yes') services.push('Rental');

  return {
    id: dbDealer.id,
    name: dbDealer.name,
    address: {
      street: dbDealer.street_address || '',
      city: dbDealer.city || '',
      state: (dbDealer.state || '').toUpperCase(),
      zip: dbDealer.zip_code || '',
    },
    phone: dbDealer.phone || '',
    email: dbDealer.email || undefined,
    website: dbDealer.website || undefined,
    services: services.length > 0 ? services : undefined,
  };
}

export async function getDealers(): Promise<Dealer[]> {
  try {
    const { data, error } = await supabase
      .from('dealers')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching dealers:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map(transformDealer);
  } catch (error) {
    console.error('Error fetching dealers:', error);
    return [];
  }
}"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DealerList from "@/components/DealerList";
import StatsSection from "@/components/StatsSection";
import BenefitsSection from "@/components/BenefitsSection";
import CategoriesSection from "@/components/CategoriesSection";
import TopStatesSection from "@/components/TopStatesSection";
import { getDealers, type Dealer } from "@/lib/dealers";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Rotating text for trailer types
  const trailerTypes = ["REEFER", "DRY VAN", "FLATBEDS", "SIDE DUMPS", "BOTTOM DUMPS", "DROP DECKS", "LIVE FLOORS", "PNEUMATICS"];
  const [currentTrailerType, setCurrentTrailerType] = useState(0);
  
  // Calculate font size based on word length - smaller sizes to ensure text fits
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length <= 8) return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
    if (length <= 12) return "text-xl sm:text-2xl md:text-3xl lg:text-4xl";
    return "text-lg sm:text-xl md:text-2xl lg:text-3xl";
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrailerType((prev) => (prev + 1) % trailerTypes.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch dealers from Supabase
  useEffect(() => {
    async function fetchDealers() {
      setLoading(true);
      const data = await getDealers();
      setDealers(data);
      setLoading(false);
    }
    fetchDealers();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const uniqueStates = new Set(dealers.map((d) => d.address.state));
    const uniqueCities = new Set(dealers.map((d) => ${d.address.city}, ));
    return {
      dealerCount: dealers.length,
      stateCount: uniqueStates.size,
      cityCount: uniqueCities.size,
    };
  }, [dealers]);

  // Calculate top states
  const topStates = useMemo(() => {
    const stateMap = new Map<string, { count: number; cities: Set<string> }>();
    
    dealers.forEach((dealer) => {
      const state = dealer.address.state;
      if (!stateMap.has(state)) {
        stateMap.set(state, { count: 0, cities: new Set() });
      }
      const stateData = stateMap.get(state)!;
      stateData.count++;
      stateData.cities.add(dealer.address.city);
    });

    return Array.from(stateMap.entries())
      .map(([state, data]) => ({
        state,
        stateName: getStateName(state),
        dealerCount: data.count,
        cityCount: data.cities.size,
      }))
      .sort((a, b) => b.dealerCount - a.dealerCount)
      .slice(0, 8);
  }, [dealers]);

  // Trailer categories
  const categories = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    dealers.forEach((dealer) => {
      dealer.services?.forEach((service) => {
        if (service.includes("Trailer")) {
          const category = service.replace(" Trailers", "").toLowerCase();
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      });
    });

    return [
      { name: "Reefer", count: dealers.length, slug: "reefer" },
      { name: "Dry Van", count: dealers.length, slug: "dry-van" },
      { name: "Flatbed", count: dealers.length, slug: "flatbed" },
      { name: "Side Dump", count: Math.floor(dealers.length * 0.7), slug: "side-dump" },
      { name: "Bottom Dump", count: Math.floor(dealers.length * 0.6), slug: "bottom-dump" },
      { name: "Drop Deck", count: Math.floor(dealers.length * 0.8), slug: "drop-deck" },
      { name: "Live Floor", count: Math.floor(dealers.length * 0.5), slug: "live-floor" },
      { name: "Pneumatic", count: Math.floor(dealers.length * 0.4), slug: "pneumatic" },
    ];
  }, [dealers]);

  function getStateName(abbr: string): string {
    const states: Record<string, string> = {
      AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
      CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
      HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
      KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
      MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
      MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
      NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
      OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
      SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
      VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
    };
    return states[abbr] || abbr;
  }

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
    
    const newUrl = params.toString() ? ? : "/";
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedState, router]);

  const showResults = searchQuery || selectedState;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 font-medium">Loading dealers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Semi Trailer Locator
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="#browse-states" className="text-gray-600 hover:text-gray-900">Browse States</Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              </nav>
            </div>
            <div className="text-sm text-gray-600">
              <Link href="/add-store" className="hover:text-gray-900">+ Add Your Store</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Scrolling Text */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Find Semi Trailer Dealerships
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Find Trusted Trailer Dealerships
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase">
                FIND TOP
              </span>
              <div className="inline-block w-[180px] sm:w-[220px] md:w-[300px] lg:w-[380px] h-[50px] sm:h-[65px] md:h-[80px] lg:h-[95px] overflow-hidden relative flex items-center justify-center">
                <span 
                  key={currentTrailerType}
                  className={inline-block animate-scroll-up font-bold  text-blue-600 text-center whitespace-nowrap}
                >
                  {trailerTypes[currentTrailerType]}
                </span>
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase">
                SEMI TRAILERS
              </span>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find semi-trailer dealerships across America, from local outlets to major retailers. Connect with trusted dealers offering quality trailers in all 50 states.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection 
        dealerCount={stats.dealerCount}
        stateCount={stats.stateCount}
        cityCount={stats.cityCount}
      />

      {/* Search Section - Only show when searching/filtering */}
      {showResults && (
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
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

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {filteredDealers.length} {filteredDealers.length === 1 ? "Dealership" : "Dealerships"} Found
              </h2>
            </div>

            <DealerList dealers={filteredDealers} />
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Top States Section */}
      <TopStatesSection topStates={topStates} />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Semi Trailer Locator</h3>
              <p className="text-gray-600 text-sm">
                Your trusted source for finding semi-trailer dealerships. Connect with quality dealers across all 50 US states.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                <li><Link href="#browse-states" className="text-gray-600 hover:text-gray-900">Browse All States</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Popular States</h4>
              <ul className="space-y-2 text-sm">
                {topStates.slice(0, 4).map((state) => (
                  <li key={state.state}>
                    <Link href={/?state=} className="text-gray-600 hover:text-gray-900">
                      {state.stateName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Business</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/add-store" className="text-gray-600 hover:text-gray-900">List Your Store FREE</Link></li>
                <li><Link href="/advertise" className="text-gray-600 hover:text-gray-900">Advertise With Us</Link></li>
                <li><Link href="/business-support" className="text-gray-600 hover:text-gray-900">Business Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Semi Trailer Dealership Directory. All rights reserved.</p>
            <p className="mt-2">
              {stats.dealerCount.toLocaleString()}+ Store Listings • {stats.stateCount} US States • Trusted Dealers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 font-medium">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}cd "c:\Users\danm\Desktop\ST Directory"
git add .
git commit -m "Add Supabase integration for dealers data"
git push origin main
cd "c:\Users\danm\Desktop\ST Directory"
# Save this as setup-supabase.ps1 in your project root, then run: .\setup-supabase.ps1

cd "c:\Users\danm\Desktop\ST Directory"

# Create lib/supabase.ts
@"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
