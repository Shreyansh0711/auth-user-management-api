import React, { useEffect, useState } from 'react';
import { tweetAPI } from '../api/tweet';
import { likeAPI } from '../api/like';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Heart, Trash2 } from 'lucide-react';

export const Tweets = () => {
  const { user } = useAuthStore();
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    loadTweets();
  }, []);

  const loadTweets = async () => {
    try {
      setIsLoading(true);
      const response = await tweetAPI.getAllTweets();
      setTweets(response.data.data || []);
    } catch {
      toast.error('Failed to load tweets');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostTweet = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPosting(true);
    try {
      await tweetAPI.createTweet(content);
      setContent('');
      await loadTweets();
      toast.success('Tweet posted!');
    } catch {
      toast.error('Failed to post tweet');
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await tweetAPI.deleteTweet(tweetId);
      setTweets(tweets.filter((t) => t._id !== tweetId));
      toast.success('Tweet deleted!');
    } catch {
      toast.error('Failed to delete tweet');
    }
  };

  const handleLikeTweet = async (tweetId) => {
    try {
      await likeAPI.toggleTweetLike(tweetId);
      await loadTweets();
    } catch {
      toast.error('Failed to like tweet');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-8">
      <h1 className="text-3xl font-bold mb-8">Community Tweets</h1>

      <form onSubmit={handlePostTweet} className="glass-card mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
          rows={4}
          placeholder="What's on your mind?"
          className="glass-input resize-none mb-4"
        />
        <div className="flex justify-between items-center">
          <p className="text-textMuted text-sm">{content.length}/280</p>
          <button
            type="submit"
            disabled={!content.trim() || isPosting}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            {isPosting ? 'Posting...' : 'Tweet'}
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <div key={tweet._id} className="glass-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  {tweet.owner?.avatar && (
                    <img
                      src={tweet.owner.avatar}
                      alt={tweet.owner.fullname}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-bold">{tweet.owner?.fullname}</p>
                    <p className="text-textMuted text-sm">@{tweet.owner?.username}</p>
                  </div>
                </div>
                {user?._id === tweet.owner?._id && (
                  <button
                    type="button"
                    onClick={() => handleDeleteTweet(tweet._id)}
                    className="text-red-500 hover:text-red-400 p-1"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <p className="mb-4">{tweet.content}</p>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleLikeTweet(tweet._id)}
                  className="flex items-center gap-2 text-textMuted hover:text-red-400 transition-colors"
                >
                  <Heart size={18} />
                  Like
                </button>
              </div>
            </div>
          ))}

          {tweets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-textMuted">No tweets yet. Be the first to post!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
