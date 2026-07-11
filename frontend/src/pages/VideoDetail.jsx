import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { videoAPI } from '../api/video';
import { commentAPI } from '../api/comment';
import { likeAPI } from '../api/like';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatViews } from '../utils/format';

export const VideoDetail = () => {
  const { videoId } = useParams();
  const { isAuthenticated } = useAuthStore();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadVideo();
    loadComments();
  }, [videoId]);

  const loadVideo = async () => {
    try {
      const response = await videoAPI.getVideoById(videoId);
      setVideo(response.data.data);
    } catch {
      toast.error('Failed to load video');
    } finally {
      setIsLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await commentAPI.getVideoComments(videoId);
      setComments(response.data.data || []);
    } catch {
      console.error('Failed to load comments');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!isAuthenticated) {
      toast.error('Please sign in to comment');
      return;
    }

    try {
      await commentAPI.addComment(videoId, comment);
      setComment('');
      await loadComments();
      toast.success('Comment added!');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like videos');
      return;
    }

    try {
      await likeAPI.toggleVideoLike(videoId);
      setIsLiked(!isLiked);
      toast.success(isLiked ? 'Unliked' : 'Liked!');
    } catch {
      toast.error('Failed to like video');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-textMuted">Video not found</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden">
            {video.videofile ? (
              <video src={video.videofile} controls className="w-full aspect-video" />
            ) : (
              <div className="w-full aspect-video bg-surface flex items-center justify-center">
                <p className="text-textMuted">Video not available</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <Link
                to={`/channel/${video.owner?.username}`}
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                {video.owner?.avatar && (
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.fullname}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-bold">{video.owner?.fullname}</p>
                  <p className="text-textMuted text-sm">@{video.owner?.username}</p>
                </div>
              </Link>
              <span className="text-textMuted text-sm">{formatViews(video.views)} views</span>
            </div>

            <div className="flex gap-3 mb-6 pb-6 border-b border-white/10">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                  isLiked ? 'bg-red-600 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                Like
              </button>
              <div className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <MessageCircle size={20} />
                {comments.length}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success('Video link copied');
                }}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>

            <div className="glass-card mb-8">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              <p className="text-textMuted whitespace-pre-wrap">{video.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">
              {comments.length} Comment{comments.length !== 1 ? 's' : ''}
            </h3>

            <form onSubmit={handleAddComment} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={isAuthenticated ? 'Add a comment...' : 'Sign in to comment'}
                  disabled={!isAuthenticated}
                  className="glass-input flex-1"
                />
                <button
                  type="submit"
                  disabled={!isAuthenticated}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Comment
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c._id} className="glass-card">
                  <div className="flex items-start gap-4">
                    {c.owner?.avatar && (
                      <img
                        src={c.owner.avatar}
                        alt={c.owner.fullname}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-sm">{c.owner?.fullname}</p>
                      <p className="text-textMuted text-xs mb-1">@{c.owner?.username}</p>
                      <p className="text-sm">{c.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">More from MeTube</h3>
          <p className="text-textMuted text-sm">Recommendations coming soon...</p>
        </div>
      </div>
    </div>
  );
};
