import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  variant?: 'default' | 'small' | 'minimal' | 'button';
  text?: string;
}

export const LoadingSpinner = ({ variant = 'default', text = 'CS Courses' }: LoadingSpinnerProps) => {
  if (variant === 'small') {
    return (
      <motion.div
        className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    );
  }

  if (variant === 'minimal') {
    return (
      <motion.div
        className="w-6 h-6 border-3 border-t-gray-600 border-r-transparent border-b-gray-400 border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    );
  }

  if (variant === 'button') {
    return (
      <motion.div
        className="flex items-center space-x-1"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <span className="w-2 h-2 bg-current rounded-full" />
        <span className="w-2 h-2 bg-current rounded-full" />
        <span className="w-2 h-2 bg-current rounded-full" />
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-500 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Inner circle */}
        <motion.div
          className="absolute inset-2 border-4 border-purple-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-1/3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Text animation */}
      <motion.div
        className="mt-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50"
    >
      <LoadingSpinner text="Loading..." />
    </motion.div>
  );
};

export const SectionLoader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner variant="small" />
    </div>
  );
};

export const ButtonLoader = () => {
  return <LoadingSpinner variant="button" />;
};

export const MinimalLoader = () => {
  return <LoadingSpinner variant="minimal" />;
};

// Skeleton loaders for content
export const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      </div>
    </div>
  );
};

export const GridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export const TextSkeleton = ({ lines = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-gray-200 dark:bg-gray-700 rounded"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}; 