'use client';

import { motion } from 'framer-motion';
import { TimetableEntry } from '@/lib/courses';

interface ClassTimetableProps {
  datasets: TimetableEntry[];
}

export default function ClassTimetable({ datasets }: ClassTimetableProps) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
  const dayLabelsEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getCellContent = (entry: TimetableEntry, day: string) => {
    const content = entry[day as keyof TimetableEntry] as string;
    return content || '';
  };

  const getCellStyle = (content: string) => {
    if (!content) return 'bg-gray-50';
    
    if (content.includes('Beginner')) return 'bg-green-100 text-green-800';
    if (content.includes('Intermediate') || content.includes('Conv.')) return 'bg-yellow-100 text-yellow-800';
    if (content.includes('Advanced') || content.includes('Business')) return 'bg-red-100 text-red-800';
    if (content.includes('TOPIK')) return 'bg-purple-100 text-purple-800';
    if (content.includes('Cultural')) return 'bg-blue-100 text-blue-800';
    
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      id="class-timetable"
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            수업 시간표 / Class Timetable
          </h3>
          <p className="text-gray-600">
            주간 수업 일정을 확인하세요
          </p>
        </div>

        {/* Desktop Timetable */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                  시간 / Time
                </th>
                {days.map((day, index) => (
                  <th key={day} className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-800">
                    <div>{dayLabels[index]}</div>
                    <div className="text-xs text-gray-500 font-normal">{dayLabelsEn[index]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datasets.map((entry, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800 bg-gray-50">
                    {entry.time}
                  </td>
                  {days.map((day) => {
                    const content = getCellContent(entry, day);
                    return (
                      <td
                        key={day}
                        className={`border border-gray-200 px-4 py-3 text-center text-sm ${getCellStyle(content)}`}
                      >
                        {content && (
                          <div className="font-medium">
                            {content}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Timetable */}
        <div className="md:hidden space-y-4">
          {datasets.map((entry, entryIndex) => (
            <motion.div
              key={entryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: entryIndex * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <h4 className="font-semibold text-gray-800 mb-3 text-center">
                {entry.time}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {days.map((day, dayIndex) => {
                  const content = getCellContent(entry, day);
                  if (!content) return null;
                  
                  return (
                    <div
                      key={day}
                      className={`p-2 rounded text-center text-sm ${getCellStyle(content)}`}
                    >
                      <div className="font-medium text-xs mb-1">
                        {dayLabels[dayIndex]} / {dayLabelsEn[dayIndex]}
                      </div>
                      <div className="font-semibold">
                        {content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">수업 레벨 / Course Levels:</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
              <span className="text-sm text-gray-700">초급 / Beginner</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-100 rounded mr-2"></div>
              <span className="text-sm text-gray-700">중급 / Intermediate</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
              <span className="text-sm text-gray-700">고급 / Advanced</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-100 rounded mr-2"></div>
              <span className="text-sm text-gray-700">시험준비 / Test Prep</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
              <span className="text-sm text-gray-700">문화 / Cultural</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>참고:</strong> 개인 과외는 별도 일정 조율이 가능합니다. 자세한 상담을 원하시면 연락주세요.
          </p>
          <p className="text-xs text-blue-600 mt-1">
            <strong>Note:</strong> Private tutoring sessions can be scheduled flexibly. Contact us for detailed consultation.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

