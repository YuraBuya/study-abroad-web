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