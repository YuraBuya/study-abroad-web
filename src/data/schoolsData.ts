import { prisma } from '@/lib/prisma';

export interface School {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  logo: string;
  pdfUrl: string;
  type: 'LANGUAGE_INSTITUTE' | 'UNIVERSITY' | 'GRADUATE_SCHOOL';
  createdAt: string;
  updatedAt: string;
}

// Get schools from database
export async function getSchoolsByType(type?: 'LANGUAGE_INSTITUTE' | 'UNIVERSITY' | 'GRADUATE_SCHOOL') {
  try {
    const whereClause = type ? { type } : {};
    
    const schools = await prisma.school.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return schools;
  } catch (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
}

// Seed data function to populate initial data
export async function seedSchools() {
  try {
    // Check if schools already exist
    const existingSchools = await prisma.school.count();
    if (existingSchools > 0) {
      return; // Data already exists
    }

    // Create initial schools
    await prisma.school.createMany({
      data: [
        {
          name: 'Harvard University',
          nameKorean: '하버드 대학교',
          location: 'Cambridge, MA, USA',
          logo: '/images/harvard-logo.svg',
          pdfUrl: '/pdfs/harvard-profile.txt',
          type: 'UNIVERSITY'
        },
        {
          name: 'Stanford University',
          nameKorean: '스탠포드 대학교',
          location: 'Stanford, CA, USA',
          logo: '/images/default-logo.svg',
          pdfUrl: '/pdfs/sample.txt',
          type: 'UNIVERSITY'
        },
        {
          name: 'Oxford English Academy',
          nameKorean: '옥스포드 영어 아카데미',
          location: 'Oxford, UK',
          logo: '/images/oxford-logo.svg',
          pdfUrl: '/pdfs/oxford-profile.txt',
          type: 'LANGUAGE_INSTITUTE'
        },
        {
          name: 'Cambridge Language Center',
          nameKorean: '케임브리지 언어 센터',
          location: 'Cambridge, UK',
          logo: '/images/default-logo.svg',
          pdfUrl: '/pdfs/sample.txt',
          type: 'LANGUAGE_INSTITUTE'
        },
        {
          name: 'MIT Graduate School',
          nameKorean: 'MIT 대학원',
          location: 'Cambridge, MA, USA',
          logo: '/images/mit-logo.svg',
          pdfUrl: '/pdfs/mit-profile.txt',
          type: 'GRADUATE_SCHOOL'
        },
        {
          name: 'Caltech Graduate Programs',
          nameKorean: '칼텍 대학원',
          location: 'Pasadena, CA, USA',
          logo: '/images/default-logo.svg',
          pdfUrl: '/pdfs/sample.txt',
          type: 'GRADUATE_SCHOOL'
        }
      ]
    });
    
    console.log('Schools seeded successfully');
  } catch (error) {
    console.error('Error seeding schools:', error);
  }
}

export const koreanCoursesInfo = {
  title: '한국어 강의 / Korean Language Courses',
  content: `
    <div class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-800">코스 개요 / Course Overview</h3>
      <p class="text-gray-600">
        한국어를 배우고자 하는 외국인 학생들을 위한 체계적인 한국어 교육 프로그램을 제공합니다.
        초급부터 고급까지 다양한 레벨의 수업이 준비되어 있습니다.
      </p>
      <p class="text-gray-600">
        We offer systematic Korean language education programs for international students who want to learn Korean.
        Classes are available from beginner to advanced levels.
      </p>
      
      <h3 class="text-xl font-semibold text-gray-800">제공 코스 / Available Courses</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-600">
        <li>초급 한국어 (Beginner Korean)</li>
        <li>중급 한국어 (Intermediate Korean)</li>
        <li>고급 한국어 (Advanced Korean)</li>
        <li>비즈니스 한국어 (Business Korean)</li>
        <li>TOPIK 준비반 (TOPIK Preparation)</li>
      </ul>
      
      <h3 class="text-xl font-semibold text-gray-800">특징 / Features</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-600">
        <li>소규모 클래스 운영 (Small class sizes)</li>
        <li>원어민 및 경험 있는 강사진 (Native and experienced instructors)</li>
        <li>문화 체험 프로그램 (Cultural experience programs)</li>
        <li>개별 학습 지원 (Individual learning support)</li>
      </ul>
    </div>
  `
};

export const agencyInfo = {
  title: 'Agency 정보 / Agency Information',
  content: `
    <div class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-800">회사 소개 / About Us</h3>
      <p class="text-gray-600">
        저희 Study Abroad Agency는 15년 이상의 경험을 바탕으로 학생들의 성공적인 유학을 지원하는 
        전문 교육 컨설팅 기업입니다. 전 세계 최고의 교육 기관들과 파트너십을 맺고 있으며, 
        개별 맞춤형 유학 상담 서비스를 제공합니다.
      </p>
      <p class="text-gray-600">
        Study Abroad Agency is a professional educational consulting company that supports students' 
        successful study abroad experiences based on over 15 years of experience. We have partnerships 
        with top educational institutions worldwide and provide personalized study abroad consultation services.
      </p>
      
      <h3 class="text-xl font-semibold text-gray-800">서비스 / Services</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-600">
        <li>유학 상담 및 계획 수립 (Study abroad consultation and planning)</li>
        <li>입학 지원 서비스 (Admission support services)</li>
        <li>비자 신청 지원 (Visa application support)</li>
        <li>숙소 및 생활 정보 제공 (Accommodation and living information)</li>
        <li>출국 전후 지원 서비스 (Pre and post-departure support services)</li>
      </ul>
      
      <h3 class="text-xl font-semibold text-gray-800">왜 저희를 선택해야 할까요? / Why Choose Us?</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-600">
        <li>15년 이상의 풍부한 경험 (Over 15 years of experience)</li>
        <li>전 세계 300개 이상의 파트너 기관 (300+ partner institutions worldwide)</li>
        <li>95% 이상의 높은 입학 성공률 (95%+ admission success rate)</li>
        <li>24/7 학생 지원 서비스 (24/7 student support service)</li>
        <li>투명한 비용 구조 (Transparent fee structure)</li>
      </ul>
      
      <h3 class="text-xl font-semibold text-gray-800">연락처 / Contact Information</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-gray-600"><strong>주소 / Address:</strong> Seoul, South Korea</p>
        <p class="text-gray-600"><strong>전화 / Phone:</strong> +82-2-1234-5678</p>
        <p class="text-gray-600"><strong>이메일 / Email:</strong> info@studyabroad.com</p>
        <p class="text-gray-600"><strong>운영시간 / Business Hours:</strong> 월-금 9:00-18:00 (Mon-Fri 9:00-18:00)</p>
      </div>
    </div>
  `
};