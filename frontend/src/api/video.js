import apiClient from './client'

export const videoAPI = {
  publishVideo: (formData) =>
    apiClient.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getVideoById: (videoId) =>
    apiClient.get(`/videos/${videoId}`),

  getVideos: (page = 1, limit = 10) =>
    apiClient.get('/videos', { params: { page, limit } }),

  deleteVideo: (videoId) =>
    apiClient.delete(`/videos/${videoId}`),

  updateVideo: (videoId, data) =>
    apiClient.patch(`/videos/${videoId}`, data),

  toggleVideoPublish: (videoId) =>
    apiClient.patch(`/videos/${videoId}/toggle-publish`),
}
