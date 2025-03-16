import { FormEvent } from "react";
import { useRegisterMutation } from "../../app/api/authApi";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignUpFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function RegisterPage() {
    const [register, { isError, error }] = useRegisterMutation();

    const handleSubmit = async (event: FormEvent<SignUpFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;

        try {
            await register({ 
                email: formElements.email.value, 
                password: formElements.password.value,
            }).unwrap();
            window.location.href = '/login';
        } catch (ex) {
            console.log(error, ex);
        }
    };

    if (isError) {
        return <div className="text-red-500 text-center p-4">Register error</div>;
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
                    {/* This would be your color theme toggle */}
                    {/* <button className="rounded-full p-1 bg-gray-800 border border-gray-700 text-cyan-400 hover:text-cyan-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button> */}
                </header>

                {/* Main Card */}
                <div className="mx-auto w-full max-w-md px-4 py-12">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-cyan-500/10 p-6 backdrop-blur-sm">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                JOIN THE ARENA
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">Create your account now</p>
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
                                    placeholder="Create a password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                            </div>
                            
                            <div className="flex justify-between text-sm">
                                <p className="text-gray-400">
                                    Already have an account?
                                </p>
                                <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                                    Sign in
                                </a>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full py-2 px-4 mt-6 text-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-md font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
                            >
                                SIGN UP
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
