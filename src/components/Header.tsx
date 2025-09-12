'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Language, languageLabels } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isLoading } = useTranslation();

  // Only create navItems when translations are loaded
  const navItems = isLoading ? [] : [
    { href: '/language-institutes', label: t('navigation.languageInstitutes') },
    { href: '/universities', label: t('navigation.universities') },
    { href: '/graduate-schools', label: t('navigation.graduateSchools') },
    { href: '/korean-courses', label: t('navigation.koreanCourses') },
    { href: '/agency-info', label: t('navigation.agencyInfo') },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as Language;
    setLanguage(newLanguage);
  };

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
        staggerChildren: 0.1,
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
      className="bg-white shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img 
                src="/images/cca-logo.svg" 
                alt="CCA Education Agency Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent block">
                CCA Education Agency
              </span>
              <span className="text-xs text-gray-500 block md:hidden">
                프리미엄 교육 컨설팅
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="relative text-gray-700 hover:text-blue-500 font-medium transition-all duration-300 text-sm lg:text-base group"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Language Dropdown - Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <select
                value={language}
                onChange={handleLanguageChange}
                className="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                {Object.entries(languageLabels).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 touch-target relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  animate={isMenuOpen ? { pathLength: 1 } : { pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div 
                className="py-4"
                variants={staggerContainer}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className="group relative text-gray-700 hover:text-blue-500 font-medium transition-all duration-300 py-3 px-4 rounded-xl hover:bg-blue-50 touch-target block text-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100"
                          initial={false}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Language Dropdown - Mobile */}
                  <motion.div 
                    className="px-4 py-4 border-t border-gray-100 mt-2"
                    variants={itemVariants}
                  >
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      {language === 'ko' ? '언어' : language === 'mn' ? 'Хэл' : 'Language'}
                    </label>
                    <select
                      value={language}
                      onChange={handleLanguageChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-base"
                    >
                      {Object.entries(languageLabels).map(([code, label]) => (
                        <option key={code} value={code}>
                          {label}
                        </option>
                      ))}
                    </select>
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