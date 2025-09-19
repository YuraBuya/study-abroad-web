"use client";
import { useMemo, useState } from "react";
import { Search, X, Filter, MapPin, BookOpenText } from "lucide-react";
import InstituteCard, { Institute } from "./InstituteCard";

type Props = {
  items: Institute[];
};

export default function ClientArea({ items }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) =>
      [it.name, it.nameKo, it.city, it.country]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [q, items]);

  const tones: Array<"mint"|"lavender"|"blue"|"yellow"|"rose"> = ["mint","lavender","blue","yellow","rose"];

  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg ring-1 ring-slate-200/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Search & Filter</h2>
            <p className="text-sm text-slate-600">Find the right language institute</p>
          </div>
          {q && (
            <button
              onClick={() => setQ("")}
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm text-slate-700 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name / city / country"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200/80 bg-white/90 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto mb-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <BookOpenText className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No institutes found</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Try a different keyword or spelling.
          </p>
          {q && (
            <button
              onClick={() => setQ("")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-medium hover:from-emerald-600 hover:to-sky-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <X className="h-4 w-4" />
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <ul className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {filtered.map((it, i) => (
              <InstituteCard key={it.id} data={it} tone={tones[i % tones.length]} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
