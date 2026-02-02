import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Card from '../../components/common/Card.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-gradient-to-br from-primary-DEFAULT/10 to-accent-DEFAULT/10 dark:from-neutral-950 dark:to-neutral-800"
    >
      <Card className="w-full max-w-md p-8 sm:p-10 text-center">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          src="/logo.svg"
          alt="NEXORA Logo"
          className="mx-auto h-16 w-auto mb-6 filter dark:invert"
        />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to your NEXORA dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-primary-DEFAULT dark:text-primary-light hover:underline font-medium">Sign Up</Link> (Mock register not available)
        </p>
      </Card>
    </motion.div>
  );
};

export default LoginPage;