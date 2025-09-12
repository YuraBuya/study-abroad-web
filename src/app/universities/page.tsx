'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchoolCard from '@/components/SchoolCard';
import { School } from '@/data/schoolsData';

export default function Universities() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schools from API
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/admin/upload-school?type=UNIVERSITY');
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
              대학교 / Universities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              세계 유명 대학교에서 학부 과정을 시작하세요. 
              각 대학의 로고를 클릭하면 상세 정보를 확인할 수 있습니다.
            </p>
            <p className="text-lg text-gray-500 mt-2">
              Start your undergraduate journey at world-renowned universities. 
              Click on each university's logo to view detailed information.
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

      <Footer />
    </div>
  );
}