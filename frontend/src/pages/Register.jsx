import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Play } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    username: '',
    avatar: null,
    coverimage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.avatar) {
      toast.error('Avatar is required');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('fullname', formData.fullname);
    data.append('username', formData.username);
    data.append('avatar', formData.avatar);
    if (formData.coverimage) data.append('coverimage', formData.coverimage);

    try {
      await register(data);
      toast.success('Account created! You can now sign in.');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message
        || (error.request
          ? 'Cannot reach the backend. Start it on port 7000 and check its MongoDB connection.'
          : 'Registration failed. Please try again.');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 backdrop-blur-3xl bg-[#0f172a]/70 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(220,38,38,0.6)] mb-4">
              <Play fill="currentColor" className="ml-1" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Join MeTube</h1>
            <p className="text-textMuted">Create an account to share your videos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="fullname"
              type="text"
              placeholder="Your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="your_username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-textMuted">Avatar *</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                required
                className="glass-input file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-textMuted">Cover Image</label>
              <input
                type="file"
                name="coverimage"
                accept="image/*"
                onChange={handleChange}
                className="glass-input file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.4)] border-none mt-2"
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-textMuted">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-medium hover:text-red-400 transition-colors">
              Sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
