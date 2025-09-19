'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Globe, 
  ChevronDown,
  University,
  Building,
  BookOpen,
  Info,
  User,
  LogIn
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n/I18nProvider';

// Define navigation items with icons
const NAV_ITEMS = [
  { 
    href: '/universities', 
    labelKey: 'navigation.universities',
    icon: University
  },
  { 
    href: '/language-institutes', 
    labelKey: 'navigation.languageInstitutes',
    icon: Building
  },
  { 
    href: '/korean-courses', 
    labelKey: 'navigation.koreanCourses',
    icon: BookOpen
  },
  { 
    href: '/agency-info', 
    labelKey: 'navigation.agencyInfo',
    icon: Info
  }
];

const languageLabels: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  mn: 'Монгол'
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const pathname = usePathname();
  const { t, language, setLanguage, isLoading } = useTranslation();
  const languageRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguage: Locale) => {
    setLanguage(newLanguage);
    setIsLanguageOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <motion.header 
      className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 md:space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg min-w-0"
            aria-label="Home"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
              <Image 
                src="/images/cca-logo.svg" 
                alt="CCA Education Agency Logo" 
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent truncate block">
                CCA Education Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav 
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            role="navigation"
            aria-label="Main"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span>{!isLoading ? t(item.labelKey) : item.labelKey}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side utilities */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search - hidden on mobile */}
            <button 
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language selector */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-2 py-1.5 rounded-lg text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors text-sm"
                aria-haspopup="true"
                aria-expanded={isLanguageOpen}
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {languageLabels[language as Locale] || 'Language'}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Object.entries(languageLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code as Locale)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === code
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

        

            {/* User menu - hidden on mobile */}
            <button 
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="User menu"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="navigation"
              aria-label="Main"
            >
              <motion.div 
                className="py-2"
                variants={staggerContainer}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors ${
                            isActive 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{!isLoading ? t(item.labelKey) : item.labelKey}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile utility items */}
                  <motion.div className="border-t border-gray-100 mt-2 pt-2" variants={itemVariants}>
                    <div className="px-4 py-3 space-y-3">
                                        
                      <div className="flex items-center justify-between">
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;