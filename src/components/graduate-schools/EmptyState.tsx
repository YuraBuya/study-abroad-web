import { GraduationCap, X } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function EmptyState({ onClearFilters, hasActiveFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <GraduationCap className="h-12 w-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">No graduate schools found</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        We couldn{`'`}t find any graduate schools matching your criteria. Try adjusting your filters.
      </p>
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );
}