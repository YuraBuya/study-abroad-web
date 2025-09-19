'use client';

import { useState, useEffect } from 'react';
import UniversityCard, { University } from '@/components/UniversityCard';
import BackToTopButton from '@/components/BackToTopButton';

// Mock data for demonstration
const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Seoul National University',
    nameKorean: '서울대학교',
    city: 'Seoul',
    region: 'Seoul',
    type: 'National',
    logo: '/images/default-logo.svg',
    desc: 'Seoul National University is a national research university located in Seoul, South Korea. It is consistently ranked as one of the top universities in Asia and the world.',
    websiteUrl: 'https://www.snu.ac.kr',
    pdfUrl: '/pdfs/sample.txt',
    applyUrl: 'https://www.snu.ac.kr/apply'
  },
  {
    id: '2',
    name: 'Korea University',
    nameKorean: '고려대학교',
    city: 'Seoul',
    region: 'Seoul',
    type: 'Private',
    logo: '/images/default-logo.svg',
    desc: 'Korea University is a private research university located in Seoul, South Korea. It is one of the most prestigious universities in South Korea.',
    websiteUrl: 'https://www.korea.ac.kr',
    pdfUrl: '/pdfs/sample.txt',
    applyUrl: 'https://www.korea.ac.kr/apply'
  },
  {
    id: '3',
    name: 'Yonsei University',
    nameKorean: '연세대학교',
    city: 'Seoul',
    region: 'Seoul',
    type: 'Private',
    logo: '/images/default-logo.svg',
    desc: 'Yonsei University is a private research university in Seoul, South Korea. It is one of the oldest universities in Korea and is known for its strong academic programs.',
    websiteUrl: 'https://www.yonsei.ac.kr',
    pdfUrl: '/pdfs/sample.txt',
    applyUrl: 'https://www.yonsei.ac.kr/apply'
  },
  {
    id: '4',
    name: 'Pohang University of Science and Technology',
    nameKorean: '포항공과대학교',
    city: 'Pohang',
    region: 'Gyeongsangbuk-do',
    type: 'Tech',
    logo: '/images/default-logo.svg',
    desc: 'POSTECH is a private research university in Pohang, South Korea, focused on science and technology. It is known for its strong research programs and innovation.',
    websiteUrl: 'https://www.postech.ac.kr',
    pdfUrl: '/pdfs/sample.txt',
    applyUrl: 'https://www.postech.ac.kr/apply'
  }
];

export default function Universities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch universities from API
    const fetchUniversities = async () => {
      try {
        const response = await fetch('/api/admin/upload-school?type=UNIVERSITY');
        if (response.ok) {
          const data = await response?.json();
          // Transform data to match University type
          const transformedUniversities = data.schools.map((school: any) => ({
            id: school.id,
            name: school.name,
            nameKorean: school.nameKorean,
            city: school.location?.split(', ')[0] || "Unknown",
            region: school.location?.split(', ').pop() || "Unknown",
            type: school.type === 'UNIVERSITY' ? 'Other' : school.type, // Map the type correctly
            logo: school.logo,
            desc: "Detailed information about this university...", // Placeholder description
            websiteUrl: school.websiteUrl,
            pdfUrl: school.pdfUrl,
            applyUrl: school.applyUrl || school.websiteUrl
          }));
          setUniversities(transformedUniversities);
        } else {
          // Use mock data if API fails
          setUniversities(mockUniversities);
        }
      } catch (error) {
        // Use mock data if API fails
        setUniversities(mockUniversities);
      } finally {
        setLoading(false);
      }
    };

    // Call the function immediately
    fetchUniversities();
  }, []);

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

          {/* Universities Grid */}
          {universities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.map((university) => (
                <UniversityCard 
                  key={university.id} 
                  data={university} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                현재 등록된 대학교가 없습니다
              </h3>
              <p className="text-gray-500">
                No universities are currently registered
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