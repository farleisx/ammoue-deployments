import { products } from './products.js';
import { users } from './users.js';
import { orders } from './orders.js';

export default async function handler(req, res) {
  const { method, url, query, body } = req;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (url.startsWith('/api/products')) {
    if (method === 'GET') {
      const productId = query.id;
      if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
          return res.status(200).json(product);
        }
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(products);
    }
  } else if (url.startsWith('/api/auth')) {
    if (method === 'POST') {
      const { email, password } = body;
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // In a real app, generate JWT token
        return res.status(200).json({
          message: 'Login successful',
          user: { id: user.id, name: user.name, email: user.email },
          token: 'mock-jwt-token-for-' + user.id
        });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else if (url.startsWith('/api/orders')) {
    if (method === 'POST') {
      // Simulate order creation
      const { userId, items, shippingAddress, paymentInfo, total } = body;
      const newOrder = {
        id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        userId,
        items,
        shippingAddress,
        paymentInfo,
        total,
        status: 'Processing',
        orderDate: new Date().toISOString(),
      };
      orders.push(newOrder); // Add to mock orders
      return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } else if (method === 'GET') {
      const userId = query.userId;
      if (userId) {
        const userOrders = orders.filter(o => o.userId === userId);
        return res.status(200).json(userOrders);
      }
      return res.status(400).json({ message: 'User ID is required' });
    } else if (method === 'GET' && query.id) { // Get single order by ID
      const orderId = query.id;
      const order = orders.find(o => o.id === orderId);
      if (order) {
        return res.status(200).json(order);
      }
      return res.status(404).json({ message: 'Order not found' });
    }
  }

  return res.status(404).json({ message: 'API endpoint not found' });
}