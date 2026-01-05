import api from "./api.ts";

type galleryDataType = {
    image_url:string
    image_category:string
    title:string
    description:string
}

export const addGalleryImage = async (data: galleryDataType) => {
    const response = await api.post("gallery/save", data)
    return response.data
}

export const getAllGalleries = async () => {
    const response = await api.get("gallery/get-all")
    return response.data
}