import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { VideoDetail } from './pages/VideoDetail';
import { Upload } from './pages/Upload';
import { Tweets } from './pages/Tweets';
import { Playlists } from './pages/Playlists';
import { ChannelProfile } from './pages/ChannelProfile';
import { History } from './pages/History';
import { OAuthCallback } from './pages/OAuthCallback';
import { useAuthStore } from './store/authStore';

function App() {
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/channel/:username" element={<ChannelProfile />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/tweets" element={<Tweets />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
