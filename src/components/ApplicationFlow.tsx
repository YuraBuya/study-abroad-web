import React from "react";

type Props = {
  compact?: boolean;
  className?: string;
};

const STEPS: Array<{ ko: string; en?: string }> = [
  { ko: "학교 선택", en: "Choose a School" },
  { ko: "CCA 계약", en: "Sign with CCA" },
  { ko: "서류 준비", en: "Prepare Documents" },
  { ko: "면접", en: "Interview" },
  { ko: "학교 합격 여부", en: "Admission Result" },
  { ko: "비자 신청", en: "Apply for Visa" },
  { ko: "결과 확인", en: "Check Outcome" },
];

export default function ApplicationFlow({ compact = false, className = "" }: Props) {
  const pad = compact ? "p-3" : "p-4";
  const gap = compact ? "gap-2" : "gap-3";
  const text = compact ? "text-sm" : "text-base";
  const badge = compact ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";

  return (
    <section aria-label="Application flow"
      className={`rounded-3xl bg-white/80 ring-1 ring-slate-200 shadow-sm ${compact ? "px-3 py-4" : "px-4 py-6 sm:px-6"} ${className}`}
    >
      {/* Desktop: horizontal stepper */}
      <ol role="list" className="hidden md:flex items-center justify-center flex-wrap">
        {STEPS.map((step, idx) => (
          <React.Fragment key={idx}>
            <li className={`flex items-center ${gap}`}>
              <span
                aria-hidden
                className={`inline-flex items-center justify-center ${badge} rounded-full bg-slate-900 text-white font-semibold`}
              >
                {idx + 1}
              </span>
              <div className={`${pad} rounded-2xl bg-white ring-1 ring-slate-200 shadow-xs`}> 
                <p className={`font-semibold leading-none text-slate-900 ${text}`}>{step.ko}</p>
                {step.en && <p className="text-xs text-slate-500 mt-1">{step.en}</p>}
              </div>
            </li>
            {idx < STEPS.length - 1 && (
              <li aria-hidden className="mx-2 text-slate-400">→</li>
            )}
          </React.Fragment>
        ))}
      </ol>

      {/* Mobile: vertical list */}
      <ol role="list" className="md:hidden divide-y divide-slate-200">
        {STEPS.map((step, idx) => (
          <li key={idx} className={`flex items-start ${gap} ${pad}`}>
            <span
              aria-hidden
              className={`mt-0.5 inline-flex items-center justify-center ${badge} rounded-full bg-slate-900 text-white font-semibold`}
            >
              {idx + 1}
            </span>
            <div>
              <p className={`font-semibold text-slate-900 ${text}`}>{step.ko}</p>
              {step.en && <p className="text-xs text-slate-500 mt-1">{step.en}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// Example usage:
// <ApplicationFlow compact />
// <ApplicationFlow />





