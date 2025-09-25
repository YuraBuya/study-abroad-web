'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

interface SchoolSearchFilterProps {
  onSearch: (query: string, typeFilter: string) => void;
  placeholder?: string;
  initialQuery?: string;
  initialTypeFilter?: string;
}

export default function SchoolSearchFilter({
  onSearch,
  placeholder = "Search schools...",
  initialQuery = "",
  initialTypeFilter = "all"
}: SchoolSearchFilterProps) {
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState(initialTypeFilter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Trigger search when query or typeFilter changes
  useEffect(() => {
    onSearch(query, typeFilter);
  }, [query, typeFilter, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, typeFilter);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    type="button"
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      typeFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setTypeFilter('all');
                      setIsFilterOpen(false);
                    }}
                  >
                    All Types
                  </button>
                  <button
                    type="button"
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      typeFilter === 'university' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setTypeFilter('university');
                      setIsFilterOpen(false);
                    }}
                  >
                    Universities
                  </button>
                  <button
                    type="button"
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      typeFilter === 'language' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setTypeFilter('language');
                      setIsFilterOpen(false);
                    }}
                  >
                    Language Institutes
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}