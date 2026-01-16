import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import {getRefreshToken} from "./auth.ts";

const api = axios.create({
    baseURL: "https://mack-trading-be.vercel.app/mack-trading/api/v1",
    withCredentials: true
})

const PUBLIC_ENDPOINTS = ["/user/register", "/user/login", "/user/refreshToken"] //


api.interceptors.request.use((config) => {
    // const token = Cookies.get("accessToken");
    const token = localStorage.getItem('accessToken');

    const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

    if (token && !isPublic){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err: AxiosError) => {
        const originalRequest: any = err.config;

        const isPublic = PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url));

        if (err.response?.status === 401 && !isPublic && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get("refreshToken");

                if (!refreshToken) {
                    throw new Error("Refresh token not found");
                }

                const res = await getRefreshToken(refreshToken);

                Cookies.set("accessToken", res.accessToken);

                originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;

                return api(originalRequest);
            } catch (e) {
                console.error("Refresh failed:", e);

                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                window.location.href = "/login";

                return Promise.reject(e);
            }
        }

        return Promise.reject(err);
    }
);

export default api