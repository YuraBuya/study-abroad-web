import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  description?: string;
}

export function FormField({ 
  label, 
  error, 
  required, 
  children, 
  className,
  description
}: FormFieldProps) {
  return (
    <motion.div 
      className={cn("space-y-1", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Label 
        className={cn(
          "text-sm font-medium text-gray-700",
          required && "after:content-['*'] after:ml-0.5 after:text-destructive"
        )}
      >
        {label}
      </Label>
      {description && (
        <motion.p 
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
      <div className="mt-1">
        {children}
      </div>
      {error && (
        <motion.p 
          className="text-sm font-medium text-destructive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}