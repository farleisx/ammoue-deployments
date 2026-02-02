import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', glow = false, glass = false, ...props }) => {
  const baseStyles = 'rounded-2xl transition-all duration-300 ease-in-out';
  const backgroundStyles = 'bg-white dark:bg-neutral-800 shadow-soft dark:shadow-soft';
  const glassStyles = 'glass shadow-glass-light dark:shadow-glass-dark border border-gray-200/20 dark:border-white/10';
  const glowStyles = glow ? 'hover:shadow-primary-DEFAULT/30 dark:hover:shadow-primary-dark/30 hover:scale-[1.01]' : '';

  return (
    <motion.div
      className={`${baseStyles} ${glass ? glassStyles : backgroundStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;