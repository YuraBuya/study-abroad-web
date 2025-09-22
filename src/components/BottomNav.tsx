"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, BookOpen, Info } from "lucide-react";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match?: (path: string) => boolean;
  activeColors: string;
  inactiveColors: string;
};

const items: Item[] = [
  { 
    href: "/", 
    label: "Home", 
    icon: <Home className="h-5 w-5" />, 
    match: p => p === "/",
    activeColors: "bg-slate-900 text-white",
    inactiveColors: "bg-slate-100 text-slate-600"
  },
  { 
    href: "/language-institutes", 
    label: "Language", 
    icon: <BookOpen className="h-5 w-5" />, 
    match: p => p.startsWith("/language-institut"),
    activeColors: "bg-green-500 text-white",
    inactiveColors: "bg-green-100 text-green-600"
  },
  { 
    href: "/universities", 
    label: "University", 
    icon: <GraduationCap className="h-5 w-5" />, 
    match: p => p.startsWith("/universit"),
    activeColors: "bg-purple-500 text-white",
    inactiveColors: "bg-purple-100 text-purple-600"
  },
  { 
    href: "/korean-courses", 
    label: "KR", 
    icon: <BookOpen className="h-5 w-5" />, 
    match: p => p.startsWith("/korean-courses"),
    activeColors: "bg-yellow-500 text-white",
    inactiveColors: "bg-yellow-100 text-yellow-600"
  },
  { 
    href: "/agency-info", 
    label: "About", 
    icon: <Info className="h-5 w-5" />, 
    match: p => p.startsWith("/agency-info"),
    activeColors: "bg-rose-500 text-white",
    inactiveColors: "bg-rose-100 text-rose-600"
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur block md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map(it => {
          const active = it.match ? it.match(pathname || '') : (pathname || '') === it.href;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition-colors duration-200"
                aria-current={active ? "page" : undefined}
              >
                <span className={`rounded-xl p-1.5 transition-colors duration-200 ${active ? it.activeColors : it.inactiveColors}`}>
                  {it.icon}
                </span>
                <span className={`leading-none transition-colors duration-200 ${active ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
