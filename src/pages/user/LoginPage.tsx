import { FormEvent } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useLoginMutation, useGoogleLoginMutation } from '../../app/api/authApi.ts';
import { setCredentials } from "../../app/redux/slices/AuthSlice.ts";
import { useAppDispatch } from "../../app/redux/configureStore.ts";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle.tsx";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [login, { isError, error }] = useLoginMutation();
    const [googleLogin] = useGoogleLoginMutation();

    const handleSubmit = async (event: FormEvent<SignInFormElement>) => {
        event.preventDefault();
        const { email, password } = event.currentTarget.elements;

        try {
            const result = await login({
                email: email.value,
                password: password.value
            }).unwrap();
            dispatch(setCredentials(result));
        } catch(ex) {
            console.log(error, ex);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const googleUserInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                    }
                );

                const result = await googleLogin({
                    email: googleUserInfo.data.email,
                    name: googleUserInfo.data.name,
                }).unwrap();

                dispatch(setCredentials(result));
            } catch (ex) {
                console.log(error, ex);
            }
        },
    });

    if (isError) {
        return <div className="text-red-500 text-center p-4">Login error</div>;
    }
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center">
            <div className="flex flex-col w-full">
                {/* Header */}
                <header className="py-3 px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <a href="/main" className="text-cyan-400 hover:text-cyan-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </a>
                        <span className="font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">GG ARENA</span>
                    </div>
                    {/* <button className="rounded-full p-1 bg-gray-800 border border-gray-700 text-cyan-400 hover:text-cyan-300"> */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> */}
                            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /> */}
                        {/* </svg> */}
                    {/* </button> */}
                </header>

                {/* Main Card */}
                <div className="mx-auto w-full max-w-md px-4 py-12">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-cyan-500/10 p-6 backdrop-blur-sm">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                SIGN IN
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">Access your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="flex justify-between text-sm">
                                <p className="text-gray-400">
                                    Don't have an account?
                                </p>
                                <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                                    Sign up
                                </a>
                            </div>

                            <button
                                onClick={() => handleGoogleLogin()}
                                type="button"
                                className="w-full mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md flex justify-center items-center gap-2 text-white transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Sign in with Google
                            </button>
                            
                            <button
                                type="submit"
                                className="w-full py-2 px-4 mt-2 text-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-md font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
                            >
                                SIGN IN
                            </button>
                        </form>
                    </div>
                    <div className="text-center mt-4 text-gray-500 text-xs">
                        &copy; 2023 GG Arena. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}