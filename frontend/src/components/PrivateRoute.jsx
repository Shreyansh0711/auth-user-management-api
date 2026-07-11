import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
