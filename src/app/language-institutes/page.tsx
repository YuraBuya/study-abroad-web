'use client';

import { useState, useEffect, useMemo } from 'react';
import UniversityCard from '@/components/UniversityCard';
import BackToTopButton from '@/components/BackToTopButton';
import SchoolSearchFilter from '@/components/SchoolSearchFilter';
import Pagination from '@/components/Pagination';
import { fetchSchools } from '@/lib/api-client';
import { SchoolDTO } from '@/lib/dto';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageInstitute {
  id: string;
  name: string;
  nameKorean?: string;
  city?: string;
  region?: string;
  type?: "National" | "Private" | "Women" | "Tech" | "Other";
  logo: string;
  desc?: string;
  websiteUrl?: string;
  pdfUrl?: string;
  applyUrl?: string;
}

// Map SchoolDTO type to LanguageInstitute type
function mapSchoolDTOToLanguageInstitute(school: SchoolDTO): LanguageInstitute {
  // Parse location to extract city and region
  const locationParts = school.location.split(', ');
  const city = locationParts[0] || "Unknown";
  const region = locationParts.length > 1 ? locationParts[locationParts.length - 1] : "Unknown";
  
  // Map school type to UniversityCard type
  let type: "National" | "Private" | "Women" | "Tech" | "Other" | undefined;
  switch (school.type) {
    case 'LANGUAGE_INSTITUTE':
      type = "Private"; // Default to Private for language institutes
      break;
    case 'UNIVERSITY':
      type = "Other"; // Default to Other for universities
      break;
    case 'GRADUATE_SCHOOL':
      type = "Other"; // Default to Other for graduate schools
      break;
    default:
      type = "Other";
  }
  
  return {
    id: school.id,
    name: school.name,
    nameKorean: school.nameKorean,
    city: city,
    region: region,
    type: type,
    logo: school.logo || '/images/default-logo.svg',
    desc: school.description || "Detailed information about this language institute...",
    websiteUrl: school.website,
    pdfUrl: school.pdfUrl,
    applyUrl: school.website || school.pdfUrl
  };
}

export default function LanguageInstitutes() {
  const { t } = useTranslation();
  const [institutes, setInstitutes] = useState<LanguageInstitute[]>([]);
  const [allInstitutes, setAllInstitutes] = useState<LanguageInstitute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(9); // Number of items per page

  // Filter institutes based on search query and type filter
  const filteredInstitutes = useMemo(() => {
    return allInstitutes.filter(institute => {
      const matchesSearch = 
        institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (institute.nameKorean && institute.nameKorean.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (institute.city && institute.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (institute.region && institute.region.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = 
        typeFilter === 'all' || 
        (typeFilter === 'private' && institute.type === 'Private') ||
        (typeFilter === 'national' && institute.type === 'National');
      
      return matchesSearch && matchesType;
    });
  }, [allInstitutes, searchQuery, typeFilter]);

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  useEffect(() => {
    // Update displayed institutes when filteredInstitutes or currentPage changes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setInstitutes(filteredInstitutes.slice(startIndex, endIndex));
    
    // Calculate total pages
    setTotalPages(Math.ceil(filteredInstitutes.length / pageSize));
  }, [filteredInstitutes, currentPage, pageSize]);

  useEffect(() => {
    // Fetch language institutes from public API
    const fetchInstitutes = async () => {
      try {
        setLoading(true);
        const response = await fetchSchools({ type: 'language' });
        
        // Transform SchoolDTO to LanguageInstitute type
        const transformedInstitutes: LanguageInstitute[] = response.items.map(mapSchoolDTOToLanguageInstitute);
        
        setAllInstitutes(transformedInstitutes);
      } catch (err) {
        console.error('Error fetching language institutes:', err);
        setError(err instanceof Error ? err.message : 'Failed to load language institutes');
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setTypeFilter(type);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-12">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
              <div className="space-y-3 max-w-3xl mx-auto">
                <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-5/6 mx-auto animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mt-3 animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-3xl h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-12">
          <div className="container-custom">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('errors.loadingLanguageInstitutes')}
              </h3>
              <p className="text-gray-600 mb-4">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('errors.retry')}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
                Language Institutes
              </h1>
              <p className="text-lg sm:text-xl font-medium text-blue-700 mt-2">Top Korean Language Institutes</p>
              <div className="mt-4 h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
            </div>
            <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              <span className="block mt-2 text-blue-500">Browse language institutes and open brochures to learn more.</span>
            </p>
          </div>

          {/* Search and Filter */}
          <SchoolSearchFilter 
            onSearch={handleSearch}
            placeholder="Search language institutes..."
          />

          {/* Language Institutes Grid */}
          {institutes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {institutes.map((institute) => (
                  <UniversityCard 
                    key={institute.id} 
                    data={institute} 
                    tone="blue"
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No language institutes found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-cyan-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                어학원 선택 가이드 / Language Institute Selection Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">학습 측면 / Learning</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 커리큘럼 구성</li>
                    <li>• 수업 방식</li>
                    <li>• 강사진 수준</li>
                    <li>• 학습 자료</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">환경 측면 / Environment</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 학원 위치</li>
                    <li>• 교육 시설</li>
                    <li>• 수업 분위기</li>
                    <li>• 교통 편의성</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">비용 및 일정 / Cost & Schedule</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 수강료</li>
                    <li>• 수업 시간</li>
                    <li>• 수업 기간</li>
                    <li>• 환불 정책</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}