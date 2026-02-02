import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import Card from '../../components/common/Card.jsx';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import { format } from 'date-fns';
import { Package, CalendarDays, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderStatusBadge = ({ status }) => {
  let colorClass = '';
  switch (status) {
    case 'Processing':
      colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      break;
    case 'Shipped':
      colorClass = 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300';
      break;
    case 'Delivered':
      colorClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      break;
    case 'Cancelled':
      colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-gray-300';
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/orders?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.sort((a,b) => new Date(b.orderDate) - new Date(a.orderDate))); // Sort newest first
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderDetails = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <h2 className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-64 mb-6"></h2>
        {Array(3).fill(0).map((_, i) => (
          <Card key={i} className="p-6 h-40">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-1/4 bg-gray-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
            </div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-neutral-700 rounded mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-neutral-700 rounded mb-2"></div>
            <div className="h-8 w-24 ml-auto bg-primary-DEFAULT/30 dark:bg-primary-light/30 rounded-xl"></div>
          </Card>
        ))}
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
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h2>

      {orders.length === 0 ? (
        <Card className="p-8 text-center">
          <Package size={64} className="mx-auto mb-4 text-gray-300 dark:text-neutral-700" />
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">No orders found.</p>
          <p className="text-gray-500 dark:text-neutral-400 mt-2">Looks like you haven't placed any orders yet. Start shopping!</p>
          <Button as={motion.custom} to="/shop" className="mt-6" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
            Go to Shop
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft flex flex-col justify-between border border-gray-200 dark:border-neutral-700 transition-all duration-300 ease-in-out"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <CalendarDays size={16} />
                  Placed: {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2 mb-4">
                  <Package size={16} />
                  Items: {order.items.length}
                </p>
              </div>
              <div className="flex justify-between items-end mt-4">
                <p className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light">${order.total.toFixed(2)}</p>
                <Button onClick={() => openOrderDetails(order)} variant="outline">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeOrderDetails} title={`Order Details - #${selectedOrder?.id}`}>
        {selectedOrder && (
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Status & Dates</h4>
              <div className="flex items-center gap-3 mb-2">
                <OrderStatusBadge status={selectedOrder.status} />
                <span className="text-sm">Current Status</span>
              </div>
              <p className="text-sm flex items-center gap-2">
                <CalendarDays size={16} className="text-primary-DEFAULT dark:text-primary-light" />
                Order Placed: {format(new Date(selectedOrder.orderDate), 'PPP p')}
              </p>
              {selectedOrder.deliveryDate && (
                <p className="text-sm flex items-center gap-2 mt-1">
                  <CalendarDays size={16} className="text-emerald-500" />
                  Delivered On: {format(new Date(selectedOrder.deliveryDate), 'PPP p')}
                </p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Shipping Address</h4>
              <p className="text-sm flex items-start gap-2">
                <MapPin size={16} className="text-primary-DEFAULT dark:text-primary-light mt-1" />
                <span>
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, <br />
                  {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}, {selectedOrder.shippingAddress.country}
                </span>
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Items</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {selectedOrder.items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 bg-gray-50 dark:bg-neutral-800 rounded-xl p-3 border border-gray-100 dark:border-neutral-700">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-neutral-700">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Total:</span>
              <span className="text-xl font-bold text-primary-DEFAULT dark:text-primary-light">${selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default MyOrders;