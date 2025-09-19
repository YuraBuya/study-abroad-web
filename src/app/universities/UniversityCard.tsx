"use client";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, FileText, MapPin, Building2, GraduationCap, Users, Award } from "lucide-react";

export type University = {
  id: string;
  name: string;
  nameKo?: string;
  city?: string;
  region?: string;     // e.g., Seoul / Gyeonggi
  type?: "National" | "Private" | "Women" | "Tech" | "Other";
  logoUrl?: string;
  desc?: string;
  siteUrl?: string;
  brochureUrl?: string;
};

type Props = {
  data: University;
  tone?: "mint" | "lavender" | "blue" | "yellow" | "rose";
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  mint:    "bg-gradient-to-br from-emerald-50 to-emerald-100/50 ring-emerald-200/60 hover:ring-emerald-300/80",
  lavender:"bg-gradient-to-br from-violet-50 to-violet-100/50 ring-violet-200/60 hover:ring-violet-300/80",
  blue:    "bg-gradient-to-br from-sky-50 to-sky-100/50 ring-sky-200/60 hover:ring-sky-300/80",
  yellow:  "bg-gradient-to-br from-amber-50 to-amber-100/50 ring-amber-200/60 hover:ring-amber-300/80",
  rose:    "bg-gradient-to-br from-rose-50 to-rose-100/50 ring-rose-200/60 hover:ring-rose-300/80",
};

const typeColors: Record<string, string> = {
  "National": "bg-blue-100 text-blue-800 border-blue-200",
  "Private": "bg-purple-100 text-purple-800 border-purple-200",
  "Women": "bg-pink-100 text-pink-800 border-pink-200",
  "Tech": "bg-green-100 text-green-800 border-green-200",
  "Other": "bg-gray-100 text-gray-800 border-gray-200"
};

const typeIcons: Record<string, React.ReactNode> = {
  "National": <Award className="h-3 w-3" />,
  "Private": <Building2 className="h-3 w-3" />,
  "Women": <Users className="h-3 w-3" />,
  "Tech": <GraduationCap className="h-3 w-3" />,
  "Other": <Building2 className="h-3 w-3" />
};

export default function UniversityCard({ data, tone = "mint" }: Props) {
  return (
    <li className={`group relative overflow-hidden rounded-3xl ${toneMap[tone]} ring-1 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 pointer-events-none" />
      
      <div className="relative p-6">
        {/* Header with logo and basic info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-white ring-2 ring-white shadow-lg">
            <Image
              src={data.logoUrl || "/sample-logo.png"}
              alt={data.name}
              fill
              className="object-contain p-2"
              unoptimized
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = "/sample-logo.png";
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">
              {data.name}
            </h3>
            {data.nameKo && (
              <p className="text-sm font-medium text-slate-600 mb-2">
                {data.nameKo}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              {(data.city || data.region) && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{[data.city, data.region].filter(Boolean).join(", ")}</span>
                </div>
              )}
              
              {data.type && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[data.type] || typeColors.Other}`}>
                  {typeIcons[data.type] || typeIcons.Other}
                  {data.type}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {data.desc && (
          <p className="text-sm text-slate-700 leading-relaxed mb-6 line-clamp-3">
            {data.desc}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2.5">
          {data.siteUrl && (
            <Link 
              href={data.siteUrl} 
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95"
            >
              <ExternalLink className="h-4 w-4" />
              공식 홈페이지
            </Link>
          )}
          
          {/* Details button - always shown */}
          <button
            onClick={() => {
              if (data.brochureUrl) {
                window.open(data.brochureUrl, '_blank');
              } else {
                // Fallback action when no brochure URL is available
                alert('상세 정보가 준비 중입니다.');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95"
          >
            <FileText className="h-4 w-4" />
            상세 정보
          </button>
        </div>
      </div>
    </li>
  );
}
