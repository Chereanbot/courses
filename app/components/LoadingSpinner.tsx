import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
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
        CS Courses
      </motion.div>
    </div>
  );
};

export const ButtonLoader = () => {
  return (
    <motion.div
      className="flex items-center space-x-1"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      <span className="w-2 h-2 bg-white rounded-full" />
      <span className="w-2 h-2 bg-white rounded-full" />
      <span className="w-2 h-2 bg-white rounded-full" />
    </motion.div>
  );
}; 