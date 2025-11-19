"use client";

import { Search, X, ArrowUpDown } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSortBy("newest");
    startTransition(() => {
      router.push("/products");
    });
  };

  const hasActiveFilters = search || sortBy !== "newest";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-gray-400 text-gray-900"
          />
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative lg:w-64">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all cursor-pointer appearance-none text-gray-900"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="lg:w-auto px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Clear
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-green-100">Active filters:</span>
          {search && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
              Search: {search}
              <button
                onClick={() => handleSearch("")}
                className="hover:text-green-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {sortBy !== "newest" && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
              Sort:{" "}
              {sortBy === "oldest"
                ? "Oldest First"
                : sortBy === "name-asc"
                ? "A-Z"
                : "Z-A"}
            </span>
          )}
        </div>
      )}

      {/* Loading Indicator */}
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-green-100">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Updating...</span>
        </div>
      )}
    </div>
  );
}
