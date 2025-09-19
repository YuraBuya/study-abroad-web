import type { Locale } from './I18nProvider';
import enDict from './dics/en.json';
import koDict from './dics/ko.json';
import mnDict from './dics/mn.json';

// Define the dictionaries object
const dictionaries = {
  en: enDict,
  ko: koDict,
  mn: mnDict
};

/**
 * Server-side translation function
 * @param key - Translation key (e.g. "navigation.home")
 * @param locale - Locale to translate to
 * @returns Translated string or the key if not found
 */
export function t(key: string, locale: Locale = 'mn'): string {
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
}

/**
 * Get accepted locale from headers
 * @param headers - Request headers
 * @returns Locale
 */
export function getLocaleFromHeaders(headers: Headers): Locale {
  // Try to get locale from cookie first
  const cookieHeader = headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const localeCookie = cookies.find(cookie => cookie.startsWith('locale='));
    if (localeCookie) {
      const locale = localeCookie.split('=')[1] as Locale;
      if (locale && ['en', 'ko', 'mn'].includes(locale)) {
        return locale;
      }
    }
  }

  // Fallback to accept-language header
  const acceptLanguage = headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    for (const lang of languages) {
      if (lang.startsWith('en')) return 'en';
      if (lang.startsWith('ko')) return 'ko';
      if (lang.startsWith('mn')) return 'mn';
    }
  }

  // Default to Mongolian
  return 'mn';
}