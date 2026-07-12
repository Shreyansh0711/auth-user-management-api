import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/authStore';

export const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        {isAuthenticated && <Sidebar />}
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-6 pb-24 lg:pb-6 transition-all duration-300 ${
            isAuthenticated ? 'lg:ml-64' : ''
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
