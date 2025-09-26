'use client';

import { useState, useEffect, useMemo } from 'react';
import UniversityCard from '@/components/UniversityCard';
import BackToTopButton from '@/components/BackToTopButton';
import SchoolSearchFilter from '@/components/SchoolSearchFilter';
import Pagination from '@/components/Pagination';
import { fetchSchools } from '@/lib/api-client';
import { SchoolDTO } from '@/lib/dto';
import { useTranslation } from '@/hooks/useTranslation';

interface University {
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

// Map SchoolDTO type to UniversityCard expected type
function mapSchoolDTOToUniversity(school: SchoolDTO): University {
  // Parse location to extract city and region
  const locationParts = school.location.split(', ');
  const city = locationParts[0] || "Unknown";
  const region = locationParts.length > 1 ? locationParts[locationParts.length - 1] : "Unknown";
  
  // Map school type to UniversityCard type
  let type: "National" | "Private" | "Women" | "Tech" | "Other" | undefined;
  switch (school.type) {
    case 'UNIVERSITY':
      type = "National"; // Default to National for universities
      break;
    case 'LANGUAGE_INSTITUTE':
      type = "Other"; // Default to Other for language institutes
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
    desc: school.description || "Detailed information about this university...",
    websiteUrl: school.website,
    pdfUrl: school.pdfUrl,
    applyUrl: school.website || school.pdfUrl
  };
}

export default function Universities() {
  const { t } = useTranslation();
  const [universities, setUniversities] = useState<University[]>([]);
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(9); // Number of items per page

  // Filter universities based on search query and type filter
  const filteredUniversities = useMemo(() => {
    return allUniversities.filter(university => {
      const matchesSearch = 
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (university.nameKorean && university.nameKorean.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (university.city && university.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (university.region && university.region.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = 
        typeFilter === 'all' || 
        (typeFilter === 'national' && university.type === 'National') ||
        (typeFilter === 'private' && university.type === 'Private') ||
        (typeFilter === 'women' && university.type === 'Women') ||
        (typeFilter === 'tech' && university.type === 'Tech');
      
      return matchesSearch && matchesType;
    });
  }, [allUniversities, searchQuery, typeFilter]);

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  useEffect(() => {
    // Update displayed universities when filteredUniversities or currentPage changes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setUniversities(filteredUniversities.slice(startIndex, endIndex));
    
    // Calculate total pages
    setTotalPages(Math.ceil(filteredUniversities.length / pageSize));
  }, [filteredUniversities, currentPage, pageSize]);

  useEffect(() => {
    // Fetch universities from public API
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await fetchSchools({ type: 'university' });
        
        // Transform SchoolDTO to University type
        const transformedUniversities: University[] = response.items.map(mapSchoolDTOToUniversity);
        
        setAllUniversities(transformedUniversities);
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError(err instanceof Error ? err.message : 'Failed to load universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
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
                {t('errors.loadingUniversities')}
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 bg-clip-text text-transparent">
                Universities
              </h1>
              <p className="text-lg sm:text-xl font-medium text-purple-700 mt-2">Top Korean Universities</p>
              <div className="mt-4 h-1.5 w-32 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mx-auto" />
            </div>
            <p className="text-lg sm:text-xl text-purple-700 max-w-3xl mx-auto leading-relaxed">
              <span className="block mt-2 text-purple-500">Browse universities and open brochures to learn more.</span>
            </p>
          </div>

          {/* Search and Filter */}
          <SchoolSearchFilter 
            onSearch={handleSearch}
            placeholder="Search universities..."
          />

          {/* Universities Grid */}
          {universities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {universities.map((university) => (
                  <UniversityCard 
                    key={university.id} 
                    data={university} 
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
                No universities found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-green-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                대학교 선택 가이드 / University Selection Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">학업 측면 / Academic</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 전공 프로그램 질</li>
                    <li>• 교수진 및 연구 시설</li>
                    <li>• 학업 지원 시스템</li>
                    <li>• 인턴십 기회</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">생활 측면 / Lifestyle</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 캠퍼스 환경</li>
                    <li>• 기숙사 및 생활비</li>
                    <li>• 학생 활동</li>
                    <li>• 지역 문화</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">미래 계획 / Future</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 취업률 및 진로</li>
                    <li>• 동문 네트워크</li>
                    <li>• 대학원 진학률</li>
                    <li>• 글로벌 인지도</li>
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