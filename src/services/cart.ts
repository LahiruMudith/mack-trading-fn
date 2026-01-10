import api from "./api.ts";

export interface ICartItem {
    _id: string;
    product: {
        _id: string;
        name: string;
        image_url: string;
        price: number;
    };
    quantity: number;
    price: number;
}

// 1. Define the full response shape (Uncommented and cleaned up)
export interface CartResponse {
    _id: string;
    items: ICartItem[];
    totalAmount: number;
}

export const addItemToCartAPI = async (productId: string, quantity: number) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.post(
            `/cart/add`,
            { productId, quantity },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to add to cart";
    }
};

export const getCart = async (): Promise<ICartItem[]> => {
    // Updated to use CartResponse
    const response = await api.get<CartResponse>("/cart/", {
        withCredentials: true,
    });
    return response.data.items || [];
};

// 2. FIX: Use CartResponse here so TypeScript knows 'totalAmount' exists
export const getTotalAmount = async (): Promise<number> => {
    const response = await api.get<CartResponse>("/cart/", {
        withCredentials: true,
    });
    return response.data.totalAmount || 0;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
    const response = await api.put(`/cart/${itemId}`, { quantity }, {
        withCredentials: true
    });
    return response.data;
};

export const removeCartItem = async (itemId: string) => {
    const response = await api.delete(`/cart/${itemId}`, {
        withCredentials: true
    });
    return response.data;
};

const CartService = {
    getCart,
    getTotalAmount, // Fixed typo here (was getTotolAmount)
    updateCartItem,
    removeCartItem
};

export default CartService;