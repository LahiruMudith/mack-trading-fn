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

// interface CartResponse {
//     _id: string;
//     user: string;
//     items: ICartItem[];
//     totalAmount: number;
// }


export const addItemToCartAPI = async (productId: string, quantity: number) => {
    try {
        const token = localStorage.getItem("token"); // Assuming you store JWT here

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
    const response = await api.get<{ items: ICartItem[] }>("/cart/", {
        withCredentials: true,
    });
    return response.data.items || [];
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
    updateCartItem,
    removeCartItem
};

export default CartService;