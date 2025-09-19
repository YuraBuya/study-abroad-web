"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  MapPin, 
  GraduationCap, 
  Filter,
  SortAsc,
  Languages,
  Award,
  Home,
  BookOpen
} from "lucide-react";

interface School {
  id: string;
  name: string;
  nameKorean?: string;
  location?: string;
  type: string;
  description?: string;
  imageUrl?: string;
  website?: string;
  tuition?: string;
  language?: string;
  programType?: string;
  majors?: string[];
  topikRequired?: boolean;
  scholarshipAvailable?: boolean;
  dormitoryAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Filters {
  keyword: string;
  city: string;
  major: string;
  programType: string;
  language: string;
  topikRequired: boolean;
  scholarship: boolean;
  dormitory: boolean;
}

interface FiltersProps {
  schools: School[];
  onFiltersChange: (filters: Filters) => void;
  onSortChange: (sort: string) => void;
  currentFilters: Filters;
  currentSort: string;
}

export default function Filters({ 
  schools, 
  onFiltersChange, 
  onSortChange,
  currentFilters,
  currentSort
}: FiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique values for filters
  const cities = useMemo(() => {
    const uniqueCities = new Set<string>();
    schools.forEach(school => {
      if (school.location && school.location.includes('Korea')) {
        const city = school.location.split(',')[0].trim();
        if (city) uniqueCities.add(city);
      }
    });
    return Array.from(uniqueCities).sort();
  }, [schools]);

  /* const majors = useMemo(() => {
    // In a real app, this would come from school data
    return ["Business", "Engineering", "Medicine", "Law", "Arts", "Science"];
  }, []); */

  const programTypes = ["MA", "MS", "PhD"];
  const languages = ["Korean", "English"];
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "name", label: "Name (A→Z)" },
    { value: "city", label: "City" },
    { value: "scholarship", label: "Scholarship First" },
    { value: "updated", label: "Recently Updated" }
  ];

  const hasActiveFilters = 
    currentFilters.keyword ||
    currentFilters.city ||
    currentFilters.major ||
    currentFilters.programType ||
    currentFilters.language ||
    currentFilters.topikRequired ||
    currentFilters.scholarship ||
    currentFilters.dormitory;

  const clearFilters = () => {
    onFiltersChange({
      keyword: "",
      city: "",
      major: "",
      programType: "",
      language: "",
      topikRequired: false,
      scholarship: false,
      dormitory: false
    });
  };

  const handleFilterChange = (key: keyof Filters, value: string | boolean) => {
    onFiltersChange({
      ...currentFilters,
      [key]: value
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg ring-1 ring-slate-200/50 sticky top-4 z-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Search & Filters</h2>
          <p className="text-sm text-slate-600">Find your ideal graduate program</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            value={currentFilters.keyword}
            onChange={(e) => handleFilterChange("keyword", e.target.value)}
            placeholder="School, program, city..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200"
          />
        </div>

        {/* City Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <MapPin className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={currentFilters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            className="w-full pl-11 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Program Type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <GraduationCap className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={currentFilters.programType}
            onChange={(e) => handleFilterChange("programType", e.target.value)}
            className="w-full pl-11 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Types</option>
            {programTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Language */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Languages className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={currentFilters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            className="w-full pl-11 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SortAsc className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full pl-11 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm font-medium text-slate-700 hover:bg-white transition-all duration-200"
        >
          <span>Filters & Search</span>
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile Filters (Collapsible) */}
      {isFilterOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              value={currentFilters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              placeholder="School, program, city..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* City */}
            <div className="relative">
              <select
                value={currentFilters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="w-full pl-4 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Program Type */}
            <div className="relative">
              <select
                value={currentFilters.programType}
                onChange={(e) => handleFilterChange("programType", e.target.value)}
                className="w-full pl-4 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Type</option>
                {programTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Language */}
            <div className="relative">
              <select
                value={currentFilters.language}
                onChange={(e) => handleFilterChange("language", e.target.value)}
                className="w-full pl-4 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Language</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full pl-4 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Sort By</option>
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleFilterChange("topikRequired", !currentFilters.topikRequired)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentFilters.topikRequired
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Award className="h-4 w-4" />
              TOPIK
            </button>
            
            <button
              onClick={() => handleFilterChange("scholarship", !currentFilters.scholarship)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentFilters.scholarship
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Scholarship
            </button>
            
            <button
              onClick={() => handleFilterChange("dormitory", !currentFilters.dormitory)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentFilters.dormitory
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Home className="h-4 w-4" />
              Dorm
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-600">
          Showing <span className="font-semibold text-slate-900">{schools.length}</span> Korean graduate schools
        </span>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-slate-500">
            <Filter className="h-4 w-4" />
            Filters applied
          </div>
        )}
      </div>
    </div>
  );
}