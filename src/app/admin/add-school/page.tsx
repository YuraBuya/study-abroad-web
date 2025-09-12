'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddSchool() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameKorean: '',
    location: '',
    type: 'UNIVERSITY',
    logo: '',
    pdfFileName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/admin/upload-school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASS}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          nameKorean: '',
          location: '',
          type: 'UNIVERSITY',
          logo: '',
          pdfFileName: ''
        });
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);
      } else {
        throw new Error('Failed to add school');
      }
    } catch (error) {
      console.error('Error adding school:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">인증 확인 중... / Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/images/cca-logo.svg" 
                  alt="CCA Education Agency Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CCA Education Agency</h1>
                <p className="text-sm text-gray-500">관리자 패널 / Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-blue-600">
                대시보드 / Dashboard
              </Link>
              <a href="/" className="text-gray-600 hover:text-blue-600">
                홈으로 / Home
              </a>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                로그아웃 / Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            새 학교 추가 / Add New School
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* School Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                학교명 (영문) / School Name (English) *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder="Harvard University"
              />
            </div>

            {/* Korean Name */}
            <div>
              <label htmlFor="nameKorean" className="block text-sm font-medium text-gray-700 mb-2">
                학교명 (한글) / School Name (Korean)
              </label>
              <input
                type="text"
                id="nameKorean"
                name="nameKorean"
                value={formData.nameKorean}
                onChange={handleChange}
                className="input"
                placeholder="하버드 대학교"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                위치 / Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="input"
                placeholder="Cambridge, MA, USA"
              />
            </div>

            {/* School Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                학교 유형 / School Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="UNIVERSITY">대학교 / University</option>
                <option value="LANGUAGE_INSTITUTE">어학원 / Language Institute</option>
                <option value="GRADUATE_SCHOOL">대학원 / Graduate School</option>
              </select>
            </div>

            {/* Logo URL */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                로고 URL / Logo URL
              </label>
              <input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="input"
                placeholder="/images/school-logo.svg (선택사항 / Optional)"
              />
              <p className="mt-1 text-sm text-gray-500">
                비워두면 기본 로고가 사용됩니다 / Default logo will be used if empty
              </p>
            </div>

            {/* PDF File Name */}
            <div>
              <label htmlFor="pdfFileName" className="block text-sm font-medium text-gray-700 mb-2">
                PDF 파일명 / PDF File Name
              </label>
              <input
                type="text"
                id="pdfFileName"
                name="pdfFileName"
                value={formData.pdfFileName}
                onChange={handleChange}
                className="input"
                placeholder="school-profile.pdf (선택사항 / Optional)"
              />
              <p className="mt-1 text-sm text-gray-500">
                /public/pdfs/ 폴더에 있는 파일명을 입력하세요 / Enter filename in /public/pdfs/ folder
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn w-full ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  추가 중... / Adding...
                </div>
              ) : (
                '학교 추가 / Add School'
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>학교가 성공적으로 추가되었습니다! / School has been added successfully!</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>추가 중 오류가 발생했습니다. 다시 시도해 주세요. / An error occurred while adding. Please try again.</span>
                </div>
              </div>
            )}
          </form>

          {/* Instructions */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              사용 안내 / Instructions
            </h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• 필수 항목(*): 학교명(영문), 위치, 학교유형</li>
              <li>• 로고 파일은 /public/images/ 폴더에 업로드 후 경로 입력</li>
              <li>• PDF 파일은 /public/pdfs/ 폴더에 업로드 후 파일명 입력</li>
              <li>• 한글명과 로고, PDF는 선택사항입니다</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}