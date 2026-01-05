import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string | null;
    isLogin: boolean;
}

const initialState: AuthState = {
    email: null,
    isLogin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.isLogin = true;
        },
        logout: (state) => {
            state.email = null;
            state.isLogin = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;