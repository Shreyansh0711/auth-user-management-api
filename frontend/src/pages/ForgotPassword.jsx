import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../api/auth';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Clicked");
  //   if (!email.trim()) {
  //     toast.error('Please enter your email address');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await authAPI.ForgotPassword(email);
  //     toast.success('If an account exists, a reset link has been sent to your email.');
  //     setEmail('');
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Unable to send reset email right now.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    toast.error("Please enter your email address");
    return;
  }

  setLoading(true);

  try {
    const response = await authAPI.forgotPassword(email.trim());

    toast.success(
      response.data?.message ||
        "Password reset link sent successfully. Please check your email."
    );

    setEmail("");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Unable to send reset email right now."
    );
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
              <Mail size={24} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
            <p className="text-textMuted">Enter your email and we’ll send you a reset link.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 border-none" isLoading={loading}>
              Send Reset Link
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-textMuted">
            Remembered your password?{' '}
            <Link to="/login" className="text-white font-medium hover:text-red-400 transition-colors">
              Back to sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
