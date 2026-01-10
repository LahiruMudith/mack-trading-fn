import api from "./api.ts";

// --- Types ---

// Data required to initialize payment (sent to your Backend)
export interface PaymentInitData {
    items: string;           // Description (e.g., "Order #123")
    amount: number;          // Total amount
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
}

// Data received from your Backend (needed for PayHere.startPayment)
export interface PaymentHashResponse {
    hash: string;
    order_id: string;
    merchant_id: string;
    currency: string;
    amount: string;          // Formatted amount (e.g., "3500.00")
    // ... any other config your backend returns
}
export interface OrderItem {
    item: {
        _id: string;
        name: string;
        price: number;
    };
    qty: number;
}

export interface IOrder {
    _id: string;
    tracking_number: string;
    date: string;
    status: string;
    totalAmount: number; // Ensure your backend calculates/saves this
    items: OrderItem[];
    est_delivery: string;
}

export const createOrderAPI = async (addressId: string) => {
    try {
        // Matches your backend route: router.post('/create', createOrder)
        const response = await api.post("/order/place", {
            address_id: addressId
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to create order";
    }
};

export const getMyOrders = async () => {
    try {
        const response = await api.get<IOrder[]>("/order/get-all", {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Failed to fetch orders";
    }
};

const PaymentService = {
    createOrderAPI
};

export default PaymentService;

