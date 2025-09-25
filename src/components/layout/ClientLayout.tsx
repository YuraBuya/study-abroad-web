'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/BackToTopButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      checkIsMobile();

      // Add event listener for window resize
      window.addEventListener('resize', checkIsMobile);

      // Cleanup event listener
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };
    }
  }, []);

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin') || false;

  // On mobile, only show footer on /agency-info page
  // On desktop/tablet, always show footer
  // Never show footer on admin pages
  const shouldShowFooter = !isAdminPage && (!isMobile || pathname === '/agency-info');

  return (
    <>
      {children}
      {shouldShowFooter && <Footer />}
      <BackToTopButton />
    </>
  );
}