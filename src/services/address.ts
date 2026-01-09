import api from "./api.ts";

// The shape of data your Backend expects
export type AddressBackendType = {
    id?: number | string
    type: string            // Frontend uses 'name' (Label)
    address: string
    city: string
    state: string
    zip: string             // Frontend uses 'zipCode'
    country: string
    phone_number_01: string // Frontend uses 'phone'
    phone_number_02?: string
    isDefault: boolean
}

// 1. Get All Addresses
export const getAllUserAddresses = async () => {
    // Note: ensure the leading slash '/' is consistent if your api baseURL doesn't have it
    const response = await api.get("/address/get-all", { withCredentials: true });
    return response.data;
}

// 2. Create Address
export const createUserAddress = async (data: any) => {
    // OPTIONAL: Map Frontend 'zipCode'/'name' to Backend 'zip'/'type' if needed
    const payload = {
        ...data,
    };

    const response = await api.post("/address/add", payload);
    return response.data;
}

// 3. Update Address
export const updateUserAddress = async (id: number | string, data: any) => {
    const payload = {
        ...data,
        // Uncomment if mapping is needed:
        // type: data.name,
        // zip: data.zipCode,
        // phone_number_01: data.phone
    };

    // Adjust the URL pattern based on your backend route (e.g., /address/update/:id)
    const response = await api.put(`/address/${id}`, payload);
    return response.data;
}

// 4. Delete Address
export const deleteUserAddress = async (id: number | string) => {
    const response = await api.delete(`/address/${id}`);
    return response.data;
}