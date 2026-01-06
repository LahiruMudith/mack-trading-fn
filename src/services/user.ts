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