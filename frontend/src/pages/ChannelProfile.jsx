import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { subscriptionAPI } from '../api/subscription';
import { videoAPI } from '../api/video';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Camera, Trash2, Users } from 'lucide-react';
import { formatViews } from '../utils/format';
import { ImageCropModal } from '../components/ImageCropModal';

export const ChannelProfile = () => {
  const { username } = useParams();
  const { user: currentUser, setUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingVideoId, setDeletingVideoId] = useState(null);
  const [cropModalState, setCropModalState] = useState({
    isOpen: false,
    image: null,
    aspect: 1,
    cropShape: 'round',
    type: 'avatar',
    maxSizeMB: 4,
    fileName: 'avatar.jpg',
  });

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.getUserProfile(username);
      setProfile(response.data.data);
    } catch {
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const closeCropModal = () => {
    setCropModalState((current) => {
      if (current.image?.startsWith('blob:')) {
        URL.revokeObjectURL(current.image);
      }

      return {
        isOpen: false,
        image: null,
        aspect: 1,
        cropShape: 'round',
        type: 'avatar',
        maxSizeMB: 4,
        fileName: 'avatar.jpg',
      };
    });
  };

  const openCropModal = (type, file) => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setCropModalState({
      isOpen: true,
      image: objectUrl,
      aspect: type === 'avatar' ? 1 : 16 / 9,
      cropShape: type === 'avatar' ? 'round' : 'rect',
      type,
      maxSizeMB: type === 'avatar' ? 4 : 7,
      fileName: type === 'avatar' ? 'profile-picture.jpg' : 'cover-image.jpg',
    });
  };

  const handleImagePick = (type, file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    openCropModal(type, file);
  };

  const uploadImage = async (type, file) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append(type === 'avatar' ? 'avatar' : 'coverimage', file);

    try {
      setIsUploading(true);
      const response = type === 'avatar'
        ? await authAPI.updateAvatar(formData)
        : await authAPI.updateCoverImage(formData);
      const updatedUser = response.data.data;
      setUser(updatedUser);
      setProfile((current) => ({ ...current, ...updatedUser }));
      toast.success(`${type === 'avatar' ? 'Profile picture' : 'Cover image'} updated`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Delete this video? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingVideoId(videoId);
      await videoAPI.deleteVideo(videoId);
      setProfile((current) => ({
        ...current,
        videos: (current?.videos || []).filter((video) => video._id !== videoId),
      }));
      toast.success('Video deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete video');
    } finally {
      setDeletingVideoId(null);
    }
  };

  const handleSubscription = async () => {
    if (!currentUser) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      const response = await subscriptionAPI.toggleSubscription(profile._id);
      const { subscribed, subscriberCount } = response.data.data;
      setProfile((current) => ({
        ...current,
        issubscribed: subscribed,
        subscribercount: subscriberCount,
      }));
      toast.success(subscribed ? 'Subscribed to channel' : 'Unsubscribed from channel');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update subscription');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-textMuted">Channel not found</p>
      </div>
    );
  }

  const isOwnChannel = currentUser?._id === profile._id;

  return (
    <div className="pb-8">
      <div className="w-full h-48 rounded-xl overflow-hidden bg-gradient-to-r from-red-600/30 to-purple-600/30 relative">
        {profile.coverimage && (
          <img src={profile.coverimage} alt="cover" className="w-full h-full object-cover" />
        )}
        {isOwnChannel && (
          <label className={`absolute right-4 bottom-4 ${isUploading ? 'pointer-events-none opacity-70' : 'cursor-pointer'} bg-black/70 hover:bg-black text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2`}>
            {isUploading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Camera size={16} />
            )}
            <span>{isUploading ? 'Updating cover...' : 'Change cover'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImagePick('cover', event.target.files?.[0])} />
          </label>
        )}
      </div>

      <div className="mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-8">
          <div className="relative -mt-16">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.fullname}
                className="w-32 h-32 rounded-full border-4 border-background object-cover"
              />
            )}
            {isOwnChannel && (
              <label className={`absolute bottom-1 right-1 ${isUploading ? 'pointer-events-none opacity-70' : 'cursor-pointer'} rounded-full bg-red-600 p-2 text-white hover:bg-red-700`}>
                {isUploading ? (
                  <span className="block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Camera size={16} />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImagePick('avatar', event.target.files?.[0])} />
              </label>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{profile.fullname}</h1>
            <p className="text-textMuted mb-3">@{profile.username}</p>
            <div className="flex gap-6 text-textMuted">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{profile.subscribercount || 0} subscribers</span>
              </div>
            </div>
          </div>

          {isOwnChannel ? (
            <Link
              to="/upload"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
            >
              Upload Video
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleSubscription}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                profile.issubscribed
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {profile.issubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          )}
        </div>

        {profile.videos && profile.videos.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.videos.map((video) => (
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
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold line-clamp-2">{video.title}</h3>
                        {isOwnChannel && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleDeleteVideo(video._id);
                            }}
                            disabled={deletingVideoId === video._id}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
                            aria-label="Delete video"
                          >
                            {deletingVideoId === video._id ? (
                              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        )}
                      </div>
                      <p className="text-textMuted text-sm mt-2">
                        {formatViews(video.views)} views
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-card text-center py-12">
            <p className="text-textMuted">
              {isOwnChannel ? "You haven't uploaded any videos yet." : 'No videos on this channel.'}
            </p>
          </div>
        )}
      </div>

      <ImageCropModal
        isOpen={cropModalState.isOpen}
        image={cropModalState.image}
        aspect={cropModalState.aspect}
        cropShape={cropModalState.cropShape}
        onCancel={closeCropModal}
        onCropComplete={(croppedFile) => {
          uploadImage(cropModalState.type, croppedFile);
          closeCropModal();
        }}
        maxSizeMB={cropModalState.maxSizeMB}
        fileName={cropModalState.fileName}
      />
    </div>
  );
};
