import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { ShoppingCart, Heart } from 'lucide-react';
import { CartContext } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductCard = ({ product, showWishlist = false }) => {
  const { addToCart } = useContext(CartContext);
  const [isWishlisted, setIsWishlisted] = useState(false); // Mock wishlist state

  const handleAddToCart = () => {
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

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist!`, {
      icon: isWishlisted ? '💔' : '❤️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft flex flex-col justify-between transform transition-all duration-300 ease-in-out border border-gray-200 dark:border-neutral-700"
    >
      <Link to={`/shop/${product.id}`} className="block relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain rounded-xl mb-4 transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        {showWishlist && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.preventDefault(); handleToggleWishlist(); }}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-neutral-700 shadow-md ${
              isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            } transition-colors duration-200`}
            aria-label="Add to wishlist"
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </motion.button>
        )}
      </Link>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          <Link to={`/shop/${product.id}`} className="hover:text-primary-DEFAULT dark:hover:text-primary-light transition-colors duration-200">
            {product.name}
          </Link>
        </h3>
        <p className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light mb-4">${product.price.toFixed(2)}</p>
      </div>
      <Button onClick={handleAddToCart} className="w-full mt-4" icon={ShoppingCart}>
        Add to Cart
      </Button>
    </motion.div>
  );
};

export default ProductCard;