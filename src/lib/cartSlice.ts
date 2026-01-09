import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.productId === newItem.productId);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }

            state.totalQuantity += newItem.quantity;
            state.totalAmount += newItem.price * newItem.quantity;
        },
        // You can add removeFromCart, clearCart here later
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;