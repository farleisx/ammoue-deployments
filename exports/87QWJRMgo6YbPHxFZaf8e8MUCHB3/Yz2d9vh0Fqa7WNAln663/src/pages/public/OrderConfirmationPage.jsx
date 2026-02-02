import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import { CheckCircle, CalendarDays, MapPin, Package } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        if (!response.ok) {
          throw new Error('Order not found or failed to fetch.');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      setError('No order ID provided.');
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-primary-DEFAULT/20 dark:bg-primary-light/20 mb-6"></div>
        <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-96 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-64 mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card className="h-56"></Card>
          <Card className="h-56"></Card>
        </div>
        <div className="h-12 bg-primary-DEFAULT/30 dark:bg-primary-light/30 rounded-xl w-48 mt-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6 text-center">
        <CheckCircle size={80} className="text-red-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Order Confirmation Failed!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {error} Please check your order history or contact support.
        </p>
        <Button as={Link} to="/" size="lg">
          Back to Home
        </Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6 text-center">
        <CheckCircle size={80} className="text-gray-400 dark:text-neutral-600 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Order Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The order you are looking for does not exist or the ID is incorrect.
        </p>
        <Button as={Link} to="/" size="lg">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8"
      >
        <CheckCircle size={96} className="text-emerald-500 mx-auto mb-4" />
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Thank You! Your Order is Confirmed
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
      >
        Your order <span className="font-semibold text-primary-DEFAULT dark:text-primary-light">#{order.id}</span> has been placed successfully and is now being processed.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6 text-left flex flex-col items-start" glass>
          <div className="flex items-center text-primary-DEFAULT dark:text-primary-light mb-4">
            <CalendarDays size={24} className="mr-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Order Date:</span> {format(new Date(order.orderDate), 'PPP p')}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Order Total:</span> <span className="font-bold text-2xl text-primary-DEFAULT dark:text-primary-light">${order.total.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            <span className="font-medium">Status:</span> <span className="font-semibold">{order.status}</span>
          </p>
        </Card>

        <Card className="p-6 text-left flex flex-col items-start" glass>
          <div className="flex items-center text-primary-DEFAULT dark:text-primary-light mb-4">
            <MapPin size={24} className="mr-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping To</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{order.shippingAddress.name || order.shippingAddress.street}</p>
          <p className="text-gray-700 dark:text-gray-300">{order.shippingAddress.street}</p>
          <p className="text-gray-700 dark:text-gray-300">
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{order.shippingAddress.country}</p>
        </Card>
      </div>

      <Card className="p-6 text-left mb-12" glass>
        <div className="flex items-center text-primary-DEFAULT dark:text-primary-light mb-4">
          <Package size={24} className="mr-3" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Items Ordered</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {order.items.map((item) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * order.items.indexOf(item), duration: 0.3 }}
              className="flex items-center space-x-4 bg-gray-50 dark:bg-neutral-800 rounded-xl p-3 border border-gray-100 dark:border-neutral-700"
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity} @ ${item.price.toFixed(2)}</p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">${(item.quantity * item.price).toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <Button as={Link} to="/dashboard/orders" size="lg" variant="primary">
          View My Orders
        </Button>
        <Button as={Link} to="/shop" size="lg" variant="secondary">
          Continue Shopping
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmationPage;