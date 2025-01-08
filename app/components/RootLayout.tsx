import { Outlet } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageLoadingState, useInitialLoadingState } from '~/utils/loaders';
import { PageLoader } from './LoadingSpinner';

export default function RootLayout() {
  const isPageLoading = usePageLoadingState();
  const isInitialLoad = useInitialLoadingState();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        {(isPageLoading || isInitialLoad) && <PageLoader />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
} 