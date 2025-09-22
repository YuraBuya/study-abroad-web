'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Supported languages
export type Language = 'ko' | 'mn' | 'en';

// Translation type
type TranslationKey = string;
type Translations = Record<string, unknown>;

// Context type
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isLoading: boolean;
}

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Language labels for display
export const languageLabels: Record<Language, string> = {
  ko: '한국어',
  mn: 'Монгол',
  en: 'English'
};

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Language;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLocale || 'mn');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for a specific language
  const loadTranslations = useCallback(async (lang: Language) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/locales/${lang}.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
      } else {
        console.error(`Failed to load translations for language: ${lang}`);
        // Fallback to Mongolian if loading fails
        if (lang !== 'mn') {
          await loadTranslations('mn');
        }
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to Mongolian if loading fails
      if (lang !== 'mn') {
        await loadTranslations('mn');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set language and persist to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    loadTranslations(lang);
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Initialize language from localStorage on mount
  useEffect(() => {
    // If initialLocale is provided, use it
    if (initialLocale) {
      setLanguageState(initialLocale);
      loadTranslations(initialLocale);
      return;
    }
    
    // Otherwise, check localStorage or default to Mongolian
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      const initialLanguage = savedLanguage && ['ko', 'mn', 'en'].includes(savedLanguage) 
        ? savedLanguage 
        : 'mn';
      
      setLanguageState(initialLanguage);
      loadTranslations(initialLanguage);
    } else {
      // Server-side: load default language
      loadTranslations('mn');
    }
  }, [initialLocale, loadTranslations]);

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    isLoading
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use the i18n context
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}