import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Role } from '../models/User';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface GoogleLoginRequest {
    email: string;
    name: string;
}

export interface AuthResponse {
    userName: string;
    email: string;
    token: string;
    role: number;
}

const baseUrl = 'http://localhost:5064/api/';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (loginRequest) => ({
                url: 'auth/login',
                method: 'POST',
                body: loginRequest,
            }),
        }),
        googleLogin: builder.mutation<AuthResponse, GoogleLoginRequest>({
            query: (googleLoginRequest) => ({
                url: 'auth/google-login',
                method: 'POST',
                body: googleLoginRequest,
            }),
        }),
        register: builder.mutation<AuthResponse, LoginRequest>({
            query: (registerRequest) => {
                console.log('Register request:', registerRequest);
                return {
                    url: 'auth/register',
                    method: 'POST',
                    body: registerRequest,
                };
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST'
            })
        })
    }),
});

export const {
    useLoginMutation,
    useGoogleLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApi;
