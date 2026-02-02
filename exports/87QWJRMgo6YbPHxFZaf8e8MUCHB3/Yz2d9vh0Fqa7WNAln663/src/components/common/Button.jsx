import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', size = 'md', className = '', loading = false, disabled = false, icon: Icon, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75';

  const variantStyles = {
    primary: 'bg-primary-DEFAULT text-white hover:bg-primary-dark focus:ring-primary-DEFAULT',
    secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:ring-neutral-400 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-neutral-500',
    outline: 'border border-primary-DEFAULT text-primary-DEFAULT hover:bg-primary-DEFAULT hover:text-white focus:ring-primary-DEFAULT dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-white',
    ghost: 'text-primary-DEFAULT hover:bg-primary-DEFAULT/10 dark:text-primary-light dark:hover:bg-primary-light/10 focus:ring-primary-DEFAULT',
    glass: 'glass text-white border-transparent hover:border-primary-DEFAULT hover:bg-primary-DEFAULT/20 focus:ring-primary-DEFAULT shadow-glass-dark dark:shadow-glass-dark',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {Icon && <Icon className={`mr-2 ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;