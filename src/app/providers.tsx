"use client";

import { I18nProvider } from "@/lib/i18n/I18nProvider";
import enDict from '@/lib/i18n/dics/en.json';
import koDict from '@/lib/i18n/dics/ko.json';
import mnDict from '@/lib/i18n/dics/mn.json';

// Define the dictionaries object
const dictionaries = {
  en: enDict,
  ko: koDict,
  mn: mnDict
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider initialLocale="mn" dictionaries={dictionaries}> 
      {children}
    </I18nProvider>
  );
}