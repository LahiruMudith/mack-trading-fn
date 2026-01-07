import api from "./api.ts";

export const getRefreshToken = async (refreshToken:string) => {
    const response = await api.post("/user/refreshToken" ,{token: refreshToken})
    return response.data
}