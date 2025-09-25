import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface KPIProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export function KPI({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue 
}: KPIProps) {
  // Define gradient backgrounds for each card type
  const getGradientClass = (index: number) => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-green-500 to-emerald-600',
      'from-amber-500 to-orange-600',
      'from-purple-500 to-pink-600'
    ];
    return gradients[index % gradients.length];
  };

  // Get index based on title for consistent coloring
  const getIndex = () => {
    switch (title) {
      case 'Total Schools': return 0;
      case 'Universities': return 1;
      case 'Language Institutes': return 2;
      case 'Total Brochures': return 3;
      default: return 0;
    }
  };

  const index = getIndex();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`bg-gradient-to-br ${getGradientClass(index)} text-white shadow-lg rounded-xl border-0 overflow-hidden relative`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
          {icon && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2
              }}
              className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              <div className="h-5 w-5 text-white/90">{icon}</div>
            </motion.div>
          )}
        </CardHeader>
        <CardContent className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white"
          >
            {value}
          </motion.div>
          {description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-white/80 mt-1"
            >
              {description}
            </motion.p>
          )}
          {trend && trendValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center mt-3"
            >
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trend === 'up' ? 'bg-white/20 text-white' : 'bg-white/10 text-white/80'}`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span className="text-xs text-white/70 ml-2">from last month</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}