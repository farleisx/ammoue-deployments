import React, { useState, useContext } from 'react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Card from '../../components/common/Card.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

const AccountSettings = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, send update request to backend
      console.log('Updating profile:', { name, email });
      toast.success('Profile updated successfully!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setLoading(false);
    }, 1500);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    if (!currentPassword || !newPassword) {
      toast.error('Please fill in all password fields.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, send password update request to backend
      console.log('Updating password...');
      toast.success('Password updated successfully!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h2>

      {/* Profile Information */}
      <Card className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <User className="text-primary-DEFAULT dark:text-primary-light" /> Profile Information
        </h3>
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <Input
            id="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" loading={loading}>
            Save Profile
          </Button>
        </form>
      </Card>

      {/* Change Password */}
      <Card className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Lock className="text-primary-DEFAULT dark:text-primary-light" /> Change Password
        </h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          <Input
            id="current-password"
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            id="new-password"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" loading={loading} variant="secondary">
            Update Password
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default AccountSettings;