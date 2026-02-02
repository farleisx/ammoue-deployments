import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      toast.success(`Switched to ${newTheme} mode!`, {
        icon: newTheme === 'dark' ? '🌙' : '☀️',
        style: {
          borderRadius: '10px',
          background: newTheme === 'dark' ? '#333' : '#fff',
          color: newTheme === 'dark' ? '#fff' : '#333',
        },
      });
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context easily
export const useTheme = () => {
  return useContext(ThemeContext);
};