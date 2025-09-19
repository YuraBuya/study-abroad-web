import Link from 'next/link';

type Tone = 'green' | 'purple' | 'blue' | 'orange' | 'red';

const toneMap: Record<Tone, string> = {
  green:  'bg-emerald-100 text-emerald-900',
  purple: 'bg-violet-100 text-violet-900',
  blue:   'bg-sky-100 text-sky-900',
  orange: 'bg-amber-100 text-amber-900',
  red:    'bg-rose-100 text-rose-900',
};

export default function MenuCard({
  title,
  subtitle,
  href,
  tone = 'blue',
  badge,
}: {
  title: string;
  subtitle?: string;
  href: string;
  tone?: Tone;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative rounded-2xl p-4 shadow-sm transition hover:shadow ${toneMap[tone]}`}
    >
      {badge && (
        <span className="absolute right-3 top-3 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold">
          {badge}
        </span>
      )}
      <div className="text-base font-semibold">{title}</div>
      {subtitle && <div className="mt-1 text-xs/5 opacity-80">{subtitle}</div>}
      <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/40" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/30" />
      <span className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-700">
        →
      </span>
    </Link>
  );
}