"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HomeClientProps {
  initialData?: Record<string, unknown>;
}

export default function HomeClient({ initialData: __initialData }: HomeClientProps) {
  const { t: __t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 md:text-4xl">
                CCA Education Agency
              </h1>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 md:text-2xl">
                프리미엄 국제교육 컨설팅
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed px-4 md:text-lg md:mb-8">
                전 세계 선도적인 교육 기관과 함께 여러분의 꾸을 이룰어 낼 수 있도록 도와드립니다. 지원부터 졸업까지 전방위에 걸쳐 포괄적인 지원을 제공합니다.
              </p>
              <div className="flex flex-col gap-3 justify-center px-4 md:flex-row md:gap-4">
                <Link href="/language-institutes" className="btn text-base px-6 py-3 w-full md:w-auto md:px-8 md:py-4">
                  어학원 프로그램
                </Link>
                <Link href="/universities" className="btn-secondary text-base px-6 py-3 w-full md:w-auto md:px-8 md:py-4">
                  대학교 프로그램
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 md:text-3xl">
                전문 교육 프로그램
              </h2>
              <p className="text-base text-gray-600 px-4 md:text-lg">
                여러분의 목표에 맞춤화된 세계 수준의 교육 기회를 발견하세요
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/language-institutes" className="card group hover:scale-105 transition-transform duration-300 touch-target">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">어학원</h3>
                  <p className="text-sm text-gray-600">인증된 강사와 함께하는 집중 언어 프로그램</p>
                </div>
              </Link>

              <Link href="/universities" className="card group hover:scale-105 transition-transform duration-300 touch-target">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">대학교</h3>
                  <p className="text-sm text-gray-600">학사 및 학부 학위 프로그램</p>
                </div>
              </Link>

              <Link href="/graduate-schools" className="card group hover:scale-105 transition-transform duration-300 touch-target">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">대학원</h3>
                  <p className="text-sm text-gray-600">최고 기관의 석사 및 박사 프로그램</p>
                </div>
              </Link>

              <Link href="/korean-courses" className="card group hover:scale-105 transition-transform duration-300 touch-target">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">한국어 프로그램</h3>
                  <p className="text-sm text-gray-600">원어민과 문화 몽입을 통한 한국어 학습</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          className="bg-gray-50 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 md:text-3xl">
                오늘 여정을 시작하세요
              </h2>
              <p className="text-base text-gray-600 px-4 md:text-lg">
                전문 상담사로부터 맞춤형 상담을 받으세요
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}