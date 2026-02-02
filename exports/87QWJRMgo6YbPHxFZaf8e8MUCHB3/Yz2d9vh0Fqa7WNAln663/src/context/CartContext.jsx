import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('nexora_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nexora_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error('Item removed from cart!', {
      icon: '🗑️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.success('Cart cleared!', {
      icon: '🧹',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }, []);

  const calculateTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};