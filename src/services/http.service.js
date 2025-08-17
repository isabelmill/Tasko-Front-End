import Axios from 'axios'
import router from '../router/index.js'

// Base URL from environment variables or fallback to deployed backend
const BASE_URL = process.env.VUE_APP_API_URL || 'https://tasko-back-end.onrender.com/api'

const axios = Axios.create({
  withCredentials: true, // needed for cookies/session auth
})

export const httpService = {
  get(endpoint, params = null) {
    return ajax(endpoint, 'GET', params)
  },
  post(endpoint, data = null) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data = null) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data = null) {
    return ajax(endpoint, 'DELETE', data)
  }
}

async function ajax(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data: method !== 'GET' ? data : null,
      params: method === 'GET' ? data : null
    })
    return res.data
  } catch (err) {
    console.error(`Error ${method}ing to ${endpoint} with data:`, data, err)
    if (err.response?.status === 401) {
      router.push('/login')
    }
    throw err
  }
}
