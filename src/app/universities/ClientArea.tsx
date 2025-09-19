"use client";
import { useMemo, useState } from "react";
import { Search, Filter, MapPin, Building2, X, GraduationCap } from "lucide-react";
import UniversityCard, { University } from "./UniversityCard";

type Props = {
  items: University[];
};

export default function ClientArea({ items }: Props) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [type, setType] = useState<string>("All");

  const regions = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.region).filter(Boolean)))], [items]);
  const types   = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.type).filter(Boolean)))], [items]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((u) => {
      const matchesQ = !s || [u.name, u.nameKo, u.city, u.region]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(s));
      const matchesRegion = region === "All" || u.region === region;
      const matchesType   = type === "All"   || u.type === type;
      return matchesQ && matchesRegion && matchesType;
    });
  }, [q, region, type, items]);

  const tones: Array<"mint"|"lavender"|"blue"|"yellow"|"rose"> = ["mint", "lavender", "blue", "yellow", "rose"];

  const hasActiveFilters = region !== "All" || type !== "All" || q.trim() !== "";
  const clearFilters = () => {
    setQ("");
    setRegion("All");
    setType("All");
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Search and Filters Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg ring-1 ring-slate-200/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">검색 & 필터</h2>
            <p className="text-sm text-slate-600">원하는 대학교를 찾아보세요</p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm text-slate-700 transition-colors"
            >
              <X className="h-4 w-4" />
              초기화
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-[2fr_1fr_1fr]">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="대학교명, 도시, 지역으로 검색..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
            />
          </div>

          {/* Region Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <MapPin className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full pl-11 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 appearance-none cursor-pointer"
            >
              {regions.map(r => (
                <option key={r} value={r}>
                  {r === "All" ? "모든 지역" : r}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Building2 className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full pl-11 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 appearance-none cursor-pointer"
            >
              {types.map(t => (
                <option key={t} value={t}>
                  {t === "All" ? "모든 유형" : 
                   t === "National" ? "국립" :
                   t === "Private" ? "사립" :
                   t === "Women" ? "여자대학" :
                   t === "Tech" ? "과학기술" : t}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-600">
            총 {items.length}개 중 <span className="font-semibold text-slate-900">{filtered.length}개</span> 대학교 표시
          </span>
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-slate-500">
              <Filter className="h-4 w-4" />
              필터 적용됨
            </div>
          )}
        </div>
      </div>

      {/* Results Grid / Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto mb-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <GraduationCap className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            조건에 맞는 대학교를 찾을 수 없습니다. 검색어나 필터를 조정해 보세요.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <X className="h-4 w-4" />
              모든 필터 초기화
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <ul className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {filtered.map((u, i) => (
              <UniversityCard key={u.id} data={u} tone={tones[i % tones.length]} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
