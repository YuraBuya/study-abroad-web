'use client';

import { useState, useEffect, useMemo } from 'react';
import Filters from '@/components/graduate-schools/Filters';
import SchoolCard from '@/components/graduate-schools/SchoolCard';
import EmptyState from '@/components/graduate-schools/EmptyState';
import { School } from '@/data/schoolsData';

export default function GraduateSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
    city: "",
    major: "",
    programType: "",
    language: "",
    topikRequired: false,
    scholarship: false,
    dormitory: false
  });
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    // Fetch schools from API
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/admin/upload-school?type=GRADUATE_SCHOOL');
        if (response.ok) {
          const data = await response?.json();
          setSchools(data.schools);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Filter schools to only show Korean ones
  const koreanSchools = useMemo(() => {
    return schools.filter(school => 
      school.location && school.location.includes('Korea')
    );
  }, [schools]);

  // Apply filters and sorting
  const filteredAndSortedSchools = useMemo(() => {
    let result = [...koreanSchools];
    
    // Apply keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(school => 
        school.name.toLowerCase().includes(keyword) ||
        (school.nameKorean && school.nameKorean.toLowerCase().includes(keyword)) ||
        school.location.toLowerCase().includes(keyword)
      );
    }
    
    // Apply city filter
    if (filters.city) {
      result = result.filter(school => 
        school.location && school.location.split(',')[0].trim() === filters.city
      );
    }
    
    // Apply program type filter
    if (filters.programType) {
      // In a real app, this would filter by actual program type data
    }
    
    // Apply language filter
    if (filters.language) {
      // In a real app, this would filter by actual language data
    }
    
    // Apply feature filters
    if (filters.topikRequired) {
      // In a real app, this would filter by TOPIK requirement
    }
    
    if (filters.scholarship) {
      // In a real app, this would filter by scholarship availability
    }
    
    if (filters.dormitory) {
      // In a real app, this would filter by dormitory availability
    }
    
    // Apply sorting
    switch (sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "city":
        result.sort((a, b) => {
          const cityA = a.location ? a.location.split(',')[0] : "";
          const cityB = b.location ? b.location.split(',')[0] : "";
          return cityA.localeCompare(cityB);
        });
        break;
      // Other sorting options would be implemented here
    }
    
    return result;
  }, [koreanSchools, filters, sort]);

  const hasActiveFiltersBoolean = 
    !!filters.keyword ||
    !!filters.city ||
    !!filters.major ||
    !!filters.programType ||
    !!filters.language ||
    filters.topikRequired ||
    filters.scholarship ||
    filters.dormitory;

  const clearFilters = () => {
    setFilters({
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading graduate schools...</p>
          </div>
        </main>
       </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Korean Graduate Schools
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover top graduate programs in Korea. Filter by location, program type, and more to find your ideal school.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm ring-1 ring-slate-200/50">
              <div className="text-2xl font-bold text-purple-600">{koreanSchools.length}</div>
              <div className="text-sm text-gray-600">Total Schools</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm ring-1 ring-slate-200/50">
              <div className="text-2xl font-bold text-purple-600">
                {filteredAndSortedSchools.length}
              </div>
              <div className="text-sm text-gray-600">Filtered Results</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm ring-1 ring-slate-200/50">
              <div className="text-2xl font-bold text-purple-600">Seoul</div>
              <div className="text-sm text-gray-600">Top City</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm ring-1 ring-slate-200/50">
              <div className="text-2xl font-bold text-purple-600">PhD</div>
              <div className="text-sm text-gray-600">Popular Programs</div>
            </div>
          </div>

          {/* Filters */}
          <Filters
            schools={koreanSchools}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            currentFilters={filters}
            currentSort={sort}
          />

          {/* Results */}
          <div className="mt-8">
            {filteredAndSortedSchools.length === 0 ? (
              <EmptyState 
                onClearFilters={clearFilters} 
                hasActiveFilters={hasActiveFiltersBoolean} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedSchools.map((school) => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
