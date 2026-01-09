import api from "./api.ts";

export const getAllItems = async () => {
    try {
        const response = await api.get(`/item`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to fetch items";
    }
};

export const getItemById = async (id: string) => {
    try {
        const response = await api.get(`/item/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to fetch item details";
    }
};