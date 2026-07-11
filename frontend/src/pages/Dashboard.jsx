import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoreVertical, CheckCircle2 } from 'lucide-react';
import { videoAPI } from '../api/video';
import { formatDuration, formatTimeAgo, formatViews } from '../utils/format';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await videoAPI.getVideos(1, 24);
      setVideos(response.data.data || []);
    } catch {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-8">
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {['All', 'Trending', 'Music', 'Gaming', 'Tech', 'Education'].map((cat, i) => (
          <button
            key={cat}
            className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-white text-black'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse flex flex-col gap-3">
              <div className="w-full aspect-video bg-white/5 rounded-xl" />
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-white/5 flex-shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-textMuted text-lg mb-4">No videos yet</p>
          <Link
            to="/upload"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            Upload the first video
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link to={`/video/${video._id}`} className="group block">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-surface">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-textMuted">
                      No thumbnail
                    </div>
                  )}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    {formatDuration(video.duration)}
                  </div>
                </div>

                <div className="flex gap-3 items-start pr-6 relative">
                  <Link
                    to={`/channel/${video.owner?.username}`}
                    onClick={(e) => e.stopPropagation()}
                    className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-surface"
                  >
                    {video.owner?.avatar ? (
                      <img
                        src={video.owner.avatar}
                        alt={video.owner.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10" />
                    )}
                  </Link>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>
                    <div className="text-textMuted text-xs mt-1 font-medium flex items-center hover:text-white transition-colors">
                      {video.owner?.fullname || video.owner?.username}
                      <CheckCircle2 size={12} className="ml-1 text-gray-400" />
                    </div>
                    <div className="text-textMuted text-xs font-medium">
                      {formatViews(video.views)} views • {formatTimeAgo(video.createdAt)}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 rounded-full text-white"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
