"use client";

import { useI18n } from '@/lib/i18n/I18nProvider';

/**
 * Custom hook for translations
 * Returns the translation function t(key)
 */
export function useTranslation() {
  const { t, locale, setLocale, isLoading } = useI18n();
  
  return {
    t,
    language: locale,
    setLanguage: setLocale, 
    isLoading
  };
}