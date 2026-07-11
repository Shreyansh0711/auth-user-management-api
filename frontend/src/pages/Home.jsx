import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Home() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-primary flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span className="text-accent">🍵 Chai & Backend</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          A modern social media platform for creators. Share your videos, connect with your audience, and build your community.
        </p>

        <div className="flex gap-6 justify-center flex-wrap">
          {isAuthenticated ? (
            <>
              <Link
                to="/feed"
                className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded text-lg transition"
              >
                Go to Feed
              </Link>
              <Link
                to="/upload"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded text-lg transition"
              >
                Upload Video
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded text-lg transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded text-lg transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-primary p-8 rounded-lg">
            <div className="text-4xl mb-4">📹</div>
            <h3 className="text-xl font-bold mb-2">Upload Videos</h3>
            <p className="text-gray-400">
              Share your creativity with the world
            </p>
          </div>

          <div className="bg-primary p-8 rounded-lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Engage</h3>
            <p className="text-gray-400">
              Comment, like, and connect with creators
            </p>
          </div>

          <div className="bg-primary p-8 rounded-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Build Community</h3>
            <p className="text-gray-400">
              Grow your audience and reach
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
