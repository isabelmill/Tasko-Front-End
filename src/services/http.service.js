import Axios from 'axios'
import router from '../router/index.js'

// Use environment variable for API base URL
// - VUE_APP_API_URL should be set in .env.production and .env.development
const BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3030/api'

const axios = Axios.create({
    withCredentials: true // keep this if using cookies/session auth
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
            data,
            params: method === 'GET' ? data : null
        })
        return res.data
    } catch (err) {
        console.error(`Error ${method}ing to backend at ${endpoint} with data:`, data)
        if (err.response && err.response.status === 401) {
            // Handle unauthorized errors
            router.push('/login') // redirect to login page
        }
        throw err
    }
}