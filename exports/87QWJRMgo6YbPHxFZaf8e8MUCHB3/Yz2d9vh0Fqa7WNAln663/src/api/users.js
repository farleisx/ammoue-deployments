export const users = [
  {
    id: 'user-1',
    name: 'Alice Smith',
    email: 'test@example.com',
    password: 'password123', // In a real app, this would be hashed
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: {
      street: '123 Tech Lane',
      city: 'Innovate City',
      state: 'CA',
      zip: '90210',
      country: 'USA',
    },
    paymentMethods: [
      { id: 'card-1', type: 'Visa', last4: '4242', expiry: '12/25' },
    ],
    savedProducts: [
      'nx-pulse-watch',
      'nx-powercore'
    ],
  },
  {
    id: 'user-2',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    address: {
      street: '456 Gadget Blvd',
      city: 'Future Town',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    paymentMethods: [],
    savedProducts: [],
  },
];