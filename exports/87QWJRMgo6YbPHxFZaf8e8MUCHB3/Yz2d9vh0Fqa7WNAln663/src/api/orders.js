export const orders = [
  {
    id: 'ORD-2023001',
    userId: 'user-1',
    items: [
      {
        productId: 'nx-pulse-watch',
        name: 'Nexora Pulse Watch',
        image: 'https://images.pexels.com/photos/16027816/pexels-photo-16027816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        price: 149.00,
        quantity: 1
      }
    ],
    total: 149.00,
    status: 'Delivered',
    orderDate: '2023-10-26T10:00:00Z',
    deliveryDate: '2023-11-01T14:30:00Z',
    shippingAddress: {
      street: '123 Tech Lane',
      city: 'Innovate City',
      state: 'CA',
      zip: '90210',
      country: 'USA',
    }
  },
  {
    id: 'ORD-2023002',
    userId: 'user-1',
    items: [
      {
        productId: 'nx-airpods-x',
        name: 'Nexora AirPods X',
        image: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        price: 129.00,
        quantity: 2
      },
      {
        productId: 'nx-powercore',
        name: 'Nexora PowerCore',
        image: 'https://images.pexels.com/photos/23474/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
        price: 59.00,
        quantity: 1
      }
    ],
    total: 317.00, // 129*2 + 59
    status: 'Shipped',
    orderDate: '2024-01-15T14:20:00Z',
    shippingAddress: {
      street: '123 Tech Lane',
      city: 'Innovate City',
      state: 'CA',
      zip: '90210',
      country: 'USA',
    }
  },
  {
    id: 'ORD-2024003',
    userId: 'user-1',
    items: [
      {
        productId: 'nx-desk-pro',
        name: 'Nexora Desk Pro',
        image: 'https://images.pexels.com/photos/8217430/pexels-photo-8217430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        price: 89.00,
        quantity: 1
      }
    ],
    total: 89.00,
    status: 'Processing',
    orderDate: '2024-04-20T11:00:00Z',
    shippingAddress: {
      street: '123 Tech Lane',
      city: 'Innovate City',
      state: 'CA',
      zip: '90210',
      country: 'USA',
    }
  },
  {
    id: 'ORD-2024004',
    userId: 'user-2',
    items: [
      {
        productId: 'nx-pulse-watch',
        name: 'Nexora Pulse Watch',
        image: 'https://images.pexels.com/photos/16027816/pexels-photo-16027816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        price: 149.00,
        quantity: 1
      }
    ],
    total: 149.00,
    status: 'Delivered',
    orderDate: '2023-12-01T09:00:00Z',
    deliveryDate: '2023-12-07T11:00:00Z',
    shippingAddress: {
      street: '456 Gadget Blvd',
      city: 'Future Town',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    }
  }
];