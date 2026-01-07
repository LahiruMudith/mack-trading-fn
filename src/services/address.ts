import api from "./api.ts";

type addressDataType = {
    type:string
    address:string
    city:string
    state:string
    zip:string
    country:string
    phone_number_01:string
    phone_number_02:string
    isDefault:boolean
}

export const saveAddress = async (data: addressDataType) => {
    const response = await api.post("/address/add" ,data)
    return response.data
}

export const getAllUserAddresses = async  () => {
    const response = await api.get("address/get-all", { withCredentials: true })
    return response.data
}