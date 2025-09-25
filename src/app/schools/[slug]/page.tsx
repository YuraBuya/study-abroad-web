'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, FileText, MapPin, Building2, GraduationCap, Users, Award, ArrowLeft } from 'lucide-react';
import BackToTopButton from '@/components/BackToTopButton';
import { fetchSchoolBySlug, fetchBrochures } from '@/lib/api-client';
import { SchoolDTO, BrochureDTO } from '@/lib/dto';

interface SchoolDetail extends SchoolDTO {
  city?: string;
  region?: string;
  typeLabel?: string;
}

const typeColors: Record<string, string> = {
  "UNIVERSITY": "bg-blue-100 text-blue-800 border-blue-200",
  "LANGUAGE_INSTITUTE": "bg-purple-100 text-purple-800 border-purple-200",
  "GRADUATE_SCHOOL": "bg-green-100 text-green-800 border-green-200"
};

const typeIcons: Record<string, React.ReactNode> = {
  "UNIVERSITY": <GraduationCap className="h-4 w-4" />,
  "LANGUAGE_INSTITUTE": <Building2 className="h-4 w-4" />,
  "GRADUATE_SCHOOL": <Award className="h-4 w-4" />
};

const typeLabels: Record<string, string> = {
  "UNIVERSITY": "University",
  "LANGUAGE_INSTITUTE": "Language Institute",
  "GRADUATE_SCHOOL": "Graduate School"
};

export default function SchoolDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [school, setSchool] = useState<SchoolDetail | null>(null);
  const [brochures, setBrochures] = useState<BrochureDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        setLoading(true);
        
        // Fetch school details
        const schoolData = await fetchSchoolBySlug(params.slug);
        
        // Parse location to extract city and region
        const locationParts = schoolData.location.split(', ');
        const city = locationParts[0] || "Unknown";
        const region = locationParts.length > 1 ? locationParts[locationParts.length - 1] : "Unknown";
        
        // Add parsed location and type label to school data
        const schoolWithDetails: SchoolDetail = {
          ...schoolData,
          city,
          region,
          typeLabel: typeLabels[schoolData.type] || schoolData.type
        };
        
        setSchool(schoolWithDetails);
        
        // Fetch brochures for this school
        const brochuresData = await fetchBrochures({ slug: params.slug });
        setBrochures(brochuresData);
      } catch (err) {
        console.error('Error fetching school data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load school details');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchSchoolData();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
              
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                
                <div className="p-8">
                  <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                  <div className="h-20 bg-gray-200 rounded mb-8 animate-pulse"></div>
                  
                  <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Error Loading School Details
                </h3>
                <p className="text-gray-600 mb-4">
                  {error}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  School Not Found
                </h3>
                <p className="text-gray-500">
                  The requested school could not be found.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to List
            </button>
            
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              {/* Header with logo and basic info */}
              <div className="p-8 pb-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-white ring-2 ring-white shadow-lg">
                    <Image
                      src={school.logo || "/sample-logo.png"}
                      alt={school.name}
                      fill
                      className="object-contain p-2"
                      unoptimized
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = "/sample-logo.png";
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {school.name}
                    </h1>
                    {school.nameKorean && (
                      <p className="text-xl font-medium text-gray-700 mb-3">
                        {school.nameKorean}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {(school.city || school.region) && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{[school.city, school.region].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                      
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${typeColors[school.type] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                        {typeIcons[school.type] || <Building2 className="h-4 w-4" />}
                        {school.typeLabel || school.type}
                      </span>
                    </div>
                    
                    {school.website && (
                      <Link 
                        href={school.website} 
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:border-gray-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Official Website
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="border-t border-gray-100">
                <div className="p-8">
                  {/* Description */}
                  {school.description && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        About
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {school.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Brochures */}
                  {brochures.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Brochures
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {brochures.map((brochure) => (
                          <a
                            key={brochure.id}
                            href={brochure.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">
                                {brochure.name}
                              </h3>
                              <p className="text-sm text-gray-500 truncate">
                                {brochure.slug}
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-blue-600 group-hover:text-blue-800">
                              <ExternalLink className="h-5 w-5" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4">
                    {school.website && (
                      <Link 
                        href={school.website} 
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Visit Official Website
                      </Link>
                    )}
                    
                    {school.pdfUrl && (
                      <button
                        onClick={() => {
                          window.open(school.pdfUrl, '_blank');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                      >
                        <FileText className="h-5 w-5" />
                        Download Brochure
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}