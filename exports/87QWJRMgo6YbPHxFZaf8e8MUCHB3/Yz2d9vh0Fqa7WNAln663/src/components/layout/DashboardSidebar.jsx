import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Heart, Settings, LogOut, X, Menu } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, children, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group
         ${isActive
            ? 'bg-primary-DEFAULT text-white shadow-md dark:bg-primary-light'
            : 'text-gray-700 hover:bg-primary-DEFAULT/10 dark:text-gray-300 dark:hover:bg-primary-light/10'
         }`
      }
      onClick={onClick}
    >
      <Icon
        size={20}
        className={`${
          to === '/dashboard/settings' && 'text-gray-500 group-[.active]:text-white dark:text-gray-400' // Custom color for settings icon
        } ${
          !isActive && 'text-gray-500 dark:text-gray-400 group-hover:text-primary-DEFAULT dark:group-hover:text-primary-light'
        }`}
      />
      <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-200 group-hover:text-primary-DEFAULT dark:group-hover:text-primary-light'}`}>
        {children}
      </span>
    </NavLink>
  );
};

const DashboardSidebar = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // State for mobile sidebar

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close sidebar on logout
  };

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-full bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 shadow-md md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && ( // Show on desktop, or if open on mobile
          <motion.div
            initial={window.innerWidth < 768 ? "hidden" : false}
            animate={window.innerWidth < 768 ? "visible" : false}
            exit="exit"
            variants={sidebarVariants}
            className={`fixed inset-y-0 left-0 z-40 w-64 p-6 bg-white dark:bg-neutral-900 shadow-soft-lg flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-none md:border-r border-gray-200 dark:border-neutral-800`}
          >
            {/* Sidebar Header for Mobile */}
            <div className="flex items-center justify-between mb-8 md:hidden">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <img src="/logo.svg" alt="NEXORA Logo" className="h-7 w-auto filter dark:invert" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">NEXORA</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
              <SidebarLink to="/dashboard" icon={LayoutDashboard} onClick={() => setIsOpen(false)}>
                Overview
              </SidebarLink>
              <SidebarLink to="/dashboard/orders" icon={ShoppingBag} onClick={() => setIsOpen(false)}>
                My Orders
              </SidebarLink>
              <SidebarLink to="/dashboard/saved" icon={Heart} onClick={() => setIsOpen(false)}>
                Saved Products
              </SidebarLink>
              <SidebarLink to="/dashboard/settings" icon={Settings} onClick={() => setIsOpen(false)}>
                Account Settings
              </SidebarLink>
            </nav>

            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-neutral-800">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;