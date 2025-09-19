'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import ServiceCard from '@/components/agency/ServiceCard';
import { agencyInfo } from '@/data/schoolsData';
import { 
  MessageCircle, 
  FileText, 
  Home, 
  FileSignature, 
  Smartphone, 
  UserSearch 
} from 'lucide-react';

export default function AgencyInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const services = [
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      title: "유학 상담",
      description: "개인별 맞춤 상담 및 유학 계획 수립",
      background: "bg-blue-100"
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: "입학 지원",
      description: "서류 작성부터 제출까지 전 과정 지원",
      background: "bg-green-100"
    },
    {
      icon: <Home className="w-6 h-6 text-purple-600" />,
      title: "비자 신청",
      description: "비자 종류별 신청 절차 안내 및 지원",
      background: "bg-purple-100"
    },
    {
      icon: <FileSignature className="w-6 h-6 text-yellow-600" />,
      title: "번역",
      description: "공증 번역 서브시",
      background: "bg-yellow-100"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-red-600" />,
      title: "Sim card 개통",
      description: "SK / LG 통신 유심 개통",
      background: "bg-red-100"
    },
    {
      icon: <UserSearch className="w-6 h-6 text-indigo-600" />,
      title: "맞춤 컨설팅",
      description: "개인 목표에 맞는 전문 교육 컨설팅",
      background: "bg-indigo-100"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Agency Information
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              A professional educational consulting company supporting students&#39; 
              successful study abroad experiences with over 15 years of experience.
            </p>
            
            <button
              onClick={openModal}
              className="btn text-lg px-8 py-4"
            >
              상세 정보 보기 / View Detailed Information
            </button>
          </div>
          
          {/* Services Section */}
          <div className="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              제공 서비스 / Our Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  iconBackground={service.background}
                />
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              전문 상담팀 / Our Expert Team
            </h2>
                       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">한국/인천 팀</h3>
                   <p className="text-sm text-gray-500 mt-2">경력의 전문 상담사</p>
                </div>
              </div>
              </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              지금 바로 상담받으세요! / Get Consultation Now!
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              전문 상담사가 당신의 유학 계획을 함께 세워드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center">
                무료 상담 신청 / Free Consultation
              </Link>
              <a href="tel:+82-2-1234-5678" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 inline-flex items-center justify-center">
                전화 상담 / Call Now
              </a>
            </div>
          </div>
        </div>
      </main>


      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={agencyInfo.title}
      >
        <div dangerouslySetInnerHTML={{ __html: agencyInfo.content }} />
      </Modal>
    </div>
  );
}