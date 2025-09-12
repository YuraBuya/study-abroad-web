'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchoolCard from '@/components/SchoolCard';
import { School } from '@/data/schoolsData';

export default function GraduateSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schools from API
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/admin/upload-school?type=GRADUATE_SCHOOL');
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
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              대학원 / Graduate Schools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              세계 최고 수준의 대학원에서 석사, 박사 과정을 진행하세요. 
              각 대학원의 로고를 클릭하면 상세 정보를 확인할 수 있습니다.
            </p>
            <p className="text-lg text-gray-500 mt-2">
              Pursue your Master's or PhD at world-class graduate schools. 
              Click on each institution's logo to view detailed information.
            </p>
          </div>

          {/* Schools Grid */}
          {schools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                현재 등록된 대학원이 없습니다
              </h3>
              <p className="text-gray-500">
                No graduate schools are currently registered
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-purple-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                대학원 선택 가이드 / Graduate School Selection Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">석사 과정 / Master's Programs</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 1-2년 집중 과정</li>
                    <li>• 전문 지식 심화</li>
                    <li>• 산업 연계 프로그램</li>
                    <li>• 논문 또는 프로젝트 기반</li>
                    <li>• 취업 중심 커리큘럼</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">박사 과정 / PhD Programs</h3>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• 3-7년 연구 중심</li>
                    <li>• 독창적 연구 수행</li>
                    <li>• 지도교수 멘토링</li>
                    <li>• 학술 논문 발표</li>
                    <li>• 연구자 진로 준비</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">지원 절차 / Application Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">1</span>
                    </div>
                    <p className="text-sm text-gray-600">학교 및 프로그램 선택</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <p className="text-sm text-gray-600">입학 서류 준비</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <p className="text-sm text-gray-600">온라인 지원</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">4</span>
                    </div>
                    <p className="text-sm text-gray-600">인터뷰 및 합격</p>
                  </div>
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