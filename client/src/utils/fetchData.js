// utils/fetchData.js
import axios from 'axios';

// ✅ Make sure .env contains: REACT_APP_API_URL=https://your-backend-url/api
const baseURL = process.env.REACT_APP_API_URL?.trim() || 'https://aura-social-media-app-3rat-5tb3u5q9v-harics-projects-ad7a45e9.vercel.app/api';

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔧 Handle and validate backend response
const handleResponse = (res, url) => {
  if (res?.data?.access_token || res?.data?.user || res?.data?.msg || res?.data?.status) {
    return res.data;
  } else if (res?.data) {
    return res.data;
  }
  throw new Error(`No response data from ${url}`);
};

// ✅ GET (authenticated)
export const getDataAPI = async (url, token) => {
  try {
    const res = await API.get(`/${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ GET /${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ POST (public)
export const postPublicDataAPI = async (url, data = {}) => {
  try {
    const res = await API.post(`/${url}`, data);
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ POST /${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ POST (authenticated)
export const postDataAPI = async (url, data = {}, token = '') => {
  try {
    const res = await API.post(`/${url}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ POST /${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ PUT
export const putDataAPI = async (url, data = {}, token = '') => {
  try {
    const res = await API.put(`/${url}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ PUT /${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ PATCH
export const patchDataAPI = async (url, data = {}, token = '') => {
  try {
    const res = await API.patch(`/${url}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ PATCH /${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ DELETE
export const deleteDataAPI = async (url, token = '') => {
  try {
    const res = await API.delete(`/${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleResponse(res, url);
  } catch (err) {
    console.error(`❌ DELETE /${url} failed:`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ Refresh Access Token
export const getAccessToken = async () => {
  try {
    const res = await API.post('/refresh_token');
    return handleResponse(res, 'refresh_token');
  } catch (err) {
    console.error("🔐 Refresh token error:", err.response?.data || err.message);
    throw err;
  }
};
