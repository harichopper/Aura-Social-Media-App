import axios from 'axios';

// Create a reusable Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});


/**
 * GET request
 * @param {string} url - API endpoint
 * @param {string} token - Authorization token
 * @returns {Promise} - Axios response promise
 */
export const getDataAPI = async (url, token) => {
  const res = await API.get(`/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
};

/**
 * POST request
 * @param {string} url - API endpoint
 * @param {object} post - Data to post
 * @param {string} token - Authorization token
 * @returns {Promise} - Axios response promise
 */
export const postDataAPI = async (url, post = {}, token) => {
  const res = await API.post(`/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
};


/**
 * PUT request
 * @param {string} url - API endpoint
 * @param {object} post - Data to put (replace)
 * @param {string} token - Authorization token
 * @returns {Promise} - Axios response promise
 */
export const putDataAPI = async (url, post, token) => {
  const res = await API.put(`/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
};

/**
 * PATCH request
 * @param {string} url - API endpoint
 * @param {object} post - Partial data to update
 * @param {string} token - Authorization token
 * @returns {Promise} - Axios response promise
 */
export const patchDataAPI = async (url, post, token) => {
  const res = await API.patch(`/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
};

/**
 * DELETE request
 * @param {string} url - API endpoint
 * @param {string} token - Authorization token
 * @returns {Promise} - Axios response promise
 */
export const deleteDataAPI = async (url, token) => {
  const res = await API.delete(`/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
};
