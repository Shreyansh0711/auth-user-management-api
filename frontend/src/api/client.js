import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        )
        const { accesstoken } = response.data.data
        localStorage.setItem('token', accesstoken)
        originalRequest.headers.Authorization = `Bearer ${accesstoken}`
        return apiClient(originalRequest)
      } catch {
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('auth-unauthorized'))
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
