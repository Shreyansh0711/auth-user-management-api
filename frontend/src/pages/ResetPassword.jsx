import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!token) {
      toast.error('Reset token is missing');
      return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword(token, password);
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 backdrop-blur-3xl bg-[#0f172a]/70 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Set a new password</h1>
            <p className="text-textMuted">Choose a strong password for your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="New Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 border-none" isLoading={loading}>
              Reset Password
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-textMuted">
            <Link to="/login" className="text-white font-medium hover:text-red-400 transition-colors">
              Back to sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
