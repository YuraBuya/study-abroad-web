'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  School, 
  FileText, 
  LogOut,
  Menu,
  Settings,
  ChevronLeft,
  User,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BackToTop } from '@/components/admin/BackToTop';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Schools', href: '/admin/schools', icon: School },
  { name: 'Brochures', href: '/admin/brochures', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    // Clear any admin session data
    localStorage.removeItem('admin-auth');
    // Redirect to login page
    router.push('/admin');
  };

  const showBackButton = pathname && pathname !== '/admin' && pathname !== '/admin/dashboard';

  // Get current page title
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Login';
    if (pathname === '/admin/dashboard') return 'Dashboard';
    if (pathname === '/admin/schools') return 'Schools';
    if (pathname === '/admin/brochures') return 'Brochures';
    if (pathname === '/admin/settings') return 'Settings';
    
    // For dynamic routes like /admin/schools/[id]
    const pathParts = pathname?.split('/') || [];
    if (pathParts.length > 2) {
      return pathParts[pathParts.length - 1]?.replace('-', ' ') || 'Admin';
    }
    
    return pathname?.split('/').pop()?.replace('-', ' ') || 'Admin';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md rounded-lg border border-gray-200 hover:bg-gray-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold text-white"
              >
                CCA Admin
              </motion.span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 items-center border-b border-gray-200 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-white"
            >
              CCA Admin
            </motion.span>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {showBackButton && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => router.back()}
                    className="mr-2 rounded-lg hover:bg-gray-100"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </Button>
                </motion.div>
              )}
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20
                  }}
                  className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl w-10 h-10 mr-3 flex items-center justify-center"
                >
                  <User className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg font-bold text-gray-900 capitalize"
                  >
                    {getPageTitle()}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-gray-500"
                  >
                    CCA Education Agency
                  </motion.p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>Welcome,</span>
                <span className="font-medium">Admin</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="rounded-lg hover:bg-gray-100"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} CCA Education Agency. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Back to Top button */}
      <BackToTop />
    </div>
  );
}