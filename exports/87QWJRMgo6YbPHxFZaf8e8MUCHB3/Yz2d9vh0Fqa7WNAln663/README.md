# NEXORA - Smart Gear for the Next Generation

A breathtaking, ultra-premium multi-page e-commerce platform built with React, Vite, and Tailwind CSS. This project combines cutting-edge UI/UX with robust technical architecture, designed to provide a seamless and engaging user experience for both public browsing and private dashboard management.

## 🌟 Features

*   **Ultra-Modern Design:** Sleek, futuristic, and Apple-level clean UI with meticulous attention to detail.
*   **Dual Theme Support:** Seamless Dark and Light mode toggle for optimal viewing preference.
*   **Stunning Aesthetics:** Incorporates Glassmorphism and soft shadows for a sophisticated, premium feel.
*   **Smooth Animations:** Complex, high-end Tailwind CSS animations and `framer-motion` page transitions.
*   **Responsive Layout:** Fully optimized for mobile, tablet, and desktop devices.
*   **High-Conversion Landing Page:** Designed to showcase products and brand value effectively.
*   **Full E-commerce Functionality (Mock):**
    *   Product listings with quick add-to-cart.
    *   Interactive Cart Drawer with quantity control.
    *   Mock Checkout process and Order Confirmation.
*   **Private User Dashboard:** A clean SaaS-style dashboard for logged-in users, featuring:
    *   Overview (Total orders, spent, recent purchases).
    *   My Orders (Status tracking, order details modal).
    *   Saved Products (Wishlist).
    *   Account Settings.
*   **Mock Authentication:** Secure (mock) login/logout system.
*   **Component-Based Architecture:** Clean, modular, and easy-to-understand React components.
*   **Vercel Serverless Functions:** Mock API endpoints for products, orders, and authentication, ready for integration with a real backend (e.g., Stripe, Shopify).
*   **Premium Typography:** Utilizes the elegant 'Poppins' font for a professional look.

## 🚀 Technologies Used

*   **Frontend:** React 18+, Vite, Tailwind CSS, Framer Motion
*   **Backend (Mock):** Vercel Serverless Functions (Node.js)
*   **State Management:** React Context API
*   **Routing:** React Router DOM
*   **Icons:** Lucide React
*   **Notifications:** React Hot Toast

## 📦 Products Featured

*   **Nexora Pulse Watch:** Smart fitness watch ($149)
    *   Features: Heart rate, sleep tracking, waterproof, 7-day battery
*   **Nexora AirPods X:** Wireless earbuds ($129)
    *   Features: ANC, spatial audio, 30-hour battery
*   **Nexora PowerCore:** Magnetic power bank ($59)
    *   Features: Fast charging, MagSafe-style snap
*   **Nexora Desk Pro:** Minimal smart desk lamp ($89)
    *   Features: Touch controls, ambient lighting, USB-C

## 🛠️ Project Structure

```
nexora-ecommerce/
├── public/
│   ├── logo.svg              # Brand logo
│   └── vite.svg              # Vite default logo
├── src/
│   ├── api/                  # Vercel serverless functions (mock backend)
│   │   ├── auth.js
│   │   ├── index.js          # Main serverless entry point
│   │   ├── products.js
│   │   └── users.js
│   ├── assets/               # Static assets (images, videos)
│   ├── components/
│   │   ├── common/           # Generic UI components (Button, Modal, ProtectedRoute, ThemeToggle, etc.)
│   │   ├── layout/           # Layout-specific components (Header, Footer, Sidebar, CartDrawer)
│   │   └── product/          # Product-related components (ProductCard, CartItem)
│   ├── context/
│   │   ├── AuthContext.jsx   # Authentication context
│   │   ├── CartContext.jsx   # Shopping cart context
│   │   └── ThemeContext.jsx  # Dark/Light theme context
│   ├── hooks/                # Custom React hooks (e.g., useLocalStorage)
│   ├── layouts/
│   │   ├── DashboardLayout.jsx # Layout for private dashboard pages
│   │   └── PublicLayout.jsx  # Layout for public facing pages
│   ├── pages/
│   │   ├── auth/             # Authentication pages (Login)
│   │   │   └── LoginPage.jsx
│   │   ├── common/           # Common pages (404 Not Found)
│   │   │   └── NotFoundPage.jsx
│   │   ├── dashboard/        # Private dashboard pages
│   │   │   ├── AccountSettings.jsx
│   │   │   ├── DashboardOverview.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   └── SavedProducts.jsx
│   │   └── public/           # Public facing pages
│   │       ├── CheckoutPage.jsx
│   │       ├── HomePage.jsx
│   │       ├── OrderConfirmationPage.jsx
│   │       ├── ProductDetailPage.jsx
│   │       └── ShopPage.jsx
│   ├── utils/                # Utility functions and constants
│   ├── App.jsx               # Main application component, handles routing
│   ├── index.css             # Global styles and Tailwind CSS directives
│   └── main.jsx              # Entry point for React application
├── .eslintrc.cjs             # ESLint configuration
├── .gitignore                # Git ignore file
├── index.html                # Main HTML file
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration for Tailwind CSS
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
├── vercel.json               # Vercel deployment configuration for serverless functions
└── vite.config.js            # Vite build configuration
```

## ⚙️ Getting Started

### Prerequisites

*   Node.js (LTS recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nexora-ecommerce.git
    cd nexora-ecommerce
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will typically open the application at `http://localhost:5173`.

### Building for Production

1.  **Build the project:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will create a `dist` directory with optimized production assets.

## 🤝 Contribution

Feel free to fork the repository, open issues, or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.