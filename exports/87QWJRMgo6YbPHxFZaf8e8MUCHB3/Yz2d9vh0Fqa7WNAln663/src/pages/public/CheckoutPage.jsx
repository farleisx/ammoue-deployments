import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Card from '../../components/common/Card.jsx';
import { CreditCard, Truck, Package, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext.jsx';

const CheckoutPage = () => {
  const { cart, calculateTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
    country: user?.address?.country || '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
  });

  const [loading, setLoading] = useState(false);
  const totalAmount = calculateTotalPrice();

  const handleShippingChange = (e) => {
    const { id, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentChange = (e) => {
    const { id, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (cart.length === 0) {
      toast.error('Your cart is empty. Please add items before checking out.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setLoading(false);
      return;
    }

    // Mock API call to process order
    try {
      const orderData = {
        userId: user?.id || 'guest-user',
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: shippingInfo,
        paymentInfo: {
          // In a real app, only send tokenized payment info, not raw card details
          cardType: 'Visa', // Mock
          last4: paymentInfo.cardNumber.slice(-4),
        },
        total: totalAmount,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        clearCart();
        toast.success('Order placed successfully!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        navigate(`/order-confirm/${result.order.id}`);
      } else {
        toast.error(result.message || 'Failed to place order. Please try again.', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('A network error occurred. Please try again.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6 text-center">
        <Package size={80} className="text-gray-400 dark:text-neutral-600 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button as={Link} to="/shop" size="lg">
          Start Shopping
        </Button>
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
        <span className="text-gradient from-primary-DEFAULT to-accent-DEFAULT">Checkout</span>
        <span className="text-gradient dark:from-primary-light dark:to-accent-light"> Securely</span>
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information */}
        <Card className="p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Truck className="text-primary-DEFAULT dark:text-primary-light" /> Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input id="name" label="Full Name" value={shippingInfo.name} onChange={handleShippingChange} required />
            <Input id="address" label="Street Address" value={shippingInfo.address} onChange={handleShippingChange} required />
            <Input id="city" label="City" value={shippingInfo.city} onChange={handleShippingChange} required />
            <Input id="state" label="State / Province" value={shippingInfo.state} onChange={handleShippingChange} required />
            <Input id="zip" label="Zip / Postal Code" value={shippingInfo.zip} onChange={handleShippingChange} required />
            <Input id="country" label="Country" value={shippingInfo.country} onChange={handleShippingChange} required />
          </div>
        </Card>

        {/* Payment Information */}
        <Card className="p-8 lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <CreditCard className="text-primary-DEFAULT dark:text-primary-light" /> Payment Details
          </h2>
          <div className="space-y-6">
            <Input id="cardNumber" label="Card Number" type="text" placeholder="**** **** **** ****" value={paymentInfo.cardNumber} onChange={handlePaymentChange} required />
            <Input id="cardName" label="Name on Card" type="text" value={paymentInfo.cardName} onChange={handlePaymentChange} required />
            <div className="grid grid-cols-2 gap-4">
              <Input id="expiryDate" label="Expiry Date (MM/YY)" type="text" placeholder="MM/YY" value={paymentInfo.expiryDate} onChange={handlePaymentChange} required />
              <Input id="cvc" label="CVC" type="text" placeholder="***" value={paymentInfo.cvc} onChange={handlePaymentChange} required />
            </div>
          </div>
        </Card>

        {/* Order Summary & Place Order */}
        <Card className="p-8 lg:col-span-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Package className="text-primary-DEFAULT dark:text-primary-light" /> Order Summary
          </h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-neutral-700 pt-4 flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
              <span>Order Total:</span>
              <span className="text-primary-DEFAULT dark:text-primary-light">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg" loading={loading} icon={CheckCircle}>
            {loading ? 'Processing Order...' : 'Place Order Now'}
          </Button>
        </Card>
      </form>
    </motion.div>
  );
};

export default CheckoutPage;