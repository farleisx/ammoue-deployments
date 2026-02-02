import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Using framer-motion for page transitions
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';

// Public Pages
import HomePage from './pages/public/HomePage.jsx';
import ShopPage from './pages/public/ShopPage.jsx';
import ProductDetailPage from './pages/public/ProductDetailPage.jsx';
import CheckoutPage from './pages/public/CheckoutPage.jsx';
import OrderConfirmationPage from './pages/public/OrderConfirmationPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';

// Dashboard Pages
import DashboardLayout from './layouts/DashboardLayout.jsx';
import DashboardOverview from './pages/dashboard/DashboardOverview.jsx';
import MyOrders from './pages/dashboard/MyOrders.jsx';
import SavedProducts from './pages/dashboard/SavedProducts.jsx';
import AccountSettings from './pages/dashboard/AccountSettings.jsx';

// Components
import PublicLayout from './layouts/PublicLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import NotFoundPage from './pages/common/NotFoundPage.jsx'; // Add a basic 404 page

function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <HomePage />
            </motion.div>
          } />
          <Route path="/shop" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <ShopPage />
            </motion.div>
          } />
          <Route path="/shop/:productId" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <ProductDetailPage />
            </motion.div>
          } />
          <Route path="/checkout" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <CheckoutPage />
            </motion.div>
          } />
          <Route path="/order-confirm/:orderId" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <OrderConfirmationPage />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <LoginPage />
            </motion.div>
          } />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <DashboardOverview />
            </motion.div>
          } />
          <Route path="orders" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <MyOrders />
            </motion.div>
          } />
          <Route path="saved" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <SavedProducts />
            </motion.div>
          } />
          <Route path="settings" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <AccountSettings />
            </motion.div>
          } />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;