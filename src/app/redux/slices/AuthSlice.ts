import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../api/authApi";

export interface AuthState {
    isAuthenticated: boolean;
    email: string | null;
    userName: string | null;
}

const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

const initialState: AuthState = {
    isAuthenticated: !!user,
    email: user?.email ?? null,
    userName: user?.userName ?? null 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.email = action.payload.email;
            state.isAuthenticated = true;
            console.log(action.payload);
            localStorage.setItem('user', 
              JSON.stringify({email: action.payload.email, userName: action.payload.userName, role: action.payload.role}));
            localStorage.setItem('jwt_token', action.payload.token);
        },
        logoutCleanUp: (state) => {
            state.email = null;
            state.userName = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('jwt_token');
        },
    },
});

export const { setCredentials, logoutCleanUp } = authSlice.actions;
export default authSlice.reducer;
