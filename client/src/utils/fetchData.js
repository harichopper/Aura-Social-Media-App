import axios from 'axios';

// 🌐 Axios instance with cross-origin cookie support
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

// ✅ GET request (protected)
export const getDataAPI = async (url, token) => {
  try {
    const res = await API.get(`/api/${url}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ GET /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ POST (public - e.g., register, login)
export const postPublicDataAPI = async (url, data = {}) => {
  try {
    const res = await API.post(`/api/${url}`, data);
    return res.data;
  } catch (err) {
    console.error(`❌ POST /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ POST (authenticated)
export const postDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.post(`/api/${url}`, data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ POST /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ PUT (authenticated)
export const putDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.put(`/api/${url}`, data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ PUT /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ PATCH (authenticated)
export const patchDataAPI = async (url, data = {}, token) => {
  try {
    const res = await API.patch(`/api/${url}`, data, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ PATCH /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ DELETE (authenticated)
export const deleteDataAPI = async (url, token) => {
  try {
    const res = await API.delete(`/api/${url}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  } catch (err) {
    console.error(`❌ DELETE /api/${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ REFRESH TOKEN (uses cookie)
export const getAccessToken = async () => {
  try {
    const res = await API.post('/api/refresh_token');
    return res.data;
  } catch (err) {
    console.error("🔐 Refresh token error:", err.response?.data || err.message);
    throw err;
  }
};
