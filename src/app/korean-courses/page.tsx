'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { koreanCoursesInfo } from '@/data/schoolsData';

export default function KoreanCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              한국어 강의 / Korean Language Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              한국어를 체계적으로 배우고 한국 문화를 경험하세요. 
              초급부터 고급까지 다양한 레벨의 수업을 제공합니다.
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Learn Korean systematically and experience Korean culture. 
              We offer classes from beginner to advanced levels.
            </p>
            
            <button
              onClick={openModal}
              className="btn text-lg px-8 py-4"
            >
              자세히 보기 / View Details
            </button>
          </div>

          {/* Course Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="card">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">초급 과정</h3>
                <p className="text-gray-600 mb-2">Beginner Level</p>
                <p className="text-sm text-gray-500">한글 기초부터 일상 회화까지</p>
              </div>
            </div>

            <div className="card">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">중급 과정</h3>
                <p className="text-gray-600 mb-2">Intermediate Level</p>
                <p className="text-sm text-gray-500">문법 심화 및 실용 표현</p>
              </div>
            </div>

            <div className="card">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">고급 과정</h3>
                <p className="text-gray-600 mb-2">Advanced Level</p>
                <p className="text-sm text-gray-500">비즈니스 한국어 및 TOPIK 준비</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-red-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              특별 프로그램 / Special Programs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  문화 체험 프로그램
                </h3>
                <p className="text-gray-600 mb-4">
                  Korean Cultural Experience Program
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• 전통 문화 체험 (한복, 서예, 차문화)</li>
                  <li>• K-pop 댄스 및 드라마 학습</li>
                  <li>• 한국 요리 체험</li>
                  <li>• 문화 유적지 탐방</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  비즈니스 한국어
                </h3>
                <p className="text-gray-600 mb-4">
                  Business Korean Program
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• 비즈니스 회화 및 이메일 작성</li>
                  <li>• 프레젠테이션 스킬</li>
                  <li>• 한국 기업 문화 이해</li>
                  <li>• 취업 면접 준비</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Schedule & Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                수업 일정 / Class Schedule
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">주간 집중반</span>
                  <span className="text-gray-600">월-금 09:00-12:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">야간 과정</span>
                  <span className="text-gray-600">월-수-금 18:00-21:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">주말 과정</span>
                  <span className="text-gray-600">토-일 10:00-16:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">개인 과외</span>
                  <span className="text-gray-600">시간 조율 가능</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                수강료 / Tuition Fees
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">기초 과정 (4주)</span>
                  <span className="text-gray-600 font-semibold">₩480,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">정규 과정 (12주)</span>
                  <span className="text-gray-600 font-semibold">₩1,200,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">집중 과정 (8주)</span>
                  <span className="text-gray-600 font-semibold">₩900,000</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">개인 과외 (1시간)</span>
                  <span className="text-gray-600 font-semibold">₩60,000</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  * 교재비 별도, 조기 등록 시 10% 할인
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={koreanCoursesInfo.title}
      >
        <div dangerouslySetInnerHTML={{ __html: koreanCoursesInfo.content }} />
      </Modal>
    </div>
  );
}