import React from 'react';

const Input = ({ label, id, type = 'text', className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-neutral-500
          focus:ring-2 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT outline-none transition-all duration-300 ease-in-out
          ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;