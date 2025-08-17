import Axios from 'axios'
import router from '../router/index.js'

// Base URL from environment variables or fallback
const BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3030/api'

const axios = Axios.create({
  withCredentials: true, // required if backend uses cookies/session auth
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
      url: `${BASE_URL}/${endpoint}`, // ensure proper slash
      method,
      data: method !== 'GET' ? data : null,
      params: method === 'GET' ? data : null
    })
    return res.data
  } catch (err) {
    console.error(`Error ${method}ing to ${endpoint} with data:`, data)
    if (err.response?.status === 401) {
      router.push('/login')
    }
    throw err
  }
}
