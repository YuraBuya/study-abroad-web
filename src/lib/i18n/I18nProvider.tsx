'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

// Types
export type Locale = 'en' | 'ko' | 'mn';
export type Dict = Record<string, string | Record<string, string | Record<string, string>>>;
export type Dictionaries = Record<Locale, Dict>;

// Helper function to safely get message from dictionary
// function getMsg(dict: Dict, key: string): string {
//   const v = dict[key];
//   return typeof v === "string" ? v : "";
// }

// Context value type
interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: { defaultValue?: string }) => string;
  isLoading: boolean;
}

// Create context
const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// Language labels for display
export const languageLabels: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  mn: 'Монгол'
};

// Props for the provider
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
  dictionaries: Dictionaries;
}

// Provider component
export function I18nProvider({ 
  children, 
  initialLocale = 'mn',
  dictionaries 
}: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [isLoading, setIsLoading] = useState(true);

  // Set locale and persist to localStorage
  const handleSetLocale = (lang: Locale) => {
    setLocale(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', lang);
    }
  };

  // Translation function
  const t = useCallback((key: string, options?: { defaultValue?: string }): string => {
    const dict = dictionaries[locale];
    if (!dict) {
      console.warn(`Dictionary not found for locale: ${locale}`);
      return key;
    }

    const keys = key.split('.');
    let value: unknown = dict;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return options?.defaultValue ?? key; // Return default value or key itself if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  }, [dictionaries, locale]);

  // Initialize locale from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      if (savedLocale && ['en', 'ko', 'mn'].includes(savedLocale)) {
        setLocale(savedLocale);
      }
    }
    setIsLoading(false);
  }, []);

  // Memoize context value
  const value = useMemo(() => ({
    locale,
    setLocale: handleSetLocale,
    t,
    isLoading
  }), [locale, isLoading, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use the i18n context
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}