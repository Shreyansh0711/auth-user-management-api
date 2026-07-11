import apiClient from './client'

export const subscriptionAPI = {
  toggleSubscription: (channelId) =>
    apiClient.post(`/subscriptions/channel/${channelId}`),

  getUserSubscriptions: () =>
    apiClient.get('/subscriptions/channels'),

  getChannelSubscribers: (channelId) =>
    apiClient.get(`/subscriptions/subscribers/${channelId}`),

  getSubscriberCount: (channelId) =>
    apiClient.get(`/subscriptions/subscribers/count/${channelId}`),

  isSubscribed: (channelId) =>
    apiClient.get(`/subscriptions/check/${channelId}`),
}
