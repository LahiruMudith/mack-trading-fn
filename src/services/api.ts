import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/mack-trading/api/v1",
    withCredentials: true
})

const PUBLIC_ENDPOINTS = ["/user/register", "/user/login"] //    /user/refreshToken

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

    if (token && !isPublic){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api