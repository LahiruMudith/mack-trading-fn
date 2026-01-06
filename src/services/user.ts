import api from "./api.ts";

type userDataType = {
    name:string
    email:string
    password:string
}

export const register = async (data: userDataType) => {
    const response = await api.post("/user/register" ,data)
    return response.data
}

export const google_login = async (data: userDataType) => {
    const response = await api.post("/user/google-login" ,data)
    return response.data
}

export const userLogin = async  (email:string, password:string) => {
    const response = await api.post("/user/login", {email, password})
    return response.data
}