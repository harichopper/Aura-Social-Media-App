import axios from 'axios'

// ✅ Backend URL
const BASE_URL = "https://aura-social-media-app-6njw.vercel.app"

axios.defaults.withCredentials = true; // send cookies

// GET
export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/api/${url}`, {
        headers: { Authorization: token }
    })
    return res
}

// POST
export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

// PUT
export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${BASE_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

// PATCH
export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${BASE_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

// DELETE
export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${BASE_URL}/api/${url}`, {
        headers: { Authorization: token }
    })
    return res
}
