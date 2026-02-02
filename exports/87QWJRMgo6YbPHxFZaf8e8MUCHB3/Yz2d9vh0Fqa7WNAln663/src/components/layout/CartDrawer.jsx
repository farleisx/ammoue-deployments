import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../../context/CartContext.jsx';
import Button from '../common/Button.jsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, calculateTotalPrice } = useContext(CartContext);
  const total = calculateTotalPrice();

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success('Product removed from cart!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-soft-lg flex flex-col border-l border-gray-200 dark:border-neutral-800"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-800">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <ShoppingCart size={24} className="text-primary-DEFAULT dark:text-primary-light" /> My Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-neutral-400">
                  <ShoppingCart size={64} className="mb-4 text-gray-300 dark:text-neutral-700" />
                  <p className="text-lg font-medium">Your cart is empty.</p>
                  <p className="text-sm">Start shopping to fill it up!</p>
                  <Button as={Link} to="/shop" onClick={onClose} className="mt-6">
                    Go to Shop
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                    className="flex items-center space-x-4 bg-gray-50 dark:bg-neutral-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-neutral-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-neutral-700"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{item.name}</h3>
                      <p className="text-primary-DEFAULT dark:text-primary-light font-medium">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-md bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium text-gray-800 dark:text-gray-200 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-md bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="flex justify-between items-center text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  <span>Total:</span>
                  <span className="text-primary-DEFAULT dark:text-primary-light">${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={onClose} className="w-full">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button variant="secondary" onClick={onClose} className="w-full mt-3">
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;