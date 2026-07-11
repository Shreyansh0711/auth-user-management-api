import React, { useEffect, useState } from 'react';
import { playlistAPI } from '../api/playlist';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

export const Playlists = () => {
  const { user } = useAuthStore();
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?._id) loadPlaylists();
  }, [user?._id]);

  const loadPlaylists = async () => {
    try {
      setIsLoading(true);
      const response = await playlistAPI.getUserPlaylists(user._id);
      setPlaylists(response.data.data || []);
    } catch {
      toast.error('Failed to load playlists');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      await playlistAPI.createPlaylist(formData.name, formData.description);
      setFormData({ name: '', description: '' });
      setShowModal(false);
      await loadPlaylists();
      toast.success('Playlist created!');
    } catch {
      toast.error('Failed to create playlist');
    }
  };

  return (
    <div className="pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Playlists</h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} /> New Playlist
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Create Playlist</h2>
            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <input
                type="text"
                placeholder="Playlist name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="glass-input"
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="glass-input resize-none"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="glass-card hover:bg-[#0f172a]/60">
              <h3 className="text-xl font-bold mb-1">{playlist.name}</h3>
              <p className="text-textMuted text-sm mb-3">
                {playlist.videos?.length || 0} videos
              </p>
              {playlist.description && (
                <p className="text-textMuted text-sm">{playlist.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && playlists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textMuted text-lg mb-4">No playlists yet</p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium"
          >
            Create your first playlist
          </button>
        </div>
      )}
    </div>
  );
};
