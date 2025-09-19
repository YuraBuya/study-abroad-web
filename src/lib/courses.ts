export interface Course {
  id: string;
  title: string;
  titleKorean: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  schedule: string;
  price: string;
  description: string;
  descriptionKorean: string;
  features: string[];
  featuresKorean: string[];
  image: string;
  popular?: boolean;
}

export const COURSES: Course[] = [
  {
    id: 'beginner-intensive',
    title: 'Beginner Korean Intensive',
    titleKorean: '초급 한국어 집중반',
    level: 'Beginner',
    duration: '12 weeks',
    schedule: 'Mon-Fri 9:00-12:00',
    price: '$1,200',
    description: 'Perfect for complete beginners. Learn Korean alphabet (Hangeul), basic grammar, and essential vocabulary.',
    descriptionKorean: '완전 초보자를 위한 과정입니다. 한글, 기초 문법, 필수 어휘를 배웁니다.',
    features: [
      'Korean alphabet (Hangeul)',
      'Basic grammar structures',
      'Essential vocabulary (500+ words)',
      'Simple conversation practice',
      'Cultural introduction'
    ],
    featuresKorean: [
      '한글 학습',
      '기초 문법 구조',
      '필수 어휘 (500+ 단어)',
      '간단한 회화 연습',
      '문화 소개'
    ],
    image: '/images/korean-beginner.jpg',
    popular: true
  },
  {
    id: 'intermediate-conversation',
    title: 'Intermediate Conversation',
    titleKorean: '중급 회화반',
    level: 'Intermediate',
    duration: '16 weeks',
    schedule: 'Mon-Wed-Fri 18:00-21:00',
    price: '$1,500',
    description: 'Build confidence in Korean conversation with practical dialogues and real-life scenarios.',
    descriptionKorean: '실용적인 대화와 실생활 상황으로 한국어 회화 실력을 키웁니다.',
    features: [
      'Advanced grammar patterns',
      'Conversation practice',
      'Role-playing exercises',
      'Korean drama analysis',
      'Business Korean basics'
    ],
    featuresKorean: [
      '고급 문법 패턴',
      '회화 연습',
      '역할극 연습',
      '한국 드라마 분석',
      '비즈니스 한국어 기초'
    ],
    image: '/images/korean-intermediate.jpg'
  },
  {
    id: 'advanced-business',
    title: 'Advanced Business Korean',
    titleKorean: '고급 비즈니스 한국어',
    level: 'Advanced',
    duration: '20 weeks',
    schedule: 'Tue-Thu 19:00-22:00',
    price: '$2,000',
    description: 'Master professional Korean for business environments, presentations, and formal communications.',
    descriptionKorean: '비즈니스 환경, 프레젠테이션, 공식 커뮤니케이션을 위한 전문 한국어를 마스터합니다.',
    features: [
      'Business terminology',
      'Formal presentation skills',
      'Email and document writing',
      'Meeting participation',
      'Korean business culture'
    ],
    featuresKorean: [
      '비즈니스 용어',
      '공식 프레젠테이션 기술',
      '이메일 및 문서 작성',
      '회의 참여',
      '한국 비즈니스 문화'
    ],
    image: '/images/korean-business.jpg'
  },
  {
    id: 'weekend-cultural',
    title: 'Weekend Cultural Korean',
    titleKorean: '주말 문화 한국어',
    level: 'Intermediate',
    duration: '24 weeks',
    schedule: 'Sat-Sun 10:00-16:00',
    price: '$1,800',
    description: 'Learn Korean through cultural activities, cooking, K-pop, and traditional arts.',
    descriptionKorean: '문화 활동, 요리, K-pop, 전통 예술을 통해 한국어를 배웁니다.',
    features: [
      'Cultural immersion activities',
      'Korean cooking classes',
      'K-pop and K-drama study',
      'Traditional arts workshop',
      'Field trips to cultural sites'
    ],
    featuresKorean: [
      '문화 몰입 활동',
      '한국 요리 수업',
      'K-pop과 K-드라마 학습',
      '전통 예술 워크샵',
      '문화 유적지 견학'
    ],
    image: '/images/korean-cultural.jpg'
  },
  {
    id: 'private-tutoring',
    title: 'Private Korean Tutoring',
    titleKorean: '개인 한국어 과외',
    level: 'Beginner',
    duration: 'Flexible',
    schedule: 'Flexible scheduling',
    price: '$80/hour',
    description: 'One-on-one personalized Korean lessons tailored to your specific goals and pace.',
    descriptionKorean: '개인의 목표와 속도에 맞춘 일대일 맞춤형 한국어 수업입니다.',
    features: [
      'Personalized curriculum',
      'Flexible scheduling',
      'Individual attention',
      'Goal-oriented learning',
      'Progress tracking'
    ],
    featuresKorean: [
      '개인 맞춤 커리큘럼',
      '유연한 일정',
      '개별 집중 관리',
      '목표 지향적 학습',
      '진도 추적'
    ],
    image: '/images/korean-private.jpg'
  },
  {
    id: 'topik-preparation',
    title: 'TOPIK Preparation',
    titleKorean: 'TOPIK 시험 준비반',
    level: 'Advanced',
    duration: '8 weeks',
    schedule: 'Mon-Wed-Fri 14:00-17:00',
    price: '$900',
    description: 'Intensive preparation for the Test of Proficiency in Korean (TOPIK) exam.',
    descriptionKorean: '한국어능력시험(TOPIK) 집중 준비 과정입니다.',
    features: [
      'TOPIK exam strategies',
      'Practice tests and mock exams',
      'Reading comprehension',
      'Writing skills development',
      'Listening practice'
    ],
    featuresKorean: [
      'TOPIK 시험 전략',
      '모의고사 및 실전 연습',
      '독해 능력',
      '작문 실력 개발',
      '듣기 연습'
    ],
    image: '/images/korean-topik.jpg'
  }
];

export interface TimetableEntry {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export const TIMETABLES: TimetableEntry[] = [
  {
    time: '9:00-12:00',
    monday: 'Beginner Intensive',
    tuesday: 'Beginner Intensive',
    wednesday: 'Beginner Intensive',
    thursday: 'Beginner Intensive',
    friday: 'Beginner Intensive'
  },
  {
    time: '14:00-17:00',
    monday: 'TOPIK Prep',
    tuesday: '',
    wednesday: 'TOPIK Prep',
    thursday: '',
    friday: 'TOPIK Prep'
  },
  {
    time: '18:00-21:00',
    monday: 'Intermediate Conv.',
    tuesday: 'Business Korean',
    wednesday: 'Intermediate Conv.',
    thursday: 'Business Korean',
    friday: 'Intermediate Conv.'
  },
  {
    time: '19:00-22:00',
    monday: '',
    tuesday: 'Advanced Business',
    wednesday: '',
    thursday: 'Advanced Business',
    friday: ''
  },
  {
    time: '10:00-16:00',
    saturday: 'Cultural Korean',
    sunday: 'Cultural Korean'
  }
];

