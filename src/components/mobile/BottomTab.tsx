'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cx } from '@/lib/ui';

const tabs = [
  { key: 'home', label: 'Home', href: '/', icon: '🏠' },
  { key: 'univ', label: 'University', href: '/university', icon: '🎓' },
  { key: 'grad', label: 'Graduate', href: '/graduate', icon: '📘' },
  { key: 'lang', label: 'KR', href: '/korean-course', icon: '🇰🇷' },
  { key: 'about', label: 'About', href: '/about', icon: 'ℹ️' },
];

export default function BottomTab() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    // 하위 경로도 활성 처리 (예: /university/school-1)
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto block max-w-md border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = isActive(t.href);
          return (
            <li key={t.key}>
              <Link
                href={t.href}
                aria-label={t.label}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'flex w-full flex-col items-center gap-1 py-3 text-[11px] font-medium',
                  active ? 'text-blue-600' : 'text-slate-500'
                )}
              >
                <span className="text-lg" aria-hidden>{t.icon}</span>
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
       {/* Contact CTA */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white mx-4 sm:mx-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            지금 바로 상담받으세요! / Get Consultation Now!
          </h2>
          <p className="text-base sm:text-xl text-blue-100 mb-6">
            전문 상담사가 당신의 유학 계획을 함께 세워드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.facebook.com/CCAgency.ub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
              무료 상담 신청 / Free Consultation
            </a>
            <a
              href="tel:+976-9411-3382"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 inline-flex items-center justify-center"
              >
              전화 상담 / Call Now
            </a>
          </div>
        </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}