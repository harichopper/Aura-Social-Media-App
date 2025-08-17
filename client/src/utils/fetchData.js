import axios from 'axios'

// ✅ Backend URL
const BASE_URL = "https://aura-social-media-app-6njw.vercel.app"

axios.defaults.withCredentials = true // send cookies automatically

// ----------------------
// Refresh token helper
// ----------------------
export const refreshToken = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/refresh_token`)
    return res.data.access_token // backend returns new access token
  } catch (err) {
    console.error('Refresh token failed:', err)
    return null
  }
}

// ----------------------
// Headers helper
// ----------------------
const createHeaders = (token) => ({
  headers: { Authorization: token ? `Bearer ${token}` : '' }
})

// ----------------------
// API calls
// ----------------------
export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${BASE_URL}/api/${url}`, createHeaders(token))
  return res
}

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${BASE_URL}/api/${url}`, post, createHeaders(token))
  return res
}

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${BASE_URL}/api/${url}`, post, createHeaders(token))
  return res
}

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${BASE_URL}/api/${url}`, post, createHeaders(token))
  return res
}

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${BASE_URL}/api/${url}`, createHeaders(token))
  return res
}
