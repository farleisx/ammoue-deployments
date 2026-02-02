import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import DashboardSidebar from '../components/layout/DashboardSidebar.jsx';
import ThemeToggle from '../components/common/ThemeToggle.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { UserCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col md:ml-64"> {/* Added margin for desktop sidebar */}
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-white dark:bg-neutral-800 shadow-sm border-b border-gray-200 dark:border-neutral-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 hidden md:block">Dashboard</h1>
          <div className="flex items-center space-x-4 ml-auto"> {/* Pushes items to the right */}
            <ThemeToggle />
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors duration-200">
                <UserCircle size={24} className="text-primary-DEFAULT dark:text-primary-light" />
                <span className="text-gray-800 dark:text-gray-200 font-medium hidden lg:block">{user?.name || 'User'}</span>
              </button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-soft-lg py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out invisible z-10 border border-gray-200 dark:border-neutral-700"
              >
                <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <UserCircle size={18} className="mr-2" /> Profile
                </Link>
                <button onClick={logout} className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet /> {/* Renders the nested dashboard routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;