import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User, Upload, Play } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/5 h-16">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Play size={18} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              MeTube
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center max-w-2xl px-4 md:px-12 relative hidden md:flex">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-surface/50 border border-white/10 rounded-l-full px-6 py-2.5 text-white focus:outline-none focus:border-primary focus:bg-surface/80 transition-colors"
            />
            <button className="bg-white/5 border border-l-0 border-white/10 rounded-r-full px-6 hover:bg-white/10 transition-colors flex items-center justify-center">
              <Search size={20} className="text-textMuted" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/upload"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-textMuted hover:text-white hidden sm:flex items-center gap-2 px-4"
              >
                <Upload size={20} />
                <span className="text-sm font-medium">Upload</span>
              </Link>
              <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-textMuted hover:text-white">
                <Bell size={20} />
              </button>
              <Link
                to={user?.username ? `/channel/${user.username}` : '/dashboard'}
                className="h-9 w-9 rounded-full bg-surface border border-white/10 flex items-center justify-center overflow-hidden hover:ring-2 ring-primary transition-all"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <User size={18} className="text-textMuted" />
                )}
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-textMuted hover:text-white transition-colors hidden sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors rounded-full px-4 py-1.5 font-medium"
            >
              <User size={18} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
