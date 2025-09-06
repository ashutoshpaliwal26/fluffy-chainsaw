import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { Card } from '../ui/Card';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title, 
  description = "This feature is currently under development. Stay tuned for updates!" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <Card className="p-12 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Construction className="w-24 h-24 text-blue-600 mx-auto mb-4" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
          {description}
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 text-sm font-medium">
            Coming Soon
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};