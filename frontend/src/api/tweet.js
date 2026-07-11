import apiClient from './client'

export const tweetAPI = {
  createTweet: (content) =>
    apiClient.post('/create-tweet', { content }),

  deleteTweet: (tweetId) =>
    apiClient.delete(`/delete/${tweetId}`),

  updateTweet: (tweetId, content) =>
    apiClient.patch(`/update/${tweetId}`, { content }),

  getAllTweets: () =>
    apiClient.get('/get-tweets'),
}
