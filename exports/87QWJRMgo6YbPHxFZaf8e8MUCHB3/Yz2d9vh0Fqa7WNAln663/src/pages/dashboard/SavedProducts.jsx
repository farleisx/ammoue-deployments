import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SavedProducts = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock function to fetch product details for saved IDs
  const fetchProductDetails = async (productIds) => {
    if (!productIds || productIds.length === 0) return [];
    try {
      // Simulate fetching individual products or a batch
      const productsData = await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(`/api/products?id=${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch product ${id}`);
          }
          return response.json();
        })
      );
      return productsData.filter(Boolean); // Filter out any null/undefined if a product wasn't found
    } catch (e) {
      console.error("Error fetching saved product details:", e);
      return [];
    }
  };

  useEffect(() => {
    const loadSavedProducts = async () => {
      if (!user?.savedProducts) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchProductDetails(user.savedProducts);
        setSavedProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSavedProducts();
  }, [user]);

  const handleRemoveFromSaved = (productId) => {
    // This would typically involve an API call to update the user's savedProducts
    setSavedProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.error('Product removed from wishlist!', {
      icon: '💔',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <h2 className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-64 mb-6"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="p-6 h-60 flex flex-col justify-between">
              <div className="w-full h-32 bg-gray-200 dark:bg-neutral-700 rounded-xl mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-neutral-700 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Products</h2>

      {savedProducts.length === 0 ? (
        <Card className="p-8 text-center">
          <Heart size={64} className="mx-auto mb-4 text-gray-300 dark:text-neutral-700" />
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Your wishlist is empty.</p>
          <p className="text-gray-500 dark:text-neutral-400 mt-2">Add products you love here to easily find them later!</p>
          <Button as={Link} to="/shop" className="mt-6">
            Explore Products
          </Button>
        </Card>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft flex flex-col justify-between border border-gray-200 dark:border-neutral-700 transition-all duration-300 ease-in-out"
              >
                <Link to={`/shop/${product.id}`} className="block relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain rounded-xl mb-4 transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </Link>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    <Link to={`/shop/${product.id}`} className="hover:text-primary-DEFAULT dark:hover:text-primary-light transition-colors duration-200">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light mb-4">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex space-x-3 mt-4">
                  <Button onClick={() => handleAddToCart(product)} className="flex-1" icon={ShoppingCart}>
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromSaved(product.id)}
                    variant="secondary"
                    className="p-3"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default SavedProducts;