'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side) and determine mobile state
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      checkIsMobile();

      // Show button when page is scrolled down
      const toggleVisibility = () => {
        if (window.pageYOffset > 240) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);
      window.addEventListener('resize', checkIsMobile);

      return () => {
        window.removeEventListener('scroll', toggleVisibility);
        window.removeEventListener('resize', checkIsMobile);
      };
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed z-50 p-3 md:p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform touch-target ${
          isVisible 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none translate-y-2'
        }`}
        style={{
          bottom: isMobile 
            ? 'calc(env(safe-area-inset-bottom, 0px) + var(--bottom-ui-height, 88px))' 
            : '24px',
          right: isMobile ? '16px' : '24px'
        }}
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      
      {/* Define CSS variable for bottom UI height */}
      <style jsx global>{`
        :root {
          --bottom-ui-height: 88px;
        }
      `}</style>
    </>
  );
}