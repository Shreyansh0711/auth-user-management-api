import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Menu, LogOut, Upload } from 'lucide-react'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent">
          🍵 Chai & Backend
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/feed" className="hover:text-accent transition">
                Feed
              </Link>
              <Link to="/tweets" className="hover:text-accent transition">
                Tweets
              </Link>
              <Link to="/playlists" className="hover:text-accent transition">
                Playlists
              </Link>
              <Link
                to="/upload"
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                <Upload size={18} /> Upload
              </Link>
              <Link to={`/channel/${user?.username}`} className="hover:text-accent transition">
                {user?.fullName}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-accent text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>

        {menuOpen && (
          <div className="md:hidden absolute top-16 right-0 bg-primary border-l border-b border-gray-700 p-4 w-48">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <Link to="/feed" onClick={() => setMenuOpen(false)}>
                  Feed
                </Link>
                <Link to="/tweets" onClick={() => setMenuOpen(false)}>
                  Tweets
                </Link>
                <Link to="/playlists" onClick={() => setMenuOpen(false)}>
                  Playlists
                </Link>
                <Link
                  to="/upload"
                  className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <Upload size={18} /> Upload
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
