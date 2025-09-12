"use client"; // 이 파일 위에도 반드시 선언

import { useI18n } from '@/lib/i18n';

/**
 * Custom hook for translations
 * Returns the translation function t(key)
 */
export function useTranslation() {
  const { t, language, setLanguage, isLoading } = useI18n();
  
  return {
    t,
    language,
    setLanguage, 
    isLoading
  };
}