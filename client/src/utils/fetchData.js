import axios from 'axios';

// 🌐 Axios instance with credentials (cookies) enabled
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://aura-social-media-app-3rat.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ GET request (authenticated)
export const getDataAPI = async (url, token) => {
  try {
    const res = await API.get(`/api/${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (err) {
    console.error(`❌ GET /api/${url} failed:`, err.response?.data || err.message || err);
    throw err;
  }
};

// ✅ POST (public, e.g., login, register)
export const postPublicDataAPI = async (url, data = {}) => {
  try {
    const res = await API.post(`/api/${url}`, data);
    return res.data;
  } catch (err) {
    console.error(`❌ POST /api/${url} failed:`, err.response?.data || err.message || err);
    throw err;
  }
};

// ✅ POST (authenticated)
export const postDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.post(`/api/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ POST /api/${url} failed:`, err.response?.data || err.message || err);
    throw err;
  }
};

// ✅ PUT (authenticated)
export const putDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.put(`/api/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ PUT /api/${url} failed:`, err.response?.data || err.message || err);
    throw err;
  }
};

// ✅ PATCH (authenticated)
export const patchDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.patch(`/api/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ PATCH /api/${url} failed:`, err.response?.data || err.message || err);
    throw err;
  }
};

// ✅ DELETE (authenticated)
export const deleteDataAPI = async (url, token) => {
  try {
    const res = await API.delete(`/api/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ DELETE /api/${url} failed:`, err.response?.data || err.message || err);
    throw err;
  }
};

// ✅ Refresh Access Token (uses cookie)
export const getAccessToken = async () => {
  try {
    const res = await API.post('/api/refresh_token');
    return res.data;
  } catch (err) {
    console.error("🔐 Refresh token error:", err.response?.data || err.message || err);
    throw err;
  }
};
