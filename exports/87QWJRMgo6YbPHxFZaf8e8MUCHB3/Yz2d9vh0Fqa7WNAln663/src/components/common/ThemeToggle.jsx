import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out
        ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-300'} ${className}`}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-white dark:bg-sky-400 shadow-md flex items-center justify-center"
        initial={false}
        animate={{ x: theme === 'dark' ? '125%' : '0%' }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon size={16} className="text-indigo-900" />
        ) : (
          <Sun size={16} className="text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;