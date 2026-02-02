import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { CartContext } from '../../context/CartContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import Button from '../common/Button.jsx';
import CartDrawer from './CartDrawer.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.05 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header className="sticky top-0 z-30 w-full glass shadow-lg dark:shadow-soft-lg border-b border-gray-200/20 dark:border-white/10 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="NEXORA Logo" className="h-8 w-auto filter dark:invert" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">NEXORA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-DEFAULT dark:text-primary-light'
                    : 'text-gray-700 hover:text-primary-DEFAULT dark:text-gray-300 dark:hover:text-primary-light'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Auth, Cart, Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label="Open cart"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <motion.span
                key={cartItemCount}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartItemCount}
              </motion.span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative group hidden md:block">
              <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200">
                <UserCircle size={24} className="text-primary-DEFAULT dark:text-primary-light" />
                <span className="text-gray-800 dark:text-gray-200 font-medium hidden lg:block">{user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-soft-lg py-2 opacity-0 group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out invisible z-10 border border-gray-200 dark:border-neutral-700">
                <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <UserCircle size={18} className="mr-2" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Button as={Link} to="/login" variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden mt-4 p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-soft-lg border border-gray-200/50 dark:border-neutral-700/50"
          >
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary-DEFAULT text-white dark:bg-primary-light'
                          : 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li variants={itemVariants} className="pt-2 border-t border-gray-200 dark:border-neutral-700">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center py-2 px-3 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserCircle size={20} className="mr-2" /> Dashboard ({user.name})
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left py-2 px-3 rounded-lg text-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut size={20} className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2 px-3 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </header>
  );
};

export default Header;