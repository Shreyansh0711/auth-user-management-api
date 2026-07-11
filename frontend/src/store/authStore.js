import { create } from 'zustand'
import apiClient from '../api/client'

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', { email, password })
      const { user, accesstoken } = response.data.data

      localStorage.setItem('token', accesstoken)
      set({ user, token: accesstoken, isAuthenticated: true })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      }
    }
  },

  register: async (formData) => {
    const response = await apiClient.post('/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  logout: async () => {
    try {
      await apiClient.post('/users/logout')
    } catch (error) {
      console.error('Logout error', error)
    } finally {
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false })
    }
  },

  fetchCurrentUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await apiClient.get('/users/current-user')
      set({ user: response.data.data, isAuthenticated: true })
    } catch {
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false })
    }
  },

  setUser: (user) => set({ user }),
}))

if (typeof window !== 'undefined') {
  window.addEventListener('auth-unauthorized', () => {
    useAuthStore.getState().logout()
  })
}
