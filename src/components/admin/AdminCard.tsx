import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AdminCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function AdminCard({ children, className = '', hoverEffect = true }: AdminCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverEffect ? { y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface AdminCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardHeader({ children, className = '' }: AdminCardHeaderProps) {
  return (
    <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

interface AdminCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardTitle({ children, className = '' }: AdminCardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

interface AdminCardContentProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardContent({ children, className = '' }: AdminCardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}