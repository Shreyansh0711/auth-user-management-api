import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    const finishGoogleLogin = async () => {
      const token = params.get('token');
      if (!token) {
        toast.error('Google sign-in was not completed');
        navigate('/login', { replace: true });
        return;
      }

      localStorage.setItem('token', token);
      await fetchCurrentUser();
      toast.success('Signed in with Google');
      navigate('/dashboard', { replace: true });
    };

    finishGoogleLogin();
  }, [fetchCurrentUser, navigate, params]);

  return <div className="min-h-screen flex items-center justify-center text-textMuted">Completing Google sign-in…</div>;
};
