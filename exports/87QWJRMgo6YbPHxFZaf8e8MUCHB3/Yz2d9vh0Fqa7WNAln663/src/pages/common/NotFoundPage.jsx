import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-800 p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="mb-8"
      >
        <Frown size={96} className="text-primary-DEFAULT dark:text-primary-light mb-4 mx-auto" />
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">404</h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
      >
        Oops! Page Not Found.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md"
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button as={Link} to="/" variant="primary" size="lg">
          Go to Homepage
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;