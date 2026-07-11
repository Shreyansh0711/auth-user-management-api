import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../api/auth';
import toast from 'react-hot-toast';
import { formatViews } from '../utils/format';

export const History = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.getWatchHistory();
      const history = response.data.data || [];
      setVideos(history);
    } catch {
      toast.error('Failed to load watch history');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold mb-8">Watch History</h1>

      {videos.length === 0 ? (
        <div className="glass-card text-center py-12">
          <p className="text-textMuted mb-4">No watch history yet</p>
          <Link
            to="/dashboard"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium"
          >
            Browse videos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <div className="glass-card p-0 overflow-hidden hover:bg-[#0f172a]/60">
                {video.thumbnail && (
                  <div className="relative overflow-hidden h-40">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold line-clamp-2">{video.title}</h3>
                  <p className="text-textMuted text-sm mt-2">
                    {formatViews(video.views)} views
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
