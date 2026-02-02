import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Optionally, render a loading spinner or skeleton screen
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-DEFAULT dark:border-primary-light"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error('You need to be logged in to access this page.', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;