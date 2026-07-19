import apiClient from "./client";

export const authAPI = {
  googleLoginUrl: () =>
    `${import.meta.env.VITE_API_URL || "http://localhost:7000/api/v1"}/users/google`,

  register: (data) =>
    apiClient.post("/users/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  login: (email, password) =>
    apiClient.post("/users/login", { email, password }),

  logout: () => apiClient.post("/users/logout"),

  refreshToken: () => apiClient.post("/users/refresh-token"),

  getCurrentUser: () => apiClient.get("/users/current-user"),

  changePassword: (oldPassword, newPassword) =>
    apiClient.post("/users/change-password", { oldPassword, newPassword }),

  forgotPassword: (email) =>
    apiClient.post("/users/forget-password", { email: email.trim() }),

  resetPassword: (token, password) =>
    apiClient.post("/users/reset-password", { token, password }),

  updateAccount: (data) => apiClient.patch("/users/update-account", data),

  updateAvatar: (formData) =>
    apiClient.patch("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateCoverImage: (formData) =>
    apiClient.patch("/users/cover-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getUserProfile: (username) => apiClient.get(`/users/c/${username}`),

  getWatchHistory: () => apiClient.get("/users/history"),
};
