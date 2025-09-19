import type { Metadata } from "next";
import ClientArea from "./ClientArea";
import { INSTITUTES } from "@/lib/institutes";

export const metadata: Metadata = {
  title: "Language Institutes | CCA",
  description: "Explore language institutes and programs partnered with CCA.",
};

export default function LanguageInstitutesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 bg-black">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-sky-50/30" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-100/40 to-sky-100/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-sky-100/40 to-emerald-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Language School
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-600 mt-2">Korean Language Institutes</p>
              <div className="mt-4 h-1.5 w-32 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full mx-auto" />
            </div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              <span className="block mt-2 text-slate-500">Browse institutes and open brochures to learn more.</span>
            </p>
          </div>

          {/* Scoped client area (search + grid) */}
          <ClientArea items={INSTITUTES} />
        </div>
      </section>
    </main>
  );
}