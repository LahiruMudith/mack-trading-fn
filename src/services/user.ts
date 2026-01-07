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
    const response = await api.post("/user/google-login" ,data, { withCredentials: true })
    return response.data
}

export const userLogin = async  (email:string, password:string) => {
    const response = await api.post("/user/login", {email, password}, { withCredentials: true })
    return response.data
}

export const getUserData = async  (email:string) => {
    const response = await api.get(`/user/get/${email}`, { withCredentials: true })
    return response.data
}

export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    try {
        const response = await api.post('/user/update-password', { currentPassword, newPassword }, { withCredentials: true }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to update password";
    }
};

export const updateUserDetails = async (email: string, data: any) => {
    try {
        const response = await api.put(`/user/update/${email}`, data, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Update failed";
    }
};

export const logoutUserAPI = async () => {
    try {
        await api.post(`/user/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error("Logout API failed", error);
    }
};