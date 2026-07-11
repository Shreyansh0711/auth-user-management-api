import apiClient from './client'

export const playlistAPI = {
  createPlaylist: (name, description) =>
    apiClient.post('/playlists', { name, description }),

  getPlaylistById: (playlistId) =>
    apiClient.get(`/playlists/${playlistId}`),

  getUserPlaylists: (userId) =>
    apiClient.get(`/playlists/user/${userId}`),

  addVideoToPlaylist: (playlistId, videoId) =>
    apiClient.patch(`/playlists/${playlistId}/videos/${videoId}`),

  removeVideoFromPlaylist: (playlistId, videoId) =>
    apiClient.delete(`/playlists/${playlistId}/remove/${videoId}`),
}
