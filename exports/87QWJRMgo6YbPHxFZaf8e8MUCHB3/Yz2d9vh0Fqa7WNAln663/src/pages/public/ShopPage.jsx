import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-160px)]">
        <h1 className="h-12 bg-gray-200 dark:bg-neutral-700 rounded w-1/3 mb-10 animate-pulse"></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-6 shadow-soft animate-pulse h-80">
              <div className="w-full h-48 bg-gray-200 dark:bg-neutral-700 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/3"></div>
              <div className="h-10 bg-primary-DEFAULT/30 dark:bg-primary-light/30 rounded-xl w-full mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6 text-center text-red-500 dark:text-red-400">
        <h2 className="text-3xl font-bold mb-3">Error Loading Products</h2>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Explore <span className="text-gradient from-primary-DEFAULT to-accent-DEFAULT dark:from-primary-light dark:to-accent-light">NEXORA</span> Gear
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showWishlist={true} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShopPage;