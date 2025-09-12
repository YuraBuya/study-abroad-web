"use client";

import { I18nProvider } from "@/lib/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider initialLocale="mn"> 
      {children}
    </I18nProvider>
  );
}