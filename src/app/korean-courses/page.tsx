'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/CourseCard';
import ClassTimetable from '@/components/ClassTimetable';
import ContactForm from '@/components/ContactForm';
import { COURSES, TIMETABLES } from '@/lib/courses';
import { BookOpen, BookOpenText, Sparkles, Layers, Rocket, Clock, HelpCircle } from 'lucide-react';

export default function KoreanCourses() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filteredCourses = selectedFilter === 'All' 
    ? COURSES 
    : COURSES.filter(course => course.level === selectedFilter);

  const handleEnroll = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      // Scroll to contact form
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-sky-50/30" />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-100/40 to-sky-100/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-sky-100/40 to-emerald-100/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                한국어 강의
              </h1>
              <p className="text-xl md:text-2xl font-medium text-slate-600 mb-6">Korean Language Courses</p>
              <p className="text-lg text-slate-700 leading-relaxed mb-2">
                한국어를 체계적으로 배우고 한국 문화를 경험하세요.
              </p>
              <p className="text-base text-slate-600 mb-8">
                초급부터 고급까지 다양한 레벨의 수업을 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="#courses" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-3 text-white text-base font-medium transition-all duration-200 hover:from-emerald-700 hover:to-sky-700 hover:shadow-lg hover:scale-105 active:scale-95">
                  <BookOpen className="h-5 w-5" />
                  수강 과정 보기
                </a>
                <a href="#class-timetable" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm px-6 py-3 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95">
                  <Clock className="h-5 w-5" />
                  시간표 확인
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3 inline-flex items-center gap-2">
                <BookOpenText className="h-7 w-7 text-emerald-600" />
                수강 과정 / Available Courses
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                다양한 레벨과 목적에 맞는 한국어 과정을 선택하세요
              </p>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter as 'All' | 'Beginner' | 'Intermediate' | 'Advanced')}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedFilter === filter
                        ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'All' && <Sparkles className="h-4 w-4" />}
                    {filter === 'Beginner' && <BookOpenText className="h-4 w-4" />}
                    {filter === 'Intermediate' && <Layers className="h-4 w-4" />}
                    {filter === 'Advanced' && <Rocket className="h-4 w-4" />}
                    {filter === 'All' ? '전체' : filter}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CourseCard course={course} onEnroll={handleEnroll} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timetable Section */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div id="class-timetable" className="rounded-3xl bg-white/80 ring-1 ring-slate-200/60 p-4 sm:p-6 lg:p-8 shadow-sm">
              <ClassTimetable datasets={TIMETABLES} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 inline-flex items-center gap-2">
                <HelpCircle className="h-7 w-7 text-emerald-600" />
                자주 묻는 질문 / FAQ
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    question: "완전 초보자도 수업을 들을 수 있나요?",
                    questionEn: "Can complete beginners take classes?",
                    answer: "네, 한글을 전혀 모르는 완전 초보자를 위한 기초반이 있습니다. 한글부터 차근차근 배우실 수 있습니다.",
                    answerEn: "Yes, we have beginner classes for those who don't know Hangeul at all. You can learn step by step starting from the Korean alphabet."
                  },
                  {
                    question: "수업 중간에 레벨을 변경할 수 있나요?",
                    questionEn: "Can I change levels during the course?",
                    answer: "담당 강사와 상담 후 적절한 레벨로 변경이 가능합니다. 학습 진도에 맞춰 조정해드립니다.",
                    answerEn: "Yes, you can change levels after consultation with your instructor. We adjust according to your learning progress."
                  },
                  {
                    question: "개인 과외는 어떻게 신청하나요?",
                    questionEn: "How do I apply for private tutoring?",
                    answer: "개인 과외는 별도 상담을 통해 일정과 커리큘럼을 맞춤 설정합니다. 아래 연락처로 문의주세요.",
                    answerEn: "Private tutoring requires separate consultation to customize schedule and curriculum. Please contact us using the information below."
                  },
                  {
                    question: "TOPIK 시험 준비반은 언제 시작하나요?",
                    questionEn: "When does the TOPIK preparation class start?",
                    answer: "TOPIK 시험 일정에 맞춰 분기별로 개강합니다. 시험 2개월 전부터 집중 준비과정을 운영합니다.",
                    answerEn: "TOPIK preparation classes start quarterly according to the exam schedule. We run intensive preparation courses starting 2 months before the exam."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/90 p-6 rounded-2xl shadow-sm ring-1 ring-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {faq.questionEn}
                    </p>
                    <p className="text-gray-700 mb-2">
                      {faq.answer}
                    </p>
                    <p className="text-sm text-gray-500">
                      {faq.answerEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact-section" className="bg-gradient-to-br from-emerald-50 to-sky-100 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                한국어 학습을 시작하세요
              </h2>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Start Your Korean Learning Journey
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                전문 강사진과 함께 체계적이고 즐거운 한국어 학습을 경험해보세요
              </p>
            </motion.div>
            
            <ContactForm />
          </div>
        </section>
      </main>
      
      {/* Footer intentionally not rendered here; shown on /agency-info only */}
    </div>
  );
}