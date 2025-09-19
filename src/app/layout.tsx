import type { Metadata } from "next";
import Providers from "./providers";
import "../app/globals.css";
import BottomNav from '@/components/BottomNav';
import Header from '@/components/layout/Header';
import ClientLayout from '@/components/layout/ClientLayout';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import enDict from '@/lib/i18n/dics/en.json';
import koDict from '@/lib/i18n/dics/ko.json';
import mnDict from '@/lib/i18n/dics/mn.json';

export const metadata: Metadata = {
  title: "CCA",
  description: "유학 프로그램",
};

// Define the dictionaries object
const dictionaries = {
  en: enDict,
  ko: koDict,
  mn: mnDict
};

// Function to detect locale from headers
function getLocaleFromHeaders(headers: Headers): string {
  // Try to get locale from cookie first
  const cookieHeader = headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const localeCookie = cookies.find(cookie => cookie.startsWith('locale='));
    if (localeCookie) {
      const locale = localeCookie.split('=')[1];
      if (['en', 'ko', 'mn'].includes(locale)) {
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

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Get locale from server context (this would be implemented properly in a real app)
  const initialLocale = 'mn'; // Default fallback
  
  return (
    <html lang={initialLocale}>
      <body className="min-h-screen bg-slate-50 pb-20">
        <I18nProvider 
          initialLocale={initialLocale} 
          dictionaries={dictionaries}
        >
          <Header />
          <ClientLayout>
            <main className="mx-auto max-w-md md:max-w-5xl">{children}</main>
          </ClientLayout>
          <BottomNav />
        </I18nProvider>
      </body>
    </html>
  );
}