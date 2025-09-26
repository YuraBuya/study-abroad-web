// Mock data for development and testing when database is not available

import { SchoolDTO } from './dto';

export const mockSchools: SchoolDTO[] = [
  {
    id: '1',
    name: 'Seoul National University',
    nameKorean: '서울대학교',
    location: 'Seoul, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/snu.pdf',
    type: 'UNIVERSITY',
    description: 'One of the top universities in South Korea with excellent research programs.',
    website: 'https://www.snu.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    name: 'Korea University',
    nameKorean: '고려대학교',
    location: 'Seoul, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/korea-university.pdf',
    type: 'UNIVERSITY',
    description: 'Prestigious private university known for business and international studies.',
    website: 'https://www.korea.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '3',
    name: 'Yonsei University',
    nameKorean: '연세대학교',
    location: 'Seoul, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/yonsei-university.pdf',
    type: 'UNIVERSITY',
    description: 'Leading private university with strong programs in medicine and engineering.',
    website: 'https://www.yonsei.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '4',
    name: 'Sogang University',
    nameKorean: '서강대학교',
    location: 'Seoul, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/sogang-university.pdf',
    type: 'UNIVERSITY',
    description: 'Catholic university known for its strong liberal arts programs.',
    website: 'https://www.sogang.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '5',
    name: 'Yonsei University - Korean Language Institute',
    nameKorean: '연세대학교 어학원',
    location: 'Seoul, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/yonsei-kli.pdf',
    type: 'LANGUAGE_INSTITUTE',
    description: 'Intensive Korean language program with experienced native speakers.',
    website: 'https://kli.yonsei.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '6',
    name: 'Korean Language Education Center',
    nameKorean: '한국어교육센터',
    location: 'Busan, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/klec.pdf',
    type: 'LANGUAGE_INSTITUTE',
    description: 'Comprehensive Korean language education with cultural immersion programs.',
    website: 'https://www.klec.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '7',
    name: 'Seoul National University Graduate School',
    nameKorean: '서울대학교 대학원',
    location: 'Seoul, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/snu-graduate.pdf',
    type: 'GRADUATE_SCHOOL',
    description: 'World-class graduate programs with research opportunities in various fields.',
    website: 'https://gs.snu.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '8',
    name: 'Korea Advanced Institute of Science and Technology',
    nameKorean: '한국과학기술원',
    location: 'Daejeon, South Korea',
    logo: '/images/default-logo.svg',
    pdfUrl: '/brochures/kaist.pdf',
    type: 'GRADUATE_SCHOOL',
    description: 'Leading research university focused on science and technology graduate programs.',
    website: 'https://www.kaist.ac.kr',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  }
];

export function getMockSchoolsByType(type: string): SchoolDTO[] {
  switch (type) {
    case 'university':
      return mockSchools.filter(school => school.type === 'UNIVERSITY');
    case 'language':
      return mockSchools.filter(school => school.type === 'LANGUAGE_INSTITUTE');
    case 'graduate':
      return mockSchools.filter(school => school.type === 'GRADUATE_SCHOOL');
    default:
      return mockSchools;
  }
}

export function getMockSchoolBySlug(slug: string): SchoolDTO | undefined {
  // Since SchoolDTO doesn't have a slug field, we'll create a mapping based on name
  const slugMap: Record<string, string> = {
    'seoul-national-university': 'Seoul National University',
    'korea-university': 'Korea University',
    'yonsei-university': 'Yonsei University',
    'sogang-university': 'Sogang University',
    'yonsei-korean-language-institute': 'Yonsei University - Korean Language Institute',
    'korean-language-education-center': 'Korean Language Education Center',
    'seoul-national-university-graduate-school': 'Seoul National University Graduate School',
    'korea-advanced-institute-of-science-and-technology': 'Korea Advanced Institute of Science and Technology'
  };
  
  const schoolName = slugMap[slug];
  if (!schoolName) return undefined;
  
  return mockSchools.find(school => school.name === schoolName);
}