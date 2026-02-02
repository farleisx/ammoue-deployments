/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using 'class' strategy
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Custom color palette for Nexora
        primary: {
          light: '#6366F1', // Indigo 500
          DEFAULT: '#4F46E5', // Indigo 600
          dark: '#4338CA', // Indigo 700
        },
        accent: {
          light: '#0EA5E9', // Sky 500
          DEFAULT: '#0284C7', // Sky 600
          dark: '#0369A1', // Sky 700
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },
      boxShadow: {
        'soft': '0 4px 60px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)', // subtle shadow
        'soft-lg': '0 10px 150px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.17)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'glass-gradient-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}