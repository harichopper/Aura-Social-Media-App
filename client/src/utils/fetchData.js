import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://aura-social-media-app-3rat.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic response handler with null check
const handleResponse = (res, url) => {
  if (res && res.data) return res.data;
  throw new Error(`No response data from /api/${url}`);
};

// ✅ GET (authenticated)
export const getDataAPI = async (url, token) => {
  try {
    const res = await API.get(`/api/${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ GET /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ POST (public)
export const postPublicDataAPI = async (url, data = {}) => {
  try {
    const res = await API.post(`/api/${url}`, data);
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ POST /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ POST (authenticated)
export const postDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.post(`/api/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ POST /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ PUT
export const putDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.put(`/api/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ PUT /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ PATCH
export const patchDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.patch(`/api/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ PATCH /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ DELETE
export const deleteDataAPI = async (url, token) => {
  try {
    const res = await API.delete(`/api/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ DELETE /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ Refresh Access Token
export const getAccessToken = async () => {
  try {
    const res = await API.post('/api/refresh_token');
    return handleResponse(res, 'refresh_token');
  } catch (err) {
    console.error("🔐 Refresh token error:", err.response?.data || err.message);
    throw err;
  }
};
