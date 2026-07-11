import apiClient from './client'

export const likeAPI = {
  toggleVideoLike: (videoId) =>
    apiClient.post(`/toggle/v/${videoId}`),

  toggleCommentLike: (commentId) =>
    apiClient.post(`/likes/toggle/c/${commentId}`),

  toggleTweetLike: (tweetId) =>
    apiClient.post(`/toggle/t/${tweetId}`),

  getLikedVideos: () =>
    apiClient.get('/likes/videos'),

  getLikedComments: () =>
    apiClient.get('/likes/comments'),

  getLikedTweets: () =>
    apiClient.get('/likes/tweets'),
}
