'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

// Types
export type Locale = 'en' | 'ko' | 'mn';
export type Dict = Record<string, unknown>;
export type Dictionaries = Record<Locale, Dict>;

// Context value type
interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
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

  // Load translations for a specific language
  const loadTranslations = useCallback(async (lang: Locale) => {
    try {
      setIsLoading(true);
      // Translations are already loaded via props, so we just need to update state
      setLocale(lang);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set locale and persist to localStorage
  const handleSetLocale = (lang: Locale) => {
    setLocale(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
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
        return key; // Return the key itself if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

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
  }), [locale, isLoading]);

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