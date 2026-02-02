import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import { Star, ShoppingCart, Heart, CheckCircle } from 'lucide-react';
import { CartContext } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false); // Mock wishlist state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setMainImage(data.image); // Set initial main image
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? `${product?.name} removed from wishlist.` : `${product?.name} added to wishlist!`, {
      icon: isWishlisted ? '💔' : '❤️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[calc(100vh-160px)]">
        <div className="h-96 bg-gray-200 dark:bg-neutral-700 rounded-2xl"></div>
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-primary-DEFAULT/30 dark:bg-primary-light/30 rounded-xl"></div>
            <div className="h-12 bg-gray-200 dark:bg-neutral-700 rounded-xl"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/3 mt-8"></div>
          <ul className="space-y-2">
            {Array(3).fill(0).map((_, i) => <li key={i} className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full"></li>)}
          </ul>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6 text-center">
        <CheckCircle size={80} className="text-red-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Product Not Found!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {error}. Please try again or check other products.
        </p>
        <Button as={Link} to="/shop" size="lg">
          Back to Shop
        </Button>
      </div>
    );
  }

  if (!product) {
    return null; // Should not happen if error is handled
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-160px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <Card className="p-4 overflow-hidden shadow-soft-lg">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
          </Card>
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex space-x-3 mt-6 justify-center">
              {product.gallery.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === img ? 'border-primary-DEFAULT dark:border-primary-light shadow-md' : 'border-transparent hover:border-gray-300 dark:hover:border-neutral-600'
                  } transition-all duration-300`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            {Array(Math.floor(product.rating)).fill(0).map((_, i) => (
              <Star key={i} size={20} fill="currentColor" className="text-yellow-400 dark:text-yellow-300" />
            ))}
            <span className="text-gray-600 dark:text-gray-400 text-sm">({product.reviews} reviews)</span>
          </div>
          <p className="text-5xl font-bold text-primary-DEFAULT dark:text-primary-light mb-6">${product.price.toFixed(2)}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{product.description}</p>

          <div className="flex space-x-4 mb-8">
            <Button onClick={handleAddToCart} size="lg" icon={ShoppingCart} className="flex-1">
              Add to Cart
            </Button>
            <Button
              onClick={handleToggleWishlist}
              variant="outline"
              size="lg"
              className={`p-3 w-auto ${isWishlisted ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : ''}`}
            >
              <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
            </Button>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={20} className="text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;