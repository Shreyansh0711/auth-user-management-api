import apiClient from './client'

export const commentAPI = {
  getVideoComments: (videoId) =>
    apiClient.get(`/videos/${videoId}/comments`),

  addComment: (videoId, content) =>
    apiClient.post(`/videos/${videoId}/comments`, { content }),

  deleteComment: (commentId) =>
    apiClient.delete(`/comments/${commentId}`),

  updateComment: (commentId, content) =>
    apiClient.patch(`/comments/${commentId}`, { content }),
}
