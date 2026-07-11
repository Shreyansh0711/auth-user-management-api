import React, { useEffect, useState } from 'react'
import { videoAPI } from '../api/video'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Feed() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadVideos()
  }, [page])

  const loadVideos = async () => {
    try {
      setIsLoading(true)
      const response = await videoAPI.getVideos(page, 12)
      setVideos(response.data.data || [])
    } catch (error) {
      toast.error('Failed to load videos')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && videos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Feed</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="group cursor-pointer"
          >
            <div className="bg-primary rounded-lg overflow-hidden hover:shadow-lg transition">
              {video.thumbnail && (
                <div className="relative overflow-hidden h-40">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  {video.owner?.fullName}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {video.views || 0} views
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No videos available yet</p>
        </div>
      )}
    </div>
  )
}
