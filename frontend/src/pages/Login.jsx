import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Play } from 'lucide-react';
import { authAPI } from '../api/auth';

export const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.email && formData.password) {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } else {
      toast.error('Please enter email and password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      
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
            <h1 className="text-2xl font-bold mb-2">Sign in to MeTube</h1>
            <p className="text-textMuted">Continue to watch and share awesome videos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-textMuted">Password</label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primaryHover transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.4)] border-none" isLoading={loading}>
              Sign In
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6 text-xs text-textMuted">
            <span className="h-px flex-1 bg-white/10" /> OR <span className="h-px flex-1 bg-white/10" />
          </div>
          <Button
            type="button"
            onClick={() => window.location.assign(authAPI.googleLoginUrl())}
            className="w-full bg-white text-slate-900 hover:bg-slate-100 border-none"
          >
            Continue with Google
          </Button>

          <p className="text-center mt-6 text-sm text-textMuted">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-medium hover:text-red-400 transition-colors">
              Create one now
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
