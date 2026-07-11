import { create } from 'zustand'
import { videoAPI } from '../api/video'

export const useVideoStore = create((set) => ({
  videos: [],
  currentVideo: null,
  isLoading: false,
  error: null,

  setVideos: (videos) => set({ videos }),
  setCurrentVideo: (video) => set({ currentVideo: video }),

  publishVideo: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await videoAPI.publishVideo(formData)
      const newVideo = response.data.data
      set((state) => ({
        videos: [newVideo, ...state.videos],
        isLoading: false,
      }))
      return newVideo
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Video upload failed'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  },

  getVideoById: async (videoId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await videoAPI.getVideoById(videoId)
      const video = response.data.data
      set({ currentVideo: video, isLoading: false })
      return video
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch video'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  },

  deleteVideo: async (videoId) => {
    try {
      await videoAPI.deleteVideo(videoId)
      set((state) => ({
        videos: state.videos.filter((v) => v._id !== videoId),
      }))
    } catch (error) {
      throw error
    }
  },
}))
