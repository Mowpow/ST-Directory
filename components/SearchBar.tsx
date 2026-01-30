"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by dealership name, city, or state..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 sm:py-3.5 pl-11 pr-4 text-base sm:text-lg text-blue-900 bg-white border border-blue-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all shadow-md hover:shadow-lg touch-manipulation"
        />
        <svg
          className="absolute left-3.5 top-3.5 h-5 w-5 text-cyan-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
