'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchoolCard from '@/components/SchoolCard';
import { School } from '@/data/schoolsData';

export default function LanguageInstitutes() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schools from API
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/admin/upload-school?type=LANGUAGE_INSTITUTE');
        if (response.ok) {
          const data = await response.json();
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 sm:py-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-responsive-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">
              어학원 / Language Institutes
            </h1>
            <p className="text-responsive-base text-gray-600 max-w-3xl mx-auto px-4">
              전 세계 최고의 어학원에서 언어 실력을 향상시키세요. 
              각 기관의 로고를 클릭하면 상세 정보를 확인할 수 있습니다.
            </p>
            <p className="text-responsive-sm text-gray-500 mt-2 px-4">
              Improve your language skills at the world's best language institutes. 
              Click on each institution's logo to view detailed information.
            </p>
          </div>

          {/* Schools Grid */}
          {schools.length > 0 ? (
            <div className="grid-responsive-3 gap-4 sm:gap-6 lg:gap-8">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-responsive-base font-semibold text-gray-600 mb-2 px-4">
                현재 등록된 어학원이 없습니다
              </h3>
              <p className="text-responsive-sm text-gray-500 px-4">
                No language institutes are currently registered
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 sm:mt-16 bg-blue-50 rounded-lg sm:rounded-xl p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-responsive-lg font-bold text-gray-800 mb-4 sm:mb-6">
                어학원 선택 가이드 / Language Institute Selection Guide
              </h2>
              <div className="grid-responsive-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
                <div>
                  <h3 className="text-responsive-base font-semibold text-gray-800 mb-3">고려사항 / Considerations</h3>
                  <ul className="text-responsive-sm text-gray-600 spacing-responsive-sm text-left">
                    <li>• 수업 규모 및 교사 대 학생 비율</li>
                    <li>• 위치 및 주변 환경</li>
                    <li>• 프로그램 종류 및 기간</li>
                    <li>• 인증 및 평판</li>
                    <li>• 비용 및 장학금</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-responsive-base font-semibold text-gray-800 mb-3">제공 서비스 / Services</h3>
                  <ul className="text-responsive-sm text-gray-600 spacing-responsive-sm text-left">
                    <li>• 입학 상담 및 지원</li>
                    <li>• 비자 신청 도움</li>
                    <li>• 숙소 안내</li>
                    <li>• 현지 적응 지원</li>
                    <li>• 지속적인 학업 관리</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}