import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import Card from '../../components/common/Card.jsx';
import { ShoppingBag, DollarSign, ListOrdered } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, link, linkText }) => {
  return (
    <Card className="p-6 flex flex-col items-start space-y-4">
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-20`}>
        <Icon size={24} className={colorClass} />
      </div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      {link && linkText && (
        <Link to={link} className="text-primary-DEFAULT dark:text-primary-light hover:underline text-sm font-medium">
          {linkText} &rarr;
        </Link>
      )}
    </Card>
  );
};

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setUserOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const recentPurchases = userOrders
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5); // Show up to 5 recent orders

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i} className="p-6 h-40 flex flex-col justify-between">
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-neutral-700 rounded mb-4"></div>
            <div className="h-10 w-2/3 bg-gray-300 dark:bg-neutral-600 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-neutral-700 rounded mt-4"></div>
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
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}!</h2>
      <p className="text-gray-600 dark:text-gray-400">Here's a quick overview of your NEXORA account.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ListOrdered}
          colorClass="text-sky-500"
          link="/dashboard/orders"
          linkText="View all orders"
        />
        <StatCard
          title="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
          icon={DollarSign}
          colorClass="text-emerald-500"
          link="/dashboard/orders"
          linkText="View order history"
        />
        <StatCard
          title="Saved Products"
          value={user?.savedProducts?.length || 0}
          icon={ShoppingBag}
          colorClass="text-indigo-500"
          link="/dashboard/saved"
          linkText="Manage wishlist"
        />
      </div>

      {/* Recent Purchases */}
      <Card className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Recent Purchases</h3>
        {recentPurchases.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">You haven't made any purchases yet.</p>
        ) : (
          <div className="space-y-4">
            {recentPurchases.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700"
              >
                <div>
                  <Link to={`/dashboard/orders?orderId=${order.id}`} className="text-lg font-medium text-primary-DEFAULT dark:text-primary-light hover:underline">
                    Order #{order.id}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.items.length} item(s) • {format(new Date(order.orderDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                      order.status === 'Shipped' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
            {totalOrders > 5 && (
              <Link to="/dashboard/orders" className="text-primary-DEFAULT dark:text-primary-light hover:underline mt-4 block text-center">
                View all {totalOrders} orders &rarr;
              </Link>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default DashboardOverview;