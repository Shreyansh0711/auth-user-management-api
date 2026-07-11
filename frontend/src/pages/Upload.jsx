import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVideoStore } from '../store/videoStore';
import toast from 'react-hot-toast';
import { Upload as UploadIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videofile: null,
    thumbnail: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { publishVideo } = useVideoStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      toast.error('Thumbnail is required');
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('videofile', formData.videofile);
    data.append('thumbnail', formData.thumbnail);

    try {
      const video = await publishVideo(data);
      toast.success('Video uploaded successfully!');
      navigate(`/video/${video._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto pb-8"
    >
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
        <p className="text-textMuted mb-8">Share your content with the MeTube community</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="Enter video title"
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-textMuted">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              maxLength={500}
              required
              className="glass-input resize-none"
              placeholder="Tell viewers about your video"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-textMuted">Video File *</label>
            <label className="flex items-center justify-center w-full px-4 py-8 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-red-500/50 transition-colors">
              <div className="flex flex-col items-center">
                <UploadIcon size={32} className="text-textMuted mb-2" />
                <span className="text-textMuted text-sm">
                  {formData.videofile?.name || 'Click to select video'}
                </span>
              </div>
              <input
                type="file"
                name="videofile"
                accept="video/*"
                onChange={handleChange}
                required
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-textMuted">Thumbnail *</label>
            <label className="flex items-center justify-center w-full px-4 py-8 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-red-500/50 transition-colors">
              <div className="flex flex-col items-center">
                <UploadIcon size={32} className="text-textMuted mb-2" />
                <span className="text-textMuted text-sm">
                  {formData.thumbnail?.name || 'Click to select thumbnail'}
                </span>
              </div>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                required
                className="hidden"
              />
            </label>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 border-none"
          >
            Upload Video
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};
