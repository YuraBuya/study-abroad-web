"use client";

import Image from "next/image";
import { 
  MapPin, 
  GraduationCap, 
  Award, 
  Home, 
  BookOpen, 
  ExternalLink, 
  FileText 
} from "lucide-react";

interface School {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  logo: string;
  pdfUrl?: string;
  programType?: string;
  language?: string;
  topikRequired?: boolean;
  scholarshipAvailable?: boolean;
  dormitoryAvailable?: boolean;
}

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  // Extract city from location (assuming format "City, Country")
  const city = school.location ? school.location.split(',')[0] : "Unknown";
  
  const handleDetailsClick = () => {
    if (school.pdfUrl) {
      // Open PDF in new tab
      window.open(school.pdfUrl, '_blank');
    } else {
      // Navigate to detail page
      window.location.href = `/graduate-schools/${school.id}`;
    }
  };

  return (
    <li className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-100/50 ring-1 ring-purple-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-purple-300/80">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 pointer-events-none" />
      
      <div className="relative p-6">
        {/* Header with logo and basic info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-white ring-2 ring-white shadow-lg">
            <Image
              src={school.logo || "/images/default-logo.svg"}
              alt={`${school.name} logo`}
              fill
              className="object-contain p-2"
              unoptimized
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = "/images/default-logo.svg";
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1 truncate">
              {school.name}
            </h3>
            {school.nameKorean && (
              <p className="text-sm font-medium text-slate-600 mb-2 truncate">
                {school.nameKorean}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              {city && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{city}</span>
                </div>
              )}
              
              {school.programType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
                  <GraduationCap className="h-3 w-3" />
                  {school.programType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {school.topikRequired && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              <Award className="h-3 w-3" />
              TOPIK Required
            </span>
          )}
          
          {school.scholarshipAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <BookOpen className="h-3 w-3" />
              Scholarship
            </span>
          )}
          
          {school.dormitoryAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              <Home className="h-3 w-3" />
              Dormitory
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              // Apply action - in a real app this would open an application form
              alert(`Applying to ${school.name}`);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium transition-all duration-200 hover:from-purple-700 hover:to-indigo-700 hover:shadow-md hover:scale-105 active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            Apply
          </button>
          
          <button
            onClick={handleDetailsClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95"
          >
            <FileText className="h-4 w-4" />
            Details
          </button>
        </div>
      </div>
    </li>
  );
}